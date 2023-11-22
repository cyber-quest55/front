import SegmentedPivotDevice from '@/components/Devices/SegmentedPivot';
import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { postPivotConfig } from '@/services/pivot';
import { SaveOutlined } from '@ant-design/icons';
import { EditableProTable, ProCard, ProColumns, ProFormSelect } from '@ant-design/pro-components';
import { GoogleMap } from '@react-google-maps/api';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Alert, App, Button, Typography } from 'antd';
import * as React from 'react';

type DataSourceType = {
  id: any;
  type?: string;
  begin?: number;
  end?: number;
  color: string;
};

const equiData = (
  record: DataSourceType,
  datasource: DataSourceType[],
  index: number,
): DataSourceType[] => {
  const length = datasource.length - 1;
  if (record.id === datasource[0].id) {
    if (datasource[1].begin) {
      datasource[1].begin = 0;
      return datasource.filter((item) => item.id !== record.id);
    }
  }

  if (record.id !== datasource[length].id) {
    if (datasource[index + 1].begin) {
      datasource[index + 1].begin = datasource[index - 1].end;
      return datasource.filter((item) => item.id !== record.id);
    }
  }
  return datasource.filter((item) => item.id !== record.id);
};

const formatDatasource = (
  record: DataSourceType,
  datasource: DataSourceType[],
  index: number,
): DataSourceType[] => {
  const length = datasource.length - 1;

  if (index === 0) {
    return datasource;
  }

  if (index === length) {
    return datasource;
  }

  datasource[index + 1].begin = record.end;

  return datasource;
};

