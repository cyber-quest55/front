export interface SelectedFarmModelProps {
  id: number;
  is_administrator: boolean;
  payment_status: string;
  name: string;
  timezone: string;
  error?: any;
}

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
    *setSelectedFarm({ payload }: { payload: any }, { put }: { put: any }) {
      yield put({ type: 'setSelectedFarmDefinition', payload: payload });
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
