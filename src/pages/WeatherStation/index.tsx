import WeatherDetailsTabsContainer from '@/components/WeatherStation/WeatherDetailsTabs/WeatherDetailsTabsContainer';
import WeatherForecastPanelContainer from '@/components/WeatherStation/WeatherForecastPanel/WeatherForecastPanelContainer';
import WeatherStationCardsContainer from '@/components/WeatherStation/WeatherStationCards/WeatherStationCardsContainer';
import { GetWeatherStationModelProps, queryWeatherForecast } from '@/models/weatherstation';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { Col, Row } from 'antd';
import { connect } from 'dva';
import { useEffect } from 'react';

interface WeatherStationProps {
  queryWeatherForecast: typeof queryWeatherForecast;
  weatherStation: GetWeatherStationModelProps;
}

const WeatherStation: React.FC<WeatherStationProps> = (props) => {
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
            <WeatherStationCardsContainer />
          </Col>
          <Col xl={17} xs={24}>
            <ProCard>
              <WeatherForecastPanelContainer />
              <WeatherDetailsTabsContainer />
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
  queryWeatherForecast: (props: any) => dispatch(queryWeatherForecast(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherStation);
