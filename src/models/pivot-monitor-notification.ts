import { getPivotMonitorNotifications, getPivotNotificationsReasons } from '@/services/notification';
import { getPivots } from '@/services/pivot';
import { NotificationRequestLanguage } from '@/utils/enum/language';
import { getLocale } from '@umijs/max';
import { AxiosError } from 'axios';

export type NotificationMapped = {
  id: number;
  farm: number;
  devices: APIModels.PivotByFarm[];
  enable: boolean;
  name: string;
  start: string;
  end: string;
  created?: string;
  updated?: string;
  user: number;
  reasons: APIModels.NotificationReason[];
  critical_reasons: number[];
};

export interface GetPivotMonitorNotificationsModelProps {
  notifications: APIModels.Notification[];
  notificationsFormatted: NotificationMapped[];
  reasons: APIModels.NotificationReason[];
  pivots: APIModels.PivotByFarm[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryPivotMonitorNotifications = (payload: any) => {
  return {
    type: 'pivotMonitorNotifications/queryPivotMonitorNotifications',
    payload: payload,
  };
};

export const deletePivotMonitorNotificationAction = (notificationId: number) => {
  return {
    type: 'pivotMonitorNotifications/deletePivotMonitorNotification',
    payload: { notificationId },
  };
};

export const enablePivotMonitorNotificationAction = (payload: {enable: boolean, index: number}) => {
  return {
    type: 'pivotMonitorNotifications/enablePivotMonitorNotification',
    payload: payload,
  };
};

export default {
  namespace: 'pivotMonitorNotifications',

  state: {
    notificationsFormatted: [],
    notifications: [],
    reasons: [],
    pivots: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryPivotMonitorNotifications(
      {payload}: { payload:{farmId: number }},
      { call, all, put }: { call: any; all: any; put: any },
    ): any {
      const locale = getLocale();
      const language =
        NotificationRequestLanguage[locale as keyof typeof NotificationRequestLanguage] ??
        NotificationRequestLanguage['en-US'];
      yield put({ type: 'queryPivotMonitorNotificationsStart' });
      try {
        const [notifications, reasons, pivots] = yield all([
          call(getPivotMonitorNotifications),
          call(getPivotNotificationsReasons, { equipmentType: 1, language }),
          call(getPivots, { id: payload.farmId }),
        ]);
        const notificationsFilteredByFarm = notifications.filter((n) => n.farm === Number(payload.farmId));
        yield put({
          type: 'queryPivotMonitorNotificationsSuccess',
          payload: { notifications: notificationsFilteredByFarm, reasons, pivots },
        });
      } catch (error: any) {
        yield put({ type: 'queryPivotMonitorNotificationsError', payload: error });
      }
    },
  },

  reducers: {
    deletePivotMonitorNotification(state: GetPivotMonitorNotificationsModelProps, { payload }: { payload: {notificationId: number} }) {
      return {
        ...state,
        notificationsFormatted: state.notificationsFormatted.filter((n) => n.id !== payload.notificationId),
      };
    },
    enablePivotMonitorNotification(state: GetPivotMonitorNotificationsModelProps, { payload }: { payload: { enable: boolean, index: number } }) {
      const { enable, index } = payload;
      const newNotificationsFormatted = [...state.notificationsFormatted];
      newNotificationsFormatted[index].enable = enable;
      return {
        ...state,
        notificationsFormatted: newNotificationsFormatted,
      };
    },
    queryPivotMonitorNotificationsError(
      state: GetPivotMonitorNotificationsModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryPivotMonitorNotificationsStart(state: GetPivotMonitorNotificationsModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryPivotMonitorNotificationsSuccess(
      state: GetPivotMonitorNotificationsModelProps,
      {
        payload,
      }: {
        payload: {
          notifications: APIModels.Notification[];
          reasons: APIModels.NotificationReason[];
          pivots: APIModels.PivotByFarm[];
        };
      },
    ) {
      const { notifications, reasons, pivots } = payload;
      const newNotificationsFormatted = notifications.map((notification) => ({
        ...notification,
        devices: pivots.filter((pivot) => notification.devices.includes(pivot.id)),
        reasons: reasons.filter((reason) => notification.reasons.includes(reason.id)),
      }));

      return {
        ...state,
        loading: false,
        loaded: true,
        notifications,
        reasons,
        pivots,
        notificationsFormatted: newNotificationsFormatted,
        error: {},
      };
    },
  },
};
