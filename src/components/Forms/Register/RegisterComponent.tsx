import { yupValidator } from '@/utils/adapters/yup';
import { ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { getLocale, setLocale, useIntl } from '@umijs/max';
import { Alert, Button, Form, Space, Typography } from 'antd';
import * as yup from 'yup';

type Props = {
  handleSubmit?: (values: any) => any;
  error: string[];
  isSubmiting?: boolean;
  isSubmitAble: boolean;
  checkUsernameReq: any;
  email?: string;
};

const RegisterComponent: React.FC<Props> = (props) => {
  const intl = useIntl();
  const [form] = Form.useForm<any>();

  const { handleSubmit, checkUsernameReq, error, isSubmiting, isSubmitAble, email } = props;

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
    <ProCard
      style={{ width: '465px' }}
      title={
        <Typography.Title level={4}>
          {intl.formatMessage({
            id: 'component.forms.register.title',
            defaultMessage: 'Registre-se',
          })}
        </Typography.Title>
      }
    >
      <ProForm
        validateTrigger="onBlur"
        form={form}
        layout="vertical"
        rowProps={{ gutter: [12, 16] }}
        grid
        onFieldsChange={(changedFields) => {
          if (changedFields[0].name[0] === 'language') {
            setLocale(changedFields[0].value);
          }
        }}
        submitter={{
          render: () => (
            <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
              {error?.length > 0 ? (
                <Alert
                  description={
                    <>
                      {error.map((item, index) => (
                        <>
                          <Typography.Text key={`error-${index}`}>{`* ${intl.formatMessage({ id: item, defaultMessage: 'Fail!' })} `} </Typography.Text>
                        </>
                      ))}
                    </>
                  }
                  type="error"
                  showIcon
                />
              ) : null}

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  disabled={!isSubmitAble}
                  type="primary"
                  htmlType="submit"
                  style={{ width: '150px' }}
                  loading={isSubmiting}
                >
                  {intl.formatMessage({
                    id: 'pages.register.button.text',
                    defaultMessage: 'Entrar ',
                  })}
                </Button>
              </div>
            </Space>
          ),
        }}
        size="large"
        name="loging_form"
        initialValues={{
          language: getLocale(),
          password: '',
          confirmPassword: '',
          email: email,
          username: '',
          first_name: '',
          last_name: '',
        }}
        onFinish={handleSubmit}
      >
        <ProFormSelect
          colProps={{ xs: 24 }}
          name="language"
          valueEnum={{
            'pt-BR': '🇧🇷 Português (BR)',
            'en-US': '🇺🇸 English (US)',
            'es-ES': '🇪🇸 Español (ES)',
            'ru-RU': '🇷🇺 Русский (RU)',
            'de-DE': '🇩🇪 Deutsch (DE)',
          }}
        />

        <ProFormText
          rules={[yupSync]}
          disabled
          colProps={{ xs: 24 }}
          name="email"
          placeholder={intl.formatMessage({
            id: 'pages.register.input.email.placeholder',
            defaultMessage: 'mail@mail.com',
          })}
        />

        <ProFormText
          rules={[yupSync]}
          colProps={{ md: 24, lg: 12 }}
          name="first_name"
          placeholder={intl.formatMessage({
            id: 'pages.register.input.firstName.placeholder',
            defaultMessage: 'John',
          })}
        />

        <ProFormText
          rules={[yupSync]}
          colProps={{ md: 24, lg: 12 }}
          name="last_name"
          placeholder={intl.formatMessage({
            id: 'pages.register.input.lastName.placeholder',
            defaultMessage: 'Vicioda',
          })}
        />

        <ProFormText
          colProps={{ xs: 24 }}
          name="username"
          rules={[yupSync]}
          hasFeedback
          required
          validateStatus={
            checkUsernameReq.loading
              ? 'validating'
              : checkUsernameReq.data?.available
              ? 'success'
              : 'error'
          }
          fieldProps={{
            allowClear: false,
            onBlur: (e: any) => {
              checkUsernameReq.runAsync({ username: e.currentTarget.value });
            },
          }}
          placeholder={intl.formatMessage({
            id: 'pages.register.input.username.placeholder',
            defaultMessage: 'john.vicioda',
          })}
        />

        <ProFormText.Password
          rules={[yupSync]}
          colProps={{ md: 24, lg: 12 }}
          required
          name="password"
          placeholder={intl.formatMessage({
            id: 'pages.register.input.password.placeholder',
            defaultMessage: 'Sua Senha',
          })}
        />

        <ProFormText.Password
          rules={[yupSync]}
          colProps={{ md: 24, lg: 12 }}
          required
          name="confirmPassword"
          placeholder={intl.formatMessage({
            id: 'pages.register.input.confirmPassword.placeholder',
            defaultMessage: 'Confirme sua Senha',
          })}
        />
      </ProForm>
    </ProCard>
  );
};

export { RegisterComponent };
