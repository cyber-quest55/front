import { getWeatherStationSummary } from '@/services/weatherstation';
import { AxiosError } from 'axios';

export interface GetWeatherStationSummaryModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryWeatherStationSummary = (payload: API.GetIrpdParams) => {
  return {
    type: 'weatherStationSummary/queryWeatherStationSummary',
    payload: payload,
  };
};

export default {
  namespace: 'weatherStationSummary',

  state: {
    result: null,
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryWeatherStationSummary({ payload }: { payload: API.GetWeatherStationSummaryParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryWeatherStationSummaryStart' });
      try {
        const response: API.GetIrpdResponse = yield call(getWeatherStationSummary, payload);
        yield put({ type: 'queryWeatherStationSummarySuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryWeatherStationSummaryError', payload: error });
      }
    },
  },

  reducers: {
    queryWeatherStationSummaryError(state: GetWeatherStationSummaryModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryWeatherStationSummaryStart(state: GetWeatherStationSummaryModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryWeatherStationSummarySuccess(state: GetWeatherStationSummaryModelProps, { payload }: { payload: API.GetWeatherStationSummaryResponse }) {

      return {
        ...state,
        loading: false,
        loaded: true,
        result: payload,
        error: {},
      };
    },
  },
};
