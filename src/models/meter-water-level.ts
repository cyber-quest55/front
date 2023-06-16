import { getMeterSystemWaterLevel } from '@/services/metersystem/';
import { formatDateTime } from '@/utils/get-formated-date';
import { AxiosError } from 'axios';

export interface GetMeterSystemWaterLevelModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
}

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
      { payload }: { payload: any },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryMeterSystemWaterLevelStart' });
      try {
        const { data } = yield call(getMeterSystemWaterLevel, payload);
        yield put({ type: 'queryMeterSystemWaterLevelSuccess', payload: data });
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
          from: formatDateTime(item.from),
          key: `row-key-table-water-level-${index}`,
        })),
        error: {},
      };
    },
  },
};
