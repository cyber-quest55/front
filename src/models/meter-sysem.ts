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
  } as GetMeterSystemModelProps,

  effects: {
    *queryMeterSystem({ payload }: { payload: API.GetMeterSystemParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryMeterSystemStart' });
      try {
        const response: API.GetMeterSystemResponse = yield call(getMeterSystem, payload);
        yield put({ type: 'queryMeterSystemSuccess', payload: response });
        yield put({ type: 'onInit', payload: {} });
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemError', payload: error });
      }
    },
    *queryMeterSystemWs({ payload }: { payload: API.GetMeterSystemParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryMeterSystemStart' });
      try {
        const response: API.GetMeterSystemResponse = yield call(getMeterSystem, payload);
        yield put({ type: 'queryMeterSystemSuccess', payload: response });
        yield put({ type: 'meterSystem/onInit', payload: {} });
        yield put({ type: 'setWsStatus', payload: response.map(r => ({
          id: r.id,
          status: 0,
        }))});
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemError', payload: error });
      }
    },
    // Web socket subscribers
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.meterSystem);
      const channels = state.result.map(r => ({
        title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@imeter@${r.id}`,
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
        title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@imeter@${r.id}`,
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
    *onInitDeviceBox({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.meterSystem);
      const channels = state.result.map(r => ({
          title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@imeter@${r.id}`,
          id: `@DeviceBox_imeter${r.id}`,
          binds: [
            {
              callback: ['meterSystem/wsMeterSystemStreamEventCallback'],
              event: 'IMeterStream_event',
              id: `@DeviceBox_imeter${r.id}`,
            },
            {
              callback: ['meterSystem/wsMeterSystemStreamPeriodicCallback'],
              event: 'IMeterStream_periodic',
              id: `@DeviceBox_imeter${r.id}`,
            },
          ],
      }));
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroyDeviceBox({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.meterSystem);
      const channels = state.result.map(r => ({
        title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@imeter@${r.id}`,
        id: `@DeviceBox_imeter${r.id}`,
        binds: [
          {
            callback: ['meterSystem/wsMeterSystemStreamEventCallback'],
            event: 'IMeterStream_event',
            id: `@DeviceBox_imeter${r.id}`,
          },
          {
            callback: ['meterSystem/wsMeterSystemStreamPeriodicCallback'],
            event: 'IMeterStream_periodic',
            id: `@DeviceBox_imeter${r.id}`,
          },
        ],
      }));
      yield getSocketBinds(channels, put, 'unsubscribe');
    },
    // Web sockets callback
    *wsMeterSystemStandardCallback(
      { payload }: { payload: WsMeterSystemModels.MeterSystemStandardCallbackPayload  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsMeterSystemStandardCallbackSuccess', payload });
    },
    *wsMeterSystemStreamEventCallback(
      { payload }: { payload: WsMeterSystemModels.MeterSystemEventCallbackPayload  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsMeterSystemStreamEventSuccess', payload });
    },
    *wsMeterSystemStreamPeriodicCallback(
      { payload }: { payload: WsMeterSystemModels.MeterSystemPeriodicStreamCallbackPayload  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsMeterSystemStreamPeriodicSuccess', payload });
    }
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
        const status = item.imeter_set[0]?.latest_event_stream.content?.imanage_master_status.status;
        const latLng = item.position.split(',');

        // Retrieve meter system values
        const imeterValue = item.imeter_set[0].latest_periodic_stream.content.imanage_sensor_measure_value[0].value;
        const maxValue = item.imeter_set[0].latest_config.graphic_max_value;
        const imeterSensorValue = item.imeter_set[0].latest_periodic_stream.content.imanage_sensor_measure_value[0].value / 100;
    
        // Mapped payload
        mapper.push({
          id: item.id,
          centerLat: parseFloat(latLng[0]),
          centerLng: parseFloat(latLng[1]),
          name: payload[index].name,
          updated: new Date(payload[index].updated).toLocaleString(),
          deviceColor: getIrpdColor(status),
          statusText: getMeterStatus(status),
          imeterSetId: item?.imeter_set[0]?.id,
          percentage: Number(((imeterValue / 100 / maxValue) * 100).toFixed(1)),
          meterLevel: imeterSensorValue,
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
    setWsStatus(
      state: GetMeterSystemModelProps,
      { payload }: { payload: { id: number; status: number; }[] }
    ) {
      return {
        ...state,
        status: payload,
      }
    },
    setWsLoadingStatus(
      state: GetMeterSystemModelProps,
      { payload }: { payload: { id?: number } }
    ) {
      if (payload.id) {
        const newStatus = state.status.map(s => {
          if (s.id === payload.id) {
            return {
              id: s.id,
              status: -1,
            }
          }
          return s
        });
        return {
          ...state,
          status: newStatus
        }
      }
      
      return {
        ...state,
        status: state.status.map(s => ({
          id: s.id,
          status: -1,
        }))
      }
    },
    // Web sockets reducers
    wsMeterSystemStandardCallbackSuccess(
      state: GetMeterSystemModelProps,
      { payload }: { payload: WsMeterSystemModels.MeterSystemStandardCallbackPayload },
    ) {
      // Communication error status
      if (payload.message_error) {
        const newStatus = state.status.map(s => {
          if (s.id === payload.equipment) {
            return {
              id: s.id,
              status: 3,
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
    wsMeterSystemStreamEventSuccess(
      state: GetMeterSystemModelProps,
      { payload }: { payload: WsMeterSystemModels.MeterSystemEventCallbackPayload },
    ) {
      const meterIndex = state.result.findIndex(r => r.id === payload.equipment);
      
      if (meterIndex >= 0) {
        const newResults = state.result.map((r, i) => {
          if (i === meterIndex) {
            const deviceColor = getIrpdColor(payload.content.imanage_master_status.status);
            const statusText = getMeterStatus(payload.content.imanage_master_status.status);
            return {
              ...r,
              deviceColor,
              statusText,
              updated: new Date(payload.created).toLocaleString(),
            }
          } 
          return r;
        });
    
        return {
          ...state,
          result: newResults,
        };
      }

      return state;
    },
    wsMeterSystemStreamPeriodicSuccess(
      state: GetMeterSystemModelProps,
      { payload }: { payload: WsMeterSystemModels.MeterSystemPeriodicStreamCallbackPayload },
    ) {
      const meterIndex = state.result.findIndex(r => r.id === payload.equipment);
      
      if (meterIndex >= 0) {
        const newResults = state.result.map((r, i) => {
          if (i === meterIndex) {
            const deviceColor = getIrpdColor(payload.content.imanage_master_status.status);
            const statusText = getMeterStatus(payload.content.imanage_master_status.status);
            return {
              ...r,
              deviceColor,
              statusText,
              updated: new Date(payload.created).toLocaleString(),
            }
          } 
          return r;
        });
    
        return {
          ...state,
          result: newResults,
        };
      }

      return state;
    },
  },
};
