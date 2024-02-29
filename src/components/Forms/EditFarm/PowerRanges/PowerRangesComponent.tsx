// Dependencies
import { 
	ProCard,
} from '@ant-design/pro-components';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max'
import {
	Button,
	Divider,
	List,
	Typography
} from 'antd';
import {
	FunctionComponent,
	ReactElement,
	useState,
} from 'react';
import SavePowerRange from './SavePowerRange';

type InputObject = { [key: string]: APIModels.PowerRange[] };

type GroupedConfig = {
    daysOfWeek: string[];
    timeRanges: APIModels.PowerRange[];
};

function getDayOfWeek(key: number): string {
	const daysOfWeek = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	];
	return daysOfWeek[key];
}

function groupEqualKeys(inputObject: InputObject): GroupedConfig[] {
	const groupedConfigs: GroupedConfig[] = [];
	const groupsMap = new Map<string, GroupedConfig>();

	Object.keys(inputObject).forEach((key) => {
			const timeRanges = inputObject[key];

			const serializedTimeRanges = JSON.stringify(timeRanges);

			if (groupsMap.has(serializedTimeRanges)) {
					const existingGroup = groupsMap.get(serializedTimeRanges)!;
					existingGroup.daysOfWeek.push(getDayOfWeek(Number(key)));
			} else {
					const newGroup: GroupedConfig = {
							daysOfWeek: [getDayOfWeek(Number(key))],
							timeRanges: timeRanges,
					};
					groupsMap.set(serializedTimeRanges, newGroup);
			}
	});

	groupedConfigs.push(...groupsMap.values());
	return groupedConfigs;
}

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

	const listDataSource = groupEqualKeys(farm!.power_ranges);
	console.log('[here with values]', farm?.power_ranges, listDataSource);

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
						>
							{ intl.formatMessage({ id: 'component.edit.farm.powerranges.add.action' }) }
						</Button>
						<Divider />
						<List 
						
						/>
					</>
				) : null	
			}
    </ProCard>
  )
};

export default EditFarmPowerRangesComponent;