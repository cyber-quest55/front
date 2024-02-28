// Dependencies
import {
	ProCard,
	ProForm,
	ProFormSelect
} from '@ant-design/pro-components';
import {
	EditOutlined,
	QuestionCircleOutlined
} from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useScreenHook } from '@/hooks/screen';
import { yupValidator } from '@/utils/adapters/yup';
import { useIntl, useParams } from '@umijs/max';
import { getFarmById, getFarmUsers, saveFarmUsers } from '@/services/farm';
import { findUserByUsernameOrEmail } from '@/services/user';
import { useMount, useRequest } from 'ahooks';
import {
	App,
	Button,
	Col,
	Form,
	List,
	Modal,
	Row,
	Space,
	Tag,
	Typography 
} from 'antd';
import React, {
	FunctionComponent,
	ReactElement,
	useCallback,
	useRef,
	useState
} from 'react';
import * as yup from 'yup';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

// Component
const EditFarmUsersComponent: FunctionComponent<Props> = (): ReactElement => {
	// Hooks
	const intl = useIntl();
	const params = useParams();
	const { xl } = useScreenHook();
	const { message } = App.useApp();
	const [ addUserForm ] = Form.useForm();
	const addFormRef = useRef();
	const [ isGuidelinesOpen, setIsGuidelinesOpen ] = useState(false);
	const [ isAddUserOpen, setIsAddUserOpen ] = useState(false);
	const [ isEditUserOpen, setIsEditUserOpen ] = useState(false);

	// Requests
	const {
		data: farmData,
		run: getFarmByIdRequest,
		refresh: refreshFarm,
	} = useRequest(
		getFarmById,
		{ manual: true }
	)

	const {
		data: farmUsersData,
		run: getFarmUsersRequest,
		refresh: refreshFarmUsers,
	} = useRequest(
		getFarmUsers,
		{ manual: true },
	);

	const {
		runAsync: findUserRequest, 
		loading: findUserLoading
	} = useRequest(
		findUserByUsernameOrEmail,
		{ manual: true },
	);

	const {
		runAsync: saveUserRequest,
		loading: saveUserLoading
	} = useRequest(
		saveFarmUsers,
		{ manual: true },
	);

	// Effects
	useMount(() => {
		getFarmUsersRequest({ id: params.id as string });
		getFarmByIdRequest({ id: params.id as string   })
	});

	// Guidelines handlers
	const showGuidelines = () => {
    setIsGuidelinesOpen(true);
  };

  const handleGuidelinesOk = () => {
    setIsGuidelinesOpen(false);
  };

	// Add/Edit user toggle
	const toggleAddUser = () => setIsAddUserOpen(prev => !prev);
	const toggleEditUser = () => setIsEditUserOpen(prev => !prev);

	// Form validation schema
	const yupSchema = useCallback(() => yup.object().shape({
		user: yup.string().required(
			intl.formatMessage({
				id: 'validations.required',
			}),
		),
	}), [intl]);
	const yupSync = yupValidator(yupSchema(), addUserForm.getFieldsValue);

	// List icon text component
	const IconAction = ({ icon, onClick = () => {} }: { icon: React.FC, onClick: () => void }) => (
		<Space>
			<Button
				type="link"
				icon={React.createElement(icon)}
				onClick={onClick}
			/>
		</Space>
	);

	// Main TSX
  return (
    <ProCard
			title={
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({
						id: 'component.edit.farm.users.title',
					})}
				</Typography.Title>
			}
			gutter={[12, 12]}
			ghost
		>
			<Modal
				title={intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title' })}
				open={isGuidelinesOpen}
				onCancel={handleGuidelinesOk}
				footer={false}
				closable
			>
				<Typography.Paragraph>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.description' })}
				</Typography.Paragraph>
				<Typography.Title level={5}>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.nopermission' })}
				</Typography.Title>
				<Typography.Paragraph>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.description.nopermission' })}
				</Typography.Paragraph>
				<Typography.Title level={5}>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.viewer' })}
				</Typography.Title>
				<Typography.Paragraph>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.description.viewer' })}
				</Typography.Paragraph>
				<Typography.Title level={5}>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.operator' })}
				</Typography.Title>
				<Typography.Paragraph>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.description.operator' })}
				</Typography.Paragraph>
				<Typography.Title level={5}>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.technician' })}
				</Typography.Title>
				<Typography.Paragraph>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.description.technician' })}
				</Typography.Paragraph>
				<Typography.Title level={5}>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.admin' })}
				</Typography.Title>
				<Typography.Paragraph>
					{intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.description.admin' })}
				</Typography.Paragraph>
      </Modal>
			<Modal
				title={intl.formatMessage({ id: 'component.edit.farm.users.add.title' })}
				open={isAddUserOpen}
				onCancel={toggleAddUser}
				footer={false}
			>
				<ProForm
					validateTrigger="onBlur"
					layout="vertical"
					name="add_user_form"
					rowProps={{ gutter: [8, 8] }}
					submitter={false}
					form={addUserForm}
					formRef={addFormRef}
					initialValues={{ user: '' }}
					onFinish={async (values) => {
						try {
							await saveUserRequest({
								id: params.id as string,
								body: {
									administrator: false,
									username: values.user,
									username_or_email: values.user
								}
							})
							addUserForm.resetFields();
							message.success(intl.formatMessage({
								id: 'component.edit.farm.users.add.message.success'
							}));
							refreshFarmUsers();
							refreshFarm();
							toggleAddUser();
						} catch (err) {
							message.success(intl.formatMessage({
								id: 'component.edit.farm.users.general.message.fail'
							}));
						}
					}}
					grid
				>
					<ProFormSelect
            rules={[yupSync]}
            request={async (val) => {
							if (val.keyWords) {
								const resp = await findUserRequest({
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
						disabled={findUserLoading || saveUserLoading}
					>
						{intl.formatMessage({ id: 'component.edit.farm.users.add.invite.action' })}
					</Button>
				</ProForm>
			</Modal>
			<Modal
				title={intl.formatMessage({ id: 'component.edit.farm.users.edit.title' })}
				open={isEditUserOpen}
				onCancel={toggleEditUser}
				footer={false}
			>
				<List.Item.Meta
					title="@mockedusername"
					description="mockeduser@yahoo.com"
				/>
			</Modal>
			<Typography.Paragraph>
				{intl.formatMessage({ id: 'component.edit.farm.users.description' })}
			</Typography.Paragraph>
			<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
				<Col xs={24}  md={24} xl={8}>
					<Button
						type="primary"
						onClick={() => toggleAddUser()}
						style={{ width: '100%' }}
					>
						{intl.formatMessage({ id: 'component.edit.farm.users.add.action' })}
					</Button>
				</Col>
				<Col xs={24}  md={24} xl={16}>
					<Button 
						type="link"
						icon={<QuestionCircleOutlined />}
						onClick={showGuidelines}
						style={{
							textAlign: xl ? 'right' : 'center',
							width: '100%'
						}}
					>
						{intl.formatMessage({ id: 'component.edit.farm.users.guidelines' })}
					</Button>
				</Col>
			</Row>
			<List
				itemLayout='horizontal'
				dataSource={farmUsersData?.users || []}
				renderItem={(item, index) => (
					<List.Item
						key={index}
						actions={[
							<IconAction
								icon={EditOutlined}
								key="list-vertical-edit-o"
								onClick={() => toggleEditUser()}
							/>,
						]}
					>
						<List.Item.Meta
							title={(
								<>
									<Typography.Text style={{ marginRight: 8 }}>
										{`@${item.username}`}
									</Typography.Text>
									{farmData?.administrators.some(adm => adm.id === item.id) ? (
										<Tag color="processing">
											{intl.formatMessage({ id: 'component.edit.farm.users.list.tag.admin' })}
										</Tag>	
									) : null}
								</>
							)}
							description={`${item.first_name} ${item.last_name} (${item.email})`}									
						/>
					</List.Item>
				)}
			/>				
    </ProCard>
  )
};

export default EditFarmUsersComponent;