import { GetMeterSystemEventModelProps } from '@/models/meter-events';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { DownloadOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDateRangePicker, ProTable } from '@ant-design/pro-components';
import { Button, Col, Pagination, PaginationProps, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

type Props = {
  dispatch: any;
  meterSystemEvent: GetMeterSystemEventModelProps;
  selectedDevice: SelectedDeviceModelProps;
};

const MeterActivityEventTable: React.FC<Props> = (props) => {
  const [range, setRange] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const [current, setCurrent] = useState(0);
  const [pageSize, setPageSize] = useState(props.meterSystemEvent.total);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setCurrent(current);
    setPageSize(pageSize);
  };

  const onDateChange = (value: any) => {
    setRange({
      startDate: value[0],
      endDate: value[1],
    });
  };

  const update = () => {
    const { startDate, endDate } = range;

    props.dispatch({
      type: 'meterSystemEvent/queryMeterSystemEvent',
      payload: {
        farmId: props.selectedDevice.farmId,
        irpdId: props.selectedDevice.deviceId,
        params: { current, pageSize, startDate, endDate },
      },
    });
  };

  useEffect(() => {
    update();
  }, [range, current, pageSize]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <ProTable<any>
        columns={[
          {
            title: 'Início',
            dataIndex: 'date',
            render: (_value, item) => {
              return <>{item.date}</>;
            },
          },
          {
            title: 'Medição',
            dataIndex: 'measurement',
            render: (_value, item) => {
              return <>{`${item.measurement}m`}</>;
            },
          },
          {
            title: 'Offset',
            dataIndex: 'offset',
            render: (_value, item) => {
              return <>{item.offset}m</>;
            },
          },
          {
            title: 'Nível do Reservatório',
            dataIndex: 'tankLevel',
            render: (_value, item) => {
              return  <>{item.tankLevel}m</>;
            },
          },
          {
            title: 'Vazão',
            dataIndex: 'flowRate',
            render: (_value, item) => {
              return <>{item.flowRate}m³/h</> ;
            },
          },
        ]}
        dataSource={props.meterSystemEvent.result}
        rowKey="key"
        pagination={false}
        options={false}
        search={false}
        loading={props.meterSystemEvent.loading}
        dateFormatter="string"
        toolbar={{
          title: (
            <LightFilter>
              <ProFormDateRangePicker
                disabled={props.meterSystemEvent.loading}
                name="startdate"
                label="Periodo"
                allowClear
                fieldProps={{
                  onChange: onDateChange,

                  value: [range.startDate, range.endDate],
                }}
              />
            </LightFilter>
          ),
          filter: (
            <Space>
              <Button icon={<DownloadOutlined />}>Exportar</Button>
           
            </Space>
          ),
        }}
      />
      <Row justify="end">
        <Col>
          <Pagination
            disabled={props.meterSystemEvent.loading}
            responsive
            size="small"
            className=""
            showSizeChanger
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={props.meterSystemEvent.total}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default connect(
  ({ meterSystemEvent, selectedDevice }: { meterSystemEvent: any; selectedDevice: any }) => ({
    meterSystemEvent,
    selectedDevice,
  }),
)(MeterActivityEventTable);
