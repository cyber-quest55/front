import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter';
import { getIrpds } from '@/services/irpd';
import { getIrpdColor } from '@/utils/get-irpd-color';
import { getIrpdStatus } from '@/utils/get-irpd-status';
import { AxiosError } from 'axios';

export interface GetIrpdModelProps {
  result: LakeLevelMeterProps[];
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

export default {
  namespace: 'irpd',

  state: {
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
      const mapper: LakeLevelMeterProps[] = [];

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
  },
};
