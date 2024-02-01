import { getWeatherStation } from '@/services/weatherstation';
import { AxiosError } from 'axios';

export interface GetWeatherStationModelProps {
  weatherStation: {
    result: any;
    loaded: boolean;
    loading: boolean;
    error: any;
  };
}

export const queryWeatherStation = (payload: API.GetIrpdParams) => {
  return {
    type: 'weatherStation/queryWeatherStation',
    payload: payload,
  };
};

export default {
  namespace: 'weatherStation',

  state: {
    weatherStation: {
      result: null,
      loaded: false,
      loading: true,
      error: {},
    },
  },

  effects: {
    *queryWeatherStation(
      { payload }: { payload: API.GetWeatherStationParams },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryWeatherStationStart' });
      try {
        const response: API.GetIrpdResponse = yield call(getWeatherStation, payload);
        yield put({ type: 'queryWeatherStationSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryWeatherStationError', payload: error });
      }
    },
  },

  reducers: {
    queryWeatherStationError(
      state: GetWeatherStationModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        weatherStation: {
          ...state.weatherStation,
          result: null,
          loading: false,
          error: payload.response?.data,
        },
      };
    },
    queryWeatherStationStart(state: GetWeatherStationModelProps) {
      return {
        ...state,
        weatherStation: {
          ...state.weatherStation,
          loading: true,
        },
      };
    },
    queryWeatherStationSuccess(
      state: GetWeatherStationModelProps,
      { payload }: { payload: API.GetWeatherStationResponse },
    ) {
      return {
        ...state,
        weatherStation: {
          loading: false,
          loaded: true,
          result: payload,
          error: {},
        },
      };
    },
  },
};
