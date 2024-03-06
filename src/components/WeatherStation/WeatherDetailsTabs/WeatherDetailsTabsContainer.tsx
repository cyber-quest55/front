import { useScreenHook } from '@/hooks/screen';
import { GetWeatherStationModelProps, queryWeatherStationCharts } from '@/models/weatherstation';
import { connect } from 'dva';
import WeatherDetailsTabsComponent from './WeatherDetailsTabsComponent';
import WeatherDetailsTabsSkeleton from './WeatherDetailsTabsSkeleton';

interface WeatherDetailsTabsContainerProps {
  weatherStation: GetWeatherStationModelProps;
  chartLoading: boolean;
  forecastLoading: boolean;
  queryWeatherStationCharts: typeof queryWeatherStationCharts;
}

const WeatherDetailsTabsContainer: React.FunctionComponent<WeatherDetailsTabsContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  return false ? (
    <WeatherDetailsTabsSkeleton />
  ) : xs ? (
    <WeatherDetailsTabsComponent
      weatherForecast={props.weatherStation.weatherForecast.result}
      weatherStationCharts={props.weatherStation.weatherStationCharts.result}
      weatherStation={props.weatherStation.weatherStation.result}
      chartLoading={props.weatherStation.weatherStationCharts.loading}
      forecastLoading={props.weatherStation.weatherForecast.loading}
      queryWeatherStationCharts={props.queryWeatherStationCharts}
    />
  ) : (
    <WeatherDetailsTabsComponent
      weatherForecast={props.weatherStation.weatherForecast.result}
      weatherStationCharts={props.weatherStation.weatherStationCharts.result}
      weatherStation={props.weatherStation.weatherStation.result}
      chartLoading={props.weatherStation.weatherStationCharts.loading}
      forecastLoading={props.weatherStation.weatherForecast.loading}
      queryWeatherStationCharts={props.queryWeatherStationCharts}
    />
  );
};

const mapStateToProps = ({ weatherStation }: any) => ({
  weatherStation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryWeatherStationCharts: (props: any) => dispatch(queryWeatherStationCharts(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDetailsTabsContainer);
