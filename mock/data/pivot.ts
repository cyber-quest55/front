import Mock from 'mockjs';
import { IResponse, defaulSuccessResponse } from '../response';

export const getPivotByIdResponse: IResponse<API.getPivotByIdResponse> = Mock.mock({
    ...defaulSuccessResponse,
    data: {
        current: 0,
        pageSize: 10,
        total: 1000,
        'list|10': [{
            id: '@integer(0, 300)',
            automation_type: 0,
            farm: '@integer(0, 300)',
            name: '@string()',
            protocol: 4.1,
        }]
    }
})