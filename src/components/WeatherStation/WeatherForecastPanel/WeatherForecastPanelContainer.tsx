import { useScreenHook } from '@/hooks/screen';
import { connect } from 'dva';
import WeatherForecastPanelComponent from './WeatherForecastPanelComponent';
import WeatherForecastPanelSkeleton from './WeatherForecastPanelSkeleton';
import { GetWeatherStationModelProps, queryWeatherForecast } from '@/models/weatherstation';

interface WeatherForecastPanelContainerProps {
    weatherStation: GetWeatherStationModelProps;
    queryWeatherForecast: typeof queryWeatherForecast;
}

const WeatherForecastPanelContainer: React.FunctionComponent<WeatherForecastPanelContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  return props.weatherStation.weatherForecast.loading ? (
    <WeatherForecastPanelSkeleton />
  ) : xs ? (
    <WeatherForecastPanelComponent
      weatherForecast={props.weatherStation.weatherForecast.result}
      loading={props.weatherStation.weatherForecast.loading}
      queryWeatherForecast={props.queryWeatherForecast}
    />
  ) : (
    <WeatherForecastPanelComponent
      weatherForecast={props.weatherStation.weatherForecast.result}
      loading={props.weatherStation.weatherForecast.loading}
      queryWeatherForecast={props.queryWeatherForecast}
    />
  );
};

const mapStateToProps = ({ weatherStation }: any) => ({
  weatherStation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    queryWeatherForecast: (props: any) => dispatch(queryWeatherForecast(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecastPanelContainer);
