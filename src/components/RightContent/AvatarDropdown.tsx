import { useScreenHook } from '@/hooks/screen';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import LocaleSelectorContainer from '../LocaleSelector/LocaleSelectorContainer';
import { PushNotifications } from '@capacitor/push-notifications';
import { FCM } from '@capacitor-community/fcm';
import { Capacitor } from '@capacitor/core';
import { unsubscribeTokenFromTopic } from '@/utils/FCMService';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.email.split('@')[0]}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { md } = useScreenHook();
  const { initialState, setInitialState } = useModel('@@initialState');
  const userID = initialState?.currentUser?.id;

  const className = useEmotionCss(({}) => {
    return {
      [`.ant-pro-card-body`]: {
        paddingInline: '0px !important',
      },
      '.ant-pro-list-row-title': {
        width: '100%',
      },
      '.ant-list-item .ant-list-item-meta': {
        marginBlockEnd: 0,
      },
      '.anticon': {
        color: 'rgba(255, 255, 255, 0.75)',
      },
    };
  });

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    // await outLogin();
  };

  const disableNotifications = async () => {
    if (userID) {
      const notificationsSufix = [
        "pivot",
        "pivot-monitor",
        "irpd",
      ];
      const languages = ["pt-br", "en", "ru", "es", "de-at"];
      let nAlertTopics = languages.flatMap(
        (language) => {
          return notificationsSufix.map(
            (sufix) => {
              return `${FCM_SUFFIX}n-${sufix}-user-${userID}-${language}`;
            }
          );
        }
      );
      nAlertTopics.forEach(async (topic) => {
        if (Capacitor.getPlatform() === "web") {
          await unsubscribeTokenFromTopic(
            topic
          );
        } else {
          FCM.unsubscribeFrom({ topic });
        }
      });
      await PushNotifications.removeAllListeners();
    }
  }

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });


  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined } as any));
        });
        loginOut();
        disableNotifications();
        history.push(`/user/login`);
        return;
      }
      else if (key === 'profile') {
        history.push(`/profile`);
        return;
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sair',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Perfil',
    },
    !md || initialState?.collapsed
      ? {
          key: 'TESTE',
          
          label:<LocaleSelectorContainer/>,
          
        }
      : null,
  ];

  return (
    <HeaderDropdown
      className={className}
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
