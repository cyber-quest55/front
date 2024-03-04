// Dependencies
import { ProCard } from '@ant-design/pro-components';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max';
import { enableIrpdReports, recalculateIrpdReports } from '@/services/farm';
import { useRequest } from 'ahooks';
import {
	Alert,
	Card, 
	Button,
	Typography 
} from 'antd';
import {
	FunctionComponent,
	ReactElement
} from 'react';

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

	// Requests
	const reqEnableReports = useRequest(enableIrpdReports, { manual: true });
	const reqRecalculateReports = useRequest(recalculateIrpdReports, { manual: true });

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
						{
							!farm.power_ranges['0']?.length ? (
								<Alert
									message={intl.formatMessage({ id: 'component.edit.farm.pumpreports.enable.reports.nopowerranges' })}
									type="error"
									style={{ marginBottom: 16 }}
									showIcon
								/>
							): null
						}
						{
							farm.start_irpd_report_aggregate === 2 ? (
								<Alert
									message={intl.formatMessage({ id: 'component.edit.farm.pumpreports.enable.reports.alreadyenabled' })}
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
								farm.start_irpd_report_aggregate !== 0 ||
								reqEnableReports.loading
							}
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
							disabled={reqRecalculateReports.loading}
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