import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Link, SelectLang, useIntl } from '@umijs/max';
import { Alert, Col, Row, Space, Typography } from 'antd';
import { Button, Divider, Form, Input } from 'antd-mobile';
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';
import ReCAPTCHA from "react-google-recaptcha";
import { createRef } from 'react';

type Props = {
  handleSubmit: (values: any, recaptchaRef: any) => Promise<void>;
  loading: boolean;
  error?: string;
  validateEmail: (values: any) => Promise<void>;
};

interface MobileValue {
  preValue: string | number
  realValue: string
}

const PasswordRecoveryMobile: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { handleSubmit, loading, error, validateEmail } = props;

  const recaptchaRef = createRef();

  const handleFormSubmit = async (values: any) => {
    handleSubmit(values, recaptchaRef);
  };

  const className = useEmotionCss(({ }) => {
    return {
      maxWidth: `96%`,
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
            <Space style={{ width: '100%' }} direction="vertical" align="center">
              <Typography.Text type="secondary">
                {intl.formatMessage({
                  id: 'pages.passwordRecovery.info',
                  defaultMessage:
                    'Insira o seu endereço de email para enviarmos um link de recuperação da sua conta.',
                })}
              </Typography.Text>
            </Space>
          </Row>
          <Space direction="vertical" size={'large'} style={{ width: '85vw' }}>
            <Form
              layout="horizontal"
              mode="card"
              onFinish={handleFormSubmit}
              footer={
                <Space direction="vertical" size={'large'}>
                  {error ? <Alert style={{
                    width: '100%', textAlign: "center"
                    , marginTop: "20px"
                  }} description={error} type="error" /> : null}
                  <Row gutter={[25, 25]} justify="center">
                    <Col flex="auto">
                      <Link to={'/user/login'}>
                        <Button
                          block
                          color="primary"
                          type='button'
                          loading={loading}
                          style={{ minWidth: '150px' }}
                        >

                          {intl.formatMessage({
                            id: 'pages.passwordRecovery.btn.back',
                            defaultMessage: 'Voltar ',
                          })}
                        </Button>
                      </Link>
                    </Col>
                    <Col flex="auto">
                      <Button
                        block
                        color="primary"
                        type='submit'
                        loading={loading}
                        style={{ minWidth: '150px' }}
                      >
                        {intl.formatMessage({
                          id: 'pages.passwordRecovery.btn.send',
                          defaultMessage: 'Enviar ',
                        })}
                      </Button>
                    </Col>
                  </Row>
                </Space>
              }
              style={{ width: '100%' }}
            >
              <Form.Item name="email" rules={[{ required: true, message: 'is required' }]}>
                <Input
                  type='email'
                  placeholder={intl.formatMessage({
                    id: 'pages.passwordRecovery.email.placeholder',
                    defaultMessage: 'example@mail.com',
                  })}
                  onBlur={validateEmail}
                />
              </Form.Item>
              <Form.Header />
              <Form.Item name="recaptcha" rules={[{ required: true, message: 'is required' }]}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  style={{ margin: 0, padding: 0, transform: "scale(1.0)" }}
                  sitekey="6LeH4_cUAAAAAJn1YZUm-91DpXPz35kLOEH5RSUr"
                  size="normal"
                  name='recaptcha'
                />
              </Form.Item>
            </Form>
          </Space>
        </Space>
      </ProCard>
    </div>
  );
};

export { PasswordRecoveryMobile };
