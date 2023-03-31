import { IResponse, defaulSuccessResponse } from '../response';
import Mock from 'mockjs';

export const gerFarmsResponse: IResponse<API.gerFarmsResponse> = Mock.mock({ 
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