import { getPivotNotifications, getPivotNotificationsReasons } from '@/services/notification';
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

export interface GetPivotNotificationsModelProps {
  notifications: APIModels.Notification[];
  notificationsFormatted: NotificationMapped[];
  reasons: APIModels.NotificationReason[];
  pivots: APIModels.PivotByFarm[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryPivotNotifications = (payload: any) => {
  return {
    type: 'pivotNotifications/queryPivotNotifications',
    payload: payload,
  };
};

export const deletePivotNotificationAction = (notificationId: number) => {
  return {
    type: 'pivotNotifications/deletePivotNotification',
    payload: { notificationId },
  };
};

export const enablePivotNotificationAction = (payload: { enable: boolean; index: number }) => {
  return {
    type: 'pivotNotifications/enablePivotNotification',
    payload: payload,
  };
};

export default {
  namespace: 'pivotNotifications',

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
    *queryPivotNotifications(
      { payload }: { payload: { farmId: number } },
      { call, all, put }: { call: any; all: any; put: any },
    ): any {
      const locale = getLocale();
      const language =
        NotificationRequestLanguage[locale as keyof typeof NotificationRequestLanguage] ??
        NotificationRequestLanguage['en-US'];
      yield put({ type: 'queryPivotNotificationsStart' });
      try {
        const [notifications, reasons, pivots] = yield all([
          call(getPivotNotifications),
          call(getPivotNotificationsReasons, { equipmentType: 0, language }),
          call(getPivots, { id: payload.farmId }),
        ]);
        const notificationsFilteredByFarm = notifications.filter((n) => n.farm === Number(payload.farmId));
        yield put({
          type: 'queryPivotNotificationsSuccess',
          payload: { notifications: notificationsFilteredByFarm, reasons, pivots },
        });
      } catch (error: any) {
        yield put({ type: 'queryPivotNotificationsError', payload: error });
      }
    },
  },

  reducers: {
    deletePivotNotification(
      state: GetPivotNotificationsModelProps,
      { payload }: { payload: { notificationId: number } },
    ) {
      return {
        ...state,
        notificationsFormatted: state.notificationsFormatted.filter(
          (n) => n.id !== payload.notificationId,
        ),
      };
    },
    enablePivotNotification(
      state: GetPivotNotificationsModelProps,
      { payload }: { payload: { enable: boolean; index: number } },
    ) {
      const { enable, index } = payload;
      const newNotificationsFormatted = [...state.notificationsFormatted];
      newNotificationsFormatted[index].enable = enable;
      return {
        ...state,
        notificationsFormatted: newNotificationsFormatted,
      };
    },
    queryPivotNotificationsError(
      state: GetPivotNotificationsModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryPivotNotificationsStart(state: GetPivotNotificationsModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryPivotNotificationsSuccess(
      state: GetPivotNotificationsModelProps,
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
