import TempreatureDownIcon from '@/icons/weatherstation/temperature-down-icon.svg';
import TempreatureUpIcon from '@/icons/weatherstation/temperature-up-icon.svg';
import { dateTimestampToString, toOneDecimalPlace } from '@/utils/data/weatherstation';
import { useIntl } from '@umijs/max';
import { Table, TableColumnsType } from 'antd';
import React from 'react';
import { TbTemperature } from 'react-icons/tb';
import { LuCloudRain } from 'react-icons/lu';
import { FiWind } from 'react-icons/fi';
import { LuFeather } from "react-icons/lu";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";

// interface ForecastDetailedTableProps {}
const ForecastDetailedTable: React.FC<any> = (props) => {
  const intl = useIntl();

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
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}>
          <FiCalendar size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.date.column',
          })}
        </div>
      ),
      render: (_, { dt }) => <>{dateTimestampToString(dt)}</>,
    },
    {
      key: 'Temperature',
      dataIndex: 'Temperature',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}>
          <TbTemperature size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.temperature.column',
          })}
        </div>
      ),
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
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}>
          <MdOutlineWaterDrop size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.humidity.column',
          })}
        </div>
      ),
      render: (_, { humidity }) => <div>{humidity} %</div>,
    },
    {
      key: 'wind',
      dataIndex: 'wind',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}>
          <FiWind size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.wind.column',
          })}
        </div>
      ),
      render: (_, { wind }) => <div>{wind} km/h</div>,
    },
    {
      key: 'rain',
      dataIndex: 'rain',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}>
          <LuCloudRain size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.rain.column',
          })}
        </div>
      ),
      render: (_, { rain }) => <div>{toOneDecimalPlace(rain)} mm</div>,
    },
    {
      key: 'feather',
      dataIndex: 'feather',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}>
          <LuFeather size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.dewpoint.column',
          })}
        </div>
      ),
      render: (_, { dewPoint }) => <div>{toOneDecimalPlace(dewPoint)} °C</div>,
    },
  ];

  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={weatherForecastFormatted}
      pagination={false}
      indentSize={0}
    />
  );
};

export default ForecastDetailedTable;
