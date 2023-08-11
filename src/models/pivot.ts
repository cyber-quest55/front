import { getPivots } from '@/services/pivot';
import { AxiosError } from 'axios';
export interface GetPivotModelProps {
  result: API.GetPivotByFarmResponse;
  loading: boolean;
  loaded: boolean;
  selectedPivot: Models.Pivot;
  error: any;
}

export default {
  namespace: 'pivot',

  state: {
    result: {},
    loaded: false,
    loading: true,
    selectedPivot: {},
    error: {},
  },

  effects: {
    *queryPivot(
      { payload }: { payload: API.GetPivotByFarmParam },
      { call, put }: { call: any; put: any },
    ) {
      yield put({ type: 'queryPivotStart' });

      try {
        const { data } = yield call(getPivots, payload);
        yield put({ type: 'queryPivotSuccess', payload: data });
      } catch (error: any) {
        yield put({ type: 'queryPivotError', payload: error });
      }
    },
  },

  reducers: {
    queryPivotError(state: GetPivotModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        loading: false,
        error: payload.response?.data,
      };
    },
    queryPivotStart(state: GetPivotModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryPivotSuccess(
      state: GetPivotModelProps,
      { payload }: { payload: API.GetPivotByFarmResponse },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        result: payload,
        selectedPivot: payload.list[0],
        error: {},
      };
    },
    setSelectedPivot(state: GetPivotModelProps, { payload }: { payload: Models.Pivot }) {
      return {
        ...state,
        selectedPivot: payload,
      };
    },
  },
};
