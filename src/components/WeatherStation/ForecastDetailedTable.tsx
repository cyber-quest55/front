import TempreatureDownIcon from '@/icons/weatherstation/temperature-down-icon.svg';
import TempreatureUpIcon from '@/icons/weatherstation/temperature-up-icon.svg';
import { dateTimestampToHourString, dateTimestampToString, isNotNull, toOneDecimalPlace } from '@/utils/data/weatherstation';
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
                return { ...hour, key: `children${index1}${index2}` };
              })
            : null,
      };
    }) ?? [];

  const columns: TableColumnsType<any> = [
    {
      key: 'dt',
      dataIndex: 'dt',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10, textAlign: 'center', minWidth: 100 }}>
          <FiCalendar size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.date.column',
          })}
        </div>
      ),
      render: (a, record) => {
          if(String(record.key).includes('children')) return <div style={{ textAlign: 'center' }}>{dateTimestampToHourString(record.dt)}</div>;
          return <div style={{ textAlign: 'center' }}>{dateTimestampToString(record.dt)}</div>;
      },
    },
    {
      key: 'Temperature',
      dataIndex: 'Temperature',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10, textAlign: 'center', minWidth: 100 }}>
          <TbTemperature size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.temperature.column',
          })}
        </div>
      ),
      render: (_, { temperature }) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap:'wrap', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={TempreatureDownIcon} /> {toOneDecimalPlace(temperature.min)} °C /{' '}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={TempreatureUpIcon} /> {toOneDecimalPlace(temperature.max)} °C
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'humidity',
      dataIndex: 'humidity',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10, textAlign: 'center', minWidth: 50 }}>
          <MdOutlineWaterDrop size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.humidity.column',
          })}
        </div>
      ),
      render: (_, { humidity }) => <div style={{ textAlign: 'center' }}>{humidity} %</div>,
    },
    {
      key: 'wind',
      dataIndex: 'wind',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10, textAlign: 'center', minWidth: 50 }}>
          <FiWind size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.wind.column',
          })}
        </div>
      ),
      render: (_, { wind }) => <div style={{ textAlign: 'center' }}>{wind} km/h</div>,
    },
    {
      key: 'rain',
      dataIndex: 'rain',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10, textAlign: 'center', minWidth: 50 }}>
          <LuCloudRain size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.rain.column',
          })}
        </div>
      ),
      render: (_, { rain }) => <div style={{ textAlign: 'center' }}>{toOneDecimalPlace(rain)} mm</div>,
    },
    {
      key: 'feather',
      dataIndex: 'feather',
      title: (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10, textAlign: 'center', minWidth: 50 }}>
          <LuFeather size={25} />
          {intl.formatMessage({
            id: 'component.weatherstation.weatherforecast.tab.table.dewpoint.column',
          })}
        </div>
      ),
      render: (_, { dewPoint }) => isNotNull(dewPoint) ? <div style={{ textAlign: 'center' }}>{toOneDecimalPlace(dewPoint)} °C</div> : null,
    },
  ];

  return (
    <Table
      rowKey="key"
      columns={columns}
      dataSource={weatherForecastFormatted}
      pagination={false}
      indentSize={0}
      loading={props.loading}
    />
  );
};

export default ForecastDetailedTable;
