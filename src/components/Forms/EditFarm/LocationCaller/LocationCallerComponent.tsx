// Dependencies
import { ProCard } from '@ant-design/pro-components';
import { SaveOutlined } from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max';
import { updateFarm } from '@/services/farm';
import { useRequest } from 'ahooks';
import { App, Button, Typography } from 'antd';
import { FunctionComponent, ReactElement, useState } from 'react';
import MarkerGreen from '../../../../../public/images/devices/marker-green.svg';
import LocationFormContainer from '../../Location/LocationContainer';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

// Component
const EditFarmLocationCallerComponent: FunctionComponent<Props> = ({
	farm,
	queryFarmById,
}): ReactElement => {
	// Hooks
	const intl = useIntl();
	const { message } = App.useApp();
	const [ farmPosition, setFarmPosition ] = useState({
		lat: Number(farm?.location.split(',')[0]),
		lng: Number(farm?.location.split(',')[1])
	});

	const reqSaveFarm = useRequest(updateFarm, { manual: true });

	// Actions
	const onFinish = async () => {
		try {
			// Backend supports updates from single fields
			// In that case this will be sending just modified fields
			const payload = {
				location: `${farmPosition.lat},${farmPosition.lng}`,
			};
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

	// Main TSX
  return (
    <ProCard
			title={
				<Typography.Title style={{ margin: 0 }} level={2}>
					{intl.formatMessage({
						id: 'component.edit.farm.location.title',
					})}
				</Typography.Title>
			}
			extra={
				<Button
					loading={reqSaveFarm.loading}
					icon={<SaveOutlined />}
					type="primary"
					onClick={onFinish}
					disabled={reqSaveFarm.loading}
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
						<div style={{ marginBottom: 20 }}>
							<Typography.Text type="secondary">
								{intl.formatMessage({
									id: 'component.edit.farm.location.desc',
								})}
							</Typography.Text>
						</div>
						<LocationFormContainer
							lat={farmPosition.lat}
							lng={farmPosition.lng}
							autoUpdateCenter
							northValue={false}
							locations={[
								{
									color: 'green',
									value: { lat: farmPosition.lat, lng: farmPosition.lng },
									name: intl.formatMessage({
										id: 'component.edit.farm.location.label',
									}),
									onChange: (v: any) => setFarmPosition(v),
									marker: MarkerGreen,
								},
							]}
						/>
					</>
				) : null
			}
    </ProCard>
  )
};

export default EditFarmLocationCallerComponent;