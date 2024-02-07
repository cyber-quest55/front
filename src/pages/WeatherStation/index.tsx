import {
  queryWeatherForecast,
  queryWeatherStation,
  queryWeatherStationCharts,
} from '@/models/weatherstation';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Col, Row } from 'antd';
import { connect } from 'dva';
import { useEffect } from 'react';
import WeatherDetailsTabs from './WeatherDetailsTabs';
import WeatherForecastPanel from './WeatherForecastPanel';
import WeatherStationCards from './WeatherStationCards';

const WeatherStation: React.FC<any> = (props) => {
  const params = useParams();

  useEffect(() => {
    props.queryWeatherForecast({ farmId: params.farmId as any, pivotId: params.pivotId as any });
  }, []);

  return (
    <PageContainer>
      <Row gutter={[14, 14]}>
        <Col md={6}>
          <WeatherStationCards
            weatherStation={props.weatherStation.weatherStation.result}
            loading={props.weatherStation.weatherStation.loading}
            queryWeatherStation={props.queryWeatherStation}
          />
        </Col>
        <Col md={18}>
          <ProCard>
            <WeatherForecastPanel
              weatherForecast={props.weatherStation.weatherForecast.result}
              loading={props.weatherStation.weatherForecast.loading}
              queryWeatherForecast={props.queryWeatherForecast}
            />
            <WeatherDetailsTabs
              weatherForecast={props.weatherStation.weatherForecast.result}
              weatherStationCharts={props.weatherStation.weatherStationCharts.result}
              loading={props.weatherStation.weatherStationCharts.loading}
              queryWeatherStationCharts={props.queryWeatherStationCharts}
            />
          </ProCard>
        </Col>
      </Row>
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
