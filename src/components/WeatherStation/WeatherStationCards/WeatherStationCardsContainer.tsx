import { useScreenHook } from '@/hooks/screen';
import { GetWeatherStationModelProps,  queryWeatherStation } from '@/models/weatherstation';
import { connect } from 'dva';
import WeatherStationCardsComponent from './WeatherStationCardsComponent';
import WeatherStationCardsSkeleton from './WeatherStationCardsSkeleton';
import { useEffect } from 'react';
import { useParams } from '@umijs/max';
import { FIVE_MIN_TIMEOUT } from '@/utils/data/weatherstation';

interface WeatherStationCardsContainerProps {
  weatherStation: GetWeatherStationModelProps;
  isWeatherStationOffline: boolean;
  queryWeatherStation: typeof queryWeatherStation;
}

const WeatherStationCardsContainer: React.FunctionComponent<WeatherStationCardsContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();
  const params = useParams();

  useEffect(() => {
    props.queryWeatherStation({ farmId: params.farmId as any, pivotId: params.pivotId as any });
  }, []);

  useEffect(() => {
    const requestInterval = setInterval(() => {
      props.queryWeatherStation({ farmId: params.farmId as any, pivotId: params.pivotId as any });
    }, FIVE_MIN_TIMEOUT);
    return () => {
      clearInterval(requestInterval);
    };
  }, []);

  return props.weatherStation.weatherStation.loading ? (
    <WeatherStationCardsSkeleton />
  ) : xs ? (
    <WeatherStationCardsComponent
      weatherStation={props.weatherStation.weatherStation.result}
      isOffline={!props.weatherStation.weatherStation.loading && props.weatherStation.isWeatherStationOffline}
    />
  ) : (
    <WeatherStationCardsComponent
      weatherStation={props.weatherStation.weatherStation.result}
      isOffline={!props.weatherStation.weatherStation.loading && props.weatherStation.isWeatherStationOffline}
    />
  );
};

const mapStateToProps = ({ weatherStation }: any) => ({
  weatherStation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    queryWeatherStation: (props: any) => dispatch(queryWeatherStation(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherStationCardsContainer);
