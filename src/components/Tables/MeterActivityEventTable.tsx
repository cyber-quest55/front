import { SelectedDeviceModelProps } from '@/models/selected-device';
import { getMeterSystemTable } from '@/services/metersystem';
import { formatDateTime } from '@/utils/formater/get-formated-date';
import { DownloadOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProTable,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Space, App } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { getMeterExcelReport } from '../../services/metersystem';
import { httpToExcel } from '../../utils/adapters/excel';
import MobileRangePicker from '../Input/RangePicker';

type Props = {
  selectedDevice: SelectedDeviceModelProps;
};

const MeterActivityEventTable: React.FC<Props> = (props) => {
  const intl = useIntl();
  const ref = useRef<ActionType>();
  const { message } = App.useApp();

  const reqGetData = useRequest(getMeterSystemTable, { manual: true });
  const reqGetExcel = useRequest(getMeterExcelReport, { manual: true });

  const [dates, setDates] = useState<any>([dayjs().subtract(1, 'month'), dayjs()]);

  useEffect(() => {
    ref.current?.reload();
  }, [props.selectedDevice, dates])

  const handleExportReport = async () => {
    try {
      const response = await reqGetExcel.runAsync({
        deviceId: props.selectedDevice.deviceId,
        otherId: props.selectedDevice?.otherProps?.imeterSetId
      },
        {
          date_start: dates[0].toISOString(),
          date_end: dates[1].toISOString(),
        }
      )
      httpToExcel(response, `relatório-metersystem-${dates[0].toISOString()}-${dates[1].toISOString()}`)
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

  const handleChangeRange = (e: any) => {
    setDates(e);
  };

  return (
    <Space
      direction="vertical"
      style={{ width: '100%' }}
    >
      <ProTable<any>
        actionRef={ref}
        columns={[
          {
            title: intl.formatMessage({
              id: 'component.meter.report.table.measurements.col.1',
            }),
            dataIndex: 'date',
            render: (_value, item) => {
              return <>{item.date}</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.meter.report.table.measurements.col.2',
            }),
            dataIndex: 'measurement',
            render: (_value, item) => {
              return <>{`${item.measurement} m`}</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.meter.report.table.measurements.col.3',
            }),
            dataIndex: 'offset',
            render: (_value, item) => {
              return <>{item.offset} m</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.meter.report.table.measurements.col.4',
            }),
            dataIndex: 'tankLevel',
            render: (_value, item) => {
              return <>{item.tankLevel} m</>;
            },
          },
          {
            title: intl.formatMessage({
              id: 'component.meter.report.table.measurements.col.5',
            }),
            dataIndex: 'flowRate',
            render: (_value, item) => {
              return <>{item.flowRate} m³/h</>;
            },
          },
        ]}
        request={async (p): Promise<any> => {
          const result = (await reqGetData.runAsync(
            {
              farmId: props.selectedDevice.farmId,
              meterId: props.selectedDevice.deviceId as any,
              otherId: props.selectedDevice.otherProps.imeterSetId,
              params: {},
            },
            {
              page: p.current,
              date_start: dates[0].toISOString(),
              date_end: dates[1].toISOString(),
            },
          )) as any;

          return {
            data: result.results.map((item: any, index: number) => {
              const measurement = item.content.imanage_sensor_measure_value[0];
              return {
                key: `row-key-meter-event-table-${index}`,
                ...item,
                date: formatDateTime(item.created),
                measurement: `${measurement ? measurement.value.toFixed(2) / 100 : (0).toFixed(2)}`,
                offset: `${measurement ? measurement.value.toFixed(2) / 100 : (0).toFixed(2)}`,
                tankLevel: (1).toFixed(2),
                flowRate: item.flow,
              };
            }),
            success: true,
            total: result.count,
            page: result.current_page,
          };
        }}
        rowKey="key"
        options={false}
        search={false}
        dateFormatter="string"
        toolbar={{
          title: (
            <MobileRangePicker
              onConfirm={handleChangeRange}
              selectedDate={dates}
              title=''
            />

          ),
          filter: (
            ExportButton
          ),
        }}
      />
    </Space>
  );
};

const mapStateToProps = ({
  meterSystemEvent,
  selectedDevice
}: any) => ({
  selectedDevice,
  meterSystemEvent
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeterActivityEventTable);

