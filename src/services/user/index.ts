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

/** GET /cep */
export async function getCep(options?: string) {
  return axios<any>(`https://viacep.com.br/ws/${options}/json/`, {
    method: 'GET', 
  });
}
