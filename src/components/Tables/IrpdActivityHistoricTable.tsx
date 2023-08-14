import { useTableHook } from '@/hooks/table';
import { GetIrpdHistoryModelProps } from '@/models/irpd-history';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { PumpHistoryOrigin } from '@/utils/enums';
import { formatDate } from '@/utils/get-formated-date';
import { DownloadOutlined } from '@ant-design/icons';
import {
  LightFilter,
  ProDescriptions,
  ProFormDateRangePicker,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Col, Pagination, PaginationProps, Row, Space, Tag } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';

type Props = {
  dispatch: any;
  irpdHistory: GetIrpdHistoryModelProps;
  selectedDevice: SelectedDeviceModelProps;
};

const IrpdActivityHistoricTable: React.FC<Props> = (props) => {
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

    props.dispatch({
      type: 'irpdHistory/queryIrpdHistory',
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
            dataIndex: 'created',
            render: (value, item) => {
              return <>{formatDate(item.created)}</>;
            },
          },
          {
            title: 'Origem',
            dataIndex: 'origin',
            render: (value, item) => {
              return (
                <>
                  {item.origin === PumpHistoryOrigin.Command ? 'Comando' : 'Atualização da Central'}
                </>
              );
            },
          },
          {
            title: 'Mensagem',
            dataIndex: 'message',
            render: (value, item) => {
              return <Tag>{item.command}</Tag>;
            },
          },
        ]}
        dataSource={props.irpdHistory.result}
        rowKey="key"
        pagination={false}
        options={false}
        search={false}
        loading={props.irpdHistory.loading}
        dateFormatter="string"
        expandable={{
          expandedRowRender: (record) => (
            <ProDescriptions title={formatDate(record.arrived)}>
              {record.username ? (
                <ProDescriptions.Item dataIndex="username" label="Nome" valueType="text">
                  {record.username}
                </ProDescriptions.Item>
              ) : null}

              {record.origin === PumpHistoryOrigin.Command ? (
                <ProDescriptions.Item
                  dataIndex="total_flow"
                  label="Consumo estimado"
                  valueType="text"
                >
                  {record.total_flow?.toFixed(2)}m³
                </ProDescriptions.Item>
              ) : null}
              {record.content?.pump_hourmeter ? (
                <ProDescriptions.Item dataIndex="pump_hourmeter" label="Horimetro" valueType="text">
                  {record.content?.pump_hourmeter.hours}h {record.content?.pump_hourmeter.minutes}m
                </ProDescriptions.Item>
              ) : null}
              {record.origin === PumpHistoryOrigin.Command ? (
                <ProDescriptions.Item dataIndex="pressure" label="Pressão" valueType="text">
                  {record.pressure?.toFixed(2)}
                </ProDescriptions.Item>
              ) : null}
            </ProDescriptions>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        toolbar={{
          title: (
            <LightFilter>
              <ProFormDateRangePicker
                disabled={props.irpdHistory.loading}
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
            disabled={props.irpdHistory.loading}
            responsive
            size="small"
            className=""
            showSizeChanger
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={props.irpdHistory.total}
          />
        </Col>
      </Row>
    </Space>
  );
};

export default connect(
  ({ irpdHistory, selectedDevice }: { irpdHistory: any; selectedDevice: any }) => ({
    irpdHistory,
    selectedDevice,
  }),
)(IrpdActivityHistoricTable);
