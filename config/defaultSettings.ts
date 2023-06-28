import { ProLayoutProps } from '@ant-design/pro-components';
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
  theme: "light",
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Irricontrol',
  pwa: true, 
  iconfontUrl: '',
  splitMenus: false,
  token: { 
    pageContainer: {
      paddingBlockPageContainerContent: 0,
      paddingInlinePageContainerContent: 0,
    },

    colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
    colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
    colorTextAppListIcon: 'rgba(255,255,255,0.85)',
    header: {
      colorBgHeader: '#2f4050',  
      colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
      colorBgMenuItemSelected: 'rgba(0,0,0,0.15)', 
      colorTextMenuSecondary: '#fff', 
      colorTextMenuActive: '#fff', 
      colorTextRightActionsItem: "#fff",
      colorHeaderTitle: "#fff",
      colorTextMenuSelected: "#fff",
      colorTextMenu: '#fff',
    },

    sider: {
      colorBgCollapsedButton: '#fff',
    
      colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
      colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
      colorMenuBackground: '#2f4050',
      colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
      colorMenuItemDivider: 'rgba(255,255,255,0.15)',
      colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
      colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
      colorTextMenuSelected: '#fff',
      colorTextMenuItemHover: 'rgba(255,255,255,0.75)',
      colorTextMenu: 'rgba(255,255,255,0.75)',
      colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
      colorTextMenuTitle: 'rgba(255,255,255,0.95)',
      colorTextMenuActive: 'rgba(255,255,255,0.95)',
      colorTextSubMenuSelected: '#fff',
    },
    
  },
};

export default Settings;
