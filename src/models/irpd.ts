import { WaterPumpProps } from '@/components/Devices/WaterPump';
import { getIrpds } from '@/services/irpd';
import { getIrpdColor } from '@/utils/formater/get-irpd-color';
import { getIrpdStatus } from '@/utils/formater/get-irpd-status';
import { AxiosError } from 'axios';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

export interface GetIrpdModelProps {
  result: WaterPumpProps[];
  loading: boolean;
  loaded: boolean;
  error: any;
  status: {
    id: number;
    status: number;
  }[];
}

export const queryIrpd = (payload: API.GetIrpdParams) => {
  return {
    type: 'irpd/queryIrpd',
    payload: payload,
  };
};

export const queryIrpdWs = (payload: API.GetIrpdParams) => {
  return {
    type: 'irpd/queryIrpdWs',
    payload: payload,
  };
};

export const destroyIrpdWs = () => {
  return {
    type: 'irpd/onDestroy',
    payload: {},
  };
};

export default {
  namespace: 'irpd',

  state: {
    status: [],
    result: [],
    loaded: false,
    loading: true,
    error: {},
  } as GetIrpdModelProps,

  effects: {
    *queryIrpd({ payload }: { payload: API.GetIrpdParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryIrpdStart' });
      try {
        const response: API.GetIrpdResponse = yield call(getIrpds, payload);
        yield put({ type: 'queryIrpdSuccess', payload: response });
        yield put({ type: 'irpd/onInitDeviceBox', payload: {} });
      } catch (error: any) {
        yield put({ type: 'queryIrpdError', payload: error });
      }
    },
    *queryIrpdWs({ payload }: { payload: API.GetIrpdParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryIrpdStart' });
      try {
        const response: API.GetIrpdResponse = yield call(getIrpds, payload);
        yield put({ type: 'queryIrpdSuccess', payload: response });
        yield put({ type: 'irpd/onInit', payload: {} });
        yield put({ type: 'setWsStatus', payload: response.map(r => ({
          id: r.id,
          status: 0,
        }))});
      } catch (error: any) {
        yield put({ type: 'queryIrpdError', payload: error });
      }
    },
    // Web socket subscribers
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.irpd);
      const channels = state.result.map(r => ({
        title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@irpd@${r.id}`,
        id: `@EditFarm_irpd${r.id}`,
        binds: [
          {
            callback: ['irpd/wsIrpdStandardCallback'],
            event: 'IrpdConfigV5_standard',
            id: `@EditFarm_irpd${r.id}`,
          },
          {
            callback: ['irpd/wsIrpdConfigCallback'],
            event: 'irpd_config',
            id: `@EditFarm_irpd${r.id}`,
          },
        ],
      }));
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({ }, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.irpd);
      const channels = state.result.map(r => ({
        title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@irpd@${r.id}`,
        id: `@EditFarm_irpd${r.id}`,
        binds: [
          {
            callback: ['irpd/wsIrpdStandardCallback'],
            event: 'IrpdConfigV5_standard',
            id: `@EditFarm_irpd${r.id}`,
          },
          {
            callback: ['irpd/wsIrpdConfigCallback'],
            event: 'irpd_config',
            id: `@EditFarm_irpd${r.id}`,
          },
        ],
      }));
      yield put({ type: 'setWsStatus', payload: [] });
      yield getSocketBinds(channels, put, 'unsubscribe');
    },
    *onInitDeviceBox({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.irpd);
      console.log('[onInitDeviceBox]', state);
      const channels = state.result.map(r => ({
          title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@irpd@${r.id}`,
          id: `@DeviceBox_irpd${r.id}`,
          binds: [
            {
              callback: ['irpd/wsIrpdPressureStreamCallback'],
              event: 'irpd_pressure_stream',
              id: `@DeviceBox_irpd${r.id}`,
            },
            {
              callback: ['irpd/wsIrpdStreamV5EventCallback'],
              event: 'IrpdStreamV5_event',
              id: `@DeviceBox_irpd${r.id}`,
            },
            {
              callback: ['irpd/wsIrpdStreamV5PeriodicCallback'],
              event: 'IrpdStreamV5_periodic',
              id: `@DeviceBox_irpd${r.id}`,
            },
          ],
      }));
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroyDeviceBox({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.irpd);
      console.log('[onDestroyDeviceBox]', state);
      const channels = state.result.map(r => ({
        title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@irpd@${r.id}`,
        id: `@DeviceBox_irpd${r.id}`,
        binds: [
          {
            callback: ['irpd/wsIrpdPressureStreamCallback'],
            event: 'irpd_pressure_stream',
            id: `@DeviceBox_irpd${r.id}`,
          },
          {
            callback: ['irpd/wsIrpdStreamV5EventCallback'],
            event: 'IrpdStreamV5_event',
            id: `@DeviceBox_irpd${r.id}`,
          },
          {
            callback: ['irpd/wsIrpdStreamV5PeriodicCallback'],
            event: 'IrpdStreamV5_periodic',
            id: `@DeviceBox_irpd${r.id}`,
          },
        ],
      }));
      yield getSocketBinds(channels, put, 'unsubscribe');
    },
    // Web socket calbacks
    *wsIrpdStandardCallback(
      { payload }: { payload: WsIrpdModels.IrpdStandardCallbackPayload  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsIrpdStandardCallbackSuccess', payload });
    },
    *wsIrpdConfigCallback(
      { payload }: { payload: WsIrpdModels.IrpdConfigCallbackPayload  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsIrpdConfigCallbackSuccess', payload });
    },
    *wsIrpdPressureStreamCallback(
      { payload }: { payload: any  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsIrpdPressureStreamSuccess', payload });
    },
    *wsIrpdStreamV5EventCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerEvent  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsIrpdStreamV5EventSuccess', payload });
    },
    *wsIrpdStreamV5PeriodicCallback(
      { payload }: { payload: WsIrpdModels.IrpdCoontrollerPeriodic  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsIrpdStreamV5PeriodicSuccess', payload });
    }
  },

  reducers: {
    queryIrpdError(state: GetIrpdModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryIrpdStart(state: GetIrpdModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryIrpdSuccess(state: GetIrpdModelProps, { payload }: { payload: API.GetIrpdResponse }) {
      const mapper: WaterPumpProps[] = [];

      /**
       * Observações:
       * Validar o latestPanelStream
       * Validar latestGpsPosition linha 184, 196
       */

      for (let index = 0; index < payload.length; index++) {
        const item = payload[index];
        const status = item.latest_irpd_stream_v5_event
          ? item.latest_irpd_stream_v5_event.content?.imanage_master_status?.status
          : item.latest_irpd_stream_v5_periodic?.content?.imanage_master_status.status;
        const latLng = item.position.split(',');
        
        // Retrieve labels
        const deviceColor = getIrpdColor(status);
        const statusText = getIrpdStatus(status);
        
        // Get irpd pressure
        let irpdPressure = null;

        // Computed irpd data
        mapper.push({
          id: item.id,
          centerLat: parseFloat(latLng[0]),
          centerLng: parseFloat(latLng[1]),
          name: payload[index].name,
          updated: new Date(payload[index].updated).toLocaleString(),
          deviceColor: deviceColor,
          statusText: statusText,
          waterId: item?.latest_irpd_config_v5?.flow,
          protocol: item.protocol,
          pumpPressure: irpdPressure,
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
      state: GetIrpdModelProps,
      { payload }: { payload: { id: number; status: number; }[] }
    ) {
      return {
        ...state,
        status: payload,
      }
    },
    setWsLoadingStatus(
      state: GetIrpdModelProps,
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
    wsIrpdStandardCallbackSuccess(
      state: GetIrpdModelProps,
      { payload }: { payload: WsIrpdModels.IrpdStandardCallbackPayload },
    ) {
      // Communication error status
      if (payload.message_error) {
        const newStatus = state.status.map(s => {
          if (s.id === payload.irpd) {
            return {
              id: s.id,
              status: 3,
            }
          }
          return s;
        });
        return { 
          ...state, 
          status: newStatus
        };
      }

      // Web socket incoming status
      const newStatus = state.status.map(s => {
        if (s.id === payload.irpd) {
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
    },
    wsIrpdConfigCallbackSuccess(
      state: GetIrpdModelProps,
      { payload }: { payload: WsIrpdModels.IrpdConfigCallbackPayload },
    ) {
      // Delivery or Sent status
      const newStatus = state.status.map(s => {
        if (s.id === payload.irpd) {
          return {
            id: s.id,
            status: payload.received
              ? 2
              : 1,
          }
        }
        return s;
      })
      return { 
        ...state, 
        status: newStatus
      };
    },
    wsIrpdPressureStreamSuccess(
      state: GetIrpdModelProps,
      { payload }: { payload: WsIrpdModels.RawIrpdPressureStream },
    ) {
      const irpdIndex = state.result.findIndex(r => r.id === payload.irpd);
      
      if (irpdIndex >= 0) {
        const newResults = state.result.map((r, i) => {
          if (i === irpdIndex) {
            return {
              ...r,
              pumpPressure: payload.pressure,
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
    wsIrpdStreamV5EventSuccess(
      state: GetIrpdModelProps,
      { payload }: { payload: WsIrpdModels.RawIrpdControllerEvent },
    ) {
      const irpdIndex = state.result.findIndex(r => r.id === payload.irpd);
      
      if (irpdIndex >= 0) {
        const newResults = state.result.map((r, i) => {
          if (i === irpdIndex) {
            const deviceColor = getIrpdColor(payload.content.imanage_master_status.status);
            const statusText = getIrpdStatus(payload.content.imanage_master_status.status);
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
    wsIrpdStreamV5PeriodicSuccess(
      state: GetIrpdModelProps,
      { payload }: { payload: WsIrpdModels.RawIrpdCoontrollerPeriodic },
    ) {
      const irpdIndex = state.result.findIndex(r => r.id === payload.irpd);
      
      if (irpdIndex >= 0) {
        const newResults = state.result.map((r, i) => {
          if (i === irpdIndex) {
            const deviceColor = getIrpdColor(payload.content.imanage_master_status.status);
            const statusText = getIrpdStatus(payload.content.imanage_master_status.status);
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
    }
  },
};
