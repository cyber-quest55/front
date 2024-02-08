import { queryWeatherForecast } from '@/models/weatherstation';
import {
  dateTimestampToString,
  dayNameFromTimestamp,
  toOneDecimalPlace,
} from '@/utils/data/weatherstation';
import { useIntl } from '@umijs/max';
import { Skeleton } from 'antd';
import { LuCloud, LuCloudRain } from 'react-icons/lu';
import WeatherForecastCard from './WeatherForecastCard';

const WeatherIcons = {
  Thunderstorm: <LuCloud size={25} />,
  Drizzle: <LuCloud size={25} />,
  Rain: <LuCloudRain size={25} />,
  Snow: <LuCloud size={25} />,
  Clear: <LuCloud size={25} />,
  Clouds: <LuCloud size={25} />,
};

const LoadingForecastCards = () => {
  return (
    <>
      <Skeleton style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton style={{ minWidth: 152, transform: 'none', height: 154 }} />
      <Skeleton style={{ minWidth: 152, transform: 'none', height: 154 }} />
    </>
  );
};

interface WeatherForecastPanelProps {
  weatherForecast: APIModels.WeatherForecast[];
  loading: boolean;
  queryWeatherForecast: typeof queryWeatherForecast;
}

const WeatherForecastPanel: React.FC<WeatherForecastPanelProps> = (props) => {
  const intl = useIntl();

  return (
    <div style={{ marginBottom: 35 }}>
      <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 15 }}>
        {intl.formatMessage({
          id: 'component.weatherstation.weatherforecast.title',
        })}
      </div>
      <div style={{ position: 'relative', height: 170 }}>
        <div
          style={{
            display: 'flex',
            gap: 10,
            overflowX: 'auto',
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
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

export default WeatherForecastPanel;
