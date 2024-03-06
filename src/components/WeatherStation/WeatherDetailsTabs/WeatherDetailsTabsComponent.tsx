import { queryWeatherStationCharts } from '@/models/weatherstation';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max';
import { useState } from 'react';
import DeltaTTable from '../DeltaTTable';
import ForecastDetailedTable from '../ForecastDetailedTable';
import WeatherStationCharts from '../WeatherStationCharts';

interface WeatherDetailsTabsComponentProps {
  weatherForecast: APIModels.WeatherForecast[];
  weatherStationCharts: APIModels.WeatherForecastHours[];
  weatherStation: APIModels.WeatherStationDavis | APIModels.WeatherStationPlugField;
  chartLoading: boolean;
  forecastLoading: boolean;
  queryWeatherStationCharts: typeof queryWeatherStationCharts;
}

const WeatherDetailsTabsComponent = (props: WeatherDetailsTabsComponentProps) => {
  const [tab, setTab] = useState('tab1');
  const intl = useIntl();

  const cardClassName = useEmotionCss(() => {
    return {
      '.ant-pro-card-body': {
        paddingInline: 0,
      },
    };
  });

  const tabItems =
    props.weatherStation?.brand === 'Plugfield'
      ? [
          {
            label: intl.formatMessage({
              id: 'component.weatherstation.weatherforecast.tab.title',
            }),
            key: 'tab1',
            children: <ForecastDetailedTable weatherForecast={props.weatherForecast} />,
          },
          {
            label: intl.formatMessage({
              id: 'component.weatherstation.charts.tab.title',
            }),
            key: 'tab2',
            children: (
              <WeatherStationCharts
                queryWeatherStationCharts={props.queryWeatherStationCharts}
                weatherStationCharts={props.weatherStationCharts}
                loading={props.chartLoading}
              />
            ),
          },
          {
            label: intl.formatMessage({
              id: 'component.weatherstation.deltat.tab.title',
            }),
            key: 'tab3',
            children: <DeltaTTable weatherStation={props.weatherStation} />,
          },
        ]
      : [
          {
            label: intl.formatMessage({
              id: 'component.weatherstation.weatherforecast.tab.title',
            }),
            key: 'tab1',
            children: (
              <ForecastDetailedTable
                loading={props.forecastLoading}
                weatherForecast={props.weatherForecast}
              />
            ),
          },

          {
            label: intl.formatMessage({
              id: 'component.weatherstation.deltat.tab.title',
            }),
            key: 'tab2',
            children: <DeltaTTable weatherStation={props.weatherStation} />,
          },
        ];

  return (
    <ProCard
      className={cardClassName}
      ghost
      tabs={{
        tabPosition: 'top',
        activeKey: tab,
        defaultActiveKey: 'tab1',
        destroyInactiveTabPane: true,
        items: tabItems,
        onChange: (key) => {
          setTab(key);
        },
      }}
    />
  );
};

export default WeatherDetailsTabsComponent;
