// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /auth/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUserResult;
  }>('/auth/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
