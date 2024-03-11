import { getIrpdHistory } from '@/services/irpd';
import { PumpHistoryOrigin } from '@/utils/enum/pump-history-origin';
import { getIrpdCommand } from '@/utils/formater/get-irpd-command';
import { getIrpdOrigin } from '@/utils/formater/get-irpd-origin';
import { AxiosError } from 'axios';
import uniqid from 'uniqid';
import { getSocketBinds } from '../utils/formater/get-socket-binds';
import { SelectedDeviceModelProps } from './selected-device';

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

export const queryIrpdHistory = (payload: API.GetIrpdHistoryParams) => {
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
    loaded: false,
    loading: true,
    current: 1,
    error: {},
    idIrpd: uniqid('@IrpdHistory_irpd_'),
    idFarm: uniqid('@IrpdHistory_farm_'),
  } as GetIrpdHistoryModelProps,

  effects: {
    *queryIrpdHistory(
      { payload }: { payload: API.GetIrpdHistoryParams },
      { call, put }: { call: any; put: any },
    ) {
      const { farmId, irpdId,   } = payload;
      yield put({ type: 'queryIrpdHistoryStart' });
      try {
        const response: API.GetIrpdHistoryResponse = yield call(
          getIrpdHistory,
          { farmId, irpdId },
         );
        yield put({ type: 'queryIrpdHistorySuccess', payload: response });
        yield put({ type: 'onInit', payload: {} });
      } catch (error: any) {
        yield put({ type: 'queryIrpdHistoryError', payload: error });
      }
    },
    // Web sockets binding
    *onInit({}, { put, select }: { put: any; select: any }) {
      const selectedDevice: SelectedDeviceModelProps = yield select(
        (state: any) => state.selectedDevice
      );
      const state: GetIrpdHistoryModelProps = yield select(
        (state: any) => state.irpdHistory
      );
      const channels = [
        {
          title: `d@irpd@${selectedDevice.deviceId}`,
          id: state.idIrpd,
          binds: [
            {
              callback: ['irpdHistory/wsIrpdPressureStreamCallback'],
              event: 'irpd_pressure_stream',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdStreamCallback'],
              event: 'irpd_stream',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdActionCallback'],
              event: 'irpd_action',
              id: state.idIrpd,
            },
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
          title: `d@farm${selectedDevice.farmId}`,
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
          title: `d@irpd@${selectedDevice.deviceId}`,
          id: state.idIrpd,
          binds: [
            {
              callback: ['irpdHistory/wsIrpdPressureStreamCallback'],
              event: 'irpd_pressure_stream',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdStreamCallback'],
              event: 'irpd_stream',
              id: state.idIrpd,
            },
            {
              callback: ['irpdHistory/wsIrpdActionCallback'],
              event: 'irpd_action',
              id: state.idIrpd,
            },
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
          title: `d@farm${selectedDevice.farmId}`,
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
    *wsIrpdPressureStreamCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerPressureStream },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsIrpdPressureStreamCallbackSuccess', payload });
    },
    *wsIrpdStreamCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerStream },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsUpdateIrpdHistoryAction', payload: {
        type: 'stream',
        source: 'stream',
        data: payload,
      }});
    },
    *wsIrpdActionCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerAction },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsUpdateIrpdHistoryAction', payload: {
        type: 'action',
        source: 'action',
        data: payload,
      }});
    },
    *wsIrpdEventCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerStreamV5  },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsUpdateIrpdHistoryAction', payload: {
        type: 'stream_v5',
        source: 'event',
        data: payload,
      }});
    },
    *wsIrpdSimpleCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerActionV5 },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsUpdateIrpdHistoryAction', payload: {
        type: 'action_v5',
        source: 'simple',
        data: payload,
      }});
    },
    *wsIrpdScheduleCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerActionV5 },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsUpdateIrpdHistoryAction', payload: {
        type: 'action_v5',
        source: 'schedule',
        data: payload,
      }});
    },
    *wsIrpdPeriodicCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerStreamV5 },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsUpdateIrpdHistoryAction', payload: {
        type: 'stream_v5',
        source: 'periodical',
        data: payload,
      }});
    },
    *wsFarmCentralCallback(
      { payload }: { payload: WsIrpdModels.IrpdControllerCentralStream },
      { put }: { put: any; call: any; select: any },
    ) {
      yield put({ type: 'wsUpdateIrpdHistoryAction', payload: {
        type: 'central_stream',
        source: 'central_stream',
        data: payload,
      }});
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
      return {
        ...state,
        loading: false,
        loaded: true,
        current: payload.current_page,
        total: payload.count,
        result: payload.results.map((item, index: number) => {
          if (item?.irpd_action_v5) {
            return {
              ...item.irpd_action_v5,
              key: `row-key-table-${index}`,
              origin: getIrpdOrigin(PumpHistoryOrigin.CentralUpdate),
              command: getIrpdCommand(item.irpd_action_v5?.content?.pump_action?.enable as number),
            };
          }
          if (item?.irpd_stream_v5) {
            return {
              ...item.irpd_stream_v5,
              key: `row-key-table-${index}`,
              origin: getIrpdOrigin(PumpHistoryOrigin.Command),
              command: getIrpdCommand(item.irpd_stream_v5?.content?.pump_action?.enable as number),
            };
          }
          return {};
        }),
        error: {},
      };
    },
    // Web socket callback reducers
    wsUpdateIrpdHistoryAction(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: {
        type: string;
        source: string;
        data: (
          WsIrpdModels.IrpdControllerStream | 
          WsIrpdModels.IrpdControllerStreamV5 | 
          WsIrpdModels.IrpdControllerAction | 
          WsIrpdModels.IrpdControllerActionV5 | 
          WsIrpdModels.IrpdControllerCentralStream
        );
      }},
    ) {
      /* Treating first page (on previous projet there is a rule that
      prevents websocket for updating list if is not on first page) */
      if (state.current !== 1) return state;

      // DEBUG
      console.log('[WEBSOCKET RESPONSE]', payload);

      // Verifying what type is incoming data
      switch (payload.type) {
        case 'action':
          break;
        
        case 'action_v5':
          break;

        case 'stream':
          break;
        
        case 'stream_v5':
          break;

        case 'central_stream':
          break;

        // In case data is none of the matching types it will just return state
        default:
          return state;
      }
    },
    wsIrpdPressureStreamCallbackSuccess(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: WsIrpdModels.IrpdControllerPressureStream },
    ) {
      console.log('[callback payload]', payload)
      return state;
    },
  },
};
