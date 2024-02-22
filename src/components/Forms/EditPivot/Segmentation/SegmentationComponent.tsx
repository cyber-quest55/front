import SegmentedPivotDevice from '@/components/Devices/SegmentedPivot';
import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { postPivotConfig } from '@/services/pivot';
import { getSegmentsInPivot } from '@/utils/formater/get-segments';
import { SaveOutlined } from '@ant-design/icons';
import { EditableProTable, ProCard, ProColumns, ProFormDigit } from '@ant-design/pro-components';
import { GoogleMap } from '@react-google-maps/api';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Alert, App, Button, Typography } from 'antd';
import * as React from 'react';

type DataSourceType = {
  id: any;
  name?: string;
  begin?: number;
  end?: number;
  state?: string;
  plantingDate?: string;
  harvestDate?: string;
  color: string;
};

const colors = ['#1d39c4', '#d3adf7', '#e6fffb', '#ffa39e', '#b7eb8f'];

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

const FormPivotSegmentationComponent: React.FunctionComponent<any> = (props) => {
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
  const [maxAngle, setMaxAngle] = React.useState<any>(360);

  const postReq = useRequest(postPivotConfig, { manual: true });

  const containerStyle = {
    width: '100%',
    height: xs ? '50vh' : 'calc(50vh -  102px)',
  };

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.segments.column.name.title',
      }),
      dataIndex: 'name',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: 'required field' }],
        };
      },
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '14%',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.segments.column.pantingtype.title',
      }),
      dataIndex: 'plantingType',

      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '14%',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.segments.column.initialangle.title',
      }),
      dataIndex: 'begin',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: 'required field' }, { min: 50 }],
        };
      },
      editable: () => {
        return false;
      },
      render: (text) => {
        return <>{text}°</>;
      },
      width: '14%',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.segments.column.endangle.title',
      }),
      dataIndex: 'end',
      valueType: 'digit',
      formItemProps: (form, { rowIndex, entity }) => {
        return {
          rules: [
            {
              type: 'number',
              min: (entity?.begin as number) + 1,
              max:
                rowIndex === dataSource.length
                  ? maxAngle
                  : dataSource.length + 1 === rowIndex
                  ? maxAngle
                  : dataSource[rowIndex + 1]?.begin,
            },
          ],
        };
      },
      render: (text) => {
        return <>{text}°</>;
      },
      width: '14%',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.segments.column.plantingdate.title',
      }),
      dataIndex: 'plantingDate',
      valueType: 'date',

      formItemProps: () => {
        return {
          rules: [{ required: true, message: 'required field' }],
        };
      },
      
      width: '14%',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.segments.column.harvestdate.title',
      }),
      dataIndex: 'harvestDate',
      valueType: 'date',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: 'required field ' }],
        };
      },
     
      width: '14%',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.segments.column.option.title',
      }),
      valueType: 'option',
      width: 120,
      render: (text, record, index, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          {intl.formatMessage({
            id: 'component.edit.pivot.segments.column.option.edit',
          })}
        </a>,
        dataSource.length > 1 ? (
          <a
            key="delete"
            onClick={() => {
              setDataSource(equiData(record, dataSource, index));
            }}
          >
            {intl.formatMessage({
              id: 'component.edit.pivot.segments.column.option.delete',
            })}
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
    if (dataSource.length > 5) {
      setPosition('hidden');
    }
  }, [dataSource]);

  React.useEffect(() => {
    /** Filtrar todos após ter mudado o ângulo máximo*/
    const dt = dataSource.filter((item) => item.end <= maxAngle);
    setDataSource(dt);
  }, [maxAngle]);

  const onFinish = async () => {
    try {
      const segments_crop = dataSource.map((item, index) => ({
        crop_harvest_date: item.harvestDate,
        crop_plant_date: item.plantingDate,
        name: item.name,
        number_editing: index,
        segment_type: item.plantingType || '',
      }));

      const segments = dataSource.map((item, index) => ({
        angle_end: item.end,
        angle_start: item.begin,
        number_editing: index,
      }));

      const newObj = {
        content: {
          ...pivot.controllerconfig.content,
          segments,
          sector: {
            ...pivot.controllerconfig.content.sector,
            end_angle: maxAngle,
          },
        },
        name_pivot_on_config: pivot.controllerconfig.name,
        segments_crop,
        brand_model: pivot.controllerconfig.brand_model,
        equipment: pivot.controllerconfig.equipment,
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
      title={intl.formatMessage({
        id: 'component.edit.pivot.segments.title',
      })}
      wrap
      extra={
        <Button loading={postReq.loading} icon={<SaveOutlined />} type="primary" onClick={onFinish}>
          {intl.formatMessage({
            id: 'component.edit.pivot.button.save',
          })}
        </Button>
      }
    >
      <ProCard ghost gutter={[16, 8]} colSpan={{ md: 24 }} wrap>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.pivot.segments.desc',
          })}
        </Typography.Text>
        <Alert
          style={{ marginBlock: 12 }}
          showIcon
          type="info"
          message={intl.formatMessage({
            id: 'component.edit.pivot.segments.info',
          })}
        />
        <ProFormDigit
          fieldProps={{ onBlur: (e) => setMaxAngle(e), value: maxAngle }}
          max={360}
          name="noname"
          label={intl.formatMessage({
            id: 'component.edit.pivot.segments.maxangle.label',
          })}
        />
      </ProCard>
      <ProCard ghost colSpan={{ xs: 24, md: 8 }}>
        <GoogleMap
          onLoad={(map) => setMap(map)}
          onZoomChanged={() => {
            if (map !== null) setZoom(map.getZoom());
          }}
          mapContainerStyle={containerStyle}
          center={mapCenter}
          mapTypeId='satellite'
          options={{
            keyboardShortcuts: false,
            rotateControl: false,
            mapTypeControl: false, 
            isFractionalZoomEnabled: false,
            scaleControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeId: 'satellite',

          }}
          zoom={zoom}
        >
          <SegmentedPivotDevice
            center={{ lat: positions?.latitude_center, lng: positions?.longitude_center }}
            referenced={{ lat: positions?.latitude_reference, lng: positions?.longitude_reference }}
            segments={dataSource}
          />
        </GoogleMap>
      </ProCard>
      <ProCard ghost colSpan={{ xs: 24, md: 16 }}>
        <EditableProTable<DataSourceType>
          rowKey="id"
          headerTitle="Segmentos"
          maxLength={5}
          scroll={{
            x: 960,
          }}
          recordCreatorProps={
            position !== 'hidden'
              ? {
                  position: position as 'top',
                  record: (index) => ({
                    id: (Math.random() * 1000000).toFixed(0),
                    begin: index === 0 ? 0 : dataSource[index - 1]?.end,
                    end: maxAngle,
                    color: colors[index],
                  }),
                }
              : (false as any)
          }
          loading={false}
          columns={columns}
          request={async () => {
            const newData = getSegmentsInPivot(pivot)

            return {
              data: newData,
              total: pivot?.controllerconfig?.content?.segments?.length,
              success: true,
              pageSize: 4,
            } as any;
          }}
          ghost
          value={dataSource}
          onChange={setDataSource as any}
          editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (_, data) => {
              if (dataSource.find((item) => item.id === data.id)) {
                setDataSource(formatDatasource(data, dataSource, data.index as number));
              }
            },
            onChange: setEditableRowKeys,
          }}
        />
      </ProCard>
    </ProCard>
  );
};

export default FormPivotSegmentationComponent;
