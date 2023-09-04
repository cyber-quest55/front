import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { SelectLang, useIntl } from '@umijs/max';
import { Alert, Button, Col, Row, Space, Typography } from 'antd';
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';

type Props = {
  handleSubmit: (values: any) => Promise<void>;
  loading: boolean;
  error?: string;
};

const LoginFormComponent: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { handleSubmit, loading, error } = props;
  const className = useEmotionCss(({}) => {
    return {
      maxWidth: `375px`,
      background: 'rgb(255 255 255 / 0.2)',
      backdropFilter: 'blur(8px)',
      padding: 0,
    };
  });

  return (
    <div
      style={{
        color: 'white',
        display: 'flex',
        height: 'calc(100vh - 84px)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
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
          <Space direction="vertical" size={'large'}>
            <ProForm
              layout="vertical"
              rowProps={{ gutter: 4 }}
              grid
              submitter={{
                render: () => (
                  <Space direction="vertical" size={"large"} style={{ width: '100%' }}>
                    {error ? <Alert description={error} type="error"   /> : null}

                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: '100%' }}
                      loading={loading}
                    >
                      {intl.formatMessage({
                        id: 'pages.login.btn.text',
                        defaultMessage: 'Entrar ',
                      })}
                    </Button>
                  </Space>
                ),
              }}
              size="large"
              name="loging_form"
              initialValues={{
                email:
                  process.env.NODE_ENV === 'development'
                    ? 'wellington.ferreira@irricontrol.com.br'
                    : '',
                password: process.env.NODE_ENV === 'development' ? 'ant.design' : '',
              }}
              onFinish={handleSubmit}
            >
              <ProFormText
                width="md"
                required
                name="email"
                placeholder={intl.formatMessage({
                  id: 'pages.login.input.email.placeholder',
                  defaultMessage: 'John Vicioda',
                })}
              />
              <ProFormText.Password
                style={{ marginBottom: 0 }}
                width="md"
                required
                name="password"
                placeholder={intl.formatMessage({
                  id: 'pages.login.input.password.placeholder',
                  defaultMessage: 'Sua Senha',
                })}
              />
            </ProForm>
            <Space style={{ width: '100%' }} direction="vertical" align="center">
              <Typography.Link>
                {intl.formatMessage({
                  id: 'pages.login.recoverPassword',
                  defaultMessage: 'Esqueci minha senha',
                })}
              </Typography.Link>
            </Space>
            <Space style={{ width: '100%' }} direction="vertical" align="center">
              <Typography.Text type="secondary">
                {intl.formatMessage({
                  id: 'pages.login.therms.first',
                  defaultMessage:
                    'Ao utilizar a plataforma Irricontrol, você declara ter lido e aceitado os',
                })}{' '}
                <Typography.Link
                  target="_blank"
                  href="https://irricontrol.com.br/termos-e-condicoes/"
                >
                  {intl.formatMessage({
                    id: 'pages.login.therms.second',
                    defaultMessage: 'Termos e Condições',
                  })}
                </Typography.Link>{' '}
                {intl.formatMessage({
                  id: 'pages.login.therms.third',
                  defaultMessage: 'e a',
                })}{' '}
                <Typography.Link
                  target="_blank"
                  href="https://irricontrol.com.br/politica-de-privacidade"
                >
                  {' '}
                  {intl.formatMessage({
                    id: 'pages.login.therms.fourth',
                    defaultMessage: 'Política de Privacidade.',
                  })}{' '}
                </Typography.Link>
                .
              </Typography.Text>
            </Space>
          </Space>
        </Space>
      </ProCard>
    </div>
  );
};

export { LoginFormComponent };
