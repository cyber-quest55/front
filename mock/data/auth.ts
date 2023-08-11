import Mock from 'mockjs';
import { IResponse } from '../response';

export const GetLoginResponse: IResponse<API.LoginResult> = Mock.mock({
  token: '1a451ec5527acb186befc4f3e2b87bf1fee4896c',
  user: 2050,
  profile: 1851,
  reseller: true,
  resellers: [],
});

