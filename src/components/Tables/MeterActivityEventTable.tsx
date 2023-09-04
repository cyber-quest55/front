import { useTableHook } from '@/hooks/table';
import { GetMeterSystemEventModelProps, queryMeterSystemEvent } from '@/models/meter-events';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { DownloadOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDateRangePicker, ProTable } from '@ant-design/pro-components';
import { Button, Col, Pagination, PaginationProps, Row, Space } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';

type Props = {
  meterSystemEvent: GetMeterSystemEventModelProps;
  selectedDevice: SelectedDeviceModelProps;
  queryMeterSystemEvent: typeof queryMeterSystemEvent;
};

const MeterActivityEventTable: React.FC<Props> = (props) => {
  const { pageSize, currentPage, range, setPageSize, setCurrentPage, setRange } = useTableHook(50);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (currentPage, pageSize) => {
    setCurrentPage(currentPage);
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

    props.queryMeterSystemEvent({
      farmId: props.selectedDevice.farmId,
      meterId: props.selectedDevice.deviceId,
      otherId: props.selectedDevice.otherProps.imeterSetId,
      params: { currentPage, pageSize, startDate, endDate },
    });
  };

  useEffect(() => {
    update();
  }, [range, currentPage, pageSize]);

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
              return <>{item.tankLevel}m</>;
            },
          },
          {
            title: 'Vazão',
            dataIndex: 'flowRate',
            render: (_value, item) => {
              return <>{item.flowRate}m³/h</>;
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

const mapStateToProps = ({ meterSystemEvent, selectedDevice }: any) => ({
  meterSystemEvent,
  selectedDevice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryMeterSystemEvent: (props: any) => dispatch(queryMeterSystemEvent(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeterActivityEventTable);
