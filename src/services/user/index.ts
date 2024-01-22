// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import axios from 'axios';

/** GET /auth/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUserResult>('/auth/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.CurrentUserResult>('/auth/user', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function patchUserInfo(options: APIModels.PatchUserInfoPayload) {
  return request<{
    data: API.PatchUserInfoResponse;
  }>(`/auth/user/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function postProfile(options: APIModels.PostProfilePayload) {
  return request<{
    data: API.PostProfileResponse;
  }>(`/auth/profile`, {
    method: 'POST',
    data: options,
  });
}

export async function changePassword(
  options: APIModels.PostChangePasswordPayload
) {
  return request<{
    data: API.PostChangePasswordResponse;
  }>(`/auth/change/`, {
    method: 'POST',
    data: options,
  });
}

/** GET /cep */
export async function getCep(options?: string) {
  return axios<any>(`https://viacep.com.br/ws/${options}/json/`, {
    method: 'GET',
  });
}
