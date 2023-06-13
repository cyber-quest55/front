import { GetIrpdHistoryModelProps } from '@/models/irpd-history';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { formatDate } from '@/utils/get-formated-date';
import { DownloadOutlined, RedoOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDateRangePicker, ProTable } from '@ant-design/pro-components';
import { Button, Col, Pagination, PaginationProps, Row, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

type Props = {
  dispatch: any;
  irpdHistory: GetIrpdHistoryModelProps;
  selectedDevice: SelectedDeviceModelProps;
};

const IrpdActivityHistoricTable: React.FC<Props> = (props) => {
  const [range, setRange] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const [current, setCurrent] = useState(0);
  const [pageSize, setPageSize] = useState(props.irpdHistory.total);

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
      type: 'irpdHistory/queryIrpdHistory',
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
            dataIndex: 'created',
            render: (value, item) => {
              return <>{formatDate(item.created)}</>;
            },
          },
          {
            title: 'Origem',
            dataIndex: 'origin',
          },
          {
            title: 'Mensagem',
            dataIndex: 'message',
            render: (value, item) => {
              return <Tag>{item.command}</Tag>;
            },
          },
          {
            title: 'Usuário',
            dataIndex: 'username',
          },
        ]}
        dataSource={props.irpdHistory.result}
        rowKey="key"
        pagination={false}
        options={false}
        search={false}
        loading={props.irpdHistory.loading}
        dateFormatter="string"
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
              <Button loading={props.irpdHistory.loading} onClick={update} icon={<RedoOutlined />}>
                Atualizar
              </Button>
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
