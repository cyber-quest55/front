// Dependencies
import { AxiosError } from 'axios';
import uniqid from 'uniqid';
import { pingFarmDevices } from '@/services/farm';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

// Model state type
export type GetSignalModelProps = {
  error: AxiosError | null,
  isLoading: boolean,
  signalResponses: WkModels.SignalResponseResponseStream[],
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
        yield put({ type: 'onInit', payload: {} });
      } catch (error: any) {
        yield put({ type: 'pingFarmDevicesError', payload: error });
      }
    },
    // Web socket subscribers
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.signal);
      const farmState = yield select((state) => state.farm);
      console.log('[listening to websockets here]');
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
      console.log('[destroying to websockets here]');
      const channels = [
        {
          title: `n/${farmState.selectedFarm.base.radio_id}`,
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
          title: `f/${farmState.selectedFarm.base.radio_id}`,
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
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsDeviceSweepFCallbackSuccess', payload });
    },
    *wsDeviceSweepFCallback(
      { payload }: { payload: WkModels.SignalResponseResponseStream },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsDeviceSweepFCallbackSuccess', payload });
    },
  },

  reducers: {
    pingFarmDevicesStart(state: GetSignalModelProps) {
      return {
        ...state,
        error: null,
        isLoading: true,
        signalResponses: [],
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
      { payload }: { payload: WkModels.SignalResponseResponseStream },
    ) {
      const hasSignalIndex = state.signalResponses.findIndex(
        s => s.radio_id === payload.radio_id,
      );
      
      if (hasSignalIndex >= 0) {
        return {
          ...state,
          signalResponses: state.signalResponses.map((s, i) => {
            if (i === hasSignalIndex) {
              return payload;
            }
            return s;
          }),
        };
      } else {
        return {
          ...state,
          signalResponses: [
            ...state.signalResponses,
            { ...payload },
          ]
        };
      }
    },
  },
}
