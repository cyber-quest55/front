// Dependencies
import { ProCard } from '@ant-design/pro-components';
import { SaveOutlined } from '@ant-design/icons';
import { useScreenHook } from '@/hooks/screen';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max';
import {
	Button,
	Calendar,
	Badge,
	Typography
} from 'antd';
import type { Dayjs } from 'dayjs';
import { FunctionComponent, ReactElement, useState } from 'react';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

const holiday_list = [
	{ "day": 2, "month": 4 },
	{ "day": 21, "month": 4 },
	{ "day": 1, "month": 5 },
	{ "day": 3, "month": 6 },
	{ "day": 7, "month": 9 },
	{ "day": 12, "month": 10 },
	{ "day": 2, "month": 11 },
	{ "day": 15, "month": 11 },
	{ "day": 25, "month": 12 }
]

// Component
const EditFarmHolidaysComponent: FunctionComponent<Props> = ({}): ReactElement => {
	// Hooks
	const intl = useIntl()
	const [ loading ] = useState(false);
	const { lg, xl, xxl } = useScreenHook();

	const isLargeScreen = lg || xl || xxl


	// Calendar cell renderer
	const dateCellRenderer = (value: Dayjs) => {
    const isHoliday = holiday_list.some((holiday) => {
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
		const isHoliday = holiday_list.some(
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
			<Typography.Paragraph style={{ margin: 0 }}>
				{intl.formatMessage({ id: 'component.edit.farm.holiday.desc' })}
			</Typography.Paragraph>
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