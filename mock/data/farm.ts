import Mock from 'mockjs';
import { IResponse } from '../response';

export const GetFarmsResponse: IResponse<API.GetFarmResponse> = Mock.mock([
  {
    id: '@integer(0, 300)',
    is_administrator: true,
    payment_status: 0,
    name: 'Fazenda Sertão das Veredas',
    timezone: 'America/Sao_Paulo',
  },
]);

export const GetFarmConnectionResponse: IResponse<API.GetFarmConnectionResponse> = Mock.mock({
  is_online: false,
});
