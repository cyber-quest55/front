import { getFarms } from '@/services/farm';
import { AxiosError } from '@umijs/max';

export interface GetFarmModelProps {
  result: API.GetFarmResponse;
  loading: boolean;
  loaded: boolean;
  selectedFarm: APIModels.Farm;
  error: any;
}

export const queryFarm = (payload: { id?: number }) => {
  return {
    type: 'farm/queryFarm',
    payload: payload,
  };
};

export default {
  namespace: 'farm',

  state: {
    result: [],
    loaded: false,
    loading: true,
    selectedFarm: {},
    error: {},
  },

  effects: {
    *queryFarm(
      { payload }: { payload: any },
      { call, put }: { call: any; put: any }
    ) {
      yield put({ type: 'queryFarmStart' });
      try {

        const response: API.GetFarmResponse = yield call(getFarms);

        const hasFarm = response.findIndex(f => f.id === payload.id);
        const selectedFarm = response[hasFarm >= 0 ? hasFarm : 0];

        yield put({ type: 'queryFarmSuccess', payload: { data: response, id: payload.id, selectedFarm: selectedFarm  } });

        // Selected farm changed here
        yield put({ type: 'selectedFarm/setSelectedFarm', payload: selectedFarm });
        
      } catch (error: any) {
        yield put({ type: 'queryFarmError', payload: error });
      }
    },
  },

  reducers: {
    queryFarmError(state: GetFarmModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryFarmStart(state: GetFarmModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryFarmSuccess(
      state: GetFarmModelProps,
      { payload }: { 
        payload: {
          data: API.GetFarmResponse;
          id: string
          selectedFarm: any,
        }
      },
    ) {
      return {
        ...state,
        loading: false,
        loaded: true,
        selectedFarm: payload.selectedFarm,
        result: payload.data,
        error: {},
      };
    },
    setSelectedFarm(state: GetFarmModelProps, { payload }: { payload: any }) {
      return {
        ...state,
        selectedFarm: payload,
      };
    },
  },
};
