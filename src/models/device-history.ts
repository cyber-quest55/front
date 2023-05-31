import { getDeviceHistory } from '@/services/device-history';
import { AxiosError } from 'axios';

export interface GetDeviceHistoryModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'deviceHistory',

  state: {
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryDeviceHistory({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
 
      yield put({ type: 'queryDeviceHistoryStart' });
      try {
        const { data } = yield call(getDeviceHistory, payload);
 
        yield put({ type: 'queryDeviceHistorySuccess', payload: data });
      } catch (error: any) {
        yield put({ type: 'queryDeviceHistoryError', payload: error });
      }
    },
  },

  reducers: {
    queryDeviceHistoryError(
      state: GetDeviceHistoryModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryDeviceHistoryStart(state: GetDeviceHistoryModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryDeviceHistorySuccess(state: GetDeviceHistoryModelProps, { payload }: { payload: any }) {
      return {
        ...state,
        loading: false,
        loaded: true,
        result: payload.results.map((item: any, index: number) => ({...item.ControllerStream_panel, key:`row-key-table-${index}` })),
        error: {},
      };
    },
  },
};
