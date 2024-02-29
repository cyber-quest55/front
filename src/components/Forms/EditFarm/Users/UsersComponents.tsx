// Dependencies
import { ProCard } from '@ant-design/pro-components';
import {
	EditOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useScreenHook } from '@/hooks/screen';
import { useIntl, useParams } from '@umijs/max';
import { getFarmUsers, saveFarmUsers } from '@/services/farm';
import {
	deleteUserFromFarm,
	getUserPermissions,
	saveUserPermissions,
	getUserRole,
	saveUserRole,
} from '@/services/user';
import { useMount, useRequest } from 'ahooks';
import {
	App,
	Button,
	Card,
	Col,
	List,
	Modal,
	Popconfirm,
	Row,
	Space,
	Spin,
	Switch,
	Tag,
	Typography 
} from 'antd';
import React, {
	FunctionComponent,
	ReactElement,
	useEffect,
	useState
} from 'react';
import AddUserForm from './AddUserForm';
import EditPermissionsForm from './EditPermissionsForm';

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
	
	const [ isGuidelinesOpen, setIsGuidelinesOpen ] = useState(false);
	const [ isAddUserOpen, setIsAddUserOpen ] = useState(false);
	const [ isEditUserOpen, setIsEditUserOpen ] = useState(false);
	const [ isFarmAdmin, setIsFarmAdmin ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState<APIModels.FarmUser | null>(null);

	// Requests
	const reqFarmUsers = useRequest(getFarmUsers, { manual: true });
	const reqSaveUser = useRequest(saveFarmUsers, { manual: true });
	const reqPermission = useRequest(getUserPermissions, { manual: true });
	const reqSavePerm = useRequest(saveUserPermissions, { manual: true });
	const reqRole = useRequest(getUserRole, { manual: true });
	const reqSaveRole = useRequest(saveUserRole, { manual: true });
	const reqRemoveFarmUser = useRequest(
		deleteUserFromFarm,
		{ manual: true },
	);

	// Effects
	useMount(() => {
		reqFarmUsers.run({ id: params.id as string });
	});

	useEffect(() => {
		if (reqRole.data) {
			setIsFarmAdmin(reqRole.data?.is_admin);
		}
	}, [reqRole.data]);

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
				<AddUserForm 
					onSubmit={async (values) => {
						try {
							await reqSaveUser.runAsync({
								id: params.id as string,
								body: {
									administrator: false,
									username: values.user,
									username_or_email: values.user
								}
							})
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
					loading={reqSaveUser.loading}
				/>
			</Modal>
			<Modal
				title={intl.formatMessage({ id: 'component.edit.farm.users.edit.title' })}
				open={isEditUserOpen}
				onCancel={toggleEditUser}
				footer={false}
			>
				<Card style={{ width: '100%' }}>
					<Space 
						direction="vertical"
						style={{ paddingTop: 8, width: '100%' }}	
					>
						<Typography.Title level={5} style={{ margin: 0 }}>
							@{currentUser?.username}
						</Typography.Title>
						<Typography.Text>
							{currentUser?.first_name} {currentUser?.last_name} ({currentUser?.email})
						</Typography.Text>
						{
							reqRole.loading ? (
								<Spin style={{ marginTop: 8 }} />
							) : (
								<Switch
									style={{ marginTop: 8 }}
									checked={isFarmAdmin}
									checkedChildren="Administrator"
									unCheckedChildren="User"
									onChange={setIsFarmAdmin}
								/>
							)
						}					
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
							<Button
								style={{ width: '100%', marginTop: 16 }}
								danger
							>
								{intl.formatMessage({ id: 'component.edit.farm.users.edit.delete.action' })}
							</Button>
						</Popconfirm>
					</Space>
				</Card>
				{
					reqPermission.loading ? (
						<Row
							justify="center"
							align="middle"
							style={{ marginTop: 16 }}
						>
							<Spin />
						</Row>
					) : (
						<EditPermissionsForm 
							onSubmit={async values => {
								try {
									// Equipment permission request
									await reqSavePerm.runAsync({
										id: currentUser!.id,
										farmId: params.id as string,
										body: values.permissions.map((v: any) => {
											// This map is necessary cause antd form is removing null values
											return {
												equipment: v.equipment || null,
												id: v.id,
												irpd: v.irpd || null,
												level: v.level,
												pivot: v.pivot || null,
												user: v.user,
											}
										})
									})
									// Admin request
									await reqSaveRole.runAsync({
										id: currentUser!.id,
										farmId: params.id as string,
										administrator: !isFarmAdmin,
									})
									reqFarmUsers.refresh();
									queryFarmById({ id: parseInt(params.id as string) });
									toggleEditUser();
									message.success(intl.formatMessage({
										id: 'component.edit.farm.users.edit.permissions.message.save.success',
									}))
								} catch (err) {
									message.error(intl.formatMessage({
										id: 'component.edit.farm.users.general.message.fail',
									}));
								}
							}}
							onSubmitAdmin={async () => {
								try {
									await reqSaveRole.runAsync({
										id: currentUser!.id,
										farmId: params.id as string,
										administrator: !isFarmAdmin,
									})
									reqFarmUsers.refresh();
									queryFarmById({ id: parseInt(params.id as string) });
									toggleEditUser();
									message.success(intl.formatMessage({
										id: 'component.edit.farm.users.edit.permissions.message.save.success',
									}))
								} catch (err) {
									message.error(intl.formatMessage({
										id: 'component.edit.farm.users.general.message.fail',
									}));
								}
							}}
							data={reqPermission.data!}
							isAdmin={isFarmAdmin}
							loading={false}
						/>
					)
				}
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
				loading={reqFarmUsers.loading}
				itemLayout='horizontal'
				dataSource={reqFarmUsers.data?.users.sort((a, b) => {
					// Compare based on username in alphabetical order
					const nameComparison = a.username.localeCompare(b.username);
				
					// Check if the user is an administrator in the farm
					const isAdminA = farm?.administrators.some((adm) => adm.id === a.id);
					const isAdminB = farm?.administrators.some((adm) => adm.id === b.id);

					// If one is an admin and the other is not, prioritize the admin
					if (isAdminA && !isAdminB) {
						return -1;
					} else if (!isAdminA && isAdminB) {
						return 1;
					}
					
					// If both are admins or both are not, use the name comparison
					return nameComparison;
				}) || []}
				renderItem={(item, index) => (
					<List.Item
						key={index}
						actions={[
							<IconAction
								icon={EditOutlined}
								key="list-vertical-edit-o"
								onClick={async () => {
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