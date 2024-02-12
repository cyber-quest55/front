import { queryWeatherForecast } from '@/models/weatherstation';
import {
  dateTimestampToString,
  dayNameFromTimestamp,
  toOneDecimalPlace,
} from '@/utils/data/weatherstation';
import { useIntl } from '@umijs/max';
import { Skeleton } from 'antd';
import { LuCloud, LuCloudRain, LuCloudDrizzle, LuSnowflake, LuCircle } from 'react-icons/lu';
import { MdOutlineThunderstorm } from "react-icons/md";

import WeatherForecastCard from '../WeatherForecastCard';

const WeatherIcons = {
  Thunderstorm: <MdOutlineThunderstorm size={25} />,
  Drizzle: <LuCloudDrizzle size={25} />,
  Rain: <LuCloudRain size={25} />,
  Snow: <LuSnowflake size={25} />,
  Clear: <LuCircle size={25} />,
  Clouds: <LuCloud size={25} />,
};

const LoadingForecastCards = () => {
  return (
    <>
      <Skeleton.Button active={true} style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton.Button active={true} style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton.Button active={true} style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton.Button active={true} style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton.Button active={true} style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton.Button active={true} style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton.Button active={true} style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton.Button active={true} style={{ minWidth: 152, transform: 'none', height: 154 }} />
    </>
  );
};

interface WeatherForecastPanelComponentProps {
  weatherForecast: APIModels.WeatherForecast[];
  loading: boolean;
  queryWeatherForecast: typeof queryWeatherForecast;
}

const WeatherForecastPanelComponent: React.FC<WeatherForecastPanelComponentProps> = (props) => {
  const intl = useIntl();

  return (
    <div style={{ marginBottom: 35 }}>
      <div style={{ fontSize: 24, fontWeight: 500,  }}>
        {intl.formatMessage({
          id: 'component.weatherstation.weatherforecast.title',
        })}
      </div>
      <div style={{ position: 'relative', height: 170,  }}>
        <div
          style={{
            display: 'flex',
            gap: 10,
            overflowX: 'auto',
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '15px 0'
          }}
        >
          {!props.loading ? (
            props.weatherForecast?.map((dayWeather, index: number) => {
              return (
                <WeatherForecastCard
                  key={index}
                  day={{
                    name: dayNameFromTimestamp(dayWeather.dt),
                    date: dateTimestampToString(dayWeather.dt),
                  }}
                  icon={WeatherIcons[dayWeather?.weather] ?? <LuCloud size={25} />}
                  temperature={{
                    min: toOneDecimalPlace(dayWeather?.temperature?.min) ?? '-',
                    max: toOneDecimalPlace(dayWeather?.temperature?.max) ?? '-',
                  }}
                  rain={{
                    millimeters: toOneDecimalPlace(dayWeather?.rain),
                    percentage: dayWeather?.humidity,
                  }}
                  isToday={index === 0}
                />
              );
            })
          ) : (
            <LoadingForecastCards />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastPanelComponent;
