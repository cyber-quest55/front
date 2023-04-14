import { ProLayoutProps } from '@ant-design/pro-components';
import * as path from 'path'
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = { 
  // 拂晓蓝 
  colorPrimary: '#00b96b',
  layout: 'side', 
  collapsed: true,
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Irricontrol',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  splitMenus: false,
  token: {
    header: {
      colorHeaderTitle: 'white'
    }, 
    sider: {
      colorMenuBackground: '#2f4050',
      colorTextMenu: 'white', 
      colorTextMenuTitle: 'white'
    },
    pageContainer: {
      paddingBlockPageContainerContent: 0,
      paddingInlinePageContainerContent: 0,
    },
  },
};

export default Settings;
