import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter';
import { getMeterSystem } from '@/services/metersystem';
import { getIrpdColor } from '@/utils/formater/get-irpd-color';
import { getMeterStatus } from '@/utils/formater/get-meter-status';
import { AxiosError } from 'axios';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

export interface GetMeterSystemModelProps {
  status: {
    id: number;
    status: number;
  }[];
  result: LakeLevelMeterProps[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryMeterSystem = (payload: API.GetMeterSystemParams) => {
  return {
    type: 'meterSystem/queryMeterSystem',
    payload: payload,
  };
};

export const queryMeterSystemWs = (payload: API.GetMeterSystemParams) => {
  return {
    type: 'meterSystem/queryMeterSystemWs',
    payload: payload,
  };
};

export const destroyMeterSystemWs = () => {
  return {
    type: 'meterSystem/onDestroy',
    payload: {},
  };
};

export default {
  namespace: 'meterSystem',

  state: {
    status: [],
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryMeterSystem({ payload }: { payload: API.GetMeterSystemParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryMeterSystemStart' });
      try {
        const response: API.GetMeterSystemResponse = yield call(getMeterSystem, payload);
        yield put({ type: 'queryMeterSystemSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemError', payload: error });
      }
    },
    // Web socket effects
    *queryMeterSystemWs({ payload }: { payload: API.GetMeterSystemParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryMeterSystemStart' });
      try {
        const response: API.GetMeterSystemResponse = yield call(getMeterSystem, payload);
        yield put({ type: 'queryMeterSystemSuccess', payload: response });
        yield put({ type: 'meterSystem/onInit', payload: {} });
        yield put({ type: 'setWsStatus', payload: response.map(r => ({
          id: r.id,
          status: WkModels.BaseRadioMessageStatus.NOT_SENT,
        }))});
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemError', payload: error });
      }
    },
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.meterSystem);
      const channels = state.result.map(r => ({
        title: `d@imeter@${r.id}`,
        id: `@EditFarm_metersystem${r.id}`,
        binds: [
          {
            callback: ['meterSystem/wsMeterSystemStandardCallback'],
            event: 'IMeterConfig_standard',
            id: `@EditFarm_metersystem${r.id}`,
          },
        ],
      }));
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({ }, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.meterSystem);
      const channels = state.result.map(r => ({
        title: `d@imeter@${r.id}`,
        id: `@EditFarm_metersystem${r.id}`,
        binds: [
          {
            callback: ['meterSystem/wsMeterSystemStandardCallback'],
            event: 'IMeterConfig_standard',
            id: `@EditFarm_metersystem${r.id}`,
          },
        ],
      }));
      yield put({ type: 'setWsStatus', payload: [] });
      yield getSocketBinds(channels, put, 'unsubscribe');
    },
  },

  reducers: {
    queryMeterSystemError(state: GetMeterSystemModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryMeterSystemStart(state: GetMeterSystemModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryMeterSystemSuccess(
      state: GetMeterSystemModelProps,
      { payload }: { payload: API.GetMeterSystemResponse },
    ) {
      const mapper: LakeLevelMeterProps[] = [];

      /**
       * Observações:
       * Validar o latestPanelStream
       * Validar latestGpsPosition linha 184, 196
       */

      for (let index = 0; index < payload.length; index++) {
        const item = payload[index];
        const status =
          item.imeter_set[0]?.latest_event_stream.content?.imanage_master_status.status;

        const latLng = item.position.split(',');
        mapper.push({
          id: item.id,
          centerLat: parseFloat(latLng[0]),
          centerLng: parseFloat(latLng[1]),
          name: payload[index].name,
          updated: new Date(payload[index].updated).toLocaleString(),
          deviceColor: getIrpdColor(status),
          statusText: getMeterStatus(status),
          imeterSetId: item?.imeter_set[0]?.id,
        });
      }

      return {
        ...state,
        loading: false,
        loaded: true,
        result: mapper,
        error: {},
      };
    },
    // Web sockets reducers
    wsMeterSystemStandardCallback(
      state: GetMeterSystemModelProps,
      { payload }: { payload: WkModels.MeterSystemStandardCallbackPayload },
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
      if (item && item.status <= payload.message_status) {
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
    setWsStatus(
      state: GetMeterSystemModelProps,
      { payload }: { payload: { id: number; status: number; }[] }
    ) {
      return {
        ...state,
        status: payload,
      }
    }
  },
};
