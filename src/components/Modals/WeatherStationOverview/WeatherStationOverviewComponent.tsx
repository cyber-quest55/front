import { queryWeatherStationSummary } from '@/models/weatherstation-summary';
import WindDirectionRotatedIcon from '@/pages/WeatherStation/WindDirectionRotatedIcon';
import {
  FIVE_MIN_TIMEOUT,
  isNotNull,
  toOneDecimalPlace,
  windDirectionStringByAngle,
} from '@/utils/data/weatherstation';
import { CloudFilled } from '@ant-design/icons';
import { useIntl, useNavigate, useParams } from '@umijs/max';
import { Button, Modal, Row, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { FiWind } from 'react-icons/fi';
import { LuCloudRain } from 'react-icons/lu';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { TbTemperature } from 'react-icons/tb';

interface WeatherInfoProps {
  icon?: JSX.Element;
  iconComponent?: JSX.Element;
  title: string;
  info: number | string | undefined;
  infoUnit?: string;
  loading?: boolean;
}

const WeatherInfo = ({ icon, iconComponent, title, info, infoUnit, loading }: WeatherInfoProps) => {
  return !loading ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {iconComponent ? iconComponent : icon}
        <div style={{ fontSize: 16, maxWidth: 90, padding: '5px 0 10px 0' }}>{title}</div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 600 }}>
        {info ?? '-'} {isNotNull(info) ? infoUnit : ''}
      </div>
    </div>
  ) : (
    <div style={{ height: 130, minWidth: 85 }}>
      <Skeleton.Button active={true} block={true} style={{ height: 130, minWidth: 85 }} />
    </div>
  );
};

interface WeatherStationOverviewProps {
  loading: boolean;
  weatherStationSummary: any;
  queryWeatherStationSummary: typeof queryWeatherStationSummary;
  pivotId: number;
  error: any;
}

const WeatherStationOverview: React.FunctionComponent<WeatherStationOverviewProps> = (props) => {
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

  return props.error?.weatherStationNotFound ? (
    <div>
      {intl.formatMessage({
        id: 'component.pivot.weatherstation.modal.error.notfound',
      })}
    </div>
  ) : (
    <Row justify="space-between" style={{ padding: '15px 0' }}>
      <WeatherInfo
        loading={props.loading}
        icon={<TbTemperature size={25} />}
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.temperature',
        })}
        info={toOneDecimalPlace(props.weatherStationSummary?.temperature)}
        infoUnit={'ºC'}
      />
      <WeatherInfo
        loading={props.loading}
        icon={<MdOutlineWaterDrop size={25} />}
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.moisture',
        })}
        info={props.weatherStationSummary?.humidity}
        infoUnit={'%'}
      />
      <WeatherInfo
        loading={props.loading}
        icon={<FiWind size={25} />}
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
        icon={<LuCloudRain size={25} />}
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.rain',
        })}
        info={props.weatherStationSummary?.rain}
        infoUnit={'mm'}
      />
    </Row>
  );
};

interface WeatherStationOverviewComponentProps {
  loading: boolean;
  weatherStationSummary: any;
  error: any;
  queryWeatherStationSummary: typeof queryWeatherStationSummary;
  pivotId: number;
}

const WeatherStationOverviewComponent: React.FunctionComponent<
  WeatherStationOverviewComponentProps
> = (props) => {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    navigate(`/farms/${params.id}/pivot/${props.pivotId}/weatherstation`);
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
        centered
        onCancel={handleCancel}
        width={600}
        footer={
          props.error?.weatherStationNotFound
            ? null
            : [
                props.loading ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 150 }}>
                      <Skeleton.Button active={true} block={false} />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center' }} key="submit">
                    <Button type="primary" onClick={handleOk}>
                      {intl.formatMessage({
                        id: 'component.pivot.weatherstation.modal.submit',
                      })}{' '}
                      {props.weatherStationSummary?.stationName}
                    </Button>
                  </div>
                ),
              ]
        }
      >
        <WeatherStationOverview
          loading={props.loading}
          weatherStationSummary={props.weatherStationSummary}
          queryWeatherStationSummary={props.queryWeatherStationSummary}
          pivotId={props.pivotId}
          error={props.error}
        />
      </Modal>
    </>
  );
};

export default WeatherStationOverviewComponent;
