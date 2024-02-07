import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import ForecastDetailedTable from './ForecastDetailedTable';

const WeatherDetailsTabs = (props: any) => {
  const [tab, setTab] = useState('tab1');

  return (
      <ProCard
      bodyStyle={{ padding: "0"}}
        tabs={{
          tabPosition: 'top',
          activeKey: tab,
          defaultActiveKey: 'tab1',
          items: [
            {
              label: `WEATHER_FORECAST_DETAILED`,
              key: 'tab1',
              children: <ForecastDetailedTable weatherForecast={props.weatherForecast} />,
            },
            // {
            //   label: `CHARTS`,
            //   key: 'tab2',
            //   children: `内容二`,
            // },
            // {
            //   label: `DELTA_T_TABLE`,
            //   key: 'tab3',
            //   children: <DeltaTTable />,
            // },
          ],
          onChange: (key) => {
            setTab(key);
          },
        }}
      />
  );
};

export default WeatherDetailsTabs;
