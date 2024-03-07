import { getPivots } from '@/services/pivot';
import { AxiosError } from 'axios';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

export interface GetPivotModelProps {
  status: {
    id: number;
    status: number;
  }[];
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
};

export default {
  namespace: 'pivot',
  state: {
    result: [],
    status: [],
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
    // Web socket effects
    *queryPivotWs(
      { payload }: { payload: API.GetPivotByFarmParam },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryPivotStart' });

      try {
        const response:  API.GetPivotByFarmResponse = yield call(getPivots, payload);

        yield put({ type: 'queryPivotSuccess', payload: response });
        yield put({ type: 'pivot/onInit', payload: {} });
        yield put({ type: 'setWsStatus', payload: response.map(r => ({
          id: r.id,
          status: WkModels.BaseRadioMessageStatus.NOT_SENT,
        }))});
        
      } catch (error: any) {
        yield put({ type: 'queryPivotError', payload: error });
      }
    },
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.pivot);
      const channels = state.result.map(r => ({
        title: `d@pivot@${r.id}`,
        id: `@EditFarm_pivot${r.id}`,
        binds: [
          {
            callback: ['pivot/wsPivotStandardCallback'],
            event: 'ControllerConfig_standard',
            id: `@EditFarm_pivot${r.id}`,
          },
          {
            callback: ['pivot/wsPivotConfigCallback'],
            event: 'pivot_config',
            id: `@EditFarm_pivot${r.id}`,
          },
        ],
      }));
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({ }, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.pivot);
      const channels = state.result.map(r => ({
        title: `d@pivot@${r.id}`,
        id: `@EditFarm_pivot${r.id}`,
        binds: [
          {
            callback: ['wsPivotStandardCallback'],
            event: 'ControllerConfig_standard',
            id: `@EditFarm_pivot${r.id}`,
          },
          {
            callback: ['wsPivotConfigCallback'],
            event: 'pivot_config',
            id: `@EditFarm_pivot${r.id}`,
          },
        ],
      }));
      yield put({ type: 'setWsStatus', payload: [] });
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
    // Web sockets reducers
    wsPivotStandardCallback(
      state: GetPivotModelProps,
      { payload }: { payload: WkModels.PivotStandardCallbackPayload },
    ) {
      // Communication error status
      if (payload.message_error) {
        const newStatus = state.status.map(s => {
          if (s.id === payload.equipment) {
            return {
              id: s.id,
              status: WkModels.BaseRadioMessageStatus.ERROR,
            }
          }
          return s;
        })
        return { 
          ...state, 
          status: newStatus
        };
      }

      // Web socket incoming status
      const item = state.status.find(s => s.id = payload.equipment);
      if (item && item.status < payload.message_status) {
        const newStatus = state.status.map(s => {
          if (s.id === payload.equipment) {
            return {
              id: s.id,
              status: payload.message_status,
            }
          }
          return s;
        })
        return { 
          ...state, 
          status: newStatus
        };
      }

      // Default return
      return state;
    },
    wsPivotConfigCallback(
      state: GetPivotModelProps,
      { payload }: { payload: WkModels.PivotConfigCallbackPayload },
    ) {
      // Delivery or Sent status
      const newStatus = state.status.map(s => {
        if (s.id === payload.pivot) {
          return {
            id: s.id,
            status: payload.received
              ? WkModels.BaseRadioMessageStatus.DELIVERED
              : WkModels.BaseRadioMessageStatus.SENT,
          }
        }
        return s;
      })
      return { 
        ...state, 
        status: newStatus
      };
    },
    setWsStatus(
      state: GetPivotModelProps,
      { payload }: { payload: { id: number; status: number; }[] }
    ) {
      return {
        ...state,
        status: payload,
      }
    }
  },
};
