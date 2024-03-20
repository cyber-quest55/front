import { ProForm, ProFormField } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { findUserByUsernameOrEmail } from '@/services/user';
import { yupValidator } from '@/utils/adapters/yup';
import { useRequest } from 'ahooks';
import { App, Button, Form } from 'antd';
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
	const { message } = App.useApp();
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

	// Validate user action
	const onFinish = async (values: { user: string }) => {
		try {
			// Searching for user accounts
			const usernameSearch = values.user;
			const resp = await reqFindUsers.runAsync({
				username_or_email: usernameSearch,
			});

			const desiredUser = resp.find(r => 
				r.user__username === usernameSearch ||
				r.user__email === usernameSearch
			);

			// Has account
			if (resp.length && desiredUser) {
				onSubmit({ user: desiredUser.user__username });
				addUserForm.setFieldValue('user', '');
			} else {
				message.warning(intl.formatMessage({
					id: 'component.edit.farm.users.messages.nosuchuser',
				}));
			}
		} catch (err) {
			message.error(intl.formatMessage({
				id: 'component.edit.farm.users.general.message.fail',
			}));
		}
	}

	// Component TSX
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
			onFinish={onFinish}
			grid
		>
			<ProFormField
				name={['user']}
				rules={[yupSync]}
				label={intl.formatMessage({ id: 'component.edit.farm.users.add.label' })}
				placeholder={intl.formatMessage({ id: 'component.edit.farm.users.add.placeholder' })}
				colProps={{ xs: 24 }}
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