import { getPivotHistory } from '@/services/pivot';
import { AxiosError } from 'axios';

export interface GetPivotHistoryModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'pivotHistory',

  state: {
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryPivotHistory({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryPivotHistoryStart' });
      try {
        const response: API.GetPivotHistoryResponse = yield call(getPivotHistory, payload);

        yield put({ type: 'queryPivotHistorySuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryPivotHistoryError', payload: error });
      }
    },
  },

  reducers: {
    queryPivotHistoryError(state: GetPivotHistoryModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryPivotHistoryStart(state: GetPivotHistoryModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryPivotHistorySuccess(state: GetPivotHistoryModelProps, { payload }: { payload: API.GetPivotHistoryResponse }) {
      return {
        ...state,
        loading: false,
        loaded: true,
        result: payload.results.map((item: any, index: number) => ({
          ...item.ControllerStream_panel,
          key: `row-key-table-${index}`,
        })),
        error: {},
      };
    },
  },
};
