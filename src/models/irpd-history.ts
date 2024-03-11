import { getIrpdHistory } from '@/services/irpd';
import { PumpHistoryOrigin } from '@/utils/enum/pump-history-origin';
import { getIrpdCommand } from '@/utils/formater/get-irpd-command';
import { getIrpdOrigin } from '@/utils/formater/get-irpd-origin';
import { AxiosError } from 'axios';
import uniqid from 'uniqid';
import { getSocketBinds } from '../utils/formater/get-socket-binds';
import { SelectedDeviceModelProps } from './selected-device';

export interface GetIrpdHistoryModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
  total: number;
  idIrpd: string;
  idFarm: string;
}

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
      const selectedDevice: SelectedDeviceModelProps = yield select((state: any) => state.selectedDevice);
      const state: GetIrpdHistoryModelProps = yield select((state: any) => state.irpdHistory);
      console.log(selectedDevice);
      const channels = [
        {
          title: `d@irpd@${selectedDevice.deviceId}`,
          id: state.idIrpd,
          binds: [
            {
              callback: ['pivot/wsPivotStandardCallback'],
              event: 'ControllerConfig_standard',
              id: state.idIrpd,
            },
          ],
        },
        {
          title: `d@farm${selectedDevice.farmId}`,
          id: state.idFarm,
          binds: [

          ],
        },
      ];
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({ }, { put }: { put: any; select: any }) {
      console.log('[irpd ws destroy]');
      const channels = [];
      yield getSocketBinds(channels, put, 'unsubscribe');
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
  },
};
