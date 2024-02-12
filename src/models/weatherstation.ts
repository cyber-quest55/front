import {
  getWeatherForecast,
  getWeatherStation,
  getWeatherStationCharts,
} from '@/services/weatherstation';
import { AxiosError } from 'axios';
import moment from 'moment';

const isWeatherStationOffline = (payload: API.GetWeatherStationResponse) => moment().diff(moment(payload.lastCommunication), 'hours') > 1;

export interface GetWeatherStationModelProps {
  isWeatherStationOffline: boolean;
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
  weatherStationCharts: {
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

export const queryWeatherStationCharts = (payload: API.GetWeatherStationChartsParams) => {
  return {
    type: 'weatherStation/queryWeatherStationCharts',
    payload: payload,
  };
};

export default {
  namespace: 'weatherStation',

  state: {
    isWeatherStationOffline: false,
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
    weatherStationCharts: {
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
    *queryWeatherStationCharts(
      { payload }: { payload: API.GetWeatherStationChartsParams },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryWeatherStationChartsStart' });
      try {
        const response: API.GetWeatherStationChartsResponse = yield call(
          getWeatherStationCharts,
          payload,
        );
        yield put({ type: 'queryWeatherStationChartsSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryWeatherStationChartsError', payload: error });
      }
    },
  },

  reducers: {
    queryWeatherStationError(
      state: GetWeatherStationModelProps,
      { payload }: { payload: AxiosError },
    ) {
      const data: any = payload.response?.data
      if (data.error === 'WEATHER_STATION_NOT_FOUND') {
        return {
          ...state,
          weatherStation: {
            error: {
              weatherStationNotFound: true,
            },
            loading: false,
          }
        };
      }
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
        isWeatherStationOffline: isWeatherStationOffline(payload),
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
      const data: any = payload.response?.data
      console.log(payload.response)
      if (data.error === 'WEATHER_STATION_NOT_FOUND') {
        return {
          ...state,
          weatherStation: {
            error: {
              weatherStationNotFound: true,
            },
            loading: false,
          }
        };
      }
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

    queryWeatherStationChartsError(
      state: GetWeatherStationModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        weatherStationCharts: {
          ...state.weatherStationCharts,
          result: null,
          loading: false,
          error: payload.response?.data,
        },
      };
    },
    queryWeatherStationChartsStart(state: GetWeatherStationModelProps) {
      return {
        ...state,
        weatherStationCharts: {
          ...state.weatherStationCharts,
          loading: true,
        },
      };
    },
    queryWeatherStationChartsSuccess(
      state: GetWeatherStationModelProps,
      { payload }: { payload: API.GetWeatherStationChartsResponse },
    ) {
      return {
        ...state,
        weatherStationCharts: {
          loading: false,
          loaded: true,
          result: payload,
          error: {},
        },
      };
    },
  },
};
