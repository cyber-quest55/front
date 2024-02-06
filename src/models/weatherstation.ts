import { getWeatherForecast, getWeatherStation } from '@/services/weatherstation';
import { AxiosError } from 'axios';

export interface GetWeatherStationModelProps {
  weatherStation: {
    result: any;
    loaded: boolean;
    loading: boolean;
    error: any;
  };
  weatherForecast: {
    result: any;
    loaded: boolean;
    loading: boolean;
    error: any;
  };
}

export const queryWeatherStation = (payload: API.GetWeatherStationParams) => {
  return {
    type: 'weatherStation/queryWeatherStation',
    payload: payload,
  };
};

export const queryWeatherForecast = (payload: API.GetWeatherForecastParams) => {
  return {
    type: 'weatherStation/queryWeatherForecast',
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
    weatherForecast: {
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
        const response: API.GetWeatherStationResponse = yield call(getWeatherStation, payload);
        yield put({ type: 'queryWeatherStationSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryWeatherStationError', payload: error });
      }
    },
    *queryWeatherForecast(
      { payload }: { payload: API.GetWeatherForecastParams },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryWeatherForecastStart' });
      try {
        const response: API.GetWeatherForecastResponse = yield call(getWeatherForecast, payload);
        yield put({ type: 'queryWeatherForecastSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryWeatherForecastError', payload: error });
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
    queryWeatherForecastError(
      state: GetWeatherStationModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        weatherForecast: {
          ...state.weatherForecast,
          result: null,
          loading: false,
          error: payload.response?.data,
        },
      };
    },
    queryWeatherForecastStart(state: GetWeatherStationModelProps) {
      return {
        ...state,
        weatherForecast: {
          ...state.weatherForecast,
          loading: true,
        },
      };
    },
    queryWeatherForecastSuccess(
      state: GetWeatherStationModelProps,
      { payload }: { payload: API.GetWeatherForecastResponse },
    ) {
      return {
        ...state,
        weatherForecast: {
          loading: false,
          loaded: true,
          result: payload,
          error: {},
        },
      };
    },
  },
};
