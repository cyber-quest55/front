// Dependencies
import { ProCard } from '@ant-design/pro-components';
import { SaveOutlined } from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max';
import { Button, Typography } from 'antd';
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
	farm
}): ReactElement => {
	// Hooks
	const intl = useIntl()
	const [ loading ] = useState(false);
	const [ farmPosition, setFarmPosition ] = useState({
		lat: Number(farm?.location.split(',')[0]),
		lng: Number(farm?.location.split(',')[1])
	})

	// Actions
	const onFinish = async () => {
		console.log('set farm data', farm, farmPosition)
	}

	// Main TSX
  return (
    <ProCard
			title={
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({
						id: 'component.edit.farm.location.title',
					})}
				</Typography.Title>
			}
			extra={
				<Button
					loading={loading}
					icon={<SaveOutlined />}
					type="primary"
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
			<div style={{ marginBottom: 20 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.farm.location.desc',
          })}
        </Typography.Text>
      </div>
			<LocationFormContainer
        lat={farmPosition.lat}
        lng={farmPosition.lng}
        northValue={false}
        locations={[
          {
            color: 'green',
            value: { lat: farmPosition.lat, lng: farmPosition.lng },
            name: intl.formatMessage({
              id: 'component.edit.farm.location.center.label',
            }),
            onChange: (v: any) => setFarmPosition(v),
            marker: MarkerGreen,
          },
        ]}
      />
    </ProCard>
  )
};

export default EditFarmLocationCallerComponent;