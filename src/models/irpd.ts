import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter'; 
import { getIrpds } from '@/services/irpd';
import { AxiosError } from "axios";

export interface GetIrpdModelProps {
  result: LakeLevelMeterProps[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'irpd',

  state: {
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryIrpd({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryIrpdStart' });
      try {
        const { data } = yield call(getIrpds, payload);
        yield put({ type: 'queryIrpdSuccess', payload: data });
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

      for (let index = 0; index < payload.list.length; index++) {
        const item = payload.list[index];

        const latLng = item.position.split(',');
        mapper.push({
          id: item.id,
          centerLat: parseFloat(latLng[0]),
          centerLng: parseFloat(latLng[1]),
          name: payload.list[index].name,
          updated: new Date(payload.list[index].updated).toLocaleString(),
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
