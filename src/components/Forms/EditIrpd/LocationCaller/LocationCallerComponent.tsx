import { patchIrpd, patchIrpdConfig } from '@/services/irpd';
import { SaveOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Typography } from 'antd';
import * as React from 'react';
import MarkerGreen from '../../../../../public/images/devices/marker-green.svg';
import LocationFormContainer from '../../Location/LocationContainer';
import { getDefaultIrpdContentConfig } from '@/utils/data/default-irpd-content-config';

const EditIrpdLocationCallerComponent: React.FunctionComponent<any> = (props) => {
  const irpd = props.irpd;
  const positions = {
    lat: Number(irpd.position.split(',')[0]),
    long: Number(irpd.position.split(',')[1]),
  };
  const patchIrpdConfigReq = useRequest(patchIrpdConfig, { manual: true });
  const patchIrpdReq = useRequest(patchIrpd, { manual: true });
  const params = useParams();
  const { message } = App.useApp();
  const intl = useIntl();

  const [first, setFirst] = React.useState({
    lat: positions.lat,
    lng: positions.long,
  });

  const onFinish = async () => {
    try {
      const defaultContentConfig = getDefaultIrpdContentConfig(irpd);

      const newConfig = {
        content: {
          ...defaultContentConfig,
        },
        monthly_water_limit: irpd.latest_irpd_config_v5.monthly_water_limit,
        has_pressure_sensor: irpd.latest_irpd_config_v5.has_pressure_sensor,
        name_irpd_on_config: irpd.name,
        flow: parseFloat(irpd.flow),
        position: `${first.lat},${first.lng}`,
        potency: irpd.latest_irpd_config_v5.potency,
        kwh_peak: parseFloat(irpd.latest_irpd_config_v5?.kwh_peak ?? 1),
        kwh_out_of_peak: parseFloat(irpd.latest_irpd_config_v5?.kwh_out_of_peak ?? 1),
        kwh_reduced: parseFloat(irpd.latest_irpd_config_v5?.kwh_reduced ?? 1),
      };

      const irpdPatchData = {
        name: irpd.name,
        potency: irpd.latest_irpd_config_v5.potency,
        position: `${first.lat},${first.lng}`,
        flow: parseFloat(irpd.flow),
      };

      await patchIrpdConfigReq.runAsync(
        {
          farmId: params.farmId as any,
          irpdId: params.irpdId as any,
        },
        newConfig,
      );

      await patchIrpdReq.runAsync(
        {
          farmId: params.farmId as any,
          irpdId: params.irpdId as any,
        },
        irpdPatchData,
      );

      await props.queryIrpdById({
        farmId: params.farmId as any,
        irpdId: params.irpdId as any,
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
            id: 'component.edit.irpd.location.title',
          })}
        </Typography.Title>
      }
      wrap
      ghost
      extra={
        <Button
          loading={patchIrpdConfigReq.loading}
          onClick={onFinish}
          icon={<SaveOutlined />}
          type="primary"
        >
          {intl.formatMessage({
            id: 'component.edit.irpd.button.save',
          })}
        </Button>
      }
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.irpd.location.desc',
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
              id: 'component.edit.irpd.location.input.label',
            }),
            onChange: (v: any) => setFirst(v),
            marker: MarkerGreen,
          },
        ]}
      />
    </ProCard>
  );
};

export default EditIrpdLocationCallerComponent;
