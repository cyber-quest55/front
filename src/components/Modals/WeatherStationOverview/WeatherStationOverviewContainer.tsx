import { useScreenHook } from '@/hooks/screen';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import {
  GetWeatherStationSummaryModelProps,
  queryWeatherStationSummary,
} from '@/models/weatherstation-summary';
import { connect } from 'dva';
import WeatherStationOverviewComponent from './WeatherStationOverviewComponent';
import WeatherStationOverviewSkeleton from './WeatherStationOverviewSkeleton';

interface WeatherStationOverviewContainerProps {
  weatherStationSummary: GetWeatherStationSummaryModelProps;
  pivotById: GetPivotByIdModelProps;
  queryWeatherStationSummary: typeof queryWeatherStationSummary;
}

const WeatherStationOverviewContainer: React.FunctionComponent<
  WeatherStationOverviewContainerProps
> = (props) => {
  const { xs } = useScreenHook();

  return false ? (
        <WeatherStationOverviewSkeleton />
      ) : xs ? (
        <WeatherStationOverviewComponent
          loading={props.weatherStationSummary.loading}
          weatherStationSummary={props.weatherStationSummary.result}
          error={props.weatherStationSummary.error}
          queryWeatherStationSummary={props.queryWeatherStationSummary}
          pivotId={props.pivotById.result.id}
        />
      ) : (
        <WeatherStationOverviewComponent
          loading={props.weatherStationSummary.loading}
          weatherStationSummary={props.weatherStationSummary.result}
          error={props.weatherStationSummary.error}
          queryWeatherStationSummary={props.queryWeatherStationSummary}
          pivotId={props.pivotById.result.id}
        />
      )
};

const mapStateToProps = ({ weatherStationSummary, pivotById }: any) => ({
  weatherStationSummary,
  pivotById,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryWeatherStationSummary: (params: any) => dispatch(queryWeatherStationSummary(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherStationOverviewContainer);
