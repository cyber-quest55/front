import { GetIrpdHistoryModelProps, queryIrpdHistory } from '@/models/irpd-history';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { getIrpdHistory } from '@/services/irpd';
import { PumpHistoryOrigin } from '@/utils/enum/pump-history-origin';
import { formatDate } from '@/utils/formater/get-formated-date';
import { getIrpdCommand } from '@/utils/formater/get-irpd-command';
import { getIrpdOrigin } from '@/utils/formater/get-irpd-origin';
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
import { useRequest } from 'ahooks';
import { Button, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { connect } from 'umi';

type Props = {
  dispatch: any;
  irpdHistory: GetIrpdHistoryModelProps;
  selectedDevice: SelectedDeviceModelProps;
  queryIrpdHistory: typeof queryIrpdHistory;
};

const IrpdActivityHistoricTable: React.FC<Props> = (props) => {
  const intl = useIntl();
  const ref = useRef<ActionType>();
  const [dates, setDates] = useState<any>([dayjs(), dayjs()]);
  const reqData = useRequest(getIrpdHistory, { manual: true });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <ProTable<any>
        columns={[
          {
            title: intl.formatMessage({
              id: 'component.irpd.report.table.events.col.1',
            }),
            dataIndex: 'created',
            render: (value, item) => {
              return <>{formatDate(item?.created)}</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.irpd.report.table.events.col.2',
            }),
            dataIndex: 'origin',
            render: (value, item) => {
              return <>{item.origin}</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.irpd.report.table.events.col.3',
            }),
            dataIndex: 'message',
            render: (value, item) => {
              return <Tag>{item.command}</Tag>;
            },
          },
        ]}
        rowKey="key"
        options={false}
        search={false}
        loading={reqData.loading}
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
        actionRef={ref}
        request={async (p): Promise<any> => {
          const result: API.GetIrpdHistoryResponse = (await reqData.runAsync(
            {
              irpdId: props.selectedDevice.deviceId as any,
              farmId: props.selectedDevice.farmId as any,
            },
            {
              page: p.current,
              date_start: dates[0].toISOString(),
              date_end: dates[1].toISOString(),
            },
            
          )) as any;

          const newResults = result.results.map((item, index: number) => {
            
            if (item?.irpd_action_v5) {
              return {
                ...item.irpd_action_v5,
                key: `row-key-table-${index}`,
                origin: getIrpdOrigin(PumpHistoryOrigin.CentralUpdate),
                command: getIrpdCommand(item.irpd_action_v5?.content?.pump_action?.enable as number),
              };
            }
            if (item?.irpd_stream_v5) {
              return {
                ...item.irpd_stream_v5,
                key: `row-key-table-${index}`,
                origin: getIrpdOrigin(PumpHistoryOrigin.Command),
                command: getIrpdCommand(item.irpd_stream_v5?.content?.pump_action?.enable as number),
              };
            }
            return {};
          })

          return {
            data: newResults,
            success: true,
            total: result.count,
            page: result.current_page,
          };
        }}
        toolbar={{
          title: (
            <LightFilter>
              <ProFormDateRangePicker
                disabled={reqData.loading}
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
            <Space>
              <Button icon={<DownloadOutlined />}>
                {intl.formatMessage({
                  id: 'component.export',
                })}
              </Button>
            </Space>
          ),
        }}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(IrpdActivityHistoricTable);
