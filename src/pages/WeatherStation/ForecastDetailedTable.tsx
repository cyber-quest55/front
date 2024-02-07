import TempreatureDownIcon from '@/icons/weatherstation/temperature-down-icon.svg';
import TempreatureUpIcon from '@/icons/weatherstation/temperature-up-icon.svg';
import { dateTimestampToString, toOneDecimalPlace } from '@/utils/data/weatherstation';
import { Table, TableColumnsType } from 'antd';
import React from 'react';

// interface ForecastDetailedTableProps {}
const ForecastDetailedTable: React.FC<any> = (props) => {
  const weatherForecastFormatted =
    props.weatherForecast?.map((weatherForecast: any, index1: number) => {
      return {
        key: index1,
        ...weatherForecast,
        children:
          weatherForecast.hours.length > 0
            ? weatherForecast.hours.map((hour: any, index2: number) => {
                return { ...hour, key: `${index1}${index2}` };
              })
            : null,
      };
    }) ?? [];
  const columns: TableColumnsType<any> = [
    {
      key: 'dt',
      dataIndex: 'dt',
      title: <>{'DATE'}</>,
      render: (_, { dt }) => (
        <>
          {console.log(dt)}
          {dateTimestampToString(dt)}
        </>
      ),
    },
    {
      key: 'Temperature',
      dataIndex: 'Temperature',
      title: <>{'TEMPE'}</>,
      render: (_, { temperature }) => (
        <div>
          <div>
            <img src={TempreatureDownIcon} /> {toOneDecimalPlace(temperature.min)} °C /{' '}
            <img src={TempreatureUpIcon} /> {toOneDecimalPlace(temperature.max)} °C
          </div>
        </div>
      ),
    },
    {
      key: 'humidity',
      dataIndex: 'humidity',
      title: <>{'HUMIDITY'}</>,
      render: (_, { humidity }) => <div>{humidity} %</div>,
    },
    {
      key: 'wind',
      dataIndex: 'wind',
      title: <>{'WIND'}</>,
      render: (_, { wind }) => <div>{wind} km/h</div>,
    },
    {
      key: 'rain',
      dataIndex: 'rain',
      title: <>{'PRECIPITATION'}</>,
      render: (_, { rain }) => <div>{toOneDecimalPlace(rain)} mm</div>,
    },
    {
      key: 'feather',
      dataIndex: 'feather',
      title: <>{'DEW_POINT'}</>,
      render: (_, { dewPoint }) => <div>{toOneDecimalPlace(dewPoint)} °C</div>,
    },
  ];

  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={weatherForecastFormatted}
      pagination={false}
      indentSize={30}
    />
  );
};

export default ForecastDetailedTable;
