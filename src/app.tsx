import { AvatarDropdown, AvatarName, SelectLang } from '@/components';
import { currentUser as queryCurrentUser } from '@/services/user/index';
import { LinkOutlined, UserOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { LoadScript } from '@react-google-maps/api';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { App } from 'antd';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import uniqid from 'uniqid';
import defaultSettings from '../config/defaultSettings';
import Logo from '../public/images/logo/icon-logo-white-192x192.png';
import FarmSelect from './components/FarmSelect';
import { errorConfig } from './requestErrorConfig';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

type Libraries  = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[]

dayjs.extend(weekday);
dayjs.extend(localeData);
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  collapsed: boolean;
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  loading?: boolean;
  fetchUserInfo?: () => Promise<any | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data.profile;
    } catch (error) {
      console.log('chegou aqui2')
      history.push(loginPath);
    }
    return undefined;
  };
  
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      collapsed: true,
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  console.log('chegou aqui')
  return {
    collapsed: true,
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}
// testing 4
// ProLayout 支持的api https://procomponents.ant.design/components/layout
const loaderId = uniqid('loader-');
const libraries:  Libraries = ['visualization']

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    ...initialState?.settings,
    defaultCollapsed: true,
    collapsed: initialState?.collapsed,
    onCollapse: () => {
      setInitialState({ ...initialState, collapsed: !initialState?.collapsed });
    },
    actionsRender: ({ collapsed, isMobile }) => {
      if (collapsed && !isMobile) {
        return [];
      }

      if (collapsed && isMobile) {
        return [
          <div key="SelectLang" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <SelectLang />
          </div>,
          // <div key="SelectFarm" style={{ color: 'white' }}> <FarmSelect /></div>
        ];
      }

      return [
        <div key="SelectLang" style={{ color: 'rgba(255,255,255,0.75)' }}>
          <SelectLang />
        </div>,
        // <div key="SelectFarm" style={{ color: 'white' }}> <FarmSelect /></div>
      ];
    },
    siderMenuType: initialState?.collapsed? 'sub': 'group',
    
    logo: Logo,
    breakpoint: 'xs',
    avatarProps: {
      style: { color: 'rgba(255,255,255,0.75)', padding: 0 },
      src: <UserOutlined />,
      title: <AvatarName />,
      render: (props: any, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },

    onPageChange: () => {
      const { location } = history;
      console.log(initialState?.currentUser)
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,

    menuExtraRender: ({ collapsed }) => !collapsed && <FarmSelect />,

    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态

    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <App>
          <LoadScript libraries={libraries}   id={loaderId} loadingElement={<div>Carregando</div>} googleMapsApiKey="">
            {children}
          </LoadScript>
        </App>
      );
    },

    menu: {
      collapsedShowGroupTitle: true,
    },
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
