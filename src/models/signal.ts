// Dependencies
import { AxiosError } from 'axios';
import uniqid from 'uniqid';
import { pingFarmDevices } from '@/services/farm';
import { getSocketBinds } from '../utils/formater/get-socket-binds';
import { formatDayJsDate } from '@/utils/formater/get-formated-date';
import { SelectedFarmModelProps } from './selected-farm';

// Types
type SignalLog = {
  logId: number;
  type: string;
  date: string;
  farmName: string;
  radio: string;
  device: string;
  deviceID: number;
  farmID: number;
  deviceType: string;
}

type NodeElement = WkModels.NodeReponseStream & {
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
}

// Model state type
export type GetSignalModelProps = {
  error: AxiosError | null;
  isLoading: boolean;
  logs: SignalLog[];
  nodeResponses: NodeElement[];
  signalResponses: WkModels.SignalResponseStream[];
  socketId: string;
}

// External Dispatchers
export const pingDevices = (payload: API.GetFarmFullParams) => {
  return {
    type: 'signal/pingFarmDevices',
    payload: payload,
  };
};

// Signal model
export default {
  namespace: 'signal',
  
  state: {
    error: null,
    isLoading: false,
    logs: [],
    nodeResponses: [],
    signalResponses: [],
    socketId: uniqid('@Signal_'),
  } as GetSignalModelProps,
  
  effects: {
    *pingFarmDevices(
      { payload }: { payload: API.GetFarmFullParams },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'pingFarmDevicesStart' });
      try {
        yield call(pingFarmDevices, payload);
        yield put({ type: 'pingFarmDevicesSuccess' });
      } catch (error: any) {
        yield put({ type: 'pingFarmDevicesError', payload: error });
      }
    },
    // Web socket subscribers
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.signal);
      const farmState = yield select((state) => state.farm);
      console.log('[on init]');
      const channels = [
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd/' : ''}n/${farmState.selectedFarm.base.radio_id}`,
          id: state.socketId,
          binds: [
            {
              callback: ['signal/wsDeviceSweepCallback'],
              event: 'device_sweep',
              id: state.socketId
            },
          ],
        },
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd/' : ''}f/${farmState.selectedFarm.base.radio_id}`,
          id: state.id,
          binds: [
            {
              callback: ['signal/wsNodeFindCallback'],
              event: 'find_nodes',
              id: state.socketId
            }
          ],
        },
      ];
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.signal);
      const farmState = yield select((state) => state.farm);
      const channels = [
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd/' : ''}n/${farmState.selectedFarm.base.radio_id}`,
          id: state.socketId,
          binds: [
            {
              callback: ['signal/wsDeviceSweepCallback'],
              event: 'device_sweep',
              id: state.socketId
            },
          ],
        },
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd/' : ''}f/${farmState.selectedFarm.base.radio_id}`,
          id: state.id,
          binds: [
            {
              callback: ['signal/wsNodeFindCallback'],
              event: 'find_nodes',
              id: state.socketId
            }
          ],
        },
      ];
      yield getSocketBinds(channels, put, 'unsubscribe');
    },
    // Web socket callbacks
    *wsDeviceSweepCallback(
      { payload }: { payload: WkModels.SignalResponseStream },
      { put, select }: { put: any; call: any; select: any },
    ) {
      console.log('[on here]');
      const farmState = yield select((state) => state.farm);
      yield put({ type: 'wsDeviceSweepCallbackSuccess', payload: {
        data: payload,
        farm: farmState.selectedFarm,
      }});
    },
    *wsNodeFindCallback(
      { payload }: { payload: WkModels.NodeReponseStream },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsNodeFindCallbackSuccess', payload: {
        data: payload,
      }});
    },
  },

  reducers: {
    pingFarmDevicesStart(state: GetSignalModelProps) {
      return {
        ...state,
        error: null,
        isLoading: true,
        // signalResponses: [],
        // logs: [],
      };
    },
    pingFarmDevicesError(
      state: GetSignalModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        isLoading: false,
      };
    },
    pingFarmDevicesSuccess(state: GetSignalModelProps) {
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    },
    setSignalResponses(
      state: GetSignalModelProps,
      { payload }: { payload: WkModels.SignalResponseStream[] },
    ) {
      return {
        ...state,
        signalResponses: payload,
      };
    },
    // Websocket reducers
    wsDeviceSweepCallbackSuccess(
      state: GetSignalModelProps,
      { payload }: { payload: {
        data: WkModels.SignalResponseStream,
        farm: SelectedFarmModelProps,
      } },
    ) {
      const hasSignalIndex = state.signalResponses.findIndex(
        s => s.radio_id === payload.data.radio_id,
      );

      const log: SignalLog = {
        logId: state.logs.length + 1,
        date: formatDayJsDate(new Date().toISOString()),
        type: 'FOUND',
        farmID: payload.data.farm_id,
        device: payload.data.device_name,
        deviceID: payload.data.device_id,
        deviceType: payload.data.device_type,
        radio: payload.data.radio_id,
        farmName: payload.farm.name,
      }
      
      if (hasSignalIndex >= 0) {
        return {
          ...state,
          logs: [ ...state.logs, log ],
          signalResponses: state.signalResponses.map((s, i) => {
            if (i === hasSignalIndex) {
              return payload.data;
            }
            return s;
          }),
        };
      } else {
        return {
          ...state,
          logs: [ ...state.logs, log ],
          signalResponses: [
            ...state.signalResponses,
            { ...payload.data },
          ]
        };
      }
    },
    wsNodeFindCallbackSuccess(
      state: GetSignalModelProps,
      { payload }: { payload: {
        data: WkModels.NodeReponseStream,
      } },
    ) {
      const hasNodeIndex = state.nodeResponses.findIndex(
        s => s.from === payload.data.from && s.to === payload.data.to
      );

      if (hasNodeIndex >= 0) {
        return {
          ...state,
          nodeResponses: state.nodeResponses.map((n, i) => {
            if (i === hasNodeIndex) {
              return {
                ...n,
                ...payload.data,
              };
            }
            return n
          })
        };
      } else {

        const newNode: NodeElement = {
          ...payload.data,
          fromLat: 0,
          toLat: 0,
          fromLng: 0,
          toLng: 0,
        } 

        return {
          ...state,
          nodeResponses: [
            ...state.nodeResponses,
            newNode,
          ]
        };
      }
    }
  },
}
