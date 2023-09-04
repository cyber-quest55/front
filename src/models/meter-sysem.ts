import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter';
import { getMeterSystem } from '@/services/metersystem';
import { getIrpdColor } from '@/utils/formater/get-irpd-color';
import { getMeterStatus } from '@/utils/formater/get-meter-status';
import { AxiosError } from 'axios';

export interface GetMeterSystemModelProps {
  result: LakeLevelMeterProps[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryMeterSystem = (payload: API.GetMeterSystemParams) => {
  return {
    type: 'meterSystem/queryMeterSystem',
    payload: payload,
  };
};

export default {
  namespace: 'meterSystem',

  state: {
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryMeterSystem({ payload }: { payload: API.GetMeterSystemParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryMeterSystemStart' });
      try {
        const response: API.GetMeterSystemResponse = yield call(getMeterSystem, payload);
        yield put({ type: 'queryMeterSystemSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemError', payload: error });
      }
    },
  },

  reducers: {
    queryMeterSystemError(state: GetMeterSystemModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryMeterSystemStart(state: GetMeterSystemModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryMeterSystemSuccess(
      state: GetMeterSystemModelProps,
      { payload }: { payload: API.GetMeterSystemResponse },
    ) {
      const mapper: LakeLevelMeterProps[] = [];

      /**
       * Observações:
       * Validar o latestPanelStream
       * Validar latestGpsPosition linha 184, 196
       */

      for (let index = 0; index < payload.length; index++) {
        const item = payload[index];
        const status =
          item.imeter_set[0]?.latest_event_stream.content?.imanage_master_status.status;

        const latLng = item.position.split(',');
        mapper.push({
          id: item.id,
          centerLat: parseFloat(latLng[0]),
          centerLng: parseFloat(latLng[1]),
          name: payload[index].name,
          updated: new Date(payload[index].updated).toLocaleString(),
          deviceColor: getIrpdColor(status),
          statusText: getMeterStatus(status),
          imeterSetId: item?.imeter_set[0]?.id,
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
