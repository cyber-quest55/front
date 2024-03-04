// Dependencies
import { 	ProCard } from '@ant-design/pro-components';
import {
	EditOutlined,
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
import { updateFarm } from '@/services/farm'
import { useRequest } from 'ahooks';
import {
	App,
	Button,
	Flex,
	List,
	Space,
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
	farm,
	queryFarmById,
}): ReactElement => {
	// Hooks
	const intl = useIntl();
	const { message } = App.useApp();
	const [ loading ] = useState(false);
	const [ isAddBandOpen, setIsBandOpen ] = useState<boolean>(false);
	const [ energyBands, setEnergyBands ] = useState<GroupedConfig[]>([]);
	const [ availableDays, setAvailableDays ] = useState<number[]>([]);
	const [ currentConfig, setCurrentConfig ] = useState<GroupedConfig | null>(null);

	// Request to save farm
	const reqSaveFarm = useRequest(updateFarm, { manual: true });

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

	const onSubmitRanges = async () => {
		try {

			// Get configs by day of week
			const mondayConfig = energyBands.find(eb => eb.daysOfWeek.some(dw => dw.value === 0));
			const tuesdayConfig = energyBands.find(eb => eb.daysOfWeek.some(dw => dw.value === 1));
			const wednesdayConfig = energyBands.find(eb => eb.daysOfWeek.some(dw => dw.value === 2));
			const thursdayConfig = energyBands.find(eb => eb.daysOfWeek.some(dw => dw.value === 3));
			const fridayConfig = energyBands.find(eb => eb.daysOfWeek.some(dw => dw.value === 4));
			const saturdayConfig = energyBands.find(eb => eb.daysOfWeek.some(dw => dw.value === 5));
			const sundayConfig = energyBands.find(eb => eb.daysOfWeek.some(dw => dw.value === 6));

			// Has missing days
			const isMissingDays = (
				!mondayConfig ||
				!tuesdayConfig ||
				!wednesdayConfig ||
				!thursdayConfig ||
				!fridayConfig ||
				!saturdayConfig ||
				!sundayConfig
			);
			if (isMissingDays) {
				return message.warning(
					intl.formatMessage({
						id: 'component.edit.farm.powerranges.messages.missingdays',
					})
				);
			}

			// Unify payload
			const payload = {
				power_ranges: {
					0: mondayConfig?.timeRanges,
					1: tuesdayConfig?.timeRanges,
					2: wednesdayConfig?.timeRanges,
					3: thursdayConfig?.timeRanges,
					4: fridayConfig?.timeRanges,
					5: saturdayConfig?.timeRanges,
					6: sundayConfig?.timeRanges,
				} as APIModels.PowerRanges,
			};

			// Saving farm power ranges
			await reqSaveFarm.runAsync({
				id: farm!.id.toString(),
				body: payload,
			});
			queryFarmById({ id: farm!.id });
		
			message.success(intl.formatMessage({
				id: 'component.edit.farm.messages.save.success',
			}));
		} catch (err) {
			message.error(intl.formatMessage({
				id: 'component.edit.farm.messages.save.error',
			}));
		}
	}

	// Grouping power ranges by days of week
	useEffect(() => {
		if (farm) {
			if (!farm.power_ranges['none']) {
				setEnergyBands(getPowerRanges(farm.power_ranges, daysOfWeekTranslations()));	
			}
		}
	}, [farm]);

	useEffect(() => {
		const available = getAvailableDayIndices(energyBands);
		setAvailableDays(available);
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
				<Button
					loading={loading}
					icon={<SaveOutlined />}
					onClick={onSubmitRanges}
					disabled={reqSaveFarm.loading}
					type="primary"
				>
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
							powerRange={currentConfig}
							setPowerRange={setCurrentConfig}
							availableDaysOfWeek={availableDays}
							daysOfWeekTranslations={daysOfWeekTranslations()}
							energyProfiles={powerProfile()}
							onSubmit={async (values) => {
								if (!values.isEditing) {
									setEnergyBands(prev => [ ...prev, values.data ]);
								} else {
									setEnergyBands(prev => prev.map(
										eb =>
											(
												eb.daysOfWeek === values.original.daysOfWeek &&
												eb.timeRanges === values.original.timeRanges
											)
												? values.data
												: eb
										)
									)
								}
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
							onClick={() => {
								setCurrentConfig(null);
								toggleBandOpen();
							}}
							style={{ marginBottom: 16 }}
							disabled={!availableDays.length || reqSaveFarm.loading}
						>
							{ intl.formatMessage({ id: 'component.edit.farm.powerranges.add.action' }) }
						</Button>
						<List 
							dataSource={energyBands}
							renderItem={(item, index) => (
								<ProCard
									key={index}
									style={{ marginBottom: 16 }}
									extra={
										<Space>
											<Button
												size="small"
												icon={<EditOutlined/>}
												disabled={reqSaveFarm.loading}
												onClick={() => {
													setCurrentConfig(item);
													toggleBandOpen();
												}}
											/>
											<Button
												danger
												size="small"
												disabled={reqSaveFarm.loading}
												icon={<DeleteOutlined/>}
												onClick={() => {
													const newArray = energyBands.filter((eb, i) => i !== index);
													setEnergyBands(newArray);
												}}
											/>
										</Space>
									}
									bordered
								>
									<Flex
										style={{ marginBottom: 16 }}
										wrap="wrap"
										gap={8}
									>
										{
											item.daysOfWeek.map((day, i) => (
												<Tag
													key={`dat-${i}`}
													color="warning"
													style={{ margin: 0 }}
												>
													{day.label}
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