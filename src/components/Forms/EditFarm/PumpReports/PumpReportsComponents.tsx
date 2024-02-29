// Dependencies
import { ProCard } from '@ant-design/pro-components';
import { SaveOutlined } from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max'
import {
	Alert,
	Card, 
	Button, 
	Typography 
} from 'antd';
import { FunctionComponent, ReactElement, useState } from 'react';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

// Component
const EditFarmPumpReportsComponent: FunctionComponent<Props> = ({
	farm
}): ReactElement => {
	// Hooks
	const intl = useIntl()
	const [ loading ] = useState(false);

	// Main TSX
  return (
    <ProCard
			title={
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({
						id: 'component.edit.farm.pumpreports.title',
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
			{ farm ? (
				<>
					<Card style={{ marginBottom: 16 }}>
						<Typography.Title level={5}>
							{intl.formatMessage({ id: 'component.edit.farm.pumpreports.enable.reports.label' })}
						</Typography.Title>
						<Typography.Paragraph>
							{intl.formatMessage({ id: 'component.edit.farm.pumpreports.enable.reports.description' })}
						</Typography.Paragraph>
						<Alert
							message={intl.formatMessage({ id: 'component.edit.farm.pumpreports.enable.reports.alreadyenabled' })}
							type="warning"
							style={{ marginBottom: 16 }}
							showIcon
						/>
						<Button
							type="primary"
						>
							{intl.formatMessage({ id: 'component.edit.farm.pumpreports.enable.reports.action.enable' })}
						</Button>
					</Card>
					<Card>
						<Typography.Title level={5}>
							{intl.formatMessage({ id: 'component.edit.farm.pumpreports.calc.reports.label' })}
						</Typography.Title>
						<Typography.Paragraph>
							{intl.formatMessage({ id: 'component.edit.farm.pumpreports.calc.reports.description' })}
						</Typography.Paragraph>
						<Button
							type="primary"
						>
							{intl.formatMessage({ id: 'component.edit.farm.pumpreports.calc.reports.action.recalculate' })}
						</Button>
					</Card>
				</>
			) : null }
    </ProCard>
  )
};

export default EditFarmPumpReportsComponent;