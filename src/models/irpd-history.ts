import { getIrpdHistoryArrayFmt } from '@/utils/formater/get-irpd-history';
import { AxiosError } from 'axios';
import uniqid from 'uniqid';
import { getSocketBinds } from '../utils/formater/get-socket-binds';
import { SelectedDeviceModelProps } from './selected-device';
import { getIrpdHistory } from '@/services/irpd';

export type GetIrpdHistoryModelProps = {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
  current: number;
  total: number;
  idIrpd: string;
  idFarm: string;
}

export type IrpdHistoricModels =
  | 'irpd_stream'
  | 'irpd_action'
  | 'irpd_stream_v5'
  | 'irpd_action_v5'
  | 'CentralStream';

export const queryIrpdHistory = (
  payload: {
    path: API.GetIrpdHistoryParams;
    params: any;
  }
) => {
  return {
    type: 'irpdHistory/queryIrpdHistory',
    payload: payload,
  };
};

export default {
  namespace: 'irpdHistory',

  state: {
    total: 1,
    result: [],
    rawResults: {},
    loaded: false,
    loading: true,
    current: 1,
    error: {},
    idIrpd: uniqid('@IrpdHistory_irpd_'),
    idFarm: uniqid('@IrpdHistory_farm_'),
  } as GetIrpdHistoryModelProps,

  effects: {
    *queryIrpdHistory(
      { payload }: {
        payload: {
          path: API.GetIrpdHistoryParams;
          params: any;
        }
      },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryIrpdHistoryStart' });
      try {
        const response: API.GetIrpdHistoryResponse = yield call(
          getIrpdHistory,
          payload.path,
          payload.params,
        );
        yield put({ type: 'queryIrpdHistorySuccess', payload: response });
        yield put({ type: 'onInit', payload: {} });
      } catch (error: any) {
        yield put({ type: 'queryIrpdHistoryError', payload: error });
      }
    },
    // Web sockets binding
    *onInit({ }, { put, select }: { put: any; select: any }) {
      const selectedDevice: SelectedDeviceModelProps = yield select(
        (state: any) => state.selectedDevice
      );
      const state: GetIrpdHistoryModelProps = yield select(
        (state: any) => state.irpdHistory
      );
      const channels = [
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@irpd@${selectedDevice.deviceId}`,
          id: state.idIrpd,
          binds: [
            {
              callback: ['irpdHistory/wsIrpdEventCallback'],
              event: 'IrpdStreamV5_event',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdSimpleCallback'],
              event: 'IrpdActionV5_simple',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdScheduleCallback'],
              event: 'IrpdActionV5_schedule',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdPeriodicCallback'],
              event: 'IrpdStreamV5_periodic',
              id: state.idIrpd,
            },
          ],
        },
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@farm@${selectedDevice.farmId}`,
          id: state.idFarm,
          binds: [
            {
              callback: ['irpdHistory/wsFarmCentralCallback'],
              event: 'CentralStream',
              id: state.idFarm
            }
          ],
        },
      ];
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({ }, { put, select }: { put: any; select: any }) {
      const selectedDevice: SelectedDeviceModelProps = yield select(
        (state: any) => state.selectedDevice
      );
      const state: GetIrpdHistoryModelProps = yield select(
        (state: any) => state.irpdHistory
      );
      const channels = [
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@irpd@${selectedDevice.deviceId}`,
          id: state.idIrpd,
          binds: [
            {
              callback: ['irpdHistory/wsIrpdEventCallback'],
              event: 'IrpdStreamV5_event',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdSimpleCallback'],
              event: 'IrpdActionV5_simple',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdScheduleCallback'],
              event: 'IrpdActionV5_schedule',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdPeriodicCallback'],
              event: 'IrpdStreamV5_periodic',
              id: state.idIrpd,
            },
          ],
        },
        {
          title: `${process.env.NODE_ENV === 'development' ? 'd' : 'p'}@farm${selectedDevice.farmId}`,
          id: state.idFarm,
          binds: [
            {
              callback: ['irpdHistory/wsFarmCentralCallback'],
              event: 'CentralStream',
              id: state.idFarm
            }
          ],
        },
      ];
      yield getSocketBinds(channels, put, 'unsubscribe');
    },
    // Web socket callbacks
    *wsIrpdEventCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerEvent },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({
        type: 'wsIrpdEventCallbackSuccess', payload: {
          type: 'stream_v5',
          source: 'event',
          data: payload,
        }
      });
    },
    *wsIrpdSimpleCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerSimple },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({
        type: 'wsIrpdSimpleCallbackSuccess', payload: {
          type: 'action_v5',
          source: 'simple',
          data: payload,
        }
      });
    },
    *wsIrpdScheduleCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerSchedule },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({
        type: 'wsIrpdScheduleCallbackSuccess', payload: {
          type: 'action_v5',
          source: 'schedule',
          data: payload,
        }
      });
    },
    *wsIrpdPeriodicCallback(
      { payload }: { payload: WsIrpdModels.IrpdCoontrollerPeriodic },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({
        type: 'wsIrpdPeriodicCallbackSuccess', payload: {
          type: 'stream_v5',
          source: 'periodical',
          data: payload,
        }
      });
    },
    *wsFarmCentralCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerCentralStream },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({
        type: 'wsFarmCentralCallbackSuccess', payload: {
          type: 'central_stream',
          source: 'central_stream',
          data: payload,
        }
      });
    }
  },

  reducers: {
    queryIrpdHistoryError(state: GetIrpdHistoryModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryIrpdHistoryStart(state: GetIrpdHistoryModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryIrpdHistorySuccess(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: API.GetIrpdHistoryResponse },
    ) {
      const formattedItem = getIrpdHistoryArrayFmt(payload.results);

      return {
        ...state,
        loading: false,
        loaded: true,
        current: payload.current_page,
        total: payload.count,
        result: formattedItem,
        error: {},
      };
    },
    // Web socket callback reducers
    wsIrpdEventCallbackSuccess(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: WsIrpdModels.IrpdControllerEvent },
    ) {
      // User must be on first page to sockets to update
      if (state.current !== 1) return state;

      const currentValues = [...state.result];
      const formattedIncomingValue = getIrpdHistoryArrayFmt([{ IrpdStreamV5_event: payload.data  }]);
      const hasEntry = currentValues.findIndex(item => item.id === payload.data.id);

      if (formattedIncomingValue && formattedIncomingValue[0] !== null) {
        if (hasEntry >= 0) {
          currentValues[hasEntry] = {
            ...currentValues[hasEntry],
            customStatus: formattedIncomingValue[0].customStatus,
          };
          return {
            ...state,
            result: currentValues,
          };
        } else {
          currentValues.pop();
          currentValues.unshift(formattedIncomingValue[0]);
          return {
            ...state,
            total: state.total + 1,
            result: currentValues,
          };
        }
      }

      return state;
    },
    wsIrpdSimpleCallbackSuccess(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: WsIrpdModels.IrpdControllerSimple },
    ) {
      // User must be on first page to sockets to update
      if (state.current !== 1) return state;

      const currentValues = [...state.result];
      const formattedIncomingValue = getIrpdHistoryArrayFmt([{ IrpdActionV5_simple: payload.data }]);
      const hasEntry = currentValues.findIndex(item => item.id === payload.data.id);

      if (formattedIncomingValue && formattedIncomingValue[0] !== null) {
        if (hasEntry >= 0) {
          currentValues[hasEntry] = {
            ...currentValues[hasEntry],
            customStatus: formattedIncomingValue[0].customStatus,
            badgeStatus: formattedIncomingValue[0].badgeStatus,
            badge: formattedIncomingValue[0].badge,
          };
          return {
            ...state,
            result: currentValues,
          };
        } else {
          currentValues.pop();
          currentValues.unshift(formattedIncomingValue[0]);
          return {
            ...state,
            total: state.total + 1,
            result: currentValues,
          };
        }
      }

      return state;
    },
    wsIrpdScheduleCallbackSuccess(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: WsIrpdModels.IrpdControllerSchedule },
    ) {
      // User must be on first page to sockets to update
      if (state.current !== 1) return state;

      const currentValues = [...state.result];
      const formattedIncomingValue = getIrpdHistoryArrayFmt([{ IrpdActionV5_schedule: payload.data }]);
      const hasEntry = currentValues.findIndex(item => item.id === payload.data.id);

      if (formattedIncomingValue && formattedIncomingValue[0] !== null) {
        if (hasEntry >= 0) {
          currentValues[hasEntry] = {
            ...currentValues[hasEntry],
            customStatus: formattedIncomingValue[0].customStatus,
            badgeStatus: formattedIncomingValue[0].badgeStatus,
            badge: formattedIncomingValue[0].badge,
          };
          return {
            ...state,
            result: currentValues,
          };
        } else {
          currentValues.pop();
          currentValues.unshift(formattedIncomingValue[0]);
          return {
            ...state,
            total: state.total + 1,
            result: currentValues,
          };
        }
      }

      return state;
    },
    wsIrpdPeriodicCallbackSuccess(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: WsIrpdModels.IrpdCoontrollerPeriodic },
    ) {
      // User must be on first page to sockets to update
      if (state.current !== 1) return state;

      const currentValues = [...state.result];
      const formattedIncomingValue = getIrpdHistoryArrayFmt([{ IrpdStreamV5_periodic: payload.data }]);
      const hasEntry = currentValues.findIndex(item => item.id === payload.data.id);

      if (formattedIncomingValue && formattedIncomingValue[0] !== null) {
        if (hasEntry >= 0) {
          currentValues[hasEntry] = {
            ...currentValues[hasEntry],
            customStatus: formattedIncomingValue[0].customStatus,
          };
          return {
            ...state,
            result: currentValues,
          };
        } else {
          currentValues.pop();
          currentValues.unshift(formattedIncomingValue[0]);
          return {
            ...state,
            total: state.total + 1,
            result: currentValues,
          };
        }
      }

      return state;
    },
    wsFarmCentralCallbackSuccess(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: WsIrpdModels.IrpdControllerCentralStream },
    ) {
      // User must be on first page to sockets to update
      if (state.current !== 1) return state;

      const currentValues = [...state.result];
      const formattedIncomingValue = getIrpdHistoryArrayFmt([{ CentralStream: payload.data }]);
      const hasEntry = currentValues.findIndex(item => item.id === payload.data.id);

      if (formattedIncomingValue && formattedIncomingValue[0] !== null) {
        if (hasEntry >= 0) {
          currentValues[hasEntry] = {
            ...currentValues[hasEntry],
            customStatus: formattedIncomingValue[0].customStatus,
          };
          return {
            ...state,
            result: currentValues,
          };
        } else {
          currentValues.pop();
          currentValues.unshift(formattedIncomingValue[0]);
          return {
            ...state,
            total: state.total + 1,
            result: currentValues,
          };
        }
      }

      return state;
    }
  },
};
