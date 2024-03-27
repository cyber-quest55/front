// Dependencies
import { AxiosError } from 'axios';
import uniqid from 'uniqid';
import { pingFarmDevices } from '@/services/farm';
import { getSocketBinds } from '../utils/formater/get-socket-binds';
import { formatDayJsDate } from '@/utils/formater/get-formated-date';
import { SelectedFarmModelProps } from './selected-farm';
import { GetIrpdModelProps } from './irpd';
import { GetRepeaterModelProps } from './repeaters';
import { GetPivotInformationModelProps } from './pivot-information';

// Types
export type SignalLog = {
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

type RadioCoordinate = {
  mainRadio: string;
  gpsRadio?: string | null;
  lat: number;
  lng: number;
  gpsLat?: number | null;
  gpsLng?: number | null;
  name: string;
  type: string;
}

export type NodeElement = WkModels.NodeReponseStream & {
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  fromName: string;
  toName: string;
}

// Model state type
export type GetSignalModelProps = {
  error: AxiosError | null;
  isLoading: boolean;
  logs: SignalLog[];
  nodeResponses: NodeElement[];
  radioCoordinates: RadioCoordinate[];
  signalResponses: WkModels.SignalResponseStream[];
  socketId: string;
}

// External Dispatchers
export const pingDevices = (payload: API.GetFarmFullParams & {
  keepLines?: boolean;
  device?: string;
}) => {
  return {
    type: 'signal/pingFarmDevices',
    payload: payload,
  };
};

export const loadRadioCoordinates = () => {
  return {
    type: 'signal/loadCurrentRadioCoordinates',
    payload: {},
  }
}

// Signal model
export default {
  namespace: 'signal',
  
  state: {
    error: null,
    isLoading: false,
    logs: [],
    nodeResponses: [],
    radioCoordinates: [],
    signalResponses: [],
    socketId: uniqid('@Signal_'),
  } as GetSignalModelProps,
  
  effects: {
    *pingFarmDevices(
      { payload }: { payload: API.GetFarmFullParams & {
        keepLines?: boolean;
        device?: string;
      }},
      { call, put }: { call: any; put: any },
    ) {
      yield put({
        type: 'pingFarmDevicesStart',
        payload: {
          keepLines: payload.keepLines || false
        },
      });
      try {
        const apiPayload = {
          id: payload.id,
          body: payload.device ? {
            payload: payload.device,
          } : undefined,
        }
        yield call(
          pingFarmDevices,
          apiPayload
        );
        yield put({ type: 'pingFarmDevicesSuccess' });
      } catch (error: any) {
        yield put({ type: 'pingFarmDevicesError', payload: error });
      }
    },
    *loadCurrentRadioCoordinates(
      {},
      { put, select }: { put: any, select: any },
    ) {
      const irpdState: GetIrpdModelProps = yield select((state) => state.irpd);
      const repeaterState: GetRepeaterModelProps = yield select((state) => state.repeater);
      const pivotState: GetPivotInformationModelProps = yield select((state) => state.pivotInformation);

      const irpdMapped = irpdState.result.map(irpd => ({
        name: irpd.name,
        mainRadio: irpd.controlRadio,
        gpsRadio: null,
        lat: irpd.centerLat,
        lng: irpd.centerLng,
        gpsLat: null,
        gpsLng: null,
        type: 'irpd',
      }));

      const repeaterMapped = repeaterState.result.map(repeater => ({
        name: repeater.name,
        mainRadio: repeater.controlRadio,
        gpsRadio: null,
        lat: repeater.centerLat,
        lng: repeater.centerLng,
        gpsLat: null,
        gpsLng: null,
        type: 'repeater',
      }));

      const pivotMapped = pivotState.result.map(pivot => ({
        name: pivot.name,
        mainRadio: pivot.controlRadio,
        gpsRadio: pivot.monitorRadio,
        lat: pivot.centerLat,
        lng: pivot.centerLng,
        gpsLat: pivot.gpsLat,
        gpsLng: pivot.gpsLong,
        type: 'pivot',
      }));

      const joinedCoordinates = [
        ...irpdMapped,
        ...repeaterMapped,
        ...pivotMapped,
      ];

      yield put({
        type: 'setRadioCoordinates',
        payload: joinedCoordinates,
      });
    },
    // Web socket subscribers
    *onInit({}, { put, select }: { put: any; select: any }) {
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
          id: state.socketId,
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
    pingFarmDevicesStart(
      state: GetSignalModelProps,
      { payload }: { payload: { keepLines: boolean } }
    ) {
      if (payload.keepLines) return {
        ...state,
        error: null,
        isLoading: true,
      };

      return {
        ...state,
        error: null,
        isLoading: true,
        nodeResponses: [],
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
    setRadioCoordinates(
      state: GetSignalModelProps,
      { payload }: { payload: RadioCoordinate[] },
    ) {
      return {
        ...state,
        radioCoordinates: payload,
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

        const fromDevice = state.radioCoordinates.find(
          rc => (rc.mainRadio || rc.gpsRadio) === payload.data.from,
        );
        const toDevice = state.radioCoordinates.find(
          rc => (rc.mainRadio || rc.gpsRadio) === payload.data.to,
        );

        if (fromDevice && toDevice) {
          const newNode: NodeElement = {
            ...payload.data,
            fromLat: fromDevice.lat || fromDevice.gpsLat!,
            fromLng: fromDevice.lng || fromDevice.gpsLng!,
            toLat: toDevice.lat || toDevice.gpsLat!,
            toLng: toDevice.lng || toDevice.gpsLng!,
            fromName: fromDevice.name,
            toName: toDevice.name,
          }

          console.log('adding node', newNode);
  
          return {
            ...state,
            nodeResponses: [
              ...state.nodeResponses,
              newNode,
            ]
          };
        }

      }

      return state;
    }
  },
}
