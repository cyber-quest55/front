import { useScreenHook } from '@/hooks/screen';
import { GetMeterSystemWaterLevelModelProps } from '@/models/meter-water-level';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { Mix } from '@ant-design/charts';
import { LightFilter, ProFormDateRangePicker, StatisticCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
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
  const { md } = useScreenHook();

  const className = useEmotionCss(({ token }) => {
    return {
      '.ant-pro-card-header': {
        [`@media screen and (max-width: ${token.screenMD}px)`]: {
          display: 'block',
        },
      },
      '.ant-pro-card-body': {
        [`@media screen and (max-width: ${token.screenMD}px)`]: {
          paddingInline: 12,
        },
      },
    };
  });
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
      className={className}
      title="Gráfico de Nível"
      extra={
        <LightFilter style={{ width: md ? 360 : 275 }}>
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
          <Mix
            appendPadding={0}
            tooltip={{
              shared: true,
            }}
            syncViewPadding={true}
            plots={[
              {
                type: 'line',
                options: {
                  data: props.meterSystemWaterLevel.loaded
                    ? props.meterSystemWaterLevel.result.map((item: any) => ({
                        ...item,
                        value: 380 / 100,
                      }))
                    : [],
                  xField: 'from',
                  yField: 'value',
                  yAxis: {
                    max: 400 / 100,
                    label: {
                      formatter: (item: string) => `${item} m`,
                    },
                  },

                  meta: {
                    value: {
                      alias: 'Valor Maximo',
                    },
                  },
                  color: 'red',
                },
              },
              {
                type: 'line',
                options: {
                  data: props.meterSystemWaterLevel.loaded
                    ? props.meterSystemWaterLevel.result.map((item: any) => ({
                        ...item,
                        value: 100 / 100,
                      }))
                    : [],
                  xField: 'from',
                  yField: 'value',
                  yAxis: {
                    max: 400 / 100,
                    label: {
                      formatter: (item: string) => `${item} m`,
                    },
                  },

                  meta: {
                    value: {
                      alias: 'Valor Mínimo',
                    },
                  },
                  color: '#FF6B3B',
                },
              },
              {
                type: 'area',
                options: {
                  yAxis: {
                    label: {
                      formatter: (item: string) => `${item} m`,
                    },
                  },
                  // height: 320 as any,
                  data: props.meterSystemWaterLevel.loaded
                    ? props.meterSystemWaterLevel.result
                    : [],
                  padding: 'auto',
                  xField: 'from',
                  yField: 'value' as any,
                  meta: {
                    value: {
                      alias: 'Valor',
                    },
                  },
                },
              },
            ]}
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
