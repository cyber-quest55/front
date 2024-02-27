// Dependencies
import { ProCard } from '@ant-design/pro-components';
import {
	SaveOutlined,
	EditOutlined,
	QuestionCircleOutlined
} from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useScreenHook } from '@/hooks/screen';
import { useIntl } from '@umijs/max';
import { 
	Button,
	Col,
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
	useState
} from 'react';

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
	const { xl } = useScreenHook()
	const [ loading ] = useState(false);
	const [ isGuidelinesOpen, setIsGuidelinesOpen ] = useState(false);

	// Admin id list
	const adminIds = farm?.administrators.map(adm => adm.id)

	// Guidelines handlers
	const showGuidelines = () => {
    setIsGuidelinesOpen(true);
  };

  const handleGuidelinesOk = () => {
    setIsGuidelinesOpen(false);
  };

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
			<Typography.Paragraph>
				{intl.formatMessage({ id: 'component.edit.farm.users.description' })}
			</Typography.Paragraph>
			<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
				<Col xs={24}  md={24} xl={8}>
					<Button
						type="primary"
						onClick={() => {}}
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