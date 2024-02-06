import CloudIcon from '@/icons/weatherstation/cloud-icon.svg';
import RainIcon from '@/icons/weatherstation/rain-icon.svg';
import { queryWeatherForecast } from '@/models/weatherstation';
import {
  dateTimestampToString,
  dayNameFromTimestamp,
  toOneDecimalPlace,
} from '@/utils/data/weatherstation';
import { Skeleton } from 'antd';
import WeatherForecastCard from './WeatherForecastCard';

const WeatherIcons = {
  Thunderstorm: CloudIcon,
  Drizzle: CloudIcon,
  Rain: RainIcon,
  Snow: CloudIcon,
  Clear: CloudIcon,
  Clouds: CloudIcon,
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
  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 15 }}>{'WEATHER_FORECAST'}</div>
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
                  icon={WeatherIcons[dayWeather?.weather] ?? CloudIcon}
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
