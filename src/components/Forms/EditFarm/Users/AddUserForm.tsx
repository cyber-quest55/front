import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { findUserByUsernameOrEmail } from '@/services/user';
import { yupValidator } from '@/utils/adapters/yup';
import { useRequest } from 'ahooks';
import { Button, Form } from 'antd';
import { ReactElement, useCallback, useRef } from 'react';
import * as yup from 'yup';

type Props = {
  onSubmit?: (values: any) => void;
  loading?: boolean;
}

const AddUserForm = ({
  loading,
  onSubmit = async () => {}
}: Props): ReactElement => {
  const intl = useIntl();
  const [ addUserForm ] = Form.useForm();
	const addFormRef = useRef();

  const reqFindUsers = useRequest(findUserByUsernameOrEmail, { manual: true });

	const yupSchema = useCallback(() => yup.object().shape({
		user: yup.string().required(
			intl.formatMessage({
				id: 'validations.required',
			}),
		),
	}), [intl]);
	const yupSync = yupValidator(yupSchema(), addUserForm.getFieldsValue);


  return (
    <ProForm
			validateTrigger="onBlur"
			layout="vertical"
			name="add_user_form"
			rowProps={{ gutter: [8, 8] }}
			submitter={false}
			form={addUserForm}
			formRef={addFormRef}
			initialValues={{ user: '' }}
			onFinish={async (values) => onSubmit(values)}
			grid
		>
			<ProFormSelect
        rules={[yupSync]}
        request={async (val) => {
					if (val.keyWords) {
						const resp = await reqFindUsers.runAsync({
							username_or_email: val.keyWords,
						})
						return resp.map(result => ({
							label: `${result.full_name} (${result.user__email})`,
							value: result.user__username,
						}))
					}
					return [{
						label: intl.formatMessage({ id: 'component.edit.farm.users.add.placeholder' }),
						value: ''
					}];
        }}
        name={['user']}
        label={intl.formatMessage({ id: 'component.edit.farm.users.add.label' })}
		    placeholder={intl.formatMessage({ id: 'component.edit.farm.users.add.placeholder' })}
				colProps={{ xs: 24 }}
        showSearch
      />
		 	<Button
		  	type="primary"
				style={{ width: '100%' }}
				onClick={addUserForm.submit}
				disabled={reqFindUsers.loading || loading}
			>
				{intl.formatMessage({ id: 'component.edit.farm.users.add.invite.action' })}
			</Button>
		</ProForm>
  );
}

export default AddUserForm;