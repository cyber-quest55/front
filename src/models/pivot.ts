import { getPivots } from '@/services/pivot';
import { AxiosError } from 'axios';
import { getSocketBinds } from '../utils/formater/get-socket-binds';

export interface GetPivotModelProps {
  result: API.GetPivotByFarmResponse;
  loading: boolean;
  loaded: boolean;
  selectedPivot: any;
  error: any;
}

export const queryPivot  = (payload: API.GetPivotByFarmParam) => {
  return {
    type: 'pivot/queryPivot',
    payload: payload,
  };
};

export default {
  namespace: 'pivot',

  state: {
    result: [],
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
        const response:  API.GetPivotByFarmResponse = yield call(getPivots, payload);

        yield put({ type: 'queryPivotSuccess', payload: response });
      } catch (error: any) {
        yield put({ type: 'queryPivotError', payload: error });
      }
    },
    *onInit({}, { put, select }: { put: any; select: any }) {
      const state = yield select((state) => state.pivot);
      console.log('[here with state]', state);

      const channels = [
        {
          title: `d@pivot@${787}`,
          id: state.id,
          binds: [
            {
              callback: ['terst'],
              event: 'ControllerConfig_standard',
              id: state.id,
            },
            {
              callback: ['terst'],
              event: 'pivot_config',
              id: state.id,
            },
          ],
        },
      ];

      yield getSocketBinds(channels, put, 'subscribe');
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
        selectedPivot: payload[0],
        error: {},
      };
    },
    setSelectedPivot(state: GetPivotModelProps, { payload }: { payload: any }) {
      return {
        ...state,
        selectedPivot: payload,
      };
    },
  },
};
