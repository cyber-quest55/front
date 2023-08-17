import { getIrpdHistory } from '@/services/irpd';
import { PumpHistoryOrigin } from '@/utils/enums';
import { getIrpdCommand } from '@/utils/get-irpd-command';
import { AxiosError } from 'axios';

export interface GetIrpdHistoryModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
  total: number;
}

export default {
  namespace: 'irpdHistory',

  state: {
    total: 1,
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryIrpdHistory(
      { payload }: { payload: API.GetIrpdHistoryParams },
      { call, put }: { call: any; put: any },
    ) {
      const { farmId, irpdId, params } = payload;
      yield put({ type: 'queryIrpdHistoryStart' });
      try {
        const response: API.GetIrpdHistoryResponse = yield call(getIrpdHistory, { farmId, irpdId }, params);
        yield put({ type: 'queryIrpdHistorySuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryIrpdHistoryError', payload: error });
      }
    },
  },

  reducers: {
    queryIrpdHistoryError(state: GetIrpdHistoryModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryIrpdHistoryStart(state: GetIrpdHistoryModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryIrpdHistorySuccess(
      state: GetIrpdHistoryModelProps,
      { payload }: { payload: API.GetIrpdHistoryResponse },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        current: payload.current_page,
        total: payload.count,
        result: payload.results.map((item, index: number) => {
          if (item?.irpd_action_v5) {
            return {
              ...item.irpd_action_v5,
              key: `row-key-table-${index}`,
              origin: PumpHistoryOrigin.CentralUpdate,
              command: getIrpdCommand(item.irpd_action_v5?.content?.pump_action?.enable as number),
            };
          }
          if (item?.irpd_stream_v5) {
            return {
              ...item.irpd_stream_v5,
              key: `row-key-table-${index}`,
              origin: PumpHistoryOrigin.Command,
              command: getIrpdCommand(item.irpd_stream_v5?.content?.pump_action?.enable as number),
            };
          }
          return {};
        }),
        error: {},
      };
    },
  },
};
