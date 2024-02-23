// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /v3/farms/${farmId}/repeaters/ */
export async function getPivotNotifications() {
  return request<API.GetPivotNotificationsResponse>(`/v4/notifications/pivots/`, {
    method: 'GET',
  });
}

export async function getPivotNotificationsReasons(props: API.GetPivotNotificationReasonsParams) {
  return request<API.GetPivotNotificationReasonsResponse>(
    `/v3/notifications/reasons/?&type=${props.equipmentType}&language=${props.language}`,
    {
      method: 'GET',
    },
  );
}

export async function postPivotNotification(
  options?: APIModels.Notification,
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/pivots/`, {
    method: 'POST',
    data: options,
  });
}
