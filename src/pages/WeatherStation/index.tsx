import { queryWeatherStation } from '@/models/weatherstation';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import { connect } from 'dva';
import WeatherStationCards from './WeatherStationCards';

const WeatherStation: React.FC<any> = (props) => {
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
          <ProCard>asd</ProCard>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherStation);
