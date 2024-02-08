import { SelectedDeviceModelProps } from '@/models/selected-device';
import { getIrpdWaterConsumption } from '@/services/irpd';
import { getWaterConsumptionType } from '@/utils/formater/get-water-consumption-type';
import { Column, G2 } from '@ant-design/charts';
import {
  LightFilter,
  ProFormDatePicker,
  ProFormSegmented,
  StatisticCard,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { connect } from 'dva';
import { useEffect, useState } from 'react';

type Props = {
  selectedDevice: SelectedDeviceModelProps;
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

  const [dates, setDates] = useState<any>(dayjs());
  const [precision, setPrecision] = useState<any>('month');

  const getReq = useRequest(getIrpdWaterConsumption, { manual: true });

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

  useEffect(() => {
    const format = 'YYYY-MM-DD'
    const start_date = dates.startOf(precision).format(format)
    const end_date = dates.endOf(precision).format(format)

    getReq.run(
      { farmId: props.selectedDevice.farmId, irpdId: props.selectedDevice.deviceId },
      {
        start_date,
        end_date,
        precision,
      },
    );
  }, [precision, dates]);


  const getFormatedDate = (date1: Dayjs, date2: Dayjs) => {

    if(precision === 'month'){
      return date1.format('DD/MM')
    }
  }

  const formatDatsource = (data: Array<APIModels.IrpdWaterConsumption> | undefined) => {
    if( !data ){ 
      return []
    }
    const values = data.map((item) => {
      const bDate = dayjs(item.from)
      const eDate = dayjs(item.to)


      const formatedType = getWaterConsumptionType(item.type);

      return {
        type: item.type,
        formatedType,
        period: getFormatedDate(bDate, eDate),
        value: item.value,
      };
    });
     
    return values
  };

  return (
    <StatisticCard
      ghost
      chart={
        <Spin spinning={getReq.loading}>
          <Column
            height={359}
            color={({ formatedType }) => {
              if (formatedType === intl.formatMessage({ id: 'component.irpd.report.chart.label.1' })) {
                return '#ff4d4f';
              } else if (formatedType === intl.formatMessage({ id: 'component.irpd.report.chart.label.2' })) {
                return '#4169E1';
              }
              return '#40E0D0';
            }}
            data={formatDatsource(getReq.data?.data)}
            padding="auto"
            xField="period"
            yField="value"
            seriesField="formatedType"
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
          <ProFormDatePicker
            label={intl.formatMessage({
              id: 'component.pivot.tab.history.rangepicker.label',
            })}
            fieldProps={{
              picker: precision,
              onChange: (date) => setDates(date),
              allowClear: false,
              value: dates,
            }}
          />
        </LightFilter>
      }
      extra={
        <LightFilter>
          <ProFormSegmented
            fieldProps={{
              value: precision,
              onChange: (item) => setPrecision(item),
            }}
            request={async () => [
              {
                label: intl.formatMessage({
                  id: 'component.irpd.report.chart.datetype.opt.1',
                }),
                value: 'year',
              },
            
              {
                label: intl.formatMessage({
                  id: 'component.irpd.report.chart.datetype.opt.3',
                }),
                value: 'month',
              },
              {
                label: intl.formatMessage({
                  id: 'component.irpd.report.chart.datetype.opt.2',
                }),
                value: 'week',
              },
            ]}
          />
        </LightFilter>
      }
    />
  );
};

const mapStateToProps = ({ selectedDevice }: any) => ({
  selectedDevice,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PumpEnergyConsumptionChart);
