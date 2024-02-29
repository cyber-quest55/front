// Dependencies
import { ProCard } from '@ant-design/pro-components';
import {
	DeleteOutlined,
	DownloadOutlined,
	PlusOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import { useScreenHook } from '@/hooks/screen';
import { queryFarmById } from '@/models/farm-by-id';
import {
	BR_NATIONAL_HOLIDAYS,
	RU_NATIONAL_HOLIDAYS,
} from '@/utils/consts/holidays';
import { updateFarm } from '@/services/farm';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import type { MenuProps } from 'antd';
import {
	App,
	Tag,
	Button,
	Calendar,
	Col,
	DatePicker,
	Dropdown,
	Flex,
	Row,
	Typography
} from 'antd';
import type { Dayjs } from 'dayjs';
import {
	FunctionComponent,
	ReactElement,
	useCallback,
	useState
} from 'react';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

// Component
const EditFarmHolidaysComponent: FunctionComponent<Props> = ({
	farm,
	queryFarmById
}): ReactElement => {
	// Hooks
	const intl = useIntl();
	const [ loading ] = useState(false);
	const [
		holidayList,
		setHolidayList
	] = useState<{ day: number, month: number }[]>(farm?.holidays_list || []);
	const { message } = App.useApp();
	const [ selectedDate, setSelectedDate ] = useState<{ day: number, month: number }>()
	const { lg, xl, xxl } = useScreenHook();

	const isLargeScreen = lg || xl || xxl;

	const reqSaveFarm = useRequest(updateFarm, { manual: true });

	// Calendar cell renderer
	const dateCellRenderer = useCallback((value: Dayjs) => {
    const isHoliday = holidayList.some((holiday) => {
      return (
        value.month() === holiday.month - 1 &&
        value.date() === holiday.day
      );
    });

		if (isHoliday && isLargeScreen) {
			return (
				<div className="events">
					<Flex
						style={{ marginTop: 8 }}
						justify="flex-end"
						align="center"
						gap="8px"
						wrap="wrap"
					>
						<Tag
							color="processing"
							style={{
								textAlign: 'center',
								margin: 0
							}}
						>
							{intl.formatMessage({
								id: 'component.edit.farm.holiday.label',
							})}
						</Tag>
						<Button 
							danger
							size="small"
							icon={<DeleteOutlined />}
							onClick={() => {
								setHolidayList(prev => prev.filter(
									h => !(h.day === value.date() && h.month -1 === value.month())
								))
							}}
						/>
					</Flex>
      	</div>
			);
		}

    return null;
	}, [holidayList, intl, isLargeScreen]);

	// Calendar cell for mobile
	const calendarFullRenderer = useCallback((value: Dayjs) => {
		const isHoliday = holidayList.some(
			(holiday) =>
				value.month() === holiday.month - 1 && value.date() === holiday.day
		);

		return (
			<div
				className="ant-picker-cell-inner ant-picker-calendar-date"
				onClick={() => {
					console.log('[has holiday]')
				}}
				style={{
					backgroundColor: isHoliday ? '#dac422': 'transparent',
					color: isHoliday ? '#000000': '#ffffff',
				}}
			>
				{value.date()}
			</div>
		);
	}, [holidayList])

	const handleDateChange = (date: Dayjs | null) => {
    if (date) {
			setSelectedDate({
				day: Number(date.format('DD')),
				month: Number(date.format('MM')),
			})
    }
  }

	const onFinish = async () => {
		try {
			// Backend supports updates from single fields
			// In that case this will be sending just modified fields
			const payload = { holidays_list: holidayList	};
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

	const holidayImportOptions: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<a
					rel="noopener noreferrer"
					onClick={() => setHolidayList(prev => [ ...prev, ...BR_NATIONAL_HOLIDAYS ])}
				>
					{intl.formatMessage({ id: 'component.edit.farm.holiday.import.brazil' })}
				</a>
			),
		},
		{
			key: '2',
			label: (
				<a
					rel="noopener noreferrer"
					onClick={() => setHolidayList(prev => [ ...prev, ...RU_NATIONAL_HOLIDAYS ])}
				>
					{intl.formatMessage({ id: 'component.edit.farm.holiday.import.russia' })}
				</a>
			),
		}
	]

	// Main TSX
  return (
    <ProCard
			title={
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({
						id: 'component.edit.farm.holidays.title',
					})}
				</Typography.Title>
			}
			extra={
				<Button
					loading={loading}
					icon={<SaveOutlined />}
					type="primary"
					disabled={reqSaveFarm.loading}
					onClick={onFinish}
				>
					{intl.formatMessage({
						id: 'component.edit.farm.button.save',
					})}
				</Button>
			}
			ghost
			gutter={[12, 12]}
		>
			<Typography.Paragraph>
				{intl.formatMessage({ id: 'component.edit.farm.holiday.desc' })}
			</Typography.Paragraph>
			<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
				<Col xs={24}  md={24} xl={8}>
					<DatePicker 
						picker="date"
						format="MMMM Do"
						onChange={handleDateChange}
						style={{ width: '100%' }}
					/>
				</Col>
				<Col xs={24}  md={24} xl={4} >
					<Button
						type="primary"
						icon={<PlusOutlined />}
						style={{ width: '100%' }}
						onClick={() => {
							if (selectedDate) {
								const hasHoliday = holidayList.find(
									h => (h.day === selectedDate.day && h.month === selectedDate.month)
								);
								if (!hasHoliday) {
									setHolidayList(prev => [ ...prev, { ...selectedDate } ]);
								}	
							}
						}}
					>
						{intl.formatMessage({ id: 'component.edit.farm.holiday.add' })}
					</Button>
				</Col>
				<Col xs={24} md={24} xl={8} >
					<Dropdown menu={{ items: holidayImportOptions }} placement="bottom">
						<Button
							type="primary"
							icon={<DownloadOutlined />}
							style={{ width: '100%' }}
						>
							{intl.formatMessage({ id: 'component.edit.farm.holiday.import' })}
						</Button>
					</Dropdown>
				</Col>
			</Row>
			{
				isLargeScreen ? (
					<Calendar
						fullscreen
						cellRender={dateCellRenderer}
					/>
				) : (
					<Calendar
						fullscreen={false}
						fullCellRender={calendarFullRenderer}
						mode="month"
					/>
				)
			}
    </ProCard>
  )
};

export default EditFarmHolidaysComponent;