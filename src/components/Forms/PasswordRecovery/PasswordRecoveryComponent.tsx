import { yupValidator } from '@/utils/adapters/yup';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { SelectLang, useIntl } from '@umijs/max';
import { Button, Col, Divider, Form, Row, Space, Typography } from 'antd';
import { createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';

type Props = {
  handleSubmit: (values: any, recaptchaRef: any) => Promise<void>;
  loading: boolean;
  error?: string;
};

const PasswordRecoveryComponent: React.FC<Props> = (props) => {
  const [form] = Form.useForm<any>();

  const intl = useIntl();
  const { handleSubmit, loading, error } = props;
  const recaptchaRef = createRef();

  const handleFormSubmit = async (values: any) => {
    handleSubmit(values, recaptchaRef);
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({
        id: 'pages.passwordRecovery.invalid',
      }),)
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);


  const className = useEmotionCss(({ }) => {
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
              form={form}
              validateTrigger="onBlur"
              layout="vertical"
              rowProps={{ gutter: [8, 8] }}
              grid
              submitter={{
                searchConfig: {
                  resetText: 'reset',
                  submitText: 'submit',
                },
                render: () => (
                  <Space
                    direction="vertical"
                    align="center"
                    size="large"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Row gutter={[25, 25]} justify="center">
                      <Col flex="auto">
                        <Button
                          block
                          type="primary"
                          htmlType="reset"
                          key="rest"
                          loading={loading}
                          style={{ minWidth: '150px' }}
                          href="/user/login"
                        >
                          {intl.formatMessage({
                            id: 'pages.passwordRecovery.btn.back',
                            defaultMessage: 'Voltar ',
                          })}
                        </Button>
                      </Col>

                      <Col flex="auto">
                        <Button
                          block
                          type="primary"
                          htmlType="submit"
                          key="submit"
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
                ),
              }}
              size="large"
              name="recovery_password_form"
              initialValues={{
                email:
                  process.env.NODE_ENV === 'development'
                    ? 'test@irricontrol.com.br'
                    : '',
              }}
              onFinish={handleFormSubmit}
              autoFocusFirstInput
            >
              <Typography.Text type="secondary">
                {intl.formatMessage({
                  id: 'pages.passwordRecovery.info',
                  defaultMessage:
                    'Insira o seu endereço de email para enviarmos um link de recuperação da sua conta.',
                })}
              </Typography.Text>
              <Divider />
              <ProFormText
                rules={[yupSync]}
                width="md"
                required
                name="email"
                placeholder={intl.formatMessage({
                  id: 'pages.passwordRecovery.email.placeholder',
                  defaultMessage: 'example@mail.com',
                })}
              />
              <Col style={{ display: 'flex', justifyContent: 'center' }} span={24}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  style={{ margin: 0, padding: 0, transform: 'scale(1.08)' }}
                  sitekey="6LeH4_cUAAAAAJn1YZUm-91DpXPz35kLOEH5RSUr"
                  size="normal"
                  name="recaptcha"
                />
              </Col>
              <Divider />
            </ProForm>
          </Space>
        </Space>
      </ProCard>
    </div>
  );
};

export { PasswordRecoveryComponent };
