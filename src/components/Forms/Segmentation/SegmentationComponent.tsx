import SegmentedPivotDevice from '@/components/Devices/SegmentedPivot';
import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { EditableProTable, ProCard, ProColumns, ProFormDigit } from '@ant-design/pro-components';
import { GoogleMap } from '@react-google-maps/api';
import { Alert, Typography } from 'antd';
import * as React from 'react';

interface Props {}

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

const equiData = (
  record: DataSourceType,
  datasource: DataSourceType[],
  index: number,
): DataSourceType[] => {
  const length = datasource.length - 1;
  if (record.id === datasource[0].id) {
    datasource[1].begin = 0;
    return datasource.filter((item) => item.id !== record.id);
  }

  if (record.id !== datasource[length].id) {
    datasource[index + 1].begin = datasource[index - 1].end;
    return datasource.filter((item) => item.id !== record.id);
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

const FormPivotSegmentationComponent: React.FunctionComponent<Props> = (props) => {
  const [editableKeys, setEditableRowKeys] = React.useState<React.Key[]>([]);
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [position, setPosition] = React.useState<'top' | 'bottom' | 'hidden'>('bottom');
  const [maxAngle, setMaxAngle] = React.useState<any>(360);

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
      title: 'Nome',
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
      title: 'Tipo do Plantio',
      dataIndex: 'plantingType',
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
      title: 'Ângulo Inicial',
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
      title: 'Ângulo Final',
      dataIndex: 'end',
      valueType: 'digit',
      formItemProps: (form, { rowIndex, entity }) => {
        return {
          rules: [
            {
              type: 'number',
              min: (entity?.begin as number) + 1,
              max:
                rowIndex + 1 === dataSource.length
                  ? maxAngle
                  : dataSource.length + 1 === rowIndex
                  ? maxAngle
                  : dataSource[rowIndex + 1]?.begin,
            },
          ],
        };
      },
      // 第一行不允许编辑

      width: '14%',
    },
    {
      title: 'Data do Plantio',
      dataIndex: 'plantingDate',
      valueType: 'date',

      formItemProps: () => {
        return {
          rules: [{ required: true, message: 'required field' }],
        };
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '14%',
    },
    {
      title: 'Data da Colheita',
      dataIndex: 'harvestDate',
      valueType: 'date',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: 'required field ' }],
        };
      },
      // 第一行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
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
            setDataSource(equiData(record, dataSource, index));
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
    {
      id: 6247483504,
      name: 'Segmento 2',
      begin: 100,
      end: 150,
      state: 'open',
      plantingDate: '2020-01-01',
      harvestDate: '2020-01-01',
      color: '#0ff',
    },
    {
      id: 62474334,
      name: 'Segmento 1',
      begin: 150,
      end: 220,
      state: 'open',
      plantingDate: '2020-01-01',
      harvestDate: '2020-01-01',
      color: '#f30',
    },
    {
      id: 555504,
      name: 'Segmento 1',
      begin: 220,
      end: 280,
      state: 'open',
      plantingDate: '2020-01-01',
      harvestDate: '2020-01-01',
      color: '#03f',
    },
  ];

  React.useEffect(() => {
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
    const dt = dataSource.filter((item) => item.end <= maxAngle);
    setDataSource(dt);
  }, [maxAngle]);

  return (
    <ProCard ghost gutter={[16, 8]} title="Descrição" wrap>
      <ProCard ghost gutter={[16, 8]} colSpan={{ md: 24 }} wrap>
        <Typography.Text>
          Em alguns pivôs, é comum segmentar os pivôs em duas ou mais partes devido à variedade
          plantada, época de plantio ou até mesmo para facilitar o gerenciamento da operação. Com
          esta funcionalidade, você pode segmentar os pivôs e ter maior controle da sua operação.
        </Typography.Text>
        <Alert
          style={{ marginBlock: 12 }}
          showIcon
          type="info"
          message="Você pode criar até 5 segmentos"
        />

        <ProFormDigit
          fieldProps={{ onBlur: (e) => setMaxAngle(e), value: maxAngle }}
          max={360}
          name="asdsad"
          label="Qual é o ângulo máximo que esse pivô atinge?"
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
            segments={dataSource}
            center={{ lat: 38.149847, lng: -122.459345 }}
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
                  }),
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
