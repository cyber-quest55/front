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

export async function updatePivotNotification(
  props: { notificationId: number },
  options?: APIModels.Notification,
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/pivots/${props.notificationId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function deletePivotNotification(
  props: { notificationId: number },
) {
  return request<{
    data: API.PostPivotNotificationResponse;

  }>(`/v4/notifications/pivots/${props.notificationId}/`, {
    method: 'DELETE',
  });
}

export async function enablePivotNotification(
  props: { notificationId: number },
  options: { enable: boolean } 
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/pivots/${props.notificationId}/`, {
    method: 'PATCH',
    data: options
  });
}

export async function getPivotMonitorNotifications() {
  return request<API.GetPivotNotificationsResponse>(`/v4/notifications/pivots-monitors/`, {
    method: 'GET',
  });
}

export async function postPivotMonitorNotification(
  options?: APIModels.Notification,
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/pivots-monitors/`, {
    method: 'POST',
    data: options,
  });
}

export async function updatePivotMonitorNotification(
  props: { notificationId: number },
  options?: APIModels.Notification,
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/pivots-monitors/${props.notificationId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function deletePivotMonitorNotification(
  props: { notificationId: number },
) {
  return request<{
    data: API.PostPivotNotificationResponse;

  }>(`/v4/notifications/pivots-monitors/${props.notificationId}/`, {
    method: 'DELETE',
  });
}

export async function enablePivotMonitorNotification(
  props: { notificationId: number },
  options: { enable: boolean } 
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/pivots-monitors/${props.notificationId}/`, {
    method: 'PATCH',
    data: options
  });
}

export async function getIrpdNotifications() {
  return request<API.GetPivotNotificationsResponse>(`/v4/notifications/irpds/`, {
    method: 'GET',
  });
}

export async function postIrpdNotification(
  options?: APIModels.Notification,
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/irpds/`, {
    method: 'POST',
    data: options,
  });
}

export async function updateIrpdNotification(
  props: { notificationId: number },
  options?: APIModels.Notification,
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/irpds/${props.notificationId}/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function deleteIrpdNotification(
  props: { notificationId: number },
) {
  return request<{
    data: API.PostPivotNotificationResponse;

  }>(`/v4/notifications/irpds/${props.notificationId}/`, {
    method: 'DELETE',
  });
}

export async function enableIrpdNotification(
  props: { notificationId: number },
  options: { enable: boolean } 
) {
  return request<{
    data: API.PostPivotNotificationResponse;
  }>(`/v4/notifications/irpds/${props.notificationId}/`, {
    method: 'PATCH',
    data: options
  });
}