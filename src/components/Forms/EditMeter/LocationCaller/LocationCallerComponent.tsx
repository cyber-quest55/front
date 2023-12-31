import { postMeterSystemConfig } from '@/services/metersystem';
import { SaveOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Typography } from 'antd';
import * as React from 'react';
import MarkerGreen from '../../../../../public/images/devices/marker-green.svg';
import LocationFormContainer from '../../Location/LocationContainer';
import moment from 'moment';
import { getDefaultPeakTimeConfig } from '../General/util';

const EditMeterLocationCallerComponent: React.FunctionComponent<any> = (props) => {
  const meter = props.meter;
  const positions = {
    lat: Number(props.meter.imeter_set[0].latest_config.position_imeter.split(',')[0]),
    long: Number(props.meter.imeter_set[0].latest_config.position_imeter.split(',')[1]),
  };
  const postMeterSystemConfigReq = useRequest(postMeterSystemConfig, { manual: true });
  const params = useParams();
  const { message } = App.useApp();
  const intl = useIntl();

  const [first, setFirst] = React.useState({
    lat: positions.lat,
    lng: positions.long,
  });

  const onFinish = async () => {
    try {
      const latestConfig = meter.imeter_set[0].latest_config;
      const defaultPeakTimeConfig = getDefaultPeakTimeConfig(latestConfig);

      const newConfig = {
        content: {
          ...defaultPeakTimeConfig,
        },
        graphic_max_value: latestConfig?.graphic_max_value,
        sensor_offset: latestConfig?.sensor_offset,
        measure_scale: latestConfig.measure_scale,
        measure_unit: latestConfig.measure_unit,
        min_limit: latestConfig?.min_limit,
        max_limit: latestConfig?.min_limit,
        position_imeter: `${first.lat},${first.lng}`,
        metersystem_name: meter.name,
        imeter_name: meter.imeter_set[0].name,
        flow_curve_equation: latestConfig.flow_curve_equation,
        sensor_process_controller_pair: meter.imeter_set[0].sensor_process_controller_pair.sensor,
      };

      await postMeterSystemConfigReq.runAsync(
        {
          farmId: params.farmId as any,
          meterSystemId: params.meterSystemId as any,
          iMeterId: params.meterId as any,
        },
        newConfig as any,
      );

      await props.queryMeterSystemById({
        farmId: params.farmId as any,
        meterId: params.meterSystemId as any,
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
            id: 'component.edit.meter.location.title',
          })}
        </Typography.Title>
      }
      wrap
      ghost
      extra={
        <Button
          loading={postMeterSystemConfigReq.loading}
          onClick={onFinish}
          icon={<SaveOutlined />}
          type="primary"
        >
          {intl.formatMessage({
            id: 'component.edit.meter.button.save',
          })}
        </Button>
      }
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.meter.location.desc',
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
              id: 'component.edit.meter.location.input.label',
            }),
            onChange: (v: any) => setFirst(v),
            marker: MarkerGreen,
          },
        ]}
      />
    </ProCard>
  );
};

export default EditMeterLocationCallerComponent;
