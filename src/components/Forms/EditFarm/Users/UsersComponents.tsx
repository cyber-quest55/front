// Dependencies
import {
	ProCard,
	ProForm,
	ProFormSelect,
} from '@ant-design/pro-components';
import {
	EditOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useScreenHook } from '@/hooks/screen';
import { yupValidator } from '@/utils/adapters/yup';
import { useIntl, useParams } from '@umijs/max';
import { getFarmUsers, saveFarmUsers } from '@/services/farm';
import {
	deleteUserFromFarm,
	findUserByUsernameOrEmail,
	getUserPermissions,
	getUserRole,
} from '@/services/user';
import { useMount, useRequest } from 'ahooks';
import {
	App,
	Button,
	Col,
	Form,
	List,
	Modal,
	Popconfirm,
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
const EditFarmUsersComponent: FunctionComponent<Props> = ({
	farm,
	queryFarmById
}): ReactElement => {
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
	const [ currentUser, setCurrentUser ] = useState<APIModels.FarmUser | null>(null);

	// Requests
	const reqFarmUsers = useRequest(getFarmUsers, { manual: true });
	const reqFindUsers = useRequest(findUserByUsernameOrEmail, { manual: true });
	const reqSaveUser = useRequest(saveFarmUsers, { manual: true });
	const reqPermission = useRequest(getUserPermissions, { manual: true });
	const reqRole = useRequest(getUserRole, { manual: true });
	const reqRemoveFarmUser = useRequest(
		deleteUserFromFarm,
		{ manual: true },
	);

	// Effects
	useMount(() => {
		reqFarmUsers.run({ id: params.id as string });
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
							await reqSaveUser.runAsync({
								id: params.id as string,
								body: {
									administrator: false,
									username: values.user,
									username_or_email: values.user
								}
							})
							addUserForm.resetFields();
							message.success(intl.formatMessage({
								id: 'component.edit.farm.users.add.message.success',
							}));
							reqFarmUsers.refresh();
							queryFarmById({ id: parseInt(params.id as string) });
							toggleAddUser();
						} catch (err) {
							message.error(intl.formatMessage({
								id: 'component.edit.farm.users.general.message.fail',
							}));
						}
					}}
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
						disabled={reqFindUsers.loading || reqSaveUser.loading}
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
					title={`@${currentUser?.username}`}
					description={currentUser?.email}
				/>
				<Popconfirm
					title={intl.formatMessage({ id: 'component.edit.farm.users.edit.message.confirm' })}
					okText={intl.formatMessage({ id: 'component.edit.farm.users.edit.message.confirm.yes' })}
					cancelText={intl.formatMessage({ id: 'component.edit.farm.users.edit.message.confirm.no' })}
					onConfirm={async () => {
						try {
							await reqRemoveFarmUser.runAsync({
								farmId: params.id as string,
								id: currentUser!.id,
							})
							reqFarmUsers.refresh();
							queryFarmById({ id: parseInt(params.id as string) });
							toggleEditUser();
							setCurrentUser(null);
							message.success(intl.formatMessage({
								id: 'component.edit.farm.users.edit.message.delete.success',
							}))
						} catch (err) {
							message.error(intl.formatMessage({
								id: 'component.edit.farm.users.general.message.fail',
							}));
						}
					}}
				>
					<Button danger>
						{intl.formatMessage({ id: 'component.edit.farm.users.edit.delete.action' })}
					</Button>
				</Popconfirm>
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
				dataSource={reqFarmUsers.data?.users || []}
				renderItem={(item, index) => (
					<List.Item
						key={index}
						actions={[
							<IconAction
								icon={EditOutlined}
								key="list-vertical-edit-o"
								onClick={() => {
									setCurrentUser(item);
									reqPermission.run({ id: item.id, farmId: params.id as string });
									reqRole.run({ id: item.id, farmId: params.id as string });
									toggleEditUser();
								}}
							/>,
						]}
					>
						<List.Item.Meta
							title={(
								<>
									<Typography.Text style={{ marginRight: 8 }}>
										{`@${item.username}`}
									</Typography.Text>
									{farm?.administrators.some(adm => adm.id === item.id) ? (
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