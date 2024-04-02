import MobileRangePicker from '@/components/Input/RangePicker';
import { Line } from '@ant-design/charts';
import { StatisticCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Empty } from 'antd';
import { Dayjs } from 'dayjs';
import * as React from 'react';

interface IPressureComparativeComponentProps {
  values: { angle: number; value: number; name: string }[];
  dateRange: [Dayjs, Dayjs],
  setDateRange: any;
}

const PressureComparativeComponent: React.FunctionComponent<IPressureComparativeComponentProps> = (
  props,
) => {
  const intl = useIntl();

 
  const handleChangeRange = (e: any) => {
    props.setDateRange(e);
  };

  return (
    <StatisticCard
      extra={
        <MobileRangePicker
          onConfirm={handleChangeRange}
          selectedDate={props.dateRange}
          title=''
        />
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
