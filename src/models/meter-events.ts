import { getMeterSystemTable } from '@/services/metersystem';
import { formatDateTime } from '@/utils/get-formated-date';
import { AxiosError } from 'axios';

export interface GetMeterSystemEventModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
  total: number;
}

export const queryMeterSystemEvent = (payload: API.GetMeterSystemTableParams) => {
  return {
    type: 'meterSystemEvent/queryMeterSystemEvent',
    payload: payload,
  };
};

export default {
  namespace: 'meterSystemEvent',

  state: {
    total: 1,
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryMeterSystemEvent(
      { payload }: { payload: API.GetMeterSystemTableParams },
      { call, put }: { call: any; put: any },
    ) {
      const { farmId, meterId, params, otherId } = payload;
      yield put({ type: 'queryMeterSystemEventStart' });
      try {
        const response: API.GetMeterSystemTableResponse = yield call(
          getMeterSystemTable,
          { farmId, meterId, otherId },
          params,
        );
        yield put({ type: 'queryMeterSystemEventSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemEventError', payload: error });
      }
    },
  },

  reducers: {
    queryMeterSystemEventError(
      state: GetMeterSystemEventModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryMeterSystemEventStart(state: GetMeterSystemEventModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryMeterSystemEventSuccess(
      state: GetMeterSystemEventModelProps,
      { payload }: { payload: any },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        current: payload.current_page,
        total: payload.count,
        result: payload.results.map((item: any, index: number) => {
          const measurement = item.content.imanage_sensor_measure_value[0];
          return {
            key: `row-key-meter-event-table-${index}`,
            ...item,
            date: formatDateTime(item.created),
            measurement: `${measurement ? measurement.value.toFixed(2) / 100 : (0).toFixed(2)}`,
            offset: `${measurement ? measurement.value.toFixed(2) / 100 : (0).toFixed(2)}`,
            tankLevel: (1).toFixed(2),
            flowRate: item.flow,
          };
        }),
        error: {},
      };
    },
  },
};
