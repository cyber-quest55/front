import { changePassword } from '@/services/user';
import { yupValidator } from '@/utils/adapters/yup';
import { SaveOutlined } from '@ant-design/icons';
import { ProCard, ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Form, Typography } from 'antd';
import * as React from 'react';
import * as yup from 'yup';

const EditSecurityComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const ref = React.useRef();
  const { currentUser } = props;
  const changePasswordReq = useRequest(changePassword, { manual: true });

  const schema = yup.object().shape({
    current_password: yup
      .string()
      .min(8, intl.formatMessage({ id: 'validations.min' }, { value: 8 }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@'"!$!-_%*#?&]{8,}$/,
        intl.formatMessage({
          id: 'validations.strong.password',
        }),
      ),
    new_password: yup
      .string()
      .min(8, intl.formatMessage({ id: 'validations.min' }, { value: 8 }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@'"!$!-_%*#?&]{8,}$/,
        intl.formatMessage({
          id: 'validations.strong.password',
        }),
      ),
    confirm_new_password: yup
      .string()
      .min(8, intl.formatMessage({ id: 'validations.min' }, { value: 8 }))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@'"!$!-_%*#?&]{8,}$/,
        intl.formatMessage({
          id: 'validations.strong.password',
        }),
      )
      .oneOf(
        [yup.ref('password')],
        intl.formatMessage({
          id: 'validations.password.match',
        }),
      ),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {intl.formatMessage({
            id: 'component.edit.profile.security.title',
          })}
        </Typography.Title>
      }
      extra={
        <Button
          icon={<SaveOutlined />}
          type="primary"
          loading={changePasswordReq.loading}
          onClick={form.submit}
        >
          {intl.formatMessage({
            id: 'component.edit.profile.security.button.save',
          })}
        </Button>
      }
      ghost
      gutter={[12, 12]}
    >
      {currentUser ? (
        <ProForm
          validateTrigger="onBlur"
          layout="vertical"
          rowProps={{ gutter: [8, 8] }}
          grid
          submitter={false}
          form={form}
          formRef={ref}
          name="general_form"
          onFinish={async (values: any) => {
            await changePasswordReq.runAsync({
              current_password: values.current_password,
              new_password: values.new_password,
            });
          }}
        >
          <ProFormGroup>
            <ProFormText.Password
              rules={[yupSync]}
              colProps={{ md: 24, lg: 12 }}
              name="current_password"
              placeholder={intl.formatMessage({
                id: 'component.edit.profile.security.currentpassword.label',
              })}
              label={intl.formatMessage({
                id: 'component.edit.profile.security.currentpassword.label',
              })}
            />
            <ProFormText.Password
              rules={[yupSync]}
              colProps={{ md: 24, lg: 12 }}
              name="new_password"
              placeholder={intl.formatMessage({
                id: 'component.edit.profile.security.newpassword.label',
              })}
              label={intl.formatMessage({
                id: 'component.edit.profile.security.newpassword.label',
              })}
            />
            <ProFormText.Password
              rules={[yupSync]}
              colProps={{ md: 24, lg: 12 }}
              name="confirm_new_password"
              placeholder={intl.formatMessage({
                id: 'component.edit.profile.security.confirmnewpassword.label',
              })}
              label={intl.formatMessage({
                id: 'component.edit.profile.security.confirmnewpassword.label',
              })}
            />
          </ProFormGroup>
        </ProForm>
      ) : null}
    </ProCard>
  );
};

export default EditSecurityComponent;
