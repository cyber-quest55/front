import { Line } from '@ant-design/charts';
import { LightFilter, ProFormDateTimeRangePicker, StatisticCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Empty } from 'antd';
import { TimeRangePickerProps } from 'antd/lib';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

interface IPressureComparativeComponentProps {
  values: { angle: number; value: number; name: string }[];
  dateRange: Dayjs[],
  setDateRange: any;
}

const PressureComparativeComponent: React.FunctionComponent<IPressureComparativeComponentProps> = (
  props,
) => {
  const intl = useIntl();

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ];

  const handleChangeRange = (e: any) => {
    props.setDateRange(e);
  };

  return (
    <StatisticCard
      extra={
        <LightFilter>
          <ProFormDateTimeRangePicker
            initialValue={props.dateRange}
            formItemProps={{ noStyle: true, style: { } }}
            fieldProps={{
              value: props.dateRange as any,
              presets: rangePresets, 
              onChange: handleChangeRange,
              allowClear: false,
              defaultValue:  props.dateRange as any
            }}
          />
        </LightFilter>
      }
      style={{ marginTop: 16 }}
      title={intl.formatMessage({
        id: 'component.pivot.pressure.label.1',
      })}
      chart={
        props.values.length > 0 ? (
          <Line
            tooltip={{
              title: intl.formatMessage({
                id: 'component.pivot.pressure.chart.tooltip.label.5',
              }),
              formatter: (datum) => {
                return {
                  name: datum.name,
                  value: `${parseFloat(datum.value).toFixed(2)} bar`,
                };
              },
            }}
            data={props.values}
            xField="angle"
            height={320}
            yField="value"
            seriesField="name"
            yAxis={{
              label: {
                formatter: (v) => `${parseFloat(v).toFixed(1)} bar`,
              },
            }}
            legend={false}
            smooth={true}
            // @TODO 后续会换一种动画方式
            animation={{
              appear: {
                animation: 'path-in',
                duration: 5000,
              },
            }}
          />
        ) : (
          <Empty style={{ height: 315, paddingTop: '100px' }} />
        )
      }
      colSpan={{ xs: 24, md: 24 }}
    />
  );
};

export default PressureComparativeComponent;
