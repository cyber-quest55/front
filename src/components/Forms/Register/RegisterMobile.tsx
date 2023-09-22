import { yupValidator } from '@/utils/adapters/yup';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { getLocale, setLocale, useIntl } from '@umijs/max';
import { Alert, Typography } from 'antd';
import { Button, Card, Form, Input, Picker, Space } from 'antd-mobile';
import { PickerValue } from 'antd-mobile/es/components/picker-view';
import React, { useState } from 'react';
import * as yup from 'yup';

type Props = {
  handleSubmit?: (values: any) => any;
  error: string[];
  isSubmiting?: boolean;
  isSubmitAble: boolean;
  checkUsernameReq: any;
  email?: string;
};

const options = [
  { value: 'pt-BR', label: '🇧🇷 Português (BR)' },
  { value: 'en-US', label: '🇺🇸 English (US)' },
  { value: 'es-ES', label: '🇪🇸 Español (ES)' },
  { value: 'ru-RU', label: '🇷🇺 Русский (RU)' },
  { value: 'de-DE', label: '🇩🇪 Deutsch (DE)' },
];

export const RegisterMobile: React.FC<Props> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const { handleSubmit, checkUsernameReq, error, isSubmiting, isSubmitAble, email } = props;

  const bodyClassName = useEmotionCss(() => {
    return {
      padding: 0,
    };
  });

  const selectStyle = useEmotionCss(({ token }) => {
    return {
      textAlign: 'left',
      width: '100%',
      marginTop: 16,
      border: '1px solid rgba(255,255,255,0.75)',
      marginBottom: 12,
      background: 'transparent',
      borderRadius: '6px',
      color: token.colorTextLightSolid,
      fontSize: 16,
    };
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    password: yup
      .string()
      .min(8, intl.formatMessage({ id: 'validations.min' }, { value: 8 }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@'"!$!-_%*#?&]{8,}$/,
        intl.formatMessage({
          id: 'validations.strong.password',
        }),
      ),
    confirmPassword: yup
      .string()
      .min(8, intl.formatMessage({ id: 'validations.min' }, { value: 8 }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@'"!$!-_%*#?&]{8,}$/,
        intl.formatMessage({
          id: 'validations.strong.password',
        }),
      ),
    username: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
        description: 'asdsad',
      }),
    ),
    first_name: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    last_name: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  return (
    <Card className={bodyClassName} style={{ width: '100%', borderRadius: 0 }}>
      <Form
        form={form}
        validateTrigger="onBlur"
        onFinish={handleSubmit}
        initialValues={{
          language: getLocale(),
          password: '',
          confirmPassword: '',
          email: email,
          username: '',
          first_name: '',
          last_name: '',
        }}
        requiredMarkStyle="none"
        layout="vertical"
        footer={
          <Space direction="vertical" style={{ width: '100%', '--gap': '24px' }}>
            {error?.length > 0 ? (
              <Alert
                description={
                  <>
                    {error.map((item, index) => (
                      <Typography.Text key={`error-mobile-${index}`}>
                        {`* ${intl.formatMessage({ id: item, defaultMessage: 'Fail!' })} `}{' '}
                      </Typography.Text>
                    ))}
                  </>
                }
                type="error"
                showIcon
              />
            ) : null}
            <Button
              disabled={!isSubmitAble}
              block
              type="submit"
              color="primary"
              size="large"
              loading={isSubmiting}
            >
              {intl.formatMessage({
                id: 'pages.register.button.text',
                defaultMessage: 'Entrar ',
              })}
            </Button>
          </Space>
        }
      >
        <Form.Header>
          <Typography.Title level={4}>
            {intl.formatMessage({
              id: 'component.forms.register.title',
              defaultMessage: 'Registre-se',
            })}
          </Typography.Title>
        </Form.Header>

        <Form.Item noStyle name="language">
          <Button
            onClick={() => setVisible(!visible)}
            className={selectStyle}
            style={{
              marginTop: 16,
              border: '1px solid rgba(255,255,255,0.75)',
              marginBottom: 12,
              width: '100%',
            }}
          >
            <Typography.Text>
              {options.find((item) => item.value === getLocale())?.label}
            </Typography.Text>
          </Button>
          <Picker
            onCancel={() => setVisible(false)}
            defaultValue={[getLocale()]}
            columns={[options]}
            onConfirm={(value: PickerValue[]) => {
              setLocale(value[0] as string);
            }}
            visible={visible}
            cancelText="Cancelar"
            confirmText="Confirmar"
          />
        </Form.Item>

        <Form.Item rules={[yupSync]} name="email" label="Email">
          <Input
            disabled
            placeholder={intl.formatMessage({
              id: 'pages.register.input.email.placeholder',
              defaultMessage: 'mail@mail.com',
            })}
          />
        </Form.Item>
        <Form.Item rules={[yupSync]} name="first_name" label="Nome">
          <Input
            clearable
            placeholder={intl.formatMessage({
              id: 'pages.register.input.firstName.placeholder',
              defaultMessage: 'John',
            })}
          />
        </Form.Item>
        <Form.Item rules={[yupSync]} name="last_name" label="Sobrenome">
          <Input
            clearable
            placeholder={intl.formatMessage({
              id: 'pages.register.input.lastName.placeholder',
              defaultMessage: 'Vicioda',
            })}
          />
        </Form.Item>
        <Form.Item rules={[yupSync]} name="username" label="Usuário">
          <Input
            clearable
            onBlur={(e: any) => {
              checkUsernameReq.runAsync({ username: e.currentTarget.value });
            }}
            placeholder={intl.formatMessage({
              id: 'pages.register.input.username.placeholder',
              defaultMessage: 'john.vicioda',
            })}
          />
        </Form.Item>
        <Form.Item rules={[yupSync]} name="password" label="Senha">
          <Input
            clearable
            type="password"
            placeholder={intl.formatMessage({
              id: 'pages.register.input.password.placeholder',
              defaultMessage: 'Sua Senha',
            })}
          />
        </Form.Item>
        <Form.Item rules={[yupSync]} name="confirmPassword" label="Confirma Senha">
          <Input
            clearable
            type="password"
            placeholder={intl.formatMessage({
              id: 'pages.register.input.confirmPassword.placeholder',
              defaultMessage: 'Confirme sua Senha',
            })}
          />
        </Form.Item>
        <Form.Header />
      </Form>
    </Card>
  );
};
