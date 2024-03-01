// Dependencies
import { 	ProCard } from '@ant-design/pro-components';
import {
	DeleteOutlined,
	PlusOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max';
import { getTimeDifference } from '@/utils/formater/get-time-duration';
import {
	getAvailableDayIndices,
	getPowerRanges,
	type GroupedConfig
} from '@/utils/formater/get-power-ranges';
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
	useCallback,
	useEffect,
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
	const [ isAddBandOpen, setIsBandOpen ] = useState<boolean>(false);
	const [ energyBands, setEnergyBands ] = useState<GroupedConfig[]>([]);
	const [ availableDays, setAvailableDays ] = useState<number[]>([]);

	// Translation for power range list
	const powerProfile = useCallback(() => ({
		0: intl.formatMessage({ id: 'component.edit.farm.powerranges.profile.peak' }),
		1: intl.formatMessage({ id: 'component.edit.farm.powerranges.profile.outofpeak' }),
		2: intl.formatMessage({ id: 'component.edit.farm.powerranges.profile.reduced' }),
	}), [intl]);

	const daysOfWeekTranslations = useCallback(() => [
		intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.monday' }),
		intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.tuesday' }),
		intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.wednesday' }),
		intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.thursday' }),
		intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.friday' }),
		intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.saturday' }),
		intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.sunday' }),
	], [intl]);

	// Actions
	const toggleBandOpen = () => setIsBandOpen(prev => !prev);

	// Grouping power ranges by days of week
	useEffect(() => {
		if (farm) {
			setEnergyBands(getPowerRanges(farm.power_ranges, daysOfWeekTranslations()));	
		}
	}, [farm]);

	useEffect(() => {
		setAvailableDays(getAvailableDayIndices(energyBands, daysOfWeekTranslations()));
	}, [energyBands]);
	
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
							availableDaysOfWeek={availableDays}
							daysOfWeekTranslations={daysOfWeekTranslations()}
							energyProfiles={powerProfile()}
							onSubmit={async (values) => {
								console.log('[submit here]', values);
							}}
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
							disabled={!availableDays.length}
						>
							{ intl.formatMessage({ id: 'component.edit.farm.powerranges.add.action' }) }
						</Button>
						<List 
							dataSource={energyBands}
							renderItem={(item, index) => (
								<ProCard
									key={index}
									style={{ marginBottom: 16 }}
									extra={<>
										<Button
											danger
											size="small"
											icon={<DeleteOutlined/>}
											onClick={() => {
												const newArray = energyBands.filter((eb, i) => i !== index);
												setEnergyBands(newArray);
											}}
										/>
									</>}
									bordered
								>
									<Flex
										style={{ marginBottom: 16 }}
									>
										{
											item.daysOfWeek.map((day, i) => (
												<Tag
													key={`dat-${i}`}
													color="warning"
												>
													{day}
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
														{powerProfile()[text]}
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