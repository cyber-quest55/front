// Dependencies
import { ProCard } from '@ant-design/pro-components';
import { DownloadOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { useScreenHook } from '@/hooks/screen';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max';
import {
	Badge,
	Button,
	Calendar,
	Col,
	DatePicker,
	Row,
	Typography
} from 'antd';
import type { Dayjs } from 'dayjs';
import { FunctionComponent, ReactElement, useState } from 'react';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

// Component
const EditFarmHolidaysComponent: FunctionComponent<Props> = ({ farm }): ReactElement => {
	// Hooks
	const intl = useIntl();
	const [ loading ] = useState(false);
	const [
		holidayList,
		//setHolidayList
	] = useState<{ day: number, month: number }[]>(farm?.holidays_list || [])
	const { lg, xl, xxl } = useScreenHook();

	const isLargeScreen = lg || xl || xxl;

	// Calendar cell renderer
	const dateCellRenderer = (value: Dayjs) => {
    const isHoliday = holidayList.some((holiday) => {
      return (
        value.month() === holiday.month - 1 &&
        value.date() === holiday.day
      );
    });

		if (isHoliday && isLargeScreen) {
			return (
				<ul className="events">
          <li>
            <Badge
							status="warning"
							text={intl.formatMessage({ id: 'component.edit.farm.holiday.label' })}
						/>
          </li>
      	</ul>
			);
		}

    return null;
	};

	// Calendar cell for mobile
	const calendarFullRenderer = (value: Dayjs) => {
		const isHoliday = holidayList.some(
			(holiday) =>
				value.month() === holiday.month - 1 && value.date() === holiday.day
		);

		return (
			<div
				className="ant-picker-cell-inner ant-picker-calendar-date"
				style={{
					backgroundColor: isHoliday ? '#dac422': 'transparent',
					color: isHoliday ? '#000000': '#ffffff',
				}}
			>
				{value.date()}
			</div>
		);
	}

	const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      console.log('Selected Month and Day:', date.format('MMMM Do'));
    }
  }

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
				{intl.formatMessage({ id: 'component.edit.farm.holiday.desc' })}
			</Typography.Paragraph>
			<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
				<Col xs={24} sm={24} md={8} xl={8}>
					<DatePicker 
						picker="date"
						format="MMMM Do"
						onChange={handleDateChange}
						style={{ width: '100%' }}
					/>
				</Col>
				<Col xs={24} sm={24} md={4} xl={4} >
					<Button
						type="primary"
						icon={<PlusOutlined />}
						style={{ width: '100%' }}
						onClick={() => {}}
					>
						{intl.formatMessage({ id: 'component.edit.farm.holiday.add' })}
					</Button>
				</Col>
				<Col xs={24} sm={24} md={8} xl={8} >
					<Button
						type="primary"
						icon={<DownloadOutlined />}
						style={{ width: '100%' }}
						onClick={() => {}}
					>
						{intl.formatMessage({ id: 'component.edit.farm.holiday.import' })}
					</Button>
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