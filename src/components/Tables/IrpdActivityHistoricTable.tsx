import { GetIrpdHistoryModelProps, queryIrpdHistory } from '@/models/irpd-history';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { PumpHistoryOrigin } from '@/utils/enum/pump-history-origin';
import { formatDate } from '@/utils/formater/get-formated-date';
import { rangePresets } from '@/utils/presets/RangePicker';
import { DownloadOutlined } from '@ant-design/icons';
import {
  ActionType,
  LightFilter,
  ProDescriptions,
  ProFormDateRangePicker,
  ProTable,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useMount, useRequest } from 'ahooks';
import {
  Badge,
  Button,
  Flex,
  Pagination,
  Space,
  Tag,
  App
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { useTableHook } from '@/hooks/table';
import { getIrpdExcelReport } from '../../services/irpd';
import { httpToExcel } from '../../utils/adapters/excel';

type Props = {
  irpdHistory: GetIrpdHistoryModelProps;
  selectedDevice: SelectedDeviceModelProps;
  queryIrpdHistory: typeof queryIrpdHistory;
};

const IrpdActivityHistoricTable: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { message } = App.useApp();
  const ref = useRef<ActionType>();

  const [dates, setDates] = useState<any>([dayjs().subtract(14, 'day'), dayjs()]);
  const reqGetExcel = useRequest(getIrpdExcelReport, { manual: true });
  const { currentPage, setCurrentPage } = useTableHook(1);

  const handleExportReport = async () => {
    try {
      const response = await reqGetExcel.runAsync({ deviceId: props.selectedDevice.deviceId },
        {
          date_start: dates[0].toISOString(),
          date_end: dates[1].toISOString(),
        }
      )
      httpToExcel(response, `relatório-irpd-${dates[0].toISOString()}-${dates[1].toISOString()}`)
      message.success({
        duration: 7,
        content: intl.formatMessage({
          id: 'component.pivot.download.report.success',
        })
      });
    } catch (error) {
      message.error(intl.formatMessage({
        id: 'component.pivot.download.report.fail',
      }));
    }
  }

  // Query irpd history on filter change
  useEffect(() => {
    if (!props.irpdHistory.loading) {
      const { deviceId, farmId } = props.selectedDevice;
      props.queryIrpdHistory({
        path: { farmId, irpdId: deviceId },
        params: {
          central: true,
          periodic: true,
          date_start: dates[0].toISOString(),
          date_end: dates[1].toISOString(),
          page: currentPage,
        },
      });
    }
  }, [currentPage, dates]);

  // First loading irpd history
  useMount(() => {
    const { deviceId, farmId } = props.selectedDevice;
    props.queryIrpdHistory({
      path: { farmId, irpdId: deviceId },
      params: {
        central: true,
        periodic: true,
        date_start: dates[0].toISOString(),
        date_end: dates[1].toISOString(),
        page: currentPage,
      },
    });
  });

  const ExportButton = (
    <Button
      loading={reqGetExcel.loading}
      onClick={handleExportReport}
      icon={<DownloadOutlined />}
    >
      {intl.formatMessage({
        id: 'component.export',
      })}
    </Button>
  );

  return (
    <Space
      direction="vertical"
      style={{ width: '100%' }}
    >
      <ProTable<any>
        rowKey="key"
        options={false}
        search={false}
        loading={props.irpdHistory.loading}
        dataSource={props.irpdHistory.result}
        dateFormatter="string"
        actionRef={ref}
        pagination={false}
        toolbar={{
          title: (
            <LightFilter>
              <ProFormDateRangePicker
                disabled={props.irpdHistory.loading}
                name="startdate"
                label={intl.formatMessage({
                  id: 'component.pivot.tab.history.rangepicker.label',
                })}
                fieldProps={{
                  presets: rangePresets,
                  onChange: (v) => {
                    if (v && v[0] && v[1]) {
                      setDates(v);
                      ref.current?.reload();
                    }
                  },

                  value: dates,
                }}
              />
            </LightFilter>
          ),
          filter: (
            ExportButton
          ),
        }}
        columns={[
          {
            title: intl.formatMessage({
              id: 'component.irpd.report.table.events.col.1',
            }),
            dataIndex: 'created',
            render: (value, item) => {
              return item.created ? (
                <>{formatDate(item?.created)}</>
              ) : <></>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.irpd.report.table.events.col.2',
            }),
            dataIndex: 'customType',
            render: (item, entity) => {
              return entity.badge ? (
                <Space>
                  <Badge
                    status={entity.badgeStatus}
                    text={entity.customType}
                  />
                </Space>
              ) : entity.customType
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.irpd.report.table.events.col.3',
            }),
            dataIndex: 'customStatus',
            render: (item, entity) => (
              <Tag>{entity.customStatus}</Tag>
            )
          },
        ]}
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
                  label={intl.formatMessage({
                    id: 'component.irpd.report.consumption.label',
                  })}
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
          rowExpandable: (record) => record.origin !== PumpHistoryOrigin.CentralUpdate,
        }}
      />
      <Flex justify="flex-end">
        <Pagination
          disabled={props.irpdHistory?.loading}
          responsive
          size="small"
          onChange={(v) => { setCurrentPage(v) }}
          current={currentPage}
          showTotal={() => false}
          showSizeChanger={false}
          total={props.irpdHistory.total}
        />
      </Flex>
    </Space>
  );
};

const mapStateToProps = ({ irpdHistory, selectedDevice }: any) => ({
  irpdHistory,
  selectedDevice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryIrpdHistory: (props: any) => dispatch(queryIrpdHistory(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IrpdActivityHistoricTable);
