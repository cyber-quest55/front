import { getFarmById } from '@/services/farm';
import { AxiosError } from '@umijs/max';

export type GetFarmByIdModelProps = {
  result: API.GetFarmFullResponse;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryFarmById = (payload: { id: number }) => {
  return {
    type: 'farmById/queryFarmById',
    payload: payload,
  };
};

type IState = {
  result: API.GetFarmFullResponse;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export default {
  namespace: 'farmById',
  state: {
    result: {},
    loaded: false,
    loading: true,
    error: {},
  } as IState,

  effects: {
    *queryFarmById({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryFarmByIdStart' });
      try {
        const response: API.GetFarmFullResponse = yield call(getFarmById, payload);
        yield put({ type: 'queryFarmByIdSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryFarmByIdError', payload: error });
      }
    },
  },

  reducers: {
    queryFarmByIdError(state: GetFarmByIdModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryFarmByIdStart(state: GetFarmByIdModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryFarmByIdSuccess(
      state: GetFarmByIdModelProps,
      { payload }: { payload: API.GetFarmFullResponse; },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        result: payload,
        error: {},
      };
    },
  },
};
