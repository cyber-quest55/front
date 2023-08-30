import { getMeterSystemWaterLevel } from '@/services/metersystem/';
import { formatDateTime } from '@/utils/formater/get-formated-date';
import { AxiosError } from 'axios';

export interface GetMeterSystemWaterLevelModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryMeterSystemWaterLevel = (payload: API.GetMeterSystemWaterLevelParams) => {
  return {
    type: 'meterSystemWaterLevel/queryMeterSystemWaterLevel',
    payload: payload,
  };
};

export default {
  namespace: 'meterSystemWaterLevel',

  state: {
    result: {},
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryMeterSystemWaterLevel(
      { payload }: { payload: API.GetMeterSystemWaterLevelParams },
      { call, put }: { call: any; put: any },
    ) {
      const { farmId, meterId, otherId, params } = payload;

      yield put({ type: 'queryMeterSystemWaterLevelStart' });
      try {
        const response: API.GetMeterSystemWaterLevelResponse = yield call(
          getMeterSystemWaterLevel,
          { farmId, meterId, otherId },
          params,
        );
        yield put({ type: 'queryMeterSystemWaterLevelSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemWaterLevelError', payload: error });
      }
    },
  },

  reducers: {
    queryMeterSystemWaterLevelError(
      state: GetMeterSystemWaterLevelModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryMeterSystemWaterLevelStart(state: GetMeterSystemWaterLevelModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryMeterSystemWaterLevelSuccess(
      state: GetMeterSystemWaterLevelModelProps,
      { payload }: { payload: API.GetMeterSystemWaterLevelResponse },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        result: payload.map((item: any, index: number) => ({
          ...item,
          value: item.value / 100,
          from: formatDateTime(item.from),
          key: `row-key-table-water-level-${index}`,
        })),
        error: {},
      };
    },
  },
};
