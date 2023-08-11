import { IResponse } from "mock/response";
import Mock from 'mockjs';

export const GetCurrentUserResponse: IResponse<API.LoginResult> = Mock.mock({
    profile: {
      id: 1851,
      birth: null,
      country: 'BR',
      state: null,
      city: null,
      district: null,
      address_1: null,
      address_2: null,
      number: null,
      postal_code: null,
      prefix_cell_phone: null,
      cell_phone: null,
      phone: null,
      cpf: null,
      updated: '2023-04-05T15:33:14.971410-03:00',
      language: 'pt-br',
      is_accept_policy: true,
      accept_policy_date: '2023-03-08T10:36:31.490000-03:00',
      zendesk_customer_id: null,
      reset_password: false,
      user: 2050,
      accept_policy_version: 1,
      email: 'wellington.ferreira@irricontrol.com.br',
    },
  });
  

  /**
   * {
      success: true,
      data: {
        name: 'João Silva',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    }
   */