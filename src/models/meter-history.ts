import { getMeterSystemHistory } from '@/services/metersystem';
import { getMeterCentralStatus } from '@/utils/get-meter-central-status';
import { getMeterSystemCommand } from '@/utils/get-meter-system-command';
import { AxiosError } from 'axios';

export interface GetMeterSystemHistoryModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
  total: number;
}

export const queryMeterSystemHistory = (payload: API.GetMeterSystemHistoryParams) => {
  return {
    type: 'meterSystemHistory/queryMeterSystemHistory',
    payload: payload,
  };
};

export default {
  namespace: 'meterSystemHistory',

  state: {
    total: 1,
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryMeterSystemHistory(
      { payload }: { payload: API.GetMeterSystemHistoryParams },
      { call, put }: { call: any; put: any },
    ) {
      const { farmId, meterId, params } = payload;
      yield put({ type: 'queryMeterSystemHistoryStart' });
      try {
        const response: API.GetMeterSystemHistoryResponse = yield call(getMeterSystemHistory, { farmId, meterId }, params);
        yield put({ type: 'queryMeterSystemHistorySuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemHistoryError', payload: error });
      }
    },
  },

  reducers: {
    queryMeterSystemHistoryError(
      state: GetMeterSystemHistoryModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryMeterSystemHistoryStart(state: GetMeterSystemHistoryModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryMeterSystemHistorySuccess(
      state: GetMeterSystemHistoryModelProps,
      { payload }: { payload: any },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        current: payload.current_page,
        total: payload.count,
        result: payload.results.map((item: any, index: number) => {
          if (item?.IMeterStream_event) {
            return {
              ...item.IMeterStream_event,
              key: `row-key-table-${index}`,
              origin: `${item?.IMeterStream_event.content.pump_hourmeter.hours}h ${item?.IMeterStream_event.content.pump_hourmeter.minutes}min`,
              command: getMeterSystemCommand(
                item.IMeterStream_event?.content?.imanage_master_status?.status as number,
              ),
            };
          }
          if (item?.CentralStream) {
            return {
              ...item.CentralStream,
              key: `row-key-table-${index}`,
              origin: getMeterCentralStatus(item.CentralStream.status),
              command: getMeterSystemCommand(999),
            };
          }
          return {};
        }),
        error: {},
      };
    },
  },
};
