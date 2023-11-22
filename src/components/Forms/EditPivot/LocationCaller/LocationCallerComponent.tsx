import { SaveOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { App, Button, Typography } from 'antd';
import * as React from 'react';
import MarkerGreen from '../../../../../public/images/devices/marker-green.svg';
import MarkerRed from '../../../../../public/images/devices/marker-red.svg';
import LocationFormContainer from '../../Location/LocationContainer';
import { postPivotConfig } from '@/services/pivot';
import { useRequest } from 'ahooks';
import { useParams } from '@umijs/max';

const EditPivotLocationCallerComponent: React.FunctionComponent<any> = (props) => {
  const pivot =  props.pivot
  const positions = props.pivot.controllerconfig.content.pivot_positions;
  const postReq = useRequest(postPivotConfig, { manual: true });
  const params = useParams();
  const { message } = App.useApp();

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
            "latitude_center": first.lat,
            "north_reference": hasNorth? 1: 0,
            "longitude_center": first.lng,
            "latitude_reference": second.lat,
            "longitude_reference": second.lng
          }
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
  }

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Localização do Dispositivo
        </Typography.Title>
      }
      wrap
      ghost
      extra={
        <Button loading={postReq.loading} onClick={onFinish} icon={<SaveOutlined />} type="primary">
          Salvar
        </Button>
      }
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          A autoreversão é um recurso que possibilita que o pivô chegue ao final do seu percurso e
          retorne automaticamente, realizando uma operação. O retorno do pivô acontece quando ele
          alcança um obstáculo físico, chamado de fim de curso - disponível em painéis SmartConnect
          - ou quando chega ao ângulo final de trabalho.
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
            name: 'Center',
            onChange: (v: any) => setFirst(v),
            marker: MarkerGreen,
          },
          {
            color: 'red',
            value: { lat: second.lat, lng: second.lng },
            name: 'Start Reference',
            onChange: (v: any) => setSecond(v),
            marker: MarkerRed,
          },
        ]}
      />
    </ProCard>
  );
};

export default EditPivotLocationCallerComponent;
