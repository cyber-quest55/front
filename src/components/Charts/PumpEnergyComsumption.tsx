import { GetIrpdWaterModelProps } from '@/models/irpd-water-consumption';
import { rangePresets } from '@/utils/presets/RangePicker';
import { Column, G2 } from '@ant-design/charts';
import {
  LightFilter,
  ProFormDateRangePicker,
  ProFormSegmented,
  StatisticCard,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { connect } from 'dva';
import { useState } from 'react';

type Props = {
  irpdWaterConsumption: GetIrpdWaterModelProps;
  dispatch: any;
};

const waterConsuption = [
  { year: '2013', type: 'Horas em pico', value: 92.1 },
  { year: '2013', type: 'Horas em fora de pico', value: 145.1 },
  { year: '2013', type: 'Horas em reduzido', value: 110.6 },
  { year: '2014', type: 'Horas em pico', value: 91.8 },
  { year: '2014', type: 'Horas em fora de pico', value: 140.9 },
  { year: '2014', type: 'Horas em reduzido', value: 99.0 },
  { year: '2015', type: 'Horas em pico', value: 87.1 },
  { year: '2015', type: 'Horas em fora de pico', value: 139.4 },
  { year: '2015', type: 'Horas em reduzido', value: 103.9 },
  { year: '2016', type: 'Horas em pico', value: 80.0 },
  { year: '2016', type: 'Horas em fora de pico', value: 134.8 },
  { year: '2016', type: 'Horas em reduzido', value: 100.0 },
];

const waterConsumption2 = {
  message: 'SUCCESS',
  data: [
    {
      from: '2024-01-01',
      to: '2024-01-02',
      value: 180,
      type: 1,
    },
    {
      from: '2024-01-01',
      to: '2024-01-02',
      value: 181,
      type: 2,
    },
    {
      from: '2024-01-01',
      to: '2024-01-02',
      value: 182,
      type: 3,
    },
    {
      from: '2024-01-02',
      to: '2024-01-03',
      value: 183,
      type: 1,
    },
    {
      from: '2024-01-02',
      to: '2024-01-03',
      value: 184,
      type: 2,
    },
    {
      from: '2024-01-02',
      to: '2024-01-03',
      value: 185,
      type: 3,
    },
    {
      from: '2024-01-03',
      to: '2024-01-04',
      value: 186,
      type: 1,
    },
    {
      from: '2024-01-03',
      to: '2024-01-04',
      value: 187,
      type: 2,
    },
    {
      from: '2024-01-03',
      to: '2024-01-04',
      value: 188,
      type: 3,
    },
    {
      from: '2024-01-04',
      to: '2024-01-05',
      value: 189,
      type: 1,
    },
    {
      from: '2024-01-04',
      to: '2024-01-05',
      value: 190,
      type: 2,
    },
    {
      from: '2024-01-04',
      to: '2024-01-05',
      value: 191,
      type: 3,
    },
    {
      from: '2024-01-05',
      to: '2024-01-06',
      value: 192,
      type: 1,
    },
    {
      from: '2024-01-05',
      to: '2024-01-06',
      value: 193,
      type: 2,
    },
    {
      from: '2024-01-05',
      to: '2024-01-06',
      value: 194,
      type: 3,
    },
    {
      from: '2024-01-06',
      to: '2024-01-07',
      value: 195,
      type: 1,
    },
    {
      from: '2024-01-06',
      to: '2024-01-07',
      value: 196,
      type: 2,
    },
    {
      from: '2024-01-06',
      to: '2024-01-07',
      value: 197,
      type: 3,
    },
    {
      from: '2024-01-07',
      to: '2024-01-08',
      value: 198,
      type: 1,
    },
    {
      from: '2024-01-07',
      to: '2024-01-08',
      value: 199,
      type: 2,
    },
    {
      from: '2024-01-07',
      to: '2024-01-08',
      value: 200,
      type: 3,
    },
  ],
};

const PumpEnergyConsumptionChart: React.FC<Props> = (props) => {
  const intl = useIntl();
  const [dates, setDates] = useState<any>([dayjs().subtract(1, 'month'), dayjs()]);

  G2.registerInteraction('element-link', {
    start: [
      {
        trigger: 'interval:mouseenter',
        action: 'element-link-by-color:link',
      },
    ],
    end: [
      {
        trigger: 'interval:mouseleave',
        action: 'element-link-by-color:unlink',
      },
    ],
  });

  return (
    <StatisticCard
      ghost
      chart={
        <Spin spinning={props.irpdWaterConsumption.loading}>
          <Column
            height={359}
            color={({ type }) => {
              if (type === 'Horas em pico') {
                return '#ff4d4f';
              } else if (type === 'Horas em fora de pico') {
                return '#4169E1';
              }
              return '#40E0D0';
            }}
            data={waterConsuption}
            padding="auto"
            xField="year"
            yField="value"
            seriesField="type"
            isPercent={true}
            isStack={true}
            tooltip={false}
            legend={{ position: 'bottom' }}
            interactions={[
              {
                type: 'element-highlight-by-color',
              },
              {
                type: 'element-link',
              },
            ]}
            meta={{
              value: {
                min: 0,
                max: 1,
              },
            }}
            label={{
              position: 'middle',
              content: (item) => {
                return `${(item.value * 100).toFixed(2)}`;
              },
              style: {
                fill: '#fff',
              },
            }}
          />
        </Spin>
      }
      colSpan={{ xs: 24 }}
      title={
        <LightFilter layout="inline">
          <ProFormDateRangePicker
            label={intl.formatMessage({
              id: 'component.pivot.tab.history.rangepicker.label',
            })}
            name="startdate"
            fieldProps={{
              presets: rangePresets,
              allowClear: false,
              value: dates,
            }}
          />
        </LightFilter>
      }
      extra={
        <LightFilter >
          <ProFormSegmented
            name={['controllerconfig', 'content', 'autoreversion_configurations', 'mode']}
            request={async () => [
              {
                label: intl.formatMessage({
                  id: 'component.irpd.report.chart.datetype.opt.1',
                }),
                value: 1,
              },
              {
                label: intl.formatMessage({
                  id: 'component.irpd.report.chart.datetype.opt.2',
                }),
                value: 2,
              },
              {
                label: intl.formatMessage({
                  id: 'component.irpd.report.chart.datetype.opt.3',
                }),
                value: 3,
              },
            ]}
          />
        </LightFilter>
      }
    />
  );
};

const mapStateToProps = ({ irpdWaterConsumption }: any) => ({
  irpdWaterConsumption,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PumpEnergyConsumptionChart);
