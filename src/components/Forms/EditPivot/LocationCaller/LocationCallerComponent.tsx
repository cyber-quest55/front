import { postPivotConfig } from '@/services/pivot';
import { SaveOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Typography } from 'antd';
import * as React from 'react';
import MarkerGreen from '../../../../../public/images/devices/marker-green.svg';
import MarkerRed from '../../../../../public/images/devices/marker-red.svg';
import LocationFormContainer from '../../Location/LocationContainer';

const EditPivotLocationCallerComponent: React.FunctionComponent<any> = (props) => {
  const pivot = props.pivot;
  const positions = props.pivot.controllerconfig.content.pivot_positions;
  const postReq = useRequest(postPivotConfig, { manual: true });
  const params = useParams();
  const { message } = App.useApp();
  const intl = useIntl();

  const [first, setFirst] = React.useState({
    lat: positions.latitude_center,
    lng: positions.longitude_center,
  });

  const [second, setSecond] = React.useState({
    lat: positions.latitude_reference,
    lng: positions.longitude_reference,
  });

  const [hasNorth, setHasNorth] = React.useState(positions.north_reference);

  const onFinish = async () => {
    try {
      const newObj = {
        content: {
          ...pivot.controllerconfig.content,
          pivot_positions: {
            latitude_center: first.lat,
            north_reference: hasNorth ? 1 : 0,
            longitude_center: first.lng,
            latitude_reference: second.lat,
            longitude_reference: second.lng,
          },
        },
        name_pivot_on_config: pivot.controllerconfig.name,
        brand_model: pivot.controllerconfig.brand_model,
        equipment: pivot.controllerconfig.equipment,
        segments_crop: pivot.controllerconfig.segments_crop,
        injection_pump: pivot.controllerconfig.injection_pump,
        kwh_out_of_peak: pivot.controllerconfig.kwh_out_of_peak,
        kwh_peak: pivot.controllerconfig.kwh_peak,
        kwh_reduced: pivot.controllerconfig.kwh_reduced,
        message_subtype: pivot.controllerconfig.message_subtype,
        panel_type: pivot.controllerconfig.panel_type,
        potency: pivot.controllerconfig.potency,
      };

      await postReq.runAsync(
        {
          farmId: params.farmId as any,
          pivotId: params.pivotId as any,
          deviceId: pivot.control as any,
        },
        newObj as any,
      );

      await props.queryPivotByIdStart({
        farmId: params.farmId as any,
        pivotId: params.pivotId as any,
      });

      message.success('Configs Atualizadas com Sucesso');
    } catch (err) {
      message.error('Fail');
    }
  };

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          {intl.formatMessage({
            id: 'component.edit.pivot.location.title',
          })}
        </Typography.Title>
      }
      wrap
      ghost
      extra={
        <Button loading={postReq.loading} onClick={onFinish} icon={<SaveOutlined />} type="primary">
          {intl.formatMessage({
            id: 'component.edit.pivot.button.save',
          })}
        </Button>
      }
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.pivot.location.desc',
          })}
        </Typography.Text>
      </div>
      <LocationFormContainer
        lat={positions.latitude_center}
        lng={positions.longitude_center}
        hasNorthReference
        northValue={positions.north_reference}
        onChangeNorth={(e: any) => setHasNorth(e.target.checked)}
        locations={[
          {
            color: 'green',
            value: { lat: first.lat, lng: first.lng },
            name: intl.formatMessage({
              id: 'component.edit.pivot.location.center.label',
            }),
            onChange: (v: any) => setFirst(v),
            marker: MarkerGreen,
          },
          {
            color: 'red',
            value: { lat: second.lat, lng: second.lng },
            name: intl.formatMessage({
              id: 'component.edit.pivot.location.startref.label',
            }),
            onChange: (v: any) => setSecond(v),
            marker: MarkerRed,
          },
        ]}
      />
    </ProCard>
  );
};

export default EditPivotLocationCallerComponent;
