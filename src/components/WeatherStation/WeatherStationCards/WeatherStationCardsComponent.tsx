import {
  isNotNull,
  toOneDecimalPlace,
  windDirectionStringByAngle,
} from '@/utils/data/weatherstation';
import { useIntl } from '@umijs/max';
import { Flex } from 'antd';
import { FiWind } from 'react-icons/fi';
import { LuCloudRain } from 'react-icons/lu';
import { MdOutlineWbSunny } from 'react-icons/md';
import { TbTemperature } from 'react-icons/tb';
import WeatherInfo from '../WeatherInfo';
import WeatherInfoCard from '../WeatherInfoCard';
import WeatherNameCard from '../WeatherStationNameCard';
import WindDirectionRotatedIcon from '../WindDirectionRotatedIcon';

interface WeatherStationCardsComponentProps {
  weatherStation: APIModels.WeatherStationDavis | APIModels.WeatherStationPlugField;
  isOffline: boolean;
}

const WeatherStationCardsComponent: React.FC<WeatherStationCardsComponentProps> = (props) => {
  const intl = useIntl();
  const { weatherStation } = props;

  const renderTemperatureCard = () => {
    if (weatherStation?.brand === 'Plugfield') {
      const weatherStationData = weatherStation as APIModels.WeatherStationPlugField;
      return (
        <WeatherInfoCard
          title={intl.formatMessage({
            id: 'component.weatherstation.card.temperature.title',
          })}
          
          icon={<TbTemperature size={25} />}
          renderInfo={
            <>
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.currenttemperature',
                })}
                info={
                  isNotNull(weatherStationData?.temperature?.current)
                    ? `${toOneDecimalPlace(weatherStationData?.temperature?.current)} ºC`
                    : '-'
                }
                subInfo={
                  isNotNull(weatherStationData?.temperature?.min) &&
                  isNotNull(weatherStationData?.temperature?.max)
                    ? `${toOneDecimalPlace(weatherStationData?.temperature?.min)}ºC - ${
                        weatherStationData?.temperature?.max ?? '-'
                      }ºC`
                    : '-'
                }
                infoSize={20}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.dewpoint',
                })}
                info={
                  isNotNull(weatherStationData?.temperature?.dewPoint)
                    ? `${toOneDecimalPlace(weatherStationData?.temperature?.dewPoint)} ºC`
                    : '-'
                }
                breakTitleWords={false}
                titleWidth={56}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.thermalsensation',
                })}
                info={
                  isNotNull(weatherStationData?.temperature?.thermalFeel)
                    ? `${toOneDecimalPlace(weatherStationData?.temperature?.thermalFeel)} ºC`
                    : '-'
                }
              />
            </>
          }
          showMoreInfo={
            <>
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.deltat',
                })}
                breakTitleWords={false}
                info={
                  isNotNull(weatherStationData?.temperature?.deltaT?.current) &&
                  isNotNull(weatherStationData?.temperature?.deltaT?.min) &&
                  isNotNull(weatherStationData?.temperature?.deltaT?.max) ? (
                    <div>
                      <div>
                        {toOneDecimalPlace(weatherStationData?.temperature?.deltaT?.current) ?? '-'}
                        ºC{' '}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 'normal' }}>
                        {toOneDecimalPlace(weatherStationData?.temperature?.deltaT?.min) ?? '-'}
                        ºC -{' '}
                        {toOneDecimalPlace(weatherStationData?.temperature?.deltaT?.max) ?? '-'}
                        ºC
                      </div>
                    </div>
                  ) : (
                    '-'
                  )
                }
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.moisture',
                })}
                info={
                  isNotNull(weatherStationData?.temperature?.humidity)
                    ? `${weatherStationData?.temperature?.humidity} %`
                    : '-'
                }
              />
            </>
          }
        />
      );
    } else {
      const weatherStationData = weatherStation as APIModels.WeatherStationDavis;

      return (
        <WeatherInfoCard
          
          title={intl.formatMessage({
            id: 'component.weatherstation.card.temperature.title',
          })}
          icon={<TbTemperature size={25} />}
          renderInfo={
            <>
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.currenttemperature',
                })}
                info={
                  isNotNull(weatherStationData?.temperature?.current)
                    ? `${toOneDecimalPlace(weatherStation?.temperature?.current)} ºC`
                    : '-'
                }
                infoSize={20}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.dewpoint',
                })}
                info={
                  isNotNull(weatherStationData?.temperature?.dewPoint)
                    ? `${toOneDecimalPlace(weatherStationData?.temperature?.dewPoint)} ºC`
                    : '-'
                }
                breakTitleWords={false}
                titleWidth={56}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.moisture',
                })}
                info={
                  isNotNull(weatherStationData?.temperature?.humidity)
                    ? `${weatherStationData?.temperature?.humidity} %`
                    : '-'
                }
              />
            </>
          }
        />
      );
    }
  };

  const renderWindCard = () => {
    if (weatherStation?.brand === 'Plugfield') {
      const weatherStationData = weatherStation as APIModels.WeatherStationPlugField;

      return (
        <WeatherInfoCard
          
          title={intl.formatMessage({
            id: 'component.weatherstation.card.wind.title',
          })}
          icon={<FiWind size={25} />}
          renderInfo={
            <>
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.wind.direction',
                })}
                info={
                  isNotNull(weatherStationData?.wind?.windDirection)
                    ? windDirectionStringByAngle(weatherStationData?.wind?.windDirection, intl)
                    : '-'
                }
                subInfo={<WindDirectionRotatedIcon deg={weatherStationData?.wind?.windDirection} />}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.wind.averagewind',
                })}
                info={
                  isNotNull(weatherStationData?.wind?.averageWind)
                    ? `${weatherStationData?.wind?.averageWind} km/h`
                    : '-'
                }
              />
              <>
                <WeatherInfo
                  title={intl.formatMessage({
                    id: 'component.weatherstation.card.wind.pressure',
                  })}
                  info={
                    isNotNull(weatherStationData?.wind?.pressure)
                      ? `${weatherStationData?.wind?.pressure} hPa`
                      : '-'
                  }
                />
              </>
            </>
          }
        />
      );
    } else {
      const weatherStationData = weatherStation as APIModels.WeatherStationDavis;

      return (
        <WeatherInfoCard
          
          title={intl.formatMessage({
            id: 'component.weatherstation.card.wind.title',
          })}
          icon={<FiWind size={25} />}
          renderInfo={
            <>
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.wind.windnow',
                })}
                info={
                  isNotNull(weatherStationData?.wind?.windNow)
                    ? `${weatherStationData?.wind?.windNow} km/h`
                    : '-'
                }
                infoSize={20}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.wind.direction',
                })}
                info={
                  isNotNull(weatherStationData?.wind?.windDirection)
                    ? windDirectionStringByAngle(weatherStationData?.wind?.windDirection, intl)
                    : '-'
                }
                subInfo={<WindDirectionRotatedIcon deg={weatherStationData?.wind?.windDirection} />}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.wind.averagewind',
                })}
                info={
                  isNotNull(weatherStationData?.wind?.averageWind)
                    ? `${weatherStationData?.wind?.averageWind} km/h`
                    : '-'
                }
              />
            </>
          }
        />
      );
    }
  };

  const renderLuminodity = () => {
    const weatherStationData = weatherStation as APIModels.WeatherStationPlugField;

    if (weatherStationData?.brand === 'Plugfield') {
      return (
        <WeatherInfoCard
          
          title={intl.formatMessage({
            id: 'component.weatherstation.card.luminosity.title',
          })}
          icon={<MdOutlineWbSunny size={25} />}
          renderInfo={
            <>
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.luminosity.uv',
                })}
                info={
                  isNotNull(weatherStationData?.luminosity?.uv)
                    ? `${weatherStationData?.luminosity?.uv}`
                    : '-'
                }
                infoSize={20}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.luminosity.luminosity',
                })}
                info={
                  isNotNull(weatherStationData?.luminosity?.luminosity)
                    ? `${weatherStationData?.luminosity?.luminosity} lux`
                    : '-'
                }
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.luminosity.height',
                })}
                info={
                  isNotNull(weatherStationData?.luminosity?.altitude)
                    ? `${toOneDecimalPlace(weatherStationData?.luminosity?.altitude)} m`
                    : '-'
                }
              />
            </>
          }
        />
      );
    } else {
      const weatherStationData = weatherStation as APIModels.WeatherStationDavis;

      return (
        <WeatherInfoCard
          
          title={intl.formatMessage({
            id: 'component.weatherstation.card.luminosity.title',
          })}
          icon={<MdOutlineWbSunny size={25} />}
          renderInfo={
            <>
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.luminosity.uv',
                })}
                info={
                  isNotNull(weatherStationData?.luminosity?.uv)
                    ? `${weatherStationData?.luminosity?.uv}`
                    : '-'
                }
                infoSize={20}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.luminosity.luminosity',
                })}
                info={
                  isNotNull(weatherStationData?.luminosity?.luminosity)
                    ? `${weatherStationData?.luminosity?.luminosity} lux`
                    : '-'
                }
              />
            </>
          }
        />
      );
    }
  };

  return (
    <Flex gap="middle" vertical>
      <WeatherNameCard
        name={weatherStation?.stationName}
        isOffline={props.isOffline}
        lastCommunication={weatherStation?.lastCommunication}
      />
      {renderTemperatureCard()}
      {renderWindCard()}

      <WeatherInfoCard
        
        title={intl.formatMessage({
          id: 'component.weatherstation.card.rain.title',
        })}
        icon={<LuCloudRain size={25} />}
        renderInfo={
          <>
            <WeatherInfo
              title={intl.formatMessage({
                id: 'component.weatherstation.card.rain.today',
              })}
              info={isNotNull(weatherStation?.rain?.day) ? `${weatherStation?.rain?.day} mm` : '-'}
              infoSize={20}
            />
            <WeatherInfo
              title={intl.formatMessage({
                id: 'component.weatherstation.card.rain.month',
              })}
              info={
                isNotNull(weatherStation?.rain?.month) ? `${weatherStation?.rain?.month} mm` : '-'
              }
            />
            <WeatherInfo
              title={intl.formatMessage({
                id: 'component.weatherstation.card.rain.year',
              })}
              info={
                isNotNull(weatherStation?.rain?.year) ? `${weatherStation?.rain?.year} mm` : '-'
              }
            />
          </>
        }
      />

      {renderLuminodity()}
    </Flex>
  );
};

export default WeatherStationCardsComponent;
