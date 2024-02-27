// Dependencies
import {
	ProCard,
	ProForm,
	ProFormSelect
} from '@ant-design/pro-components';
import {
	SaveOutlined,
	EditOutlined,
	QuestionCircleOutlined
} from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useScreenHook } from '@/hooks/screen';
import { yupValidator } from '@/utils/adapters/yup';
import { useIntl } from '@umijs/max';
import { 
	Button,
	Col,
	Form,
	List,
	Modal,
	Row,
	Space,
	Tabs,
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
	farm
}): ReactElement => {
	// Hooks
	const intl = useIntl();
	const { xl } = useScreenHook();
	const [ loading ] = useState(false);
	const [ addUserForm ] = Form.useForm();
	const addFormRef = useRef();
	const [ isGuidelinesOpen, setIsGuidelinesOpen ] = useState(false);
	const [ isAddUserOpen, setIsAddUserOpen ] = useState(false);

	// Admin id list
	const adminIds = farm?.administrators.map(adm => adm.id)

	// Guidelines handlers
	const showGuidelines = () => {
    setIsGuidelinesOpen(true);
  };

  const handleGuidelinesOk = () => {
    setIsGuidelinesOpen(false);
  };

	// Add user toggle
	const toggleAddUser = () => setIsAddUserOpen(prev => !prev);

	// Form validation schema
	const yupSchema = useCallback(() => yup.object().shape({
		billing: yup.object().shape({
			user: yup.string().required(
				intl.formatMessage({
					id: 'validations.required',
				}),
			),
		}),
	}), [intl]);
	const yupSync = yupValidator(yupSchema(), addUserForm.getFieldsValue);

	// List icon text component
	const IconAction = ({ icon }: { icon: React.FC }) => (
		<Space>
			<Button type="link" icon={React.createElement(icon)} />
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
			extra={
				<Button loading={loading} icon={<SaveOutlined />} type="primary">
					{intl.formatMessage({
						id: 'component.edit.farm.button.save',
					})}
				</Button>
			}
			ghost
			gutter={[12, 12]}
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
					grid
					initialValues={{ ...farm }}
					onFinish={async (values: any) => {
						console.log('values', values)
					}}
				>
					<ProFormSelect
            rules={[yupSync]}
            request={async () => {
							console.log('[request]');
							return [{
								label: '',
								value: '33'
							}];
            }}
            name={['user']}
            label={intl.formatMessage({ id: 'component.edit.farm.users.add.label' })}
						placeholder={intl.formatMessage({ id: 'component.edit.farm.users.add.placeholder' })}
						colProps={{ xs: 24 }}
            showSearch
          />

				</ProForm>
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
			<Tabs 
				defaultActiveKey="1"
				items={[
					{
						label: 'Users',
						key: '1',
						children: (
							<List
								itemLayout='horizontal'
								dataSource={farm?.users.filter(user => !adminIds?.includes(user.id))}
								renderItem={(item, index) => (
									<List.Item
										key={index}
										actions={[
											<IconAction icon={EditOutlined} key="list-vertical-edit-o" />
										]}
									>
										<List.Item.Meta
											title={`@${item.username}`}
											description={`${item.first_name} ${item.last_name} (${item.email})`}									
										/>
									</List.Item>
								)}
							/>
						
						)
					},
					{
						label: 'Administrators',
						key: '2',
						children: (
							<List
								itemLayout='horizontal'
								dataSource={farm?.users.filter(user => adminIds?.includes(user.id))}
								renderItem={(item, index) => (
									<List.Item
										key={index}
										actions={[
											<IconAction icon={EditOutlined} key="list-vertical-edit-o" />
										]}
									>
										<List.Item.Meta
											title={`@${item.username}`}
											description={`${item.first_name} ${item.last_name} (${item.email})`}
										/>
									</List.Item>
								)}
						/>
						)
					}
				]}
			
			/>			
    </ProCard>
  )
};

export default EditFarmUsersComponent;