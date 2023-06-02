import { getDeviceReports } from '@/services/device';
import { AxiosError } from 'axios';
 

export interface GetDeviceReportModelProps {
  result: Models.DeviceReport;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export default {
  namespace: 'deviceReport',

  state: {
    result: {},
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryDeviceReport({ payload }: { payload: any }, { call, put }: { call: any; put: any }) {
      yield put({ type: 'queryDeviceReportStart' });
      try {
        const { data } = yield call(getDeviceReports, payload);
        yield put({ type: 'queryDeviceReportSuccess', payload: data });
      } catch (error: any) {
        yield put({ type: 'queryDeviceReportError', payload: error });
      }
    },
  },

  reducers: {
    queryDeviceReportError(state: GetDeviceReportModelProps, { payload }: { payload: AxiosError }) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryDeviceReportStart(state: GetDeviceReportModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryDeviceReportSuccess(
      state: GetDeviceReportModelProps,
      { payload }: { payload: API.GetDeviceReportResponse },
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
