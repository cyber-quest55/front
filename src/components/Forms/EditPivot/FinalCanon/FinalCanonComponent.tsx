import SegmentedPivotDevice from '@/components/Devices/SegmentedPivot';
import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { EditableProTable, ProCard, ProColumns, ProFormSelect } from '@ant-design/pro-components';
import { GoogleMap } from '@react-google-maps/api';
import { Alert, Segmented, Typography } from 'antd';
import * as React from 'react';

interface IEditPivotFinalCanonComponent {}

type DataSourceType = {
  id: React.Key;
  name?: string;
  begin?: number;
  end?: number;
  state?: string;
  plantingDate?: string;
  harvestDate?: string;
  color: string;
};

const EditPivotFinalCanonComponent: React.FunctionComponent<IEditPivotFinalCanonComponent> = (
  props,
) => {
  const [editableKeys, setEditableRowKeys] = React.useState<React.Key[]>([]);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [position, setPosition] = React.useState<'top' | 'bottom' | 'hidden'>('bottom');
  const [maxAngle, setMaxAngle] = React.useState<any>(360);
  const [stopCondition, setStopCondition] = React.useState<any>('disabled');
  const [segment, setSegment] = React.useState<any>(1);

  const { xs } = useScreenHook();

  const { zoom, setZoom, map, setMap, mapCenter } = useMapHook(15, {
    lat: 38.149847,
    lng: -122.459345,
  });

  const containerStyle = {
    width: '100%',
    height: xs ? '50vh' : 'calc(50vh -  102px)',
  };

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Ângulo Inicial',
      dataIndex: 'begin',
      formItemProps: (_, { entity }) => {
        console.log(entity.end)
        return {
          rules: [
            {
              type: 'number',
              min: 0,
              max: (entity?.end as number) -1,
            },
          ],
        };
      },
      render: (text) => {
        return <>{text}°</>;
      },
      valueType: 'digit',
      width: '14%',
    },
    {
      title: 'Ângulo Final',
      dataIndex: 'end',
      valueType: 'digit',
      formItemProps: (_, { entity }) => {
        return {
          rules: [
            {
              type: 'number',
              min: (entity?.begin as number) + 1,
              max: 360,
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
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  const defaultData: DataSourceType[] = [
    {
      id: 624748504,
      name: 'Segmento 1',
      begin: 0,
      end: 100,
      state: 'open',
      plantingDate: '2020-01-01',
      harvestDate: '2020-01-01',
      color: '#ff0',
    },
  ];

  React.useEffect(() => {
    if (dataSource.length > 9) {
      setPosition('hidden');
    }
    if(dataSource.length > 0){
      setSegment(dataSource.length )
    }
  }, [dataSource]);

  return (
    <ProCard
      wrap
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Canhão Final
        </Typography.Title>
      }
      ghost
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
    >
      <ProCard ghost colSpan={24}>
        <div style={{ marginBottom: 20 }}>
          <Typography.Text>
            Para pivôs que possuem canhão final instalado na última torre, é possível segmentar o
            seu acionamento evitando que ele ligue em locais onde não se deve irrigar, como
            estradas, casas, etc.
          </Typography.Text>
        </div>
        <Alert
          style={{ marginBlock: 12 }}
          showIcon
          type="info"
          message="Você pode criar até 10 segmentos"
        />
        <ProFormSelect
          name="condition"
          label="Condição de parada"
          fieldProps={{ value: stopCondition, onChange: (e) => setStopCondition(e) }}
          colProps={{ xs: 24, md: 8 }}
          options={[
            {
              value: 'disabled',
              label: 'Sempre desligado',
            },
            {
              value: 'by_value',
              label: 'Sempre ligado',
            },
            {
              value: 'by_segment',
              label: 'Ligado por segmento',
            },
          ]}
        />
      </ProCard>

      {stopCondition === 'by_segment' ? (
        <ProCard ghost colSpan={{ md: 24 }} gutter={[12, 12]}>
          <ProCard ghost colSpan={{ xs: 24, md: 16 }}>
            <ProCard
              extra={
                <Segmented
                  options={[...Array(dataSource.length + 1).keys()].filter((item) => item !== 0)}
                  value={segment}
                  onChange={setSegment}
                />
              }
              title={
                <Typography.Title level={4} style={{ margin: 0, padding: 0 }}>
                  Segmentos
                </Typography.Title>
              }
              ghost
              style={{ width: '100%' }}
              wrap
            >
              <ProCard ghost colSpan={24}>
                <EditableProTable<DataSourceType>
                  rowKey="id"
                  maxLength={10}
                  scroll={{
                    x: 450,
                  }}
                  recordCreatorProps={
                    position !== 'hidden'
                      ? {
                          position: position as 'top',
                          record: (index) => {
                             return ({
                            id: (Math.random() * 1000000).toFixed(0),
                            begin: 0,
                            end: maxAngle,
                          })},
                        }
                      : (false as any)
                  }
                  loading={false}
                  columns={columns}
                  request={async () => ({
                    data: defaultData,
                    total: 3,
                    success: true,
                  })}
                  ghost
                  value={dataSource}
                  onChange={setDataSource}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (_, data) => {
                      console.log('data', data);
                    },
                    onChange: setEditableRowKeys,
                  }}
                />
              </ProCard>
            </ProCard>
          </ProCard>
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
                referenced={{ lat: 38.15433787178924, lng: -122.459245319599 }}
                segments={dataSource.length > 0 ? [dataSource[segment - 1]]: []}
                center={{ lat: 38.149847, lng: -122.459345 }}
              />
            </GoogleMap>
          </ProCard>
        </ProCard>
      ) : null}
    </ProCard>
  );
};

export default EditPivotFinalCanonComponent;
