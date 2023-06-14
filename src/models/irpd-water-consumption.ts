import { getIrpdWaterConsumption } from '@/services/irpd';
import { AxiosError } from 'axios';

export interface GetIrpdWaterModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  total: number;
  error: any;
}

export default {
  namespace: 'irpdWaterConsumption',

  state: {
    total: 0,
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryIrpdWater({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryIrpdWaterStart' });
      try {
        const { data } = yield call(getIrpdWaterConsumption, payload);
        yield put({ type: 'queryIrpdWaterSuccess', payload: data });
      } catch (error: any) {
        yield put({ type: 'queryIrpdWaterError', payload: error });
      }
    },
  },

  reducers: {
    queryIrpdWaterError(state: GetIrpdWaterModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryIrpdWaterStart(state: GetIrpdWaterModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryIrpdWaterSuccess(state: GetIrpdWaterModelProps, { payload }: { payload: any }) {
      return {
        ...state,
        loading: false,
        loaded: true,
        result: payload.map((item: any, index: number) => ({
          ...item,
          key: `row-key-table-${index}`,
        })),
        error: {},
      };
    },
  },
};
