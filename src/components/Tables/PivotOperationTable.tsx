import { GetPivotHistoryModelProps } from '@/models/pivot-history';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { getPivotListGpsStream, getPivotListOperation, getPivotExcelReport } from '@/services/pivot';
import { getPivotDirection } from '@/utils/formater/get-pivot-direction';
import { getPivotStatus } from '@/utils/formater/get-pivot-status';
import { rangePresets } from '@/utils/presets/RangePicker';

import { DownloadOutlined } from '@ant-design/icons';
import {
  ActionType,
  LightFilter,
  ProFormDateRangePicker,
  ProTable,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { connect } from 'umi';
import { httpToExcel } from '../../utils/adapters/excel';

type Props = {
  pivotHistory: GetPivotHistoryModelProps;
  selectedDevice: SelectedDeviceModelProps;
};

const PivotOperationTable: React.FC<Props> = (props) => {
  const reqGetData = useRequest(getPivotListOperation, { manual: true });
  const reqGetGPSData = useRequest(getPivotListGpsStream, { manual: true });
  const reqGetExcel = useRequest(getPivotExcelReport, { manual: true });

  const [dates, setDates] = useState<any>([dayjs(), dayjs()]);
  const intl = useIntl();
  const { modal, message } = App.useApp();

  const ref = useRef<ActionType>();

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
        
              <Button loading={reqGetExcel.loading} onClick={handleExportReport} icon={<DownloadOutlined />}>
                {intl.formatMessage({
                  id: 'component.export',
                })}
              </Button>
            
          ),
        }}
        request={async (p): Promise<any> => {
          const result: API.GetPivotHistoryOperationResponse = (await reqGetData.runAsync(
            {
              pivotId: props.selectedDevice.deviceId as any,
            },
            {
              page: p.current,
              date_start: dates[0].toISOString(),
              date_end: dates[1].toISOString(),
            },
          )) as any;

          return {
            data: result.results.map((item, index) => ({
              ...item,
              key: `history_operation_${index}`,
            })),
            success: true,
            total: result.count,
            page: result.current_page,
          };
        }}
        columns={[
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.operations.table.col.1',
            }),
            dataIndex: 'start_date',

            render: (value, item) => {
              if (item) return <>{dayjs(item.update).format('DD/MM/YYYY')}</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.operations.table.col.2',
            }),
            dataIndex: 'end_date',

            render: (value, item) => {
              if (item) return <>{dayjs(item.update).format('DD/MM/YYYY')}</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.operations.table.col.3',
            }),
            dataIndex: 'hour_p',
            render: (value: any) => {
              return <>{value.toFixed(2)}h</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.operations.table.col.4',
            }),
            dataIndex: 'hour_total',
            render: (value: any) => {
              return <>{value.toFixed(2)}h</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.operations.table.col.5',
            }),
            dataIndex: 'water_blade',
            render: (value: any) => {
              return <>{value.toFixed(2)}mm</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.operations.table.col.6',
            }),
            dataIndex: 'irrigation_mode',
            valueEnum: {
              1: intl.formatMessage({
                id: 'component.pivot.tab.history.operations.table.col.6.value.1',
              }),
              2: intl.formatMessage({
                id: 'component.pivot.tab.history.operations.table.col.6.value.2',
              }),
            },
          },
        ]}
        rowKey="key"
        options={false}
        search={false}
        dateFormatter="string"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              modal.info({
                title: 'GPS Information List',
                closable: true,
                width: '90vw',
                footer: null,
                content: (
                  <ProTable<APIModels.PivotListGpsStream>
                    ghost
                    request={async (p, sort, filter): Promise<any> => {
                      const result: API.GetPivotHistoryOperationResponse =
                        (await reqGetGPSData.runAsync(
                          {
                            pivotId: props.selectedDevice.deviceId as any,
                          },
                          {
                            date_start: record.start_date,
                            date_end:record.end_date ,
                            page: p.current,
                          },
                        )) as any;

                      return {
                        data: result.results.map((item, index) => ({
                          ...item,
                          key: `gps_stream_${index}`,
                        })),
                        success: true,
                        total: result.count,
                        page: result.current_page,
                      };
                    }}
                    columns={[
                      {
                        title: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations.table.latest.table.col.1',
                        }),
                        dataIndex: 'created',

                        render: (_, item) => {
                          if (item) return <>{dayjs(item.created).format('DD/MM/YYYY HH:MM:ss')}</>;
                        },
                      },
                      {
                        title: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations.table.latest.table.col.2',
                        }),
                        render: (_, item) => {
                          return <>{item?.content?.current_angle?.current_angle.toFixed(1)}°</>;
                        },
                      },
                      {
                        title: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations.table.latest.table.col.3',
                        }),
                        render: (_, item) => {
                          const position = `${item?.content?.latitude_longitude_gps?.latitude_gps},${item?.content?.latitude_longitude_gps?.longitude_gps}`;
                          return (
                            <Typography.Link
                              href={`https://www.google.com/maps?t=k&q=${position}`}
                              target="_blank"
                            >
                              {position}
                            </Typography.Link>
                          );
                        },
                      },
                      {
                        title: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations.table.latest.table.col.4',
                        }),

                        render: (_, item) => {
                          return getPivotDirection(
                            item?.content?.current_irrigation_information?.direction,
                          );
                        },
                      },
                      {
                        title: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations.table.latest.table.col.5',
                        }),
                      },
                      {
                        title: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations.table.latest.table.col.6',
                        }),
                        render: (_, item) => {
                          return getPivotStatus(
                            item?.content?.irrigation_status?.irrigation_status,
                          );
                        },
                      },
                      {
                        title: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations.table.latest.table.col.7',
                        }),
                        render: (_, item) => {
                          return `${item?.content?.end_tower_pressure?.end_tower_pressure.toFixed(2)} bar` ;
                        },
                      },
                      {
                        title: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations.table.latest.table.col.8',
                        }),
                        render: (_, item) => {
                          return `${item?.content?.operation_time.total_hour}h ${item?.content?.operation_time.total_minute}min`;
                        },
                      },
                    ]}
                    rowKey="key"
                    options={false}
                    search={false}
                    dateFormatter="string"
                  />
                ),
              });
            },
          };
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

export default connect(mapStateToProps, mapDispatchToProps)(PivotOperationTable);
