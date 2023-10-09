// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Authenticate the user POST /auth/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** Validate if the username already exists POST /auth/check_username */
export async function checkUsername(body: API.ValidateUsernameParam, options?: { [key: string]: any }) {
  return request<API.ValidateUsernameResult>('/auth/check_username/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Validate the registration token GET /auth/register */
export async function validateRegisterToken(options: API.ValidateRegisterTokenParam) {
  return request<API.ValidateRegisterTokenResult>('/auth/register/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: options,
  });
}

/** Register the user POST /auth/register */
export async function registerUser(body: API.RegisterUserParam, params: {token: string}) {
  return request<API.RegisterUserResult>('/auth/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    params
  });
}

/** Logout user POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
