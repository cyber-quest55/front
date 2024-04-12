﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        name: 'Password Recovery',
        path: '/user/password-recovery',
        component: './User/PasswordRecovery',
      },
      {
        name: 'Password Recovery Success',
        path: '/user/recovery-success',
        component: './PassworRecoveryCofirmation',
      },
      {
        name: 'Password Reset Success',
        path: '/user/reset-success',
        component: './PasswordResetCofirmation',
      },
      {
        name: 'register',
        path: '/user/register/:token',
        component: './User/Register',
      },
    ],
  },
  {
    path: 'climate/:farmId/pluviometer',
    name: 'Pluviometer',
    icon: 'compassOutlined',
    component: './Climate/Pluviometer.tsx',
  },
  {
    path: '/farms',
    name: 'Control',
    icon: 'formOutlined',
    routes: [
      {
        hasNavbar: false,

        path: '/farms/:id',
        name: 'Sua Fazenda',
        component: './Farms/[id].tsx',
      }, 
      {
        path: '/farms/:id/edit',
        name: 'Editar fazenda',
        hideInMenu: true,
        component: './Farms/Edit.tsx'
      },
    ],
  },
  {
    path: 'report/',
    name: 'Relatórios',
    icon: 'pieChartOutlined',
     routes: [
      {
        path: 'report/farms/:id',
        name: 'Relatório do Negócio',
        component: './Reports/index.tsx',
      },
      {
        path: '/report/farms/create',
        name: 'Relatório da Fazenda',
        component: './Farms/create.tsx',
      },
    ],
  },
  {
    name: 'Password Recovery Callback',
    path: '/recovery/:token',
    layout: false,
    component: './User/PasswordReset',
  },
  {
    path: 'devices/farms/:id/',
    name: 'Radio',
    icon: 'deploymentUnitOutlined',
    component: './Devices',
  },
  {
    path: 'farms/:farmId/pivot/:pivotId/edit',
    name: 'Edit Pivot',
    hideInMenu: true,
    component: './Pivot/Edit.tsx',
  },
  {
    path: 'farms/:farmId/pivot/:pivotId/weatherstation',
    name: 'Weather Station',
    component: './WeatherStation/index.tsx',
    icon: 'CloudOutlined',
    hideInMenu: true,
  },
  {
    path: 'farms/:farmId/metersystem/:meterSystemId/meter/:meterId/edit',
    name: 'Edit Meter',
    hideInMenu: true,
    component: './Meter/Edit.tsx',
  },
  {
    path: 'profile',
    name: 'User Profile',
    hideInMenu: true,
    component: './Profile',
  },
  {
    path: 'farms/:farmId/repeater/:repeaterId/edit',
    name: 'Edit Repeater',
    hideInMenu: true,
    component: './Repeater/Edit.tsx',
  },
  {
    path: 'farms/:farmId/irpd/:irpdId/edit',
    name: 'Edit Pump',
    hideInMenu: true,
    component: './Irpd/Edit.tsx',
  },
  {
    path: 'farms/:farmId/irpd/:irpdId/editv4',
    name: 'Edit Pump',
    hideInMenu: true,
    component: './Irpd/EditV4.tsx',
  },
  {
    path: 'farms/:farmId/notifications/',
    name: 'Notificações',
    icon: 'bellOutlined',
    component: './Notifications',
  },
  
  {
    path: '/climate/farms/:id/',
    name: 'Clima',
    icon: 'heatMapOutlined',
    component: './Climate',
  },

  {
    path: '/403',
    layout: false,
    component: './403',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },

];
