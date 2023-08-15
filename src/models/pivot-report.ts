import { getPivotReports } from '@/services/pivot';
import { AxiosError } from 'axios';

export interface GetPivotReportModelProps {
  result: Models.PivotReport;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'pivotReport',

  state: {
    result: {},
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryPivotReport({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryPivotReportStart' });
      try {
        const response: API.GetPivotReportResponse = yield call(getPivotReports, payload);
        yield put({ type: 'queryPivotReportSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryPivotReportError', payload: error });
      }
    },
  },

  reducers: {
    queryPivotReportError(state: GetPivotReportModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryPivotReportStart(state: GetPivotReportModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryPivotReportSuccess(
      state: GetPivotReportModelProps,
      { payload }: { payload: API.GetPivotReportResponse },
    ) {
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
