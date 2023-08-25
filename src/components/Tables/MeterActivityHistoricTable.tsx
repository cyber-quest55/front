import { useTableHook } from '@/hooks/table';
import { GetMeterSystemHistoryModelProps, queryMeterSystemHistory } from '@/models/meter-history';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { formatDate } from '@/utils/get-formated-date';
import { DownloadOutlined, RedoOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDateRangePicker, ProTable } from '@ant-design/pro-components';
import { Button, Col, Pagination, PaginationProps, Row, Space, Tag } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';

type Props = {
  dispatch: any;
  meterSystemHistory: GetMeterSystemHistoryModelProps;
  selectedDevice: SelectedDeviceModelProps;
  queryMeterSystemHistory: typeof queryMeterSystemHistory;
};

const MeterActivityHistoricTable: React.FC<Props> = (props) => {
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

    props.queryMeterSystemHistory({
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
            dataIndex: 'created',
            render: (value, item) => {
              return <>{formatDate(item.created)}</>;
            },
          },
          {
            title: 'Origem',
            dataIndex: 'origin',
            render: (value, item) => {
              return <>{item.origin}</>;
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
        dataSource={props.meterSystemHistory.result}
        rowKey="key"
        pagination={false}
        options={false}
        search={false}
        loading={props.meterSystemHistory.loading}
        dateFormatter="string"
        toolbar={{
          title: (
            <LightFilter>
              <ProFormDateRangePicker
                disabled={props.meterSystemHistory.loading}
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
              <Button
                loading={props.meterSystemHistory.loading}
                onClick={update}
                icon={<RedoOutlined />}
              >
                Atualizar
              </Button>
            </Space>
          ),
        }}
      />
      <Row justify="end">
        <Col>
          <Pagination
            disabled={props.meterSystemHistory.loading}
            responsive
            size="small"
            className=""
            showSizeChanger
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={props.meterSystemHistory.total}
          />
        </Col>
      </Row>
    </Space>
  );
};

const mapStateToProps = ({ meterSystemHistory, selectedDevice }: any) => ({
  meterSystemHistory,
  selectedDevice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryMeterSystemHistory: (props: any) => dispatch(queryMeterSystemHistory(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeterActivityHistoricTable);
