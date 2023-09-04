import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter';
import { getIrpdById } from '@/services/irpd/';
import { getIrpdColor } from '@/utils/formater/get-irpd-color';
import { getIrpdStatus } from '@/utils/formater/get-irpd-status';
import { AxiosError } from 'axios';

export interface GetIrpdByIdModelProps {
  unformated: any;
  result: LakeLevelMeterProps;
  pivotColor?: string;
  statusText?: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryIrpdById = (payload: API.GetIrpdByIdParams ) => {
  return {
    type: 'irpdById/queryIrpdById',
    payload: payload,
  };
};


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
    *queryIrpdById({ payload }: { payload: API.GetIrpdByIdParams }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryIrpdByIdStart' });
      try {
        const response: API.GetIrpdByIdResponse = yield call(getIrpdById, payload);
        yield put({ type: 'queryIrpdByIdSuccess', payload: response });
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
      const status = item.latest_irpd_stream_v5_event?.content?.imanage_master_status?.status;
      const latLng = item.position.split(',');
      const mapper = {
        id: item.id,
        centerLat: parseFloat(latLng[0]),
        centerLng: parseFloat(latLng[1]),
        name: item.name,
        updated: new Date(item.updated).toLocaleString(),
        deviceColor: getIrpdColor(status),
        statusText: getIrpdStatus(status),
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
