import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useState } from 'react';
import DeltaTTable from './DeltaTTable';
import ForecastDetailedTable from './ForecastDetailedTable';
import WeatherStationCharts from './WeatherStationCharts';

const WeatherDetailsTabs = (props: any) => {
  const [tab, setTab] = useState('tab1');
  const intl = useIntl();

  return (
    <ProCard
      bodyStyle={{ padding: '0' }}
      ghost
      tabs={{
        tabPosition: 'top',
        activeKey: tab,
        defaultActiveKey: 'tab1',
        items: [
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
                loading={props.loading}
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
        ],
        onChange: (key) => {
          setTab(key);
        },
      }}
    />
  );
};

export default WeatherDetailsTabs;
