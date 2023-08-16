import { useTableHook } from '@/hooks/table';
import { GetIrpdEventsModelProps } from '@/models/irpd-events';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { formatDate } from '@/utils/get-formated-date';
import { DownloadOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDateRangePicker, ProTable } from '@ant-design/pro-components';
import { Button, Col, Pagination, PaginationProps, Row, Space } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';

type Props = {
  dispatch: any;
  irpdEvents: GetIrpdEventsModelProps;
  selectedDevice: SelectedDeviceModelProps;
};

const IrpdActivityEventTable: React.FC<Props> = (props) => {
  const { pageSize, currentPage, range, setPageSize, setCurrentPage, setRange } = useTableHook(
    props.irpdEvents.total,
  );

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

    props.dispatch({
      type: 'irpdEvents/queryIrpdEvents',
      payload: {
        farmId: props.selectedDevice.farmId,
        irpdId: props.selectedDevice.deviceId,
        params: { currentPage, pageSize, startDate, endDate },
      },
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
            dataIndex: 'start_date',
            render: (value, item) => {
              return <>{formatDate(item.start_date)}</>;
            },
          },
          {
            title: 'Fim',
            dataIndex: 'end_date',
            render: (value, item) => {
              return <>{formatDate(item.end_date)}</>;
            },
          },
          {
            title: 'Consumo',
            dataIndex: 'cumulative_volume',
            render: (value, item) => {
              return <>{item.cumulative_volume?.toFixed(2)} m³</>;
            },
          },
        ]}
        dataSource={props.irpdEvents.result}
        rowKey="key"
        pagination={false}
        options={false}
        search={false}
        loading={props.irpdEvents.loading}
        dateFormatter="string"
        toolbar={{
          title: (
            <LightFilter>
              <ProFormDateRangePicker
                disabled={props.irpdEvents.loading}
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
            disabled={props.irpdEvents.loading}
            responsive
            size="small"
            className=""
            showSizeChanger
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={props.irpdEvents.total}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default connect(
  ({ irpdEvents, selectedDevice }: { irpdEvents: any; selectedDevice: any }) => ({
    irpdEvents,
    selectedDevice,
  }),
)(IrpdActivityEventTable);
