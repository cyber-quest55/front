import {
  queryWeatherForecast,
  queryWeatherStation,
  queryWeatherStationCharts,
} from '@/models/weatherstation';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { Col, Row } from 'antd';
import { connect } from 'dva';
import { useEffect } from 'react';
import WeatherDetailsTabs from './WeatherDetailsTabs';
import WeatherForecastPanel from './WeatherForecastPanel';
import WeatherStationCards from './WeatherStationCards';

const WeatherStation: React.FC<any> = (props) => {
  const params = useParams();
  const intl = useIntl();

  useEffect(() => {
    props.queryWeatherForecast({ farmId: params.farmId as any, pivotId: params.pivotId as any });
  }, []);

  return (
    <PageContainer>
      {props.weatherStation.weatherStation.error?.weatherStationNotFound ? (
        <div>
          {intl.formatMessage({
            id: 'component.pivot.weatherstation.modal.error.notfound',
          })}
        </div>
      ) : (
        <Row gutter={[14, 14]}>
          <Col xl={7} xs={24}>
            <WeatherStationCards
              weatherStation={props.weatherStation.weatherStation.result}
              isWeatherStationOffline={props.weatherStation.isWeatherStationOffline}
              loading={props.weatherStation.weatherStation.loading}
              queryWeatherStation={props.queryWeatherStation}
            />
          </Col>
          <Col xl={17} xs={24}>
            <ProCard>
              <WeatherForecastPanel
                weatherForecast={props.weatherStation.weatherForecast.result}
                loading={props.weatherStation.weatherForecast.loading}
                queryWeatherForecast={props.queryWeatherForecast}
              />
              <WeatherDetailsTabs
                weatherForecast={props.weatherStation.weatherForecast.result}
                weatherStationCharts={props.weatherStation.weatherStationCharts.result}
                weatherStation={props.weatherStation.weatherStation.result}
                chartLoading={props.weatherStation.weatherStationCharts.loading}
                forecastLoading={props.weatherStation.weatherForecast.loading}
                queryWeatherStationCharts={props.queryWeatherStationCharts}
              />
            </ProCard>
          </Col>
        </Row>
      )}
    </PageContainer>
  );
};

const mapStateToProps = ({ weatherStation }: any) => ({
  weatherStation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryWeatherStation: (props: any) => dispatch(queryWeatherStation(props)),
  queryWeatherForecast: (props: any) => dispatch(queryWeatherForecast(props)),
  queryWeatherStationCharts: (props: any) => dispatch(queryWeatherStationCharts(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherStation);