const EditPivotFinalCanonComponent: React.FunctionComponent<any> = (props) => {
  const maxAngle = 360;
  const maxSize = 10;

  const { pivot } = props;
  const positions = pivot?.controllerconfig?.content?.pivot_positions;

  const intl = useIntl();
  const params = useParams();
  const { message } = App.useApp();
  const { xs } = useScreenHook();
  const { zoom, setZoom, map, setMap, mapCenter } = useMapHook(15, {
    lat: positions?.latitude_center,
    lng: positions?.longitude_center,
  });

  const [editableKeys, setEditableRowKeys] = React.useState<React.Key[]>([]);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [position, setPosition] = React.useState<'top' | 'bottom' | 'hidden'>('bottom');
  const [stopCondition, setStopCondition] = React.useState<any>(
    pivot.controllerconfig?.content?.endgun_mode?.endgun_mode,
  );

  const postReq = useRequest(postPivotConfig, { manual: true });

  const containerStyle = {
    width: '100%',
    height: xs ? '50vh' : 'calc(50vh -  102px)',
  };

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Ângulo Inicial',
      dataIndex: 'begin',
      valueType: 'digit',

      formItemProps: (form, { rowIndex, entity }) => {
        return {
          rules: [
            {
              type: 'number',
              min: rowIndex === 0 ? 0 : dataSource[rowIndex - 1]?.end,
              max: (entity?.end as number) - 1,
            },
          ],
        };
      },
      editable: () => {
        return true;
      },
      render: (text) => {
        return <>{text}°</>;
      },
      width: '14%',
    },
    {
      title: 'Ângulo Final',
      dataIndex: 'end',
      valueType: 'digit',

      render: (text) => {
        return <>{text}°</>;
      },
      width: '14%',
    },
    {
      title: 'Ações',
      valueType: 'option',
      width: 120,
      render: (text, record, index, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        dataSource.length > 1 ? (
          <a
            key="delete"
            onClick={() => {
              setDataSource(equiData(record, dataSource, index));
            }}
          >
            Delete
          </a>
        ) : null,
      ],
    },
  ];

  React.useEffect(() => {
    /** Caso já tenha fechado o circulo*/
    if (dataSource.length > 0) {
      if (dataSource[dataSource.length - 1]?.end === maxAngle) {
        setPosition('hidden');
      } else {
        setPosition('bottom');
      }
    }
    if (dataSource.length > 10) {
      setPosition('hidden');
    }
    if (dataSource.length > 10) {
      setPosition('hidden');
    }
  }, [dataSource]);

  const onFinish = async () => {
    try {
      const endgun_angles = dataSource.map((item, index) => ({
        end_angle: item.end,
        start_angle: item.begin,
        number_editing: index,
      }));

      const newObj = {
        content: {
          ...pivot.controllerconfig.content,
          endgun_angles,
          endgun_mode: {
            endgun_mode: stopCondition,
          },
        },
        name_pivot_on_config: pivot.controllerconfig.name,
        brand_model: pivot.controllerconfig.brand_model,
        equipment: pivot.controllerconfig.equipment,
        segments_crop: pivot.controllerconfig.segments_crop,
        injection_pump: pivot.controllerconfig.injection_pump,
        kwh_out_of_peak: pivot.controllerconfig.kwh_out_of_peak,
        kwh_peak: pivot.controllerconfig.kwh_peak,
        kwh_reduced: pivot.controllerconfig.kwh_reduced,
        message_subtype: pivot.controllerconfig.message_subtype,
        panel_type: pivot.controllerconfig.panel_type,
        potency: pivot.controllerconfig.potency,
      };

      await postReq.runAsync(
        {
          farmId: params.farmId as any,
          pivotId: params.pivotId as any,
          deviceId: pivot.control as any,
        },
        newObj as any,
      );

      await props.queryPivotByIdStart({
        farmId: params.farmId as any,
        pivotId: params.pivotId as any,
      });

      message.success('Configs Atualizadas com Sucesso');
    } catch (err) {
      message.error('Fail');
    }
  };

  return (
    <ProCard
      ghost
      gutter={[16, 8]}
      title="Canhão Final"
      wrap
      extra={
        <Button loading={postReq.loading} icon={<SaveOutlined />} type="primary" onClick={onFinish}>
          Salvar
        </Button>
      }
    >
      <ProCard ghost gutter={[16, 8]} colSpan={{ md: 24 }} wrap>
        <Typography.Text>
          Para pivôs que possuem canhão final instalado na última torre, é possível segmentar o seu
          acionamento evitando que ele ligue em locais onde não se deve irrigar, como estradas,
          casas, etc.
        </Typography.Text>
        <Alert
          style={{ marginBlock: 12 }}
          showIcon
          type="info"
          message="Você pode criar até 10 segmentos          "
        />
        <ProFormSelect
          name="condition"
          label="Condição de parada"
          fieldProps={{ value: stopCondition, onChange: (e) => setStopCondition(e) }}
          colProps={{ xs: 24, md: 8 }}
          options={[
            {
              value: 0,
              label: 'Sempre desligado',
            },
            {
              value: 1,
              label: 'Sempre ligado',
            },
            {
              value: 2,
              label: 'Ligado por segmento',
            },
          ]}
        />
      </ProCard>
      {stopCondition === 2 ? (
        <ProCard wrap gutter={[16, 8]} ghost>
          <ProCard ghost colSpan={{ xs: 24, md: 8 }}>
            <GoogleMap
              onLoad={(map) => setMap(map)}
              onZoomChanged={() => {
                if (map !== null) setZoom(map.getZoom());
              }}
              mapContainerStyle={containerStyle}
              center={mapCenter}
              options={{
                keyboardShortcuts: false,
                rotateControl: false,
                mapTypeControl: false,
                isFractionalZoomEnabled: false,
                scaleControl: false,
                fullscreenControl: false,
                streetViewControl: false,
              }}
              zoom={zoom}
            >
              <SegmentedPivotDevice
                center={{ lat: positions?.latitude_center, lng: positions?.longitude_center }}
                referenced={{
                  lat: positions?.latitude_reference,
                  lng: positions?.longitude_reference,
                }}
                segments={dataSource}
              />
            </GoogleMap>
          </ProCard>
          <ProCard ghost colSpan={{ xs: 24, md: 16 }}>
            <EditableProTable<DataSourceType>
              rowKey="id"
              headerTitle="Segmentos"
              maxLength={maxSize}
              scroll={{
                x: 960,
              }}
              recordCreatorProps={
                position !== 'hidden'
                  ? {
                      position: position as 'top',
                      record: (index, ds) => ({
                        id: (Math.random() * 1000000).toFixed(0),
                        begin: index === 0 ? 0 : dataSource[index - 1]?.end,
                        end: maxAngle,
                        color: ' #0000FF',
                        type: ds[index]?.type,
                      }),
                    }
                  : (false as any)
              }
              loading={false}
              columns={columns}
              request={async () => {
                const newData = [];

                for (let i = 0; i < pivot?.controllerconfig?.content?.endgun_angles?.length; i++) {
                  const segment = pivot?.controllerconfig?.content?.endgun_angles[i];
                  newData.push({
                    begin: segment.start_angle,
                    end: segment.end_angle,
                    color: ' #0000FF',
                    id: `key-table-segment-${i}`,
                  } as any);
                }

                return {
                  data: newData,
                  total: pivot?.controllerconfig?.content?.segments?.length,
                  success: true,
                  pageSize: 4,
                };
              }}
              ghost
              value={dataSource}
              onChange={setDataSource as any}
              editable={{
                type: 'multiple',
                editableKeys,
                onSave: async (_, data) => {
                  if (data.type === 'green') {
                    data.color = '#000';
                  }
                  if (dataSource.find((item) => item.id === data.id)) {
                    setDataSource(formatDatasource(data, dataSource, data.index as number));
                  }
                },
                onChange: setEditableRowKeys,
              }}
            />
          </ProCard>
        </ProCard>
      ) : null}
    </ProCard>
  );
};

export default EditPivotFinalCanonComponent;
