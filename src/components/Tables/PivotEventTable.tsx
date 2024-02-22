import { GetPivotHistoryModelProps } from '@/models/pivot-history';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { getPivotHistory } from '@/services/pivot';
import {
  getPivotEventCentralStatus,
  getPivotEventUpdateStatus,
} from '@/utils/formater/get-pivot-event-status';
import { rangePresets } from '@/utils/presets/RangePicker';
import { getPivotStatus } from '@/utils/formater/get-pivot-status';
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
import { Button, Space, App } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { connect } from 'umi';
import { getPivotExcelReport } from '../../services/pivot';
import { httpToExcel } from '../../utils/adapters/excel';

type Props = {
  pivotHistory: GetPivotHistoryModelProps;
  selectedDevice: SelectedDeviceModelProps;
};

const PivotEventTable: React.FC<Props> = (props) => {
  const reqGetData = useRequest(getPivotHistory, { manual: true });
  const reqGetExcel = useRequest(getPivotExcelReport, { manual: true });

  const [dates, setDates] = useState<any>([dayjs(), dayjs()]);
  
  const intl = useIntl();
  const { message } = App.useApp();

  const handleExportReport = async  () => { 
    try {
      const response = await reqGetExcel.runAsync({pivotId: props.selectedDevice.deviceId},
        {
          date_start: dates[0].toISOString(),
          date_end: dates[1].toISOString(),
          kwh_value_p : 1,
          kwh_value_hfp: 1, 
          kwh_value_r: 1
        }
      )
      httpToExcel(response, `relatório-pivo-${dates[0].toISOString()}-${dates[1].toISOString()}`)
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

  const ref = useRef<ActionType>();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <ProTable<any>
        toolbar={{
          title: (
            <LightFilter>
              <ProFormDateRangePicker
                disabled={props.pivotHistory.loading}
                name="startdate"
                label={intl.formatMessage({
                  id: 'component.pivot.tab.history.rangepicker.label',
                })}
                
                fieldProps={{
                  presets: rangePresets,

                  onChange: (v) => {
                    if (v && v[0] && v[1]) {
                      setDates(v)
                      ref.current?.reload()
                    };
                  },
                  allowClear: false,
                  value: dates,
                }}
              />
            </LightFilter>
          ),
          filter: (
            <Button loading={reqGetExcel.loading} onClick={handleExportReport} icon={<DownloadOutlined />}>
              {intl.formatMessage({
                id: 'component.export',
              })}
            </Button>
          ),
        }}
        request={async (p, sort, filter): Promise<any> => {
          const result: API.GetPivotHistoryResponse = (await reqGetData.runAsync(
            {
              farmId: props.selectedDevice.farmId as any,
              pivotId: props.selectedDevice.deviceId as any,
            },
            {
              gps: true,
              central: true,
              page: p.current,
              date_start: dates[0].toISOString(),
              date_end: dates[1].toISOString(),
            },
          )) as any;

          const mapped = result.results.map((item, key) => {
            if (item.CentralStream !== undefined) {
              return {
                ...item.CentralStream,
                customType: intl.formatMessage({
                  id: 'component.pivot.tab.history.event.table.col.2.value.1',
                }),
                customStatus: getPivotEventCentralStatus(item.CentralStream.status),
                key,
              };
            }
            if (item.ControllerStream_panel !== undefined) {
              const content = item?.ControllerStream_panel?.content;
              return {
                ...item.ControllerStream_panel,
                customType: intl.formatMessage({
                  id: 'component.pivot.tab.history.event.table.col.2.value.2',
                }),
                customStatus: getPivotEventUpdateStatus(
                  content?.irrigation_status?.irrigation_status,
                  content?.current_irrigation_information?.direction,
                  content?.current_irrigation_information?.mode,
                  content?.current_irrigation_information?.irrigation_percent,
                ),
                key,
              };
            }
            if (item.ControllerStream_gps !== undefined) {
              const content = item?.ControllerStream_gps?.content;
              return {
                ...item.ControllerStream_gps,
                customType: intl.formatMessage({
                  id: 'component.pivot.tab.history.event.table.col.2.value.3',
                }),
                customStatus: `${content?.current_angle?.current_angle}° 
                | ${content?.current_irrigation_information?.irrigation_percent}% 
                | ${content?.center_pressure?.center_pressure} bar 
                | ${content?.voltage_measure?.voltage_measure} V`,
                key,
              };
            }
            if (item.ControllerAction_schedule !== undefined) {
              return {
                ...item.ControllerAction_schedule,
                customType: intl.formatMessage({
                  id: 'component.pivot.tab.history.event.table.col.2.value.5',
                }),
                key,
              };
            }
            if (item.ControllerAction_stop !== undefined) {
              return {
                ...item.ControllerAction_stop,
                customType: intl.formatMessage({
                  id: 'component.pivot.tab.history.event.table.col.2.value.4',
                }),
                customStatus: intl.formatMessage({
                  id: 'component.pivot.tab.history.event.table.col.3.value.1',
                }),
                key,
              };
            }
            const content = item?.ControllerAction_simple?.content;

            return {
              ...item.ControllerAction_simple,
              customType: intl.formatMessage({
                id: 'component.pivot.tab.history.event.table.col.2.value.4',
              }),
              customStatus: getPivotStatus(content?.irrigation_status?.irrigation_status as number),
              key,
            };
          });

          return {
            data: mapped,
            success: true,
            total: result.count,
            page: result.current_page,
          };
        }}
        columns={[
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.event.table.col.1',
            }),
            dataIndex: 'date',

            render: (value, item) => {
              if (item) return <>{dayjs(item.update).format('DD/MM/YYYY')}</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.event.table.col.2',
            }),
            dataIndex: 'customType',
            responsive: ['lg'],
            render: (item, entity) => {
              return entity.customType;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.event.table.col.3',
            }),
            dataIndex: 'customStatus',
          },
        ]}
        rowKey="key"
        options={false}
        search={false}
        dateFormatter="string"
        expandable={{
          expandedRowRender: (record) => {
            return (
              <ProDescriptions
                column={2}
                title={intl.formatMessage({
                  id: 'component.pivot.tab.history.event.description',
                })}
                dataSource={record}
              >
                {record.created ? (
                  <ProDescriptions.Item
                    hide
                    label={intl.formatMessage({
                      id: 'component.pivot.tab.history.event.description.label.created',
                    })}
                    dataIndex={['created']}
                    fieldProps={{
                      format: 'DD/MM/YYYY HH:mm',
                    }}
                    valueType={'dateTime'}
                  />
                ) : null}

                {record.updated ? (
                  <ProDescriptions.Item
                    hide
                    label={intl.formatMessage({
                      id: 'component.pivot.tab.history.event.description.label.updated',
                    })}
                    dataIndex={['updated']}
                    fieldProps={{
                      format: 'DD/MM/YYYY HH:mm',
                    }}
                    valueType={'dateTime'}
                  />
                ) : null}

                {record.arrived ? (
                  <ProDescriptions.Item
                    hide
                    label={intl.formatMessage({
                      id: 'component.pivot.tab.history.event.description.label.arrived',
                    })}
                    dataIndex={['arrived']}
                    fieldProps={{
                      format: 'DD/MM/YYYY HH:mm',
                    }}
                    valueType={'dateTime'}
                  />
                ) : null}

                {record.current_angle && record.current_angle >= 0 ? (
                  <ProDescriptions.Item
                    hide
                    label={intl.formatMessage({
                      id: 'component.pivot.tab.history.event.description.label.currentangle',
                    })}
                  >
                    {record.current_angle}°
                  </ProDescriptions.Item>
                ) : null}

                {record?.content?.center_pressure?.center_pressure ? (
                  <ProDescriptions.Item
                    hide
                    label={intl.formatMessage({
                      id: 'component.pivot.tab.history.event.description.label.pressure',
                    })}
                    dataIndex={['content', 'center_pressure', 'center_pressure']}
                  />
                ) : null}

                {record?.content?.latitude_longitude_gps?.latitude_gps ? (
                  <ProDescriptions.Item
                    hide
                    label={intl.formatMessage({
                      id: 'component.pivot.tab.history.event.description.label.location',
                    })}
                    dataIndex={['content', 'latitude_longitude_gps', 'latitude_longitude_gps']}
                  >
                    {record?.content?.latitude_longitude_gps?.latitude_gps},
                    {record?.content?.latitude_longitude_gps?.longitude_gps}
                  </ProDescriptions.Item>
                ) : null}

                {record.username ? (
                  <ProDescriptions.Item
                    hide
                    label={intl.formatMessage({
                      id: 'component.pivot.tab.history.event.description.label.user',
                    })}
                    dataIndex={['username']}
                  />
                ) : null}
              </ProDescriptions>
            );
          },
        }}
        actionRef={ref}
      />
    </Space>
  );
};

const mapStateToProps = ({
  pivotHistory,
  selectedDevice,
}: {
  pivotHistory: any;
  selectedDevice: any;
}) => ({
  pivotHistory,
  selectedDevice,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PivotEventTable);
