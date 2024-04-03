export interface SelectedFarmModelProps {
  id: number;
  is_administrator: boolean;
  payment_status: string;
  name: string;
  timezone: string;
  error?: any;
}

export const setSelectedFarm = (payload: APIModels.Farm) => {
  return {
    type: 'selectedFarm/setSelectedFarm',
    payload: payload,
  };
};

export default {
  namespace: 'selectedFarm',

  state: {
    id: 0,
    is_administrator: false,
    payment_status: '',
    name: '',
    timezone: '',
    error: {},
  },

  effects: {
    *setSelectedFarm(
      { payload }: { payload: any },
      { put, select }: { put: any, select: any },
    ) {
      yield put({ type: 'setSelectedFarmDefinition', payload: payload });
      yield put({ type: 'farm/setSelectedFarm', payload })
      yield put({ type: 'selectedDevice/setDeviceClose', payload: {} });

      const state = yield select((state) => state.farm);
      if (state.selectedFarm.id !== payload.id) {
        yield put({ type: 'pivotInformation/onDestroy', payload: {} });
        yield put({ type: 'irpd/onDestroyDeviceBox', payload: {} });
        yield put({ type: 'meterSystem/onDestroyDeviceBox', payload: {} });
      }
    },
  },

  reducers: {
    setSelectedFarmDefinition(
      state: SelectedFarmModelProps,
      {
        payload,
      }: {
        payload: {
          id: number;
          is_administrator: boolean;
          payment_status: string;
          name: string;
          timezone: string;
        };
      },
    ) {
      return {
        ...state,
        ...payload,
      };
    },

    setFarmClose() {
      return {
        id: 0,
        is_administrator: false,
        payment_status: '',
        name: '',
        timezone: '',
        error: {},
      };
    },
  },
};
