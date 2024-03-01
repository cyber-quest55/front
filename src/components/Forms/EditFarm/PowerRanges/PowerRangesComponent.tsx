// Dependencies
import { 
	ProCard,
} from '@ant-design/pro-components';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max';
import { getTimeDifference } from '@/utils/formater/get-time-duration';
import { getPowerRanges } from '@/utils/formater/get-power-ranges';
import {
	Button,
	Flex,
	List,
	Table,
	Typography,
	Tag,
} from 'antd';
import {
	FunctionComponent,
	ReactElement,
	useState,
} from 'react';
import SavePowerRange from './SavePowerRange';


// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

// Component
const EditFarmPowerRangesComponent: FunctionComponent<Props> = ({
	farm
}): ReactElement => {
	// Hooks
	const intl = useIntl();
	const [ loading ] = useState(false);
	const [isAddBandOpen, setIsBandOpen] = useState<boolean>(false);

	const toggleBandOpen = () => setIsBandOpen(prev => !prev);

	const listDataSource = getPowerRanges(farm!.power_ranges);

	const PowerProfile = {
		0: intl.formatMessage({ id: 'component.edit.farm.powerranges.profile.peak' }),
		1: intl.formatMessage({ id: 'component.edit.farm.powerranges.profile.outofpeak' }),
		2: intl.formatMessage({ id: 'component.edit.farm.powerranges.profile.reduced' }),
	}
	
	// Main TSX
  return (
    <ProCard
			title={
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({
						id: 'component.edit.farm.powerranges.title',
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
			{
				farm ? (
					<>
						<SavePowerRange 
							open={isAddBandOpen}
							onCancel={toggleBandOpen}
							power_ranges={farm.power_ranges}
						/>
						<Typography.Paragraph>
							{intl.formatMessage({
								id: 'component.edit.farm.powerranges.description',
							})}
						</Typography.Paragraph>
						<Button 
							type="primary"
							icon={<PlusOutlined/>}
							onClick={toggleBandOpen}
							style={{ marginBottom: 16 }}
						>
							{ intl.formatMessage({ id: 'component.edit.farm.powerranges.add.action' }) }
						</Button>
						<List 
							dataSource={listDataSource}
							renderItem={(item, index) => (
								<ProCard
									key={index}
									style={{ marginBottom: 16 }}
									bordered
								>
									<Flex
										style={{ marginBottom: 16 }}
									>
										{
											item.daysOfWeek.map((d, i) => (
												<Tag
													key={`dat-${i}`}
													color="warning"
												>
													{d}
												</Tag>
											))
										}
									</Flex>
									<Table
										dataSource={item.timeRanges}
										pagination={false}
										columns={[
											{
												title: intl.formatMessage({
													id: 'component.edit.farm.powerranges.table.column.interval.title'
												}),
												dataIndex: 'interval',
												render: (text, record) => (
													<Typography.Text>
														{record.start} - {record.end}
													</Typography.Text>
												)
											},
											{
												title: intl.formatMessage({
													id: 'component.edit.farm.powerranges.table.column.duration.title'
												}),
												dataIndex: 'duration',
												render: (text, record) => (
													<Typography.Text>
														{getTimeDifference(record.end, record.start)}
													</Typography.Text>
												)
											},
											{
												title: intl.formatMessage({
													id: 'component.edit.farm.powerranges.table.column.type.title'
												}),
												dataIndex: 'type',
												render: (text) => (
													<Tag color='purple'>
														{PowerProfile[text]}
													</Tag>
												)

											}
										]}
									/>
								</ProCard>
							)}
						/>
					</>
				) : null	
			}
    </ProCard>
  )
};

export default EditFarmPowerRangesComponent;