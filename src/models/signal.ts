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

// Model state type
export type GetSignalModelProps = {
  error: AxiosError | null;
  isLoading: boolean;
  logs: SignalLog[];
  signalResponses: WkModels.SignalResponseResponseStream[];
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
      console.log('[on init here] hha');
      const state = yield select((state) => state.signal);
      const farmState = yield select((state) => state.farm);
      const channels = [
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd/' : ''}n/${farmState.selectedFarm.base.radio_id}`,
          id: state.socketId,
          binds: [
            {
              callback: ['signal/wsDeviceSweepNCallback'],
              event: 'device_sweep',
              id: state.socketId,
            }
          ],
        },
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd/' : ''}f/${farmState.selectedFarm.base.radio_id}`,
          id: state.id,
          binds: [
            {
              callback: ['signal/wsDeviceSweepFCallback'],
              event: 'device_sweep',
              id: state.socketId,
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
              callback: ['signal/wsDeviceSweepNCallback'],
              event: 'device_sweep',
              id: state.socketId
            }
          ],
        },
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd/' : ''}f/${farmState.selectedFarm.base.radio_id}`,
          id: state.id,
          binds: [
            {
              callback: ['signal/wsDeviceSweepFCallback'],
              event: 'device_sweep',
              id: state.socketId
            }
          ],
        },
      ];
      yield getSocketBinds(channels, put, 'unsubscribe');
    },
    // Web socket callbacks
    *wsDeviceSweepNCallback(
      { payload }: { payload: WkModels.SignalResponseResponseStream },
      { put, select }: { put: any; call: any; select: any },
    ) {
      const farmState = yield select((state) => state.farm);
      yield put({ type: 'wsDeviceSweepFCallbackSuccess', payload: {
        data: payload,
        farm: farmState.selectedFarm,
      }});
    },
    *wsDeviceSweepFCallback(
      { payload }: { payload: WkModels.SignalResponseResponseStream },
      { put, select }: { put: any; call: any; select: any },
    ) {
      const farmState = yield select((state) => state.farm);
      yield put({ type: 'wsDeviceSweepFCallbackSuccess', payload: {
        data: payload,
        farm: farmState.selectedFarm,
      }});
    },
  },

  reducers: {
    pingFarmDevicesStart(state: GetSignalModelProps) {
      return {
        ...state,
        error: null,
        isLoading: true,
        signalResponses: [],
        logs: [],
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
        isLoading: true,
      };
    },
    setSignalResponses(
      state: GetSignalModelProps,
      { payload }: { payload: WkModels.SignalResponseResponseStream[] },
    ) {
      return {
        ...state,
        signalResponses: payload,
      };
    },
    // Websocket reducers
    wsDeviceSweepFCallbackSuccess(
      state: GetSignalModelProps,
      { payload }: { payload: {
        data: WkModels.SignalResponseResponseStream,
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
  },
}
