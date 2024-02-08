import { CloudFilled } from '@ant-design/icons';
import { useIntl, useNavigate, useParams } from '@umijs/max';
import { Button, Modal, Row, Skeleton } from 'antd';
import React, { useEffect } from 'react';

import { TbTemperature } from 'react-icons/tb';
import { LuCloudRain } from 'react-icons/lu';
import { FiWind } from 'react-icons/fi';
import { MdOutlineWaterDrop } from "react-icons/md";
import { FIVE_MIN_TIMEOUT, isNotNull, toOneDecimalPlace, windDirectionStringByAngle } from '@/utils/data/weatherstation';
import WindDirectionRotatedIcon from '@/pages/WeatherStation/WindDirectionRotatedIcon';

interface WeatherInfoProps {
  icon?: JSX.Element;
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
        {iconComponent ? iconComponent : icon}
        <div style={{ fontSize: 16, maxWidth: 85, padding: '5px 0 10px 0' }}>{title}</div>
      </div>
      <p style={{ fontSize: 24, fontWeight: 600, marginTop: 'auto' }}>
        {info ?? '-'} {isNotNull(info) ? infoUnit : ''}
      </p>
    </div>
  ) : (
    <Skeleton style={{ transform: 'none', height: 130, width: 85 }} />
  );

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

const WeatherStationOverviewComponent: React.FunctionComponent<any> = (props) => {
  const intl = useIntl();
  const params = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    navigate(`/farms/${params.id}/pivot/${props.pivotId}/weatherstation`)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button icon={<CloudFilled />} onClick={showModal}  />

      <Modal
        destroyOnClose
        title={intl.formatMessage({
          id: 'component.pivot.weatherstation.modal.title',
        })}
        open={isModalOpen}
        centered
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
