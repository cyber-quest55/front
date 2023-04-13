import { IResponse, defaulSuccessResponse } from '../response';
import Mock from 'mockjs';

export const GetLoginResponse: IResponse<API.LoginResult> = Mock.mock({
    ...defaulSuccessResponse,
    data: {
        profile: 1,
        reseller: false,
        resellers: [],
        token: 'we3F24gnb#2_icop',
        two_factor_authentication: false,
        farm_id: 310,
        user: 'John',
        id: '@integer(0, 300)', 
    }
})
