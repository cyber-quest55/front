// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /auth/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUserResult>('/auth/profile', {
    method: 'GET',
    ...(options || {}),
  });
}
