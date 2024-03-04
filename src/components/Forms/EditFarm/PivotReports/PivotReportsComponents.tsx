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
const EditFarmPivotReportsComponent: FunctionComponent<Props> = ({
	farm,
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
						id: 'component.edit.farm.pivotreports.title',
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
							{intl.formatMessage({ id: 'component.edit.farm.pivotreports.enable.reports.label' })}
						</Typography.Title>
						<Typography.Paragraph>
							{intl.formatMessage({ id: 'component.edit.farm.pivotreports.enable.reports.description' })}
						</Typography.Paragraph>
						{
							!farm.power_ranges['0']?.length ? (
								<Alert
									message={intl.formatMessage({ id: 'component.edit.farm.pivotreports.enable.reports.nopowerranges' })}
									type="error"
									style={{ marginBottom: 16 }}
									showIcon
								/>
							): null
						}
						{
							farm.start_pivot_report_aggregate === 2 ? (
								<Alert
									message={intl.formatMessage({ id: 'component.edit.farm.pivotreports.enable.reports.alreadyenabled' })}
									type="warning"
									style={{ marginBottom: 16 }}
									showIcon
								/>
							) : null
						}
						<Button
							type="primary"
							disabled={
								!farm.power_ranges['0']?.length ||
								farm.start_pivot_report_aggregate !== 0
							}
						>
							{intl.formatMessage({ id: 'component.edit.farm.pivotreports.enable.reports.action.enable' })}
						</Button>
					</Card>
					<Card>
						<Typography.Title level={5}>
							{intl.formatMessage({ id: 'component.edit.farm.pivotreports.calc.reports.label' })}
						</Typography.Title>
						<Typography.Paragraph>
							{intl.formatMessage({ id: 'component.edit.farm.pivotreports.calc.reports.description' })}
						</Typography.Paragraph>
						<Button
							type="primary"
						>
							{intl.formatMessage({ id: 'component.edit.farm.pivotreports.calc.reports.action.recalculate' })}
						</Button>
					</Card>
				</>
			) : null }
    </ProCard>
  )
};

export default EditFarmPivotReportsComponent;