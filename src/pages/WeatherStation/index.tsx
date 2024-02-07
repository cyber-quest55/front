import { queryWeatherForecast, queryWeatherStation } from '@/models/weatherstation';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import { connect } from 'dva';
import WeatherForecastPanel from './WeatherForecastPanel';
import WeatherStationCards from './WeatherStationCards';
import { useEffect } from 'react';
import { useParams } from '@umijs/max';
import WeatherDetailsTabs from './WeatherDetailsTabs';

const WeatherStation: React.FC<any> = (props) => {

  const params = useParams();

  useEffect(() => {
    props.queryWeatherForecast({ farmId: params.farmId as any, pivotId: params.pivotId as any });
  }, [])

  console.log(props.weatherStation.weatherForecast)

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
            <WeatherDetailsTabs weatherForecast={props.weatherStation.weatherForecast.result} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherStation);
