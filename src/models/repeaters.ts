import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter';
import { getRepeaters } from '@/services/repeaters';
import { AxiosError } from 'axios';

export interface GetRepeaterModelProps {
  result: LakeLevelMeterProps[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryRepeater = (payload: API.GetRepeaterParams) => {
  return {
    type: 'repeater/queryRepeater',
    payload: payload,
  };
};

export default {
  namespace: 'repeater',

  state: {
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryRepeater({ payload }: { payload: API.GetRepeaterParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryRepeaterStart' });
      try {
        const response: API.GetRepeaterResponse = yield call(getRepeaters, payload);
        yield put({ type: 'queryRepeaterSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryRepeaterError', payload: error });
      }
    },
  },

  reducers: {
    queryRepeaterError(state: GetRepeaterModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryRepeaterStart(state: GetRepeaterModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryRepeaterSuccess(
      state: GetRepeaterModelProps,
      { payload }: { payload: API.GetRepeaterResponse },
    ) {
      const mapper: LakeLevelMeterProps[] = [];

      /**
       * Observações:
       * Validar o latestPanelStream
       * Validar latestGpsPosition linha 184, 196
       */

      for (let index = 0; index < payload.length; index++) {
        const item = payload[index];

        const latLng = item.position.split(',');
        mapper.push({
          id: item.id,
          centerLat: parseFloat(latLng[0]),
          centerLng: parseFloat(latLng[1]),
          name: payload[index].name,
          updated: new Date(payload[index].updated).toLocaleString(),
          controlRadio: item.repeater_radio_id
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
