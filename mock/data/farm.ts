import { IResponse, defaulSuccessResponse } from '../response';
import Mock from 'mockjs';

export const GetFarmsResponse: IResponse<API.GetFarmResponse> = Mock.mock({ 
    ...defaulSuccessResponse,
    data: {
        current: 0,
        pageSize: 10,
        total: 1000,
        'list|5': [{
            id: '@integer(0, 300)',
            is_administrator: true,
            payment_status: 0,
            name: 'Fezenda coração de boi',
            timezone: "America/Sao_Paulo",
        }]
    }
})

export const GetFarmConnectionResponse: IResponse<API.GetFarmConnectionResponse> = Mock.mock({
    ...defaulSuccessResponse,
    data: {
        is_online: false
    }
})