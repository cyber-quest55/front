import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter';
import { getIrpdById } from '@/services/irpd/';
import { AxiosError } from 'axios';

export interface GetIrpdByIdModelProps {
  unformated: Models.MeterSystem;
  result: LakeLevelMeterProps;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'irpdById',

  state: {
    unformated: {},
    result: {},
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryIrpdById({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryIrpdByIdStart' });
      try {
        const { data } = yield call(getIrpdById, payload);
        yield put({ type: 'queryIrpdByIdSuccess', payload: data });
      } catch (error: any) {
        yield put({ type: 'queryIrpdByIdError', payload: error });
      }
    },
  },

  reducers: {
    queryIrpdByIdError(state: GetIrpdByIdModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryIrpdByIdStart(state: GetIrpdByIdModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryIrpdByIdSuccess(
      state: GetIrpdByIdModelProps,
      { payload }: { payload: API.GetIrpdByIdResponse },
    ) {
      const item = payload;

      const latLng = item.position.split(',');


      const mapper = {
        id: item.id,
        centerLat: parseFloat(latLng[0]),
        centerLng: parseFloat(latLng[1]),
        name: item.name,
        updated: new Date(item.updated).toLocaleString(),
      };

      return {
        ...state,
        loading: false,
        loaded: true,
        result: mapper,
        unformated: item,
        error: {},
      };
    },
  },
};
