import { GetIrpdEventsModelProps, queryIrpdEvents } from '@/models/irpd-events';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { getIrpdEvents, getIrpdExcelReport } from '@/services/irpd';
import { formatDate } from '@/utils/formater/get-formated-date';
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
import { Button, App } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { connect } from 'umi';
import { httpToExcel } from '../../utils/adapters/excel';

type Props = {
  irpdEvents: GetIrpdEventsModelProps;
  selectedDevice: SelectedDeviceModelProps;
  queryIrpdEvents: typeof queryIrpdEvents;
};

const IrpdActivityEventTable: React.FC<Props> = (props) => {
  const intl = useIntl();
  const ref = useRef<ActionType>();
  const { message } = App.useApp();

  const reqData = useRequest(getIrpdEvents, { manual: true });
  const reqGetExcel = useRequest(getIrpdExcelReport, { manual: true });

  const [dates, setDates] = useState<any>([dayjs(), dayjs()]);

  const handleExportReport = async  () => { 
    try {
      const response = await reqGetExcel.runAsync({deviceId: props.selectedDevice.deviceId},
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

  const ExportButton = <Button loading={reqGetExcel.loading} onClick={handleExportReport} icon={<DownloadOutlined />}>
    {intl.formatMessage({
      id: 'component.export',
    })}
  </Button>

  return (
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
      rowKey="key"
      options={false}
      search={false}
      dateFormatter="string"
      actionRef={ref}
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
          ExportButton
        ),
      }}
      request={async (p): Promise<any> => {
        const result: API.GetPivotHistoryOperationResponse = (await reqData.runAsync(
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

        return {
          data: result.results.map((item, index) => ({
            ...item,
            key: `irpd_history_operation_${index}`,
          })),
          success: true,
          total: result.count,
          page: result.current_page,
        };
      }}
    />
  );
};

const mapStateToProps = ({ irpdEvents, selectedDevice }: any) => ({
  irpdEvents,
  selectedDevice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryIrpdEvents: (props: any) => dispatch(queryIrpdEvents(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IrpdActivityEventTable);
