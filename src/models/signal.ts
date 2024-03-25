// Dependencies
import { AxiosError } from 'axios';
import uniqid from 'uniqid';
import { pingFarmDevices } from '@/services/farm';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

// Model state type
export type GetSignalModelProps = {
  error: AxiosError | null,
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
    signalResponses: [],
    socketId: uniqid('@Signal_'),
  } as GetSignalModelProps,
  
  effects: {
    *pingFarmDevices(
      { payload }: { payload: API.GetFarmFullParams },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'setSignalResponses', payload: [] });
      try {
        yield call(pingFarmDevices, payload,);
        yield put({ type: 'onInit', payload: {} });
      } catch (error: any) {
        yield put({ type: 'pingFarmDevicesError', payload: error });
      }
    },
    // Web socket subscribers
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.signal);
      const farmState = yield select((state) => state.farm);
      const channels = [
        {
          title: `n/${farmState.selectedFarm.base.radio_id}`,
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
          title: `f/${farmState.selectedFarm.base.radio_id}`,
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
          title: `n/${farmState.selectedFarm.base.radio_id}`,
          id: state.socketId,
          binds: [
            {
              callback: [],
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
              callback: [],
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
      yield put({ type: 'wsPivotControllerStreamPanelSuccess', payload });
    },
    *wsDeviceSweepFCallback(
      { payload }: { payload: WkModels.SignalResponseResponseStream },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsPivotControllerStreamPanelSuccess', payload });
    },
  },

  reducers: {
    pingFarmDevicesError(
      state: GetSignalModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
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
      console.log('[ws payload]', payload);
      return state;
    },
  },
}
