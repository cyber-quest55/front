import { useIntl, useParams } from '@umijs/max';
import { Radio, RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import WeatherStationDualAxesChart from './WeatherStationDualAxesChart';
import WeatherStationLinearChart from './WeatherStationLinearChart';

function transformData(data: any, categories: any): any {
  if (!data) return [];
  const result: any = [];

  categories.forEach((category: any) => {
    const values = data[category.type];
    const labels = data.labels; // Labels are the same for all categories

    values.forEach((value: any, index: any) => {
      result.push({
        category: category.name,
        value,
        labels: labels[index],
      });
    });
  });

  return result;
}

function transformDataDual(data: any, categories: any): any {
  if (!data) return [];
  const result: any = [];

  const values1 = data[categories[0].type];
  const values2 = data[categories[1].type];
  const labels = data.labels; // Labels are the same for all categories

  for (let i = 0; i < labels.length; i++) {
    result.push({
      [categories[0].name]: values1[i],
      [categories[1].name]: values2[i],
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
      <Radio.Group onChange={onChange} value={period} style={{ padding: '15px 0' }}>
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
        data={transformData(props.weatherStationCharts, [
          { type: 'temperature', name: 'Temperature' },
          { type: 'deltaT', name: 'Delta T' },
          { type: 'dewPoint', name: 'Dew Point' },
        ])}
        unit="°C"
        labelDateFormat={DateFormatByPeriod[period]}
      />
      <WeatherStationDualAxesChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.rain.title',
        })}
        data={transformDataDual(props.weatherStationCharts, [
          { type: 'rain', name: 'Rain' },
          { type: 'accumulatedRain', name: 'Accumulated Rain' },
        ])}
        categories={['Rain', 'Accumulated Rain']}
        unit={['mm', 'mm']}
        labelDateFormat={DateFormatByPeriod[period]}
        yLabels={['Rain(mm)', 'Accumulated Rain(mm)']}
      />
      <WeatherStationLinearChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.humidity.title',
        })}
        data={transformData(props.weatherStationCharts, [{ type: 'humidity', name: 'Humidity' }])}
        unit="%"
        labelDateFormat={DateFormatByPeriod[period]}
      />
      <WeatherStationLinearChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.wind.title',
        })}
        data={transformData(props.weatherStationCharts, [
          { type: 'wind', name: 'Wind' },
          { type: 'gustOfWind', name: 'Gust of Wind' },
        ])}
        unit="km/h"
        labelDateFormat={DateFormatByPeriod[period]}
      />
      <WeatherStationDualAxesChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.luminosity.title',
        })}
        data={transformDataDual(props.weatherStationCharts, [
          { type: 'luminosity', name: 'Luminosity' },
          { type: 'uv', name: 'UV' },
        ])}
        categories={['Luminosity', 'UV']}
        unit={['lux', 'uv']}
        labelDateFormat={DateFormatByPeriod[period]}
        yLabels={['lux', 'uv']}
      />
      <WeatherStationLinearChart
        loading={props.loading}
        title={intl.formatMessage({
          id: 'component.weatherstation.charts.tab.chart.pressure.title',
        })}
        data={transformData(props.weatherStationCharts, [{ type: 'pressure', name: 'Pressure' }])}
        unit="hPa"
        labelDateFormat={DateFormatByPeriod[period]}
        min={1000}
      />
    </>
  );
};

export default WeatherStationCharts;
