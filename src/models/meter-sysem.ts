import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter';
import { getMeterSystem } from '@/services/metersystem';
import { AxiosError } from 'axios';

export interface GetMeterSystemModelProps {
  result: LakeLevelMeterProps[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'meterSystem',

  state: {
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryMeterSystem({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryMeterSystemStart' });
      try {
        const { data } = yield call(getMeterSystem, payload);
        yield put({ type: 'queryMeterSystemSuccess', payload: data });
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
