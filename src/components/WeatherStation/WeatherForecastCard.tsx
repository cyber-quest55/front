import TempreatureDownIcon from '@/icons/weatherstation/temperature-down-icon.svg';
import TempreatureUpIcon from '@/icons/weatherstation/temperature-up-icon.svg';
import { ProCard } from '@ant-design/pro-components';
import { LuCloudRain } from 'react-icons/lu';
import { TbTemperature } from 'react-icons/tb';
import WeatherForecastCardInfo from './WeatherForecastCardInfo';
import { useModel } from '@umijs/max';

interface WeatherForecastCardProps {
  day: { name: string; date: string };
  temperature: { min: number | string; max: number | string };
  rain: { millimeters: string | undefined; percentage: number };
  isToday?: boolean;
  icon: JSX.Element;
}

const WeatherForecastCard = ({
  day,
  temperature,
  rain,
  isToday,
  icon,
}: WeatherForecastCardProps) => {
  const { initialState } = useModel('@@initialState');

  const isDark = initialState?.settings?.navTheme === 'realDark'
  const isTodayStyle = isToday ? { border: `1px solid ${isDark ? "#03a05e" : '#11221c'}`, backgroundColor: isDark ? "#11221c" : '#e1faeb' } : {};
  return (
    <ProCard
      bordered
      bodyStyle={{
        padding: 0,
      }}
      style={{
        minWidth: 152,
        ...isTodayStyle,
      }}
    >
      <WeatherForecastCardInfo icon={icon}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 400 }}>{day.name}</div>
          <div style={{ fontSize: 10 }}>{day.date}</div>
        </div>
      </WeatherForecastCardInfo>
      <WeatherForecastCardInfo icon={<TbTemperature size={25} />} iconStyle={{ marginRight: 6 }}>
        <div>
          <div style={{ fontSize: 14, display: 'flex', gap: 5, alignItems: 'center' }}>
            <img src={TempreatureUpIcon} width={12} height={12} />
            <div>{temperature.max} °C</div>
          </div>
          <div style={{ fontSize: 14, display: 'flex', gap: 5, alignItems: 'center' }}>
            <img src={TempreatureDownIcon} width={12} height={12} />
            <div>{temperature.min} °C</div>
          </div>
        </div>
      </WeatherForecastCardInfo>
      <WeatherForecastCardInfo icon={<LuCloudRain size={25} />}>
        <div style={{ fontSize: 14, fontWeight: 400 }}>
          <div>{rain.millimeters}mm</div>
          <div>{rain.percentage}%</div>
        </div>
      </WeatherForecastCardInfo>
    </ProCard>
  );
};

export default WeatherForecastCard;
