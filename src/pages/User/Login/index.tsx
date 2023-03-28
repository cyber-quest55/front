import { login } from '@/services/auth';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, ConfigProvider, Tabs, theme } from 'antd';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import ImageBgLogin from '../../../../public/images/bglogin.png';
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';

type LoginType = 'username' | 'email';

export default () => {
  /** Use functions */
  const intl = useIntl();

  /** Requests */
  const loginReq = useRequest(login, { manual: true });

  /** States */
  const [type, setType] = useState<string>('account');
  const [loginType, setLoginType] = useState<LoginType>('username');
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});

  /** Models */
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    const msg = await loginReq.run({ ...values });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#3BD16F',
        },
      }}
    >
      <ProConfigProvider dark>
        <div style={{ height: ' 100vh ' }}>
          <LoginFormPage
            onFinish={handleSubmit}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.btn.text',
                  defaultMessage: 'Entrar ',
                }),
              },
            }}
            style={{ color: 'white' }}
            backgroundImageUrl={ImageBgLogin}
            logo={ImageBgLogo}
            title="Irricontrol"
            subTitle="A BAUER GROUP COMPANY"
            labelAlign="left"
            activityConfig={{
              style: {
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                color: '#fff',
                borderRadius: 8,
                opacity: '0.9',
                backgroundColor: '#141414',
              },
              title: intl.formatMessage({
                id: 'pages.login.activity.title',
                defaultMessage: 'Sobre, Informações',
              }),
              subTitle: intl.formatMessage({
                id: 'pages.login.activity.desc',
                defaultMessage: 'Caso queira entrar em contato',
              }),

              action: (
                <Button
                  size="large"
                  style={{
                    borderRadius: 20,
                    background: '#fff',
                    color: '#1677FF',
                    width: 160,
                  }}
                >
                  {intl.formatMessage({
                    id: 'pages.login.activity.btn.text',
                    defaultMessage: 'CLIQUE AQUI',
                  })}
                </Button>
              ),
            }}
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane
                key={'username'}
                tab={intl.formatMessage({
                  id: 'pages.login.withUsername',
                  defaultMessage: 'Entrar com usuário',
                })}
              />
              <Tabs.TabPane
                key={'email'}
                tab={intl.formatMessage({
                  id: 'pages.login.withEmail',
                  defaultMessage: 'Entrar com e-mail',
                })}
              />
            </Tabs>
            {loginType === 'username' && (
              <>
                <ProConfigProvider token={{ colorPrimaryActive: '#74E39A' }}>
                  <ProFormText
                    name="username"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.login.input.user.placeholder',
                      defaultMessage: 'usuário.sobrenome',
                    })}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          id: 'validation.required',
                          defaultMessage: 'Campo obrigatório',
                        }),
                      },
                    ]}
                  />
                </ProConfigProvider>
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.input.password.placeholder',
                    defaultMessage: 'suaSenha123@',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'validation.required',
                        defaultMessage: 'Campo obrigatório',
                      }),
                    },
                  ]}
                />
              </>
            )}
            {loginType === 'email' && (
              <>
                <ProConfigProvider token={{ colorPrimaryActive: '#74E39A' }}>
                  <ProFormText
                    name="username"
                    fieldProps={{
                      size: 'large',
                      prefix: <MailOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={intl.formatMessage({
                      id: 'pages.login.input.user.placeholder',
                      defaultMessage: 'usuário.sobrenome',
                    })}
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          id: 'validation.required',
                          defaultMessage: 'Campo obrigatório',
                        }),
                      },
                      {
                        type: 'email',
                        message: intl.formatMessage({
                          id: 'validation.email',
                          defaultMessage: 'E-mail inválido',
                        }),
                      },
                    ]}
                  />
                </ProConfigProvider>
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.input.password.placeholder',
                    defaultMessage: 'suaSenha123@',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'validation.required',
                        defaultMessage: 'Campo obrigatório',
                      }),
                    },
                  ]}
                />
              </>
            )}
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                {intl.formatMessage({
                  id: 'pages.login.keepLoged',
                  defaultMessage: 'Continuar conectado',
                })}
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                {intl.formatMessage({
                  id: 'pages.login.recoverPassword',
                  defaultMessage: 'Esqueceu sua senha?',
                })}
              </a>
            </div>
          </LoginFormPage>
        </div>
      </ProConfigProvider>
    </ConfigProvider>
  );
};
