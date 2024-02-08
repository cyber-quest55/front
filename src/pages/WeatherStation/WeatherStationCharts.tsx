import { useIntl, useParams } from '@umijs/max';
import { Radio, RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import WeatherStationDualAxesChart from './WeatherStationDualAxesChart';
import WeatherStationLinearChart from './WeatherStationLinearChart';

function transformData(data: any, categories: string[]): any {
  if (!data) return [];
  const result: any = [];

  categories.forEach((category) => {
    const values = data[category];
    const labels = data.labels; // Labels are the same for all categories

    values.forEach((value: any, index: any) => {
      result.push({
        category,
        value,
        labels: labels[index],
      });
    });
  });

  return result;
}

function transformDataDual(data: any, categories: string[]): any {
  if (!data) return [];
  const result: any = [];

  const values1 = data[categories[0]];
  const values2 = data[categories[1]];
  const labels = data.labels; // Labels are the same for all categories

  for (let i = 0; i < labels.length; i++) {
    result.push({
      [categories[0]]: values1[i],
      [categories[1]]: values2[i],
      labels: labels[i],
    });
  }

  return result;
}

const DateFormatByPeriod = {
  today: 'HH:mm',
  '24h': 'HH:mm',
  '7d': 'DD MMM',
  '30d': 'DD MMM',
} as const;

const WeatherStationCharts = (props: any) => {
  const params = useParams();
  const intl = useIntl();
  const [period, setPeriod] = useState<'today' | '24h' | '7d' | '30d'>('today');

  const onChange = (e: RadioChangeEvent) => {
    setPeriod(e.target.value);
  };

  useEffect(() => {
    props.queryWeatherStationCharts({
      farmId: params.farmId as any,
      pivotId: params.pivotId as any,
      period: period,
    });
  }, [period]);

  return (
    <>
      <Radio.Group onChange={onChange} value={period}>
        <Radio value={'today'}>
          {intl.formatMessage({
            id: 'component.weatherstation.charts.tab.radio.today.input',
          })}
        </Radio>
        <Radio value={'24h'}>
          {intl.formatMessage({
            id: 'component.weatherstation.charts.tab.radio.24h.input',
          })}
        </Radio>
        <Radio value={'7d'}>
          {intl.formatMessage({
            id: 'component.weatherstation.charts.tab.radio.7d.input',
          })}
        </Radio>
        <Radio value={'30d'}>
          {intl.formatMessage({
            id: 'component.weatherstation.charts.tab.radio.30d.input',
          })}
        </Radio>
      </Radio.Group>
      <WeatherStationLinearChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.temperature.title',
        })}
        data={transformData(props.weatherStationCharts, ['temperature', 'deltaT', 'dewPoint'])}
        unit="°C"
        labelDateFormat={DateFormatByPeriod[period]}
      />
      <WeatherStationDualAxesChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.rain.title',
        })}
        data={transformDataDual(props.weatherStationCharts, ['rain', 'accumulatedRain'])}
        categories={['rain', 'accumulatedRain']}
        unit={['mm', 'mm']}
        labelDateFormat={DateFormatByPeriod[period]}
        yLabels={['Rain(mm)', 'Accumulated Rain(mm)']}
      />
      <WeatherStationLinearChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.humidity.title',
        })}
        data={transformData(props.weatherStationCharts, ['humidity'])}
        unit="%"
        labelDateFormat={DateFormatByPeriod[period]}
      />
      <WeatherStationLinearChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.wind.title',
        })}
        data={transformData(props.weatherStationCharts, ['wind', 'gustOfWind'])}
        unit="km/h"
        labelDateFormat={DateFormatByPeriod[period]}
      />
      <WeatherStationDualAxesChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.luminosity.title',
        })}
        data={transformDataDual(props.weatherStationCharts, ['luminosity', 'uv'])}
        categories={['luminosity', 'uv']}
        unit={['lux', 'uv']}
        labelDateFormat={DateFormatByPeriod[period]}
        yLabels={['lux', 'uv']}
      />
      <WeatherStationLinearChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.pressure.title',
        })}
        data={transformData(props.weatherStationCharts, ['pressure'])}
        unit="hPa"
        labelDateFormat={DateFormatByPeriod[period]}
        min={1000}
      />
    </>
  );
};

export default WeatherStationCharts;
