import {
  FIVE_MIN_TIMEOUT,
  isNotNull,
  toOneDecimalPlace,
  windDirectionStringByAngle,
} from '@/utils/data/weatherstation';
import { useIntl, useParams } from '@umijs/max';
import { Flex } from 'antd';
import { useEffect } from 'react';
import { FiWind } from 'react-icons/fi';
import { LuCloudRain } from 'react-icons/lu';
import { MdOutlineWbSunny } from 'react-icons/md';
import { TbTemperature } from 'react-icons/tb';
import WeatherInfo from './WeatherInfo';
import WeatherInfoCard from './WeatherInfoCard';
import WeatherNameCard from './WeatherStationNameCard';
import WindDirectionRotatedIcon from './WindDirectionRotatedIcon';

const WeatherStationCards: React.FC<any> = (props) => {
  const intl = useIntl();
  const { weatherStation, loading } = props;
  const params = useParams();

  useEffect(() => {
    props.queryWeatherStation({ farmId: params.farmId, pivotId: params.pivotId });
  }, []);

  useEffect(() => {
    const requestInterval = setInterval(() => {
      props.queryWeatherStation({ farmId: params.farmId, pivotId: params.pivotId });
    }, FIVE_MIN_TIMEOUT);
    return () => {
      clearInterval(requestInterval);
    };
  }, []);

  const renderTemperatureCard = () => {
    if (weatherStation?.brand === 'Plugfield') {
      return (
        <WeatherInfoCard
          title={intl.formatMessage({
            id: 'component.weatherstation.card.temperature.title',
          })}
          loading={false}
          icon={<TbTemperature size={25} />}
          renderInfo={
            <>
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.temperature.currenttemperature',
                })}
                info={
                  isNotNull(weatherStation?.temperature?.current)
                    ? `${toOneDecimalPlace(weatherStation?.temperature?.current)} ºC`
                    : '-'
                }
                subInfo={
                  isNotNull(weatherStation?.temperature?.min) &&
                  isNotNull(weatherStation?.temperature?.max)
                    ? `${toOneDecimalPlace(weatherStation?.temperature?.min)}ºC - ${
                        weatherStation?.temperature?.max ?? '-'
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
                  isNotNull(weatherStation?.temperature?.dewPoint)
                    ? `${toOneDecimalPlace(weatherStation?.temperature?.dewPoint)} ºC`
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
                  isNotNull(weatherStation?.temperature?.thermalFeel)
                    ? `${toOneDecimalPlace(weatherStation?.temperature?.thermalFeel)} ºC`
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
                  isNotNull(weatherStation?.temperature?.deltaT?.current) &&
                  isNotNull(weatherStation?.temperature?.deltaT?.min) &&
                  isNotNull(weatherStation?.temperature?.deltaT?.max) ? (
                    <div>
                      <div>
                        {toOneDecimalPlace(weatherStation?.temperature?.deltaT?.current) ?? '-'}
                        ºC{' '}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 'normal' }}>
                        {toOneDecimalPlace(weatherStation?.temperature?.deltaT?.min) ?? '-'}
                        ºC - {toOneDecimalPlace(weatherStation?.temperature?.deltaT?.max) ?? '-'}
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
                  isNotNull(weatherStation?.temperature?.humidity)
                    ? `${weatherStation?.temperature?.humidity} %`
                    : '-'
                }
              />
            </>
          }
        />
      );
    } else {
      return (
        <WeatherInfoCard
          loading={false}
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
                  isNotNull(weatherStation?.temperature?.current)
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
                  isNotNull(weatherStation?.temperature?.dewPoint)
                    ? `${toOneDecimalPlace(weatherStation?.temperature?.dewPoint)} ºC`
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
                  isNotNull(weatherStation?.temperature?.humidity)
                    ? `${weatherStation?.temperature?.humidity} %`
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
      return (
        <WeatherInfoCard
          loading={false}
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
                  isNotNull(weatherStation?.wind?.windDirection)
                    ? windDirectionStringByAngle(weatherStation?.wind?.windDirection, intl)
                    : '-'
                }
                subInfo={<WindDirectionRotatedIcon deg={weatherStation?.wind?.windDirection} />}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.wind.averagewind',
                })}
                info={
                  isNotNull(weatherStation?.wind?.averageWind)
                    ? `${weatherStation?.wind?.averageWind} km/h`
                    : '-'
                }
              />
              <>
                <WeatherInfo
                  title={intl.formatMessage({
                    id: 'component.weatherstation.card.wind.pressure',
                  })}
                  info={
                    isNotNull(weatherStation?.wind?.pressure)
                      ? `${weatherStation?.wind?.pressure} hPa`
                      : '-'
                  }
                />
              </>
            </>
          }
        />
      );
    } else {
      return (
        <WeatherInfoCard
          loading={false}
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
                  isNotNull(weatherStation?.wind?.windNow)
                    ? `${weatherStation?.wind?.windNow} km/h`
                    : '-'
                }
                infoSize={20}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.wind.direction',
                })}
                info={
                  isNotNull(weatherStation?.wind?.windDirection)
                    ? windDirectionStringByAngle(weatherStation?.wind?.windDirection, intl)
                    : '-'
                }
                subInfo={<WindDirectionRotatedIcon deg={weatherStation?.wind?.windDirection} />}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.wind.averagewind',
                })}
                info={
                  isNotNull(weatherStation?.wind?.averageWind)
                    ? `${weatherStation?.wind?.averageWind} km/h`
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
    if (weatherStation?.brand === 'Plugfield') {
      return (
        <WeatherInfoCard
          loading={false}
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
                  isNotNull(weatherStation?.luminosity?.uv)
                    ? `${weatherStation?.luminosity?.uv}`
                    : '-'
                }
                infoSize={20}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.luminosity.luminosity',
                })}
                info={
                  isNotNull(weatherStation?.luminosity?.luminosity)
                    ? `${weatherStation?.luminosity?.luminosity} lux`
                    : '-'
                }
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.luminosity.height',
                })}
                info={
                  isNotNull(weatherStation?.luminosity?.altitude)
                    ? `${toOneDecimalPlace(weatherStation?.luminosity?.altitude)} m`
                    : '-'
                }
              />
            </>
          }
        />
      );
    } else {
      return (
        <WeatherInfoCard
          loading={false}
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
                  isNotNull(weatherStation?.luminosity?.uv)
                    ? `${weatherStation?.luminosity?.uv}`
                    : '-'
                }
                infoSize={20}
              />
              <WeatherInfo
                title={intl.formatMessage({
                  id: 'component.weatherstation.card.luminosity.luminosity',
                })}
                info={
                  isNotNull(weatherStation?.luminosity?.luminosity)
                    ? `${weatherStation?.luminosity?.luminosity} lux`
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
        isOffline={!loading && props.isWeatherStationOffline}
        loading={loading}
        lastCommunication={weatherStation?.lastCommunication}
      />
      {renderTemperatureCard()}
      {renderWindCard()}

      <WeatherInfoCard
        loading={false}
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

export default WeatherStationCards;
