import { WaterPumpProps } from '@/components/Devices/WaterPump';
import { getIrpds } from '@/services/irpd';
import { getIrpdColor } from '@/utils/formater/get-irpd-color';
import { getIrpdStatus } from '@/utils/formater/get-irpd-status';
import { AxiosError } from 'axios';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

export interface GetIrpdModelProps {
  status: {
    id: number;
    status: number;
  }[];
  result: WaterPumpProps[];
  loading: boolean;
  loaded: boolean;
  error: any;
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
  },

  effects: {
    *queryIrpd({ payload }: { payload: API.GetIrpdParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryIrpdStart' });
      try {
        const response: API.GetIrpdResponse = yield call(getIrpds, payload);
        yield put({ type: 'queryIrpdSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryIrpdError', payload: error });
      }
    },
    // Web socket effects
    *queryIrpdWs({ payload }: { payload: API.GetIrpdParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryIrpdStart' });
      try {
        const response: API.GetIrpdResponse = yield call(getIrpds, payload);
        yield put({ type: 'queryIrpdSuccess', payload: response });
        yield put({ type: 'irpd/onInit', payload: {} });
        yield put({ type: 'setWsStatus', payload: response.map(r => ({
          id: r.id,
          status: WkModels.BaseRadioMessageStatus.NOT_SENT,
        }))});
      } catch (error: any) {
        yield put({ type: 'queryIrpdError', payload: error });
      }
    },
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.irpd);
      console.log('[irpd ws init]');

      const channels = state.result.map(r => ({
        title: `d@irpd@${r.id}`,
        id: state.id,
        binds: [
          {
            callback: ['irpd/wsIrpdStandardCallback'],
            event: 'IrpdConfigV5_standard',
            id: r.id,
          },
          {
            callback: ['irpd/wsIrpdConfigCallback'],
            event: 'irpd_config',
            id: r.id,
          },
        ],
      }));
      
      yield getSocketBinds(channels, put, 'subscribe');
    },
    *onDestroy({ }, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.irpd);
      console.log('[irpd ws destroy]');

      const channels = state.result.map(r => ({
        title: `d@irpd@${r.id}`,
        id: state.id,
        binds: [
          {
            callback: ['irpd/wsIrpdStandardCallback'],
            event: 'IrpdConfigV5_standard',
            id: r.id,
          },
          {
            callback: ['irpd/wsIrpdConfigCallback'],
            event: 'irpd_config',
            id: r.id,
          },
        ],
      }));

      yield getSocketBinds(channels, put, 'unsubscribe');
    },
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
        const status = item.latest_irpd_stream_v5_event?.content?.imanage_master_status?.status;
        const latLng = item.position.split(',');
        mapper.push({
          id: item.id,
          centerLat: parseFloat(latLng[0]),
          centerLng: parseFloat(latLng[1]),
          name: payload[index].name,
          updated: new Date(payload[index].updated).toLocaleString(),
          deviceColor: getIrpdColor(status),
          statusText: getIrpdStatus(status),
          waterId: item?.latest_irpd_config_v5?.flow,
          protocol: item.protocol
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
    // Web sockets reducers
    wsIrpdStandardCallback(
      { payload }: { payload: WkModels.IrpdStandardCallbackPayload },
      { put }: { put: any; call: any; select: any },
    ) {
      console.log('[WS Irpd standard callback]', payload, put);
    },
    wsIrpdConfigCallback(
      { payload }: { payload: WkModels.IrpdConfigCallbackPayload },
      { put }: { put: any; call: any; select: any },
    ) {
      console.log('[WS Irpd config callback]', payload, put);
    },
    setWsStatus(
      state: GetIrpdModelProps,
      { payload }: { payload: { id: number; status: number; }[] }
    ) {
      return {
        ...state,
        status: payload,
      }
    }
  },
};
