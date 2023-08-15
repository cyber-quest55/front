import { login } from '@/services/auth';
import { currentUser as queryCurrentUser } from '@/services/user/index';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormItem,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, SelectLang, useModel, useRequest } from '@umijs/max';
import { Button, Col, ConfigProvider, Row, Space, Typography } from 'antd';
import { flushSync } from 'react-dom';
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';

export default () => {
  /** Requests */
  const loginReq = useRequest(login, { manual: true });

  /** Models */
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const queryUser = async () => {
      try {
        // Need Change
        const msg: any = await queryCurrentUser({
          skipErrorHandler: true,
        });
        return msg.profile;
      } catch {}
      return undefined;
    };

    const userInfo = await queryUser();

    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
          collapsed: initialState?.collapsed ? true : false,
        }));
      });
    }
  };

  const handleSubmit = async (values: any) => {
    await loginReq.run({ ...values });
    await fetchUserInfo();
    history.push(`/farms/:id`);
    return true;
  };

  const className = useEmotionCss(({}) => {
    return {
      maxWidth: 375,
      background: 'rgb(255 255 255 / 0.2)',
      'backdrop-filter': 'blur(8px)',
    };
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#44b86a',
        },
      }}
    >
      <div
        style={{
          height: ' 100vh ',
          backgroundImage:
            'url(https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*XpGeRoZKGycAAAAAAAAAAAAAARQnAQ)',
        }}
      >
        <div style={{ color: 'white' }}>
          <div
            style={{
              display: 'flex',
              height: 'calc(100vh - 84px)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ProCard className={className}>
              <Space direction="vertical" size={'large'}>
                <Row justify="space-between">
                  <Col>
                    <Space size="small">
                      <img src={ImageBgLogo} style={{ width: 35 }} alt="logo-enchant" />
                      <Typography.Title level={4} style={{ margin: 0, color: 'white' }}>
                        Irricontrol
                      </Typography.Title>
                    </Space>
                  </Col>
                  <Col style={{ color: 'white' }}>
                    <SelectLang />
                  </Col>
                </Row>
                <ProForm
                  submitter={{
                    render: () => (
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loginReq.loading}
                        style={{ width: '100%' }}
                      >
                        Entrar
                      </Button>
                    ),
                  }}
                  size="large"
                  name="validate_other"
                  initialValues={{
                    name: process.env.NODE_ENV === 'development' ? 'admin' : '',
                    password: process.env.NODE_ENV === 'development' ? 'ant.design' : '',
                  }}
                  onValuesChange={() => {}}
                  onFinish={handleSubmit}
                >
                  <ProFormText width="md" name="name" placeholder="Usuário ou E-mail" />
                  <ProFormText.Password width="md" name="password" placeholder="Sua senha" />
                  <Row align="middle" justify="space-between">
                    <Col>
                      <ProFormCheckbox>Continuar conectado</ProFormCheckbox>
                    </Col>
                    <Col>
                      <ProFormItem>
                        <a>Esqueceu a senha?</a>
                      </ProFormItem>
                    </Col>
                  </Row>
                </ProForm>
              </Space>
            </ProCard>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
