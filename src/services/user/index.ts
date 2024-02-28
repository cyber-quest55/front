// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import axios from 'axios';

/** GET /auth/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUserResult>('/v3/auth/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function findUserByUsernameOrEmail(options: APIModels.FindByUsernameOrEmailPayload) {
  return request<API.FindByUsernameOrEmailResponse>('/v3/auth/find/', {
    method: 'GET',
    params: options,
  });
}

export async function getUserPermissions(options: API.GetUserPermissionsParams) {
  return request<API.GetUserPermissionsResponse>(
    `/v3/farms/${options.farmId}/users/${options.id}/permissions/`, {
      method: 'GET',
    }
  );
}

export async function saveUserPermissions(options: API.SaveUserPermissionsParams) {
  return request<API.GetUserPermissionsResponse>(
    `/v3/farms/${options.farmId}/users/${options.id}/permissions/`,
    {
      method: 'PUT',
      data: options.body
    }
  )
}

export async function deleteUserFromFarm(options: API.GetUserPermissionsParams) {
  return request<API.GetUserPermissionsResponse>(
    `/v3/farms/${options.farmId}/users/${options.id}/`, {
      method: 'DELETE',
    }
  );
}

export async function getUserRole(options: API.GetUserPermissionsParams) {
  return request<API.GetUserRoleResponse>(
    `/v3/farms/${options.farmId}/users/${options.id}/permissions/admin/`, {
      method: 'GET',
    }
  );
}

export async function saveUserRole(options: API.SaveUserRoleParams) {
  return request<string>(
    `/v3/farms/${options.farmId}/users/${options.id}/permissions/admin/`, {
      method: 'PATCH',
      params: {
        administrator: options.administrator
      }
    }
  );
}

export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.CurrentUserResult>('/v3/auth/user', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function patchUserInfo(options: APIModels.PatchUserInfoPayload) {
  return request<{
    data: API.PatchUserInfoResponse;
  }>(`/v3/auth/user/`, {
    method: 'PATCH',
    data: options,
  });
}

export async function postProfile(options: APIModels.PostProfilePayload) {
  return request<{
    data: API.PostProfileResponse;
  }>(`/v3/auth/profile`, {
    method: 'POST',
    data: options,
  });
}

export async function changePassword(
  options: APIModels.PostChangePasswordPayload
) {
  return request<{
    data: API.PostChangePasswordResponse;
  }>(`/v3/auth/change/`, {
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
