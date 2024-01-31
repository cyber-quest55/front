import { patchRepeaterConfig } from '@/services/repeaters';
import { SaveOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Typography } from 'antd';
import * as React from 'react';
import MarkerGreen from '../../../../../public/images/devices/marker-green.svg';
import LocationFormContainer from '../../Location/LocationContainer';

const EditRepeaterLocationCallerComponent: React.FunctionComponent<any> = (props) => {
  const repeater = props.repeater;
  const positions = {
    lat: Number(repeater.position.split(',')[0]),
    long: Number(repeater.position.split(',')[1]),
  };
  const patchRepeaterConfigReq = useRequest(patchRepeaterConfig, { manual: true });
  const params = useParams();
  const { message } = App.useApp();
  const intl = useIntl();

  const [first, setFirst] = React.useState({
    lat: positions.lat,
    lng: positions.long,
  });

  const onFinish = async () => {
    const newConfigData = {
      name: repeater.name,
      position: `${first.lat},${first.lng}`,
      energy_type: repeater.energy_type,
    };

    try {
      await patchRepeaterConfigReq.runAsync(
        {
          farmId: params.farmId as any,
          repeaterId: params.repeaterId as any,
        },
        newConfigData,
      );

      await props.queryRepeaterById({
        farmId: params.farmId as any,
        repeaterId: params.repeaterId as any,
      });

      message.success('Configs Atualizadas com Sucesso');
    } catch (err) {
      console.error(err);
      message.error('Fail');
    }
  };

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          {intl.formatMessage({
            id: 'component.edit.repeater.location.title',
          })}
        </Typography.Title>
      }
      wrap
      ghost
      extra={
        <Button
          loading={patchRepeaterConfigReq.loading}
          onClick={onFinish}
          icon={<SaveOutlined />}
          type="primary"
        >
          {intl.formatMessage({
            id: 'component.edit.repeater.button.save',
          })}
        </Button>
      }
    >
      <div style={{ marginBottom: 20, marginLeft: 5 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.repeater.location.desc',
          })}
        </Typography.Text>
      </div>
      <LocationFormContainer
        lat={positions.lat}
        lng={positions.long}
        northValue={false}
        locations={[
          {
            color: 'green',
            value: { lat: first.lat, lng: first.lng },
            name: intl.formatMessage({
              id: 'component.edit.repeater.location.input.label',
            }),
            onChange: (v: any) => setFirst(v),
            marker: MarkerGreen,
          },
        ]}
      />
    </ProCard>
  );
};

export default EditRepeaterLocationCallerComponent;
