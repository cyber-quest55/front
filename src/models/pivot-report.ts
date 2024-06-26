import { getPivotReports } from '@/services/pivot';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';

export interface GetPivotReportModelProps {
  result: API.GetPivotReportResponse;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryPivotReport = (payload: API.GetPivotReportParams) => {
  return {
    type: 'pivotReport/queryPivotReport',
    payload: payload,
  };
};

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
      const start_date = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
      const end_date = dayjs().format('YYYY-MM-DD')
      try {
        const response: API.GetPivotReportResponse = yield call(getPivotReports, payload, {
          start_date ,
          end_date,
        });
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
