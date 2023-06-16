import { GetMeterSystemWaterLevelModelProps } from '@/models/meter-water-level';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { Area } from '@ant-design/charts';
import { LightFilter, ProFormDateRangePicker, StatisticCard } from '@ant-design/pro-components';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

type Props = {
  selectedDevice: SelectedDeviceModelProps;
  meterSystemWaterLevel: GetMeterSystemWaterLevelModelProps;
  dispatch: any;
};

const MeterWaterLevelChart: React.FC<Props> = (props) => {
  const [range, setRange] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  const onDateChange = (value: any) => {
    setRange({
      startDate: value[0],
      endDate: value[1],
    });
  };

  const update = () => {
    const { startDate, endDate } = range;
    props.dispatch({
      type: 'meterSystemWaterLevel/queryMeterSystemWaterLevel',
      payload: {
        farmId: props.selectedDevice.farmId,
        meterId: props.selectedDevice.deviceId,
        params: { startDate, endDate },
      },
    });
  };

  useEffect(() => {
    update();
  }, [range]);

  return (
    <StatisticCard
      title="Gráfico de Nível"
      extra={
        <LightFilter style={{ width: 360 }}>
          <ProFormDateRangePicker
            name="startdate"
            label={<strong>Periodo</strong>}
            allowClear
            fieldProps={{
              onChange: onDateChange,

              value: [range.startDate, range.endDate],
            }}
          />
        </LightFilter>
      }
      chart={
        <Spin spinning={props.meterSystemWaterLevel.loading}>
          <Area
            height={320}
            data={props.meterSystemWaterLevel.loaded ? props.meterSystemWaterLevel.result : []}
            padding="auto"
            xField="from"
            yField="value"
          />
        </Spin>
      }
    ></StatisticCard>
  );
};

export default connect(
  ({
    meterSystemWaterLevel,
    selectedDevice,
  }: {
    meterSystemWaterLevel: any;
    selectedDevice: any;
  }) => ({
    meterSystemWaterLevel,
    selectedDevice,
  }),
)(MeterWaterLevelChart);
