import { getPivots } from '@/services/pivot';
import { AxiosError } from 'axios';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

export interface GetPivotModelProps {
  result: API.GetPivotByFarmResponse;
  loading: boolean;
  loaded: boolean;
  selectedPivot: any;
  error: any;
}

export const queryPivot  = (payload: API.GetPivotByFarmParam) => {
  return {
    type: 'pivot/queryPivot',
    payload: payload,
  };
};

export const queryPivotWs  = (payload: API.GetPivotByFarmParam) => {
  return {
    type: 'pivot/queryPivotWs',
    payload: payload,
  };
};

export const destroyPivotWs = () => {
  return {
    type: 'pivot/onDestroy',
    payload: {},
  };
}


export default {
  namespace: 'pivot',

  state: {
    result: [],
    loaded: false,
    loading: true,
    selectedPivot: {},
    error: {},
  },

  effects: {
    *queryPivot(
      { payload }: { payload: API.GetPivotByFarmParam },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryPivotStart' });

      try {
        const response:  API.GetPivotByFarmResponse = yield call(getPivots, payload);

        yield put({ type: 'queryPivotSuccess', payload: response });
        
      } catch (error: any) {
        yield put({ type: 'queryPivotError', payload: error });
      }
    },
    *queryPivotWs(
      { payload }: { payload: API.GetPivotByFarmParam },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryPivotStart' });

      try {
        const response:  API.GetPivotByFarmResponse = yield call(getPivots, payload);

        yield put({ type: 'queryPivotSuccess', payload: response });
        yield put({ type: 'pivot/onInit', payload: {} })
        
      } catch (error: any) {
        yield put({ type: 'queryPivotError', payload: error });
      }
    },
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.pivot);
      console.log('[pivot ws init]');

      const channels = state.result.map(r => ({
        title: `d@pivot@${r.id}`,
        id: r.id,
        binds: [
          {
            callback: ['terst'],
            event: 'ControllerConfig_standard',
            id: r.id,
          },
          {
            callback: ['terst'],
            event: 'pivot_config',
            id: r.id,
          },
        ],
      }));
      
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({ }, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.pivot);
      console.log('[pivot ws destroy]');

      const channels = state.result.map(r => ({
        title: `d@pivot@${r.id}`,
        id: r.id,
        binds: [
          {
            callback: ['terst'],
            event: 'ControllerConfig_standard',
            id: r.id,
          },
          {
            callback: ['terst'],
            event: 'pivot_config',
            id: r.id,
          },
        ],
      }));

      yield getSocketBinds(channels, put, 'unsubscribe');
    },
  },

  reducers: {
    queryPivotError(state: GetPivotModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        loading: false,
        error: payload.response?.data,
      };
    },
    queryPivotStart(state: GetPivotModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryPivotSuccess(
      state: GetPivotModelProps,
      { payload }: { payload: API.GetPivotByFarmResponse },
    ) {


      return {
        ...state,
        loading: false,
        loaded: true,
        result: payload,
        selectedPivot: payload[0],
        error: {},
      };
    },
    setSelectedPivot(state: GetPivotModelProps, { payload }: { payload: any }) {
      return {
        ...state,
        selectedPivot: payload,
      };
    },
  },
};
