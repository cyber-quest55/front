import Mock from 'mockjs';
import { IResponse, defaulSuccessResponse } from '../response';

export const GetPivotByIdResponse: IResponse<API.GetPivotByFarmResponse> = Mock.mock({
    ...defaulSuccessResponse,
    data: {
        current: 0,
        pageSize: 10,
        total: 1000,
        'list|6': [{
            id: '@integer(0, 300)',
            automation_type: 0,
            farm: '@integer(0, 300)',
            name: 'Pivô 1',
            protocol: 4.1,
        }]
    }
})