import { getRepeaterById } from '@/services/repeaters/';
import { AxiosError } from 'axios';

export interface GetRepeaterByIdModelProps {
  unformated: API.GetRepeaterByIdResponse;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryRepeaterById = (payload: API.GetRepeaterByIdParams) => {
  return {
    type: 'repeaterById/queryRepeaterById',
    payload: payload,
  };
};

export default {
  namespace: 'repeaterById',

  state: {
    unformated: {},
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryRepeaterById({ payload }: { payload: API.GetRepeaterByIdParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryRepeaterByIdStart' });
      try {
        const response: API.GetRepeaterByIdResponse = yield call(getRepeaterById, payload);
        yield put({ type: 'queryRepeaterByIdSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryRepeaterByIdError', payload: error });
      }
    },
  },

  reducers: {
    queryRepeaterByIdError(
      state: GetRepeaterByIdModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryRepeaterByIdStart(state: GetRepeaterByIdModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryRepeaterByIdSuccess(
      state: GetRepeaterByIdModelProps,
      { payload }: { payload: API.GetRepeaterByIdResponse },
    ) {

      return {
        ...state,
        loading: false,
        loaded: true,
        unformated: payload,
        error: {},
      };
    },
  },
};
