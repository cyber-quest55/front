 import { getCentral } from '@/services/central';
import { AxiosError } from '@umijs/max';

export interface GetCentralModelProps {
  result: Models.Central[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'central',

  state: {
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryCentral({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryCentralStart' });
      try {
        const { data } = yield call(getCentral, payload);
        yield put({ type: 'queryCentralSuccess', payload: data });
      } catch (error: any) {
        yield put({ type: 'queryCentralError', payload: error });
      }
    },
  },

  reducers: {
    queryCentralError(state: GetCentralModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryCentralStart(state: GetCentralModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryCentralSuccess(state: GetCentralModelProps, { payload }: { payload: API.GetCentralResponse }) {
      const mapper = [];

      /**
       * Observações:
       * Validar o latestPanelStream
       * Validar latestGpsPosition linha 184, 196
       */ 
        const item = payload.list ;

        const latLng = item.location.split(',');
        mapper.push({
          id: item.id,
          centerLat: parseFloat(latLng[0]),
          centerLng: parseFloat(latLng[1]),
          name: item.name,
          updated: new Date(item.updated).toLocaleString()
        });
      

      return {
        ...state,
        loading: false,
        loaded: true,
        result: mapper,
        error: {},
      };
    },
  },
};
