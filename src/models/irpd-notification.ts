import { getIrpdNotifications, getPivotNotificationsReasons } from '@/services/notification';
import { getIrpds } from '@/services/irpd';
import { getLocale } from '@umijs/max';
import { AxiosError } from 'axios';
import { NotificationRequestLanguage } from '@/utils/enum/language';

export type NotificationMapped = {
  id: number;
  farm: number;
  devices: APIModels.IrpdById[];
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

export interface GetIrpdNotificationsModelProps {
  notifications: APIModels.Notification[];
  notificationsFormatted: NotificationMapped[];
  reasons: APIModels.NotificationReason[];
  irpds: APIModels.IrpdById[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const queryIrpdNotifications = (payload: any) => {
  return {
    type: 'irpdNotifications/queryIrpdNotifications',
    payload: payload,
  };
};

export const deleteIrpdNotificationAction = (notificationId: number) => {
  return {
    type: 'irpdNotifications/deleteIrpdNotification',
    payload: { notificationId },
  };
};

export const enableIrpdNotificationAction = (payload: {enable: boolean, index: number}) => {
  return {
    type: 'irpdNotifications/enableIrpdNotification',
    payload: payload,
  };
};

export default {
  namespace: 'irpdNotifications',

  state: {
    notificationsFormatted: [],
    notifications: [],
    reasons: [],
    irpds: [],
    loaded: false,
    loading: true,
    error: {},
  },

  effects: {
    *queryIrpdNotifications(
      {payload}: { payload:{farmId: number }},
      { call, all, put }: { call: any; all: any; put: any },
    ): any {
      const locale = getLocale();
      const language =
        NotificationRequestLanguage[locale as keyof typeof NotificationRequestLanguage] ??
        NotificationRequestLanguage['en-US'];
      yield put({ type: 'queryIrpdNotificationsStart' });
      try {
        const [notifications, reasons, irpds] = yield all([
          call(getIrpdNotifications),
          call(getPivotNotificationsReasons, { equipmentType: 2, language }),
          call(getIrpds, { id: payload.farmId }),
        ]);
        const notificationsFilteredByFarm = notifications.filter((n) => n.farm === Number(payload.farmId));
        yield put({
          type: 'queryIrpdNotificationsSuccess',
          payload: { notifications: notificationsFilteredByFarm, reasons, irpds },
        });
      } catch (error: any) {
        yield put({ type: 'queryIrpdNotificationsError', payload: error });
      }
    },
  },

  reducers: {
    deleteIrpdNotification(state: GetIrpdNotificationsModelProps, { payload }: { payload: {notificationId: number} }) {
      return {
        ...state,
        notificationsFormatted: state.notificationsFormatted.filter((n) => n.id !== payload.notificationId),
      };
    },
    enableIrpdNotification(state: GetIrpdNotificationsModelProps, { payload }: { payload: { enable: boolean, index: number } }) {
      const { enable, index } = payload;
      const newNotificationsFormatted = [...state.notificationsFormatted];
      newNotificationsFormatted[index].enable = enable;
      return {
        ...state,
        notificationsFormatted: newNotificationsFormatted,
      };
    },
    queryIrpdNotificationsError(
      state: GetIrpdNotificationsModelProps,
      { payload }: { payload: AxiosError },
    ) {
      return {
        ...state,
        error: payload.response?.data,
        loading: false,
      };
    },
    queryIrpdNotificationsStart(state: GetIrpdNotificationsModelProps) {
      return {
        ...state,
        loading: true,
      };
    },
    queryIrpdNotificationsSuccess(
      state: GetIrpdNotificationsModelProps,
      {
        payload,
      }: {
        payload: {
          notifications: APIModels.Notification[];
          reasons: APIModels.NotificationReason[];
          irpds: APIModels.IrpdById[];
        };
      },
    ) {
      const { notifications, reasons, irpds } = payload;
      const newNotificationsFormatted = notifications.map((notification) => ({
        ...notification,
        devices: irpds.filter((irpd) => notification.devices.includes(irpd.id)),
        reasons: reasons.filter((reason) => notification.reasons.includes(reason.id)),
      }));

      return {
        ...state,
        loading: false,
        loaded: true,
        notifications,
        reasons,
        irpds,
        notificationsFormatted: newNotificationsFormatted,
        error: {},
      };
    },
  },
};
