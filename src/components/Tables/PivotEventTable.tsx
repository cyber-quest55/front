import { GetPivotHistoryModelProps } from '@/models/pivot-history';
import { SelectedDeviceModelProps } from '@/models/selected-device';
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
import { Button, Space, App, Pagination,  Flex, Badge } from 'antd';
import dayjs from 'dayjs';
import { useRef, useEffect, useState } from 'react';
import { connect } from 'umi';
import { getPivotExcelReport } from '../../services/pivot';
import { httpToExcel } from '../../utils/adapters/excel';
import { useTableHook } from '@/hooks/table';
import { queryPivotHistory } from '../../models/pivot-history';

type Props = {
  pivotHistory: GetPivotHistoryModelProps;
  selectedDevice: SelectedDeviceModelProps;
  queryPivotHistory: typeof queryPivotHistory;
};

const PivotEventTable: React.FC<Props> = (props) => {
  const reqGetExcel = useRequest(getPivotExcelReport, { manual: true });

  const intl = useIntl();
  const { message } = App.useApp();
  const [dates, setDates] = useState<any>([dayjs().subtract(14, 'day'), dayjs()]);
  const { currentPage, setCurrentPage } = useTableHook(1);

  useEffect(() => {
    if(!props.pivotHistory?.loading){
      const { deviceId, farmId } = props.selectedDevice

      props.queryPivotHistory({
        path: { deviceId, farmId },
        params: {
          gps: true,
          central: true,
          date_start: dates[0].toISOString(),
          date_end: dates[1].toISOString(),
          page: currentPage
        }
      })
    }
  }, [ currentPage, dates ])


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
                disabled={props.pivotHistory?.loading}
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
                    };
                  },
                  allowClear: false,
                  value: dates,
                }}
              />
            </LightFilter>
          ),
          filter: (
            <Button
            loading={reqGetExcel.loading || props.pivotHistory?.loading}
            onClick={handleExportReport}
            icon={<DownloadOutlined />}>
              {intl.formatMessage({
                id: 'component.export',
              })}
            </Button>
          ),
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

              return entity.badge? <Space>
                  <Badge  status={entity.badgeStatus} text={entity.customType}/>
                </Space> : entity.customType
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.pivot.tab.history.event.table.col.3',
            }),
            dataIndex: 'customStatus',
          },
        ]}
        dataSource= {props.pivotHistory?.result?.data}
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
        loading={props.pivotHistory?.loading}
        actionRef={ref}
        pagination={ false }
      />

      <Flex justify="flex-end">
      <Pagination
          disabled={props.pivotHistory?.loading}
          responsive
          size="small"
          onChange={(v) => {setCurrentPage(v)}}
          current={currentPage}
          showTotal={() => false}
          showSizeChanger={false}
          total={props.pivotHistory?.result?.count}
        />
         </Flex>

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryPivotHistory: (props: any) => dispatch(queryPivotHistory(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PivotEventTable);
