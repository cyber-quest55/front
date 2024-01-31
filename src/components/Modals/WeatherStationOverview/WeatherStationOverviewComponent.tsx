import { CloudFilled } from '@ant-design/icons';
import { useIntl, useParams } from '@umijs/max';
import { Button, Modal, Row, Skeleton } from 'antd';
import React, { useEffect } from 'react';

import HumidityIcon from '@/icons/weatherstation/humidity-icon.svg';
import RainIcon from '@/icons/weatherstation/rain-icon.svg';
import TemperatureIcon from '@/icons/weatherstation/temperature-icon.svg';
import WindDirectionIcon from '@/icons/weatherstation/wind-direction-icon.svg';
import WindIcon from '@/icons/weatherstation/wind-icon.svg';

import { IntlShape } from 'react-intl';

export const isNotNull = (value: string | number | undefined) =>
  value !== null && value !== undefined;

export const toOneDecimalPlace = (temperature: number | undefined) => temperature?.toFixed(1);

export const windDirectionStringByAngle = (deg: number | undefined, intl: IntlShape) => {
  if (deg === undefined) return '-';
  if (deg >= 337.5 || deg < 22.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.north',
    });
  if (deg >= 22.5 && deg < 67.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.northeast',
    });
  if (deg >= 67.5 && deg < 112.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.east',
    });
  if (deg >= 112.5 && deg < 157.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.southeast',
    });
  if (deg >= 157.5 && deg < 202.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.south',
    });
  if (deg >= 202.5 && deg < 247.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.southwest',
    });
  if (deg >= 247.5 && deg < 292.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.west',
    });
  if (deg >= 292.5 && deg < 337.5)
    return intl.formatMessage({
      id: 'component.weatherstation.winddirection.northwest',
    });
  return '-';
};

const WindDirectionRotatedIcon = ({ deg }: { deg: number | undefined }) => {
  return (
    <img src={WindDirectionIcon} style={{ transform: deg ? `rotateZ(${deg - 45}deg)` : '' }} />
  );
};

interface WeatherInfoProps {
  icon?: string;
  iconComponent?: JSX.Element;
  title: string;
  info: number | string | undefined;
  infoUnit?: string;
  loading?: boolean;
}

const WeatherInfo = ({ icon, iconComponent, title, info, infoUnit, loading }: WeatherInfoProps) =>
  !loading ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div>
        {iconComponent ? iconComponent : <img src={icon} />}
        <div style={{ fontSize: 16, maxWidth: 85, padding: '5px 0 10px 0' }}>{title}</div>
      </div>
      <p style={{ fontSize: 24, fontWeight: 600, marginTop: 'auto' }}>
        {info ?? '-'} {isNotNull(info) ? infoUnit : ''}
      </p>
    </div>
  ) : (
    <Skeleton style={{ transform: 'none', height: 130, width: 85 }} />
  );

const FIVE_MIN_TIMEOUT = 300000;

const WeatherStationOverview: React.FunctionComponent<any> = (props) => {
  const params = useParams();
  const intl = useIntl();

  useEffect(() => {
    props.queryWeatherStationSummary({
      farmId: params.id as any,
      pivotId: props.pivotId as any,
    });
  }, []);

  useEffect(() => {
    const requestInterval = setInterval(() => {
      props.queryWeatherStationSummary({
        farmId: params.id as any,
        pivotId: props.pivotId as any,
      });
    }, FIVE_MIN_TIMEOUT);
    return () => {
      clearInterval(requestInterval);
    };
  }, []);

  return (
    <Row justify="space-between">
      <WeatherInfo
        loading={props.loading}
        icon={TemperatureIcon}
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.temperature',
        })}
        info={toOneDecimalPlace(props.weatherStationSummary?.temperature)}
        infoUnit={'ºC'}
      />
      <WeatherInfo
        loading={props.loading}
        icon={HumidityIcon}
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.moisture',
        })}
        info={props.weatherStationSummary?.humidity}
        infoUnit={'%'}
      />
      <WeatherInfo
        loading={props.loading}
        icon={WindIcon}
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.wind',
        })}
        info={props.weatherStationSummary?.wind}
        infoUnit={'km/h'}
      />
      <WeatherInfo
        loading={props.loading}
        iconComponent={
          <WindDirectionRotatedIcon deg={props.weatherStationSummary?.windDirection} />
        }
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.winddirection',
        })}
        info={windDirectionStringByAngle(props.weatherStationSummary?.windDirection, intl)}
      />
      <WeatherInfo
        loading={props.loading}
        icon={RainIcon}
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.rain',
        })}
        info={props.weatherStationSummary?.rain}
        infoUnit={'mm'}
      />
    </Row>
  );
};

const WeatherStationOverviewComponent: React.FunctionComponent<any> = (props) => {
  const intl = useIntl();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button icon={<CloudFilled />} onClick={showModal} />

      <Modal
        destroyOnClose
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.title',
        })}
        open={isModalOpen}
        onCancel={handleCancel}
        width={600}
        footer={[
          <div style={{ display: 'flex', justifyContent: 'center' }} key="submit">
            <Button type="primary" onClick={handleOk}>
              {intl.formatMessage({
                id: 'component.pivot.weatherstation.modal.submit',
              })}{' '}
              {props.weatherStationSummary?.stationName}
            </Button>
          </div>,
        ]}
      >
        <WeatherStationOverview
          loading={props.loading}
          weatherStationSummary={props.weatherStationSummary}
          queryWeatherStationSummary={props.queryWeatherStationSummary}
          pivotId={props.pivotId}
        />
      </Modal>
    </>
  );
};

export default WeatherStationOverviewComponent;
