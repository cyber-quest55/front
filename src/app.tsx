import { AvatarDropdown, AvatarName } from '@/components';
import { getUserInfo, currentUser as queryCurrentUser } from '@/services/user/index';
import { LinkOutlined, UserOutlined } from '@ant-design/icons';
import {
  ProConfigProvider,
  type Settings as LayoutSettings,
} from '@ant-design/pro-components';
import { LoadScript } from '@react-google-maps/api';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link, } from '@umijs/max';
import { App } from 'antd';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import uniqid from 'uniqid';
import { socketMiddleware } from './middlewares/socket';
import defaultSettings from '../config/defaultSettings';
import Logo from '../public/images/logo/icon-logo-white-192x192.png';
import FarmSelect from './components/FarmSelect/FarmSelectContainer';
import LocaleSelectorContainer from './components/LocaleSelector/LocaleSelectorContainer';
import OfflineNetworkContainer from './components/Modals/OfflineNetwork/OfflineNetworkContainer';
import ZendeskChat from './components/ZendeskChat';
import ForbidenPage from './pages/403';
import NoFoundPage from './pages/404';
import { errorConfig } from './requestErrorConfig';
import { io } from 'socket.io-client';
import '@/utils/FCMService'
import PushNotificationConfig from './components/PushNotificationConfig';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
import { setDefaultConfig } from 'antd-mobile'
import enUS from 'antd-mobile/es/locales/en-US'
import { ToggleDarkMode } from './components/ToggleDarkMode';


type Libraries = ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[];

const consoleError = console.error;
const SUPPRESSED_WARNINGS = ['Warning:'];

console.error = function filterWarnings(msg, ...args) {
  if (!SUPPRESSED_WARNINGS.some((entry) => Array.isArray(msg) && msg?.includes(entry))) {
    consoleError(msg, ...args);
  }
};

setDefaultConfig({
  locale: enUS,
})

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
      const msg = await queryCurrentUser({});
      const data = await getUserInfo({});
      return { ...msg.profile, ...data };
    } catch (error) {
      //history.push(loginPath);
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
  return {
    collapsed: true,
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
const loaderId = uniqid('loader-');

const libraries: Libraries = ['visualization'];

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState,  }) => {
  
  return {
    ...initialState?.settings, 
    unAccessible: <ForbidenPage />,
    noFound: <NoFoundPage />, 
    onCollapse: () => {
      setInitialState({ ...initialState, collapsed: !initialState?.collapsed });
    },
    actionsRender: ({ collapsed, isMobile }) => {
      if (isMobile) {
        return [<div key="ToggleDarkMode" style={{ color: 'rgba(255,255,255,0.75)' }}>
        <ToggleDarkMode initialState={initialState} setInitialState={setInitialState}/>
      </div>];
      }
      return [
        <div key="SelectLang" style={{ color: 'rgba(255,255,255,0.75)' }}>
          <LocaleSelectorContainer isCollapsed={collapsed} />
        </div>,
        <div key="ToggleDarkMode" style={{ color: 'rgba(255,255,255,0.75)' }}>
          <ToggleDarkMode initialState={initialState} setInitialState={setInitialState}/>
        </div>
        // <div key="SelectFarm" style={{ color: 'white' }}> <FarmSelect /></div>
      ];
    },
    siderMenuType: initialState?.collapsed ? 'sub' : 'group', 
    logo: Logo,
    hasSiderMenu: false,
    breakpoint: false,
    avatarProps: {
      style: { color: 'rgba(255,255,255,0.75)', padding: 0 },
      src: <UserOutlined />,
      title: <AvatarName />,
      render: (props: any, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },


    localization: true,
    onPageChange: () => {
      const { location } = history;
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
    
    menuExtraRender: ({ collapsed }) =>
      !collapsed && (
        <div style={{ paddingInline: 12 }}>
          <FarmSelect />
        </div>
      ),

  

    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    token: initialState?.settings?.navTheme === 'realDark' ? {} : defaultSettings.token,
    childrenRender: (children, {  }  ) => {
      // if (initialState?.loading) return <PageLoading />;
       
      return (
        <App >
          <ProConfigProvider token={{ colorPrimary: defaultSettings.colorPrimary }} >
            <OfflineNetworkContainer />
            <LoadScript
              libraries={libraries as any}
              id={loaderId}
              loadingElement={<div>Carregando</div>}
              googleMapsApiKey="&key=AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU"
            >
              
              {children}
              
              <ZendeskChat />
              <PushNotificationConfig />
            </LoadScript>
          </ProConfigProvider>
        </App>
      );
    }, 

    menu: {
      collapsedShowGroupTitle: true,
    },
    defaultCollapsed: true,

  };
};

export const dva = {
  config: {
    onAction: [
      socketMiddleware(
        io(
          'http://3.137.182.47:8080',
          {
            transports: [
              'websocket',
              'polling',
              'flashsocket'
            ],
            autoConnect: false
          }
        )
      )
    ]
  },
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
