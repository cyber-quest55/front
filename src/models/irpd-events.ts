import { getIrpdEvents } from '@/services/irpd';
import { AxiosError } from 'axios';

export interface GetIrpdEventsModelProps {
  result: any;
  loading: boolean;
  loaded: boolean;
  error: any;
  total: number;
}

export const queryIrpdEvents = (payload: API.GetIrpdEventsParams ) => {
  return {
    type: 'irpdEvents/queryIrpdEvents',
    payload: payload,
  };
};

export default {
  namespace: 'irpdEvents',

  state: {
    total: 1,
    result: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryIrpdEvents(
      { payload }: { payload: API.GetIrpdEventsParams },
      { call, put }: { call: any; put: any },
    ) {
      const { farmId, irpdId, params } = payload;
      yield put({ type: 'queryIrpdEventsStart' });
      try {
        const response: API.GetIrpdEventsResponse = yield call(getIrpdEvents, { farmId, irpdId }, params);
        yield put({ type: 'queryIrpdEventsSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryIrpdEventsError', payload: error });
      }
    },
  },

  reducers: {
    queryIrpdEventsError(state: GetIrpdEventsModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryIrpdEventsStart(state: GetIrpdEventsModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryIrpdEventsSuccess(
      state: GetIrpdEventsModelProps,
      { payload }: { payload: API.GetIrpdEventsResponse },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        current: payload.current_page,
        total: payload.count,
        result: payload.results.map((item, index: number) => {
          return { ...item, key: `table-event-${index}` };
        }),
        error: {},
      };
    },
  },
};
