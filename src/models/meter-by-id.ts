import { LakeLevelMeterProps } from '@/components/Devices/LakeLevelMeter';
import { getMeterSystemById } from '@/services/metersystem/';
import { getIrpdColor } from '@/utils/get-irpd-color';
import { getMeterStatus } from '@/utils/get-meter-status';
import { AxiosError } from 'axios';

export interface GetMeterSystemByIdModelProps {
  unformated: Models.MeterSystem;
  result: LakeLevelMeterProps;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'meterSystemById',

  state: {
    unformated: {},
    result: {},
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryMeterSystemById({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryMeterSystemByIdStart' });
      try {
        const { data } = yield call(getMeterSystemById, payload);
        yield put({ type: 'queryMeterSystemByIdSuccess', payload: data });
      } catch (error: any) {
        yield put({ type: 'queryMeterSystemByIdError', payload: error });
      }
    },
  },

  reducers: {
    queryMeterSystemByIdError(state: GetMeterSystemByIdModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryMeterSystemByIdStart(state: GetMeterSystemByIdModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryMeterSystemByIdSuccess(
      state: GetMeterSystemByIdModelProps,
      { payload }: { payload: API.GetMeterSystemByIdResponse },
    ) {
      const item = payload;
      const status = item.imeter_set[0]?.latest_event_stream.content?.imanage_master_status.status

      const latLng = item.position.split(',');

      const mapper = {
        id: item.id,
        centerLat: parseFloat(latLng[0]),
        centerLng: parseFloat(latLng[1]),
        name: item.name,
        updated: new Date(item.updated).toLocaleString(),
        deviceColor: getIrpdColor(status),
        statusText: getMeterStatus(status),
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
