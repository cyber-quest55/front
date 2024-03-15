import { useScreenHook } from '@/hooks/screen';
import { GetMeterSystemByIdModelProps } from '@/models/meter-by-id';

import { SelectedDeviceModelProps } from '@/models/selected-device';
import { getMeterSystemWaterLevel } from '@/services/metersystem';
import { rangePresets } from '@/utils/presets/RangePicker';
import { Mix } from '@ant-design/charts';
import { LightFilter, ProFormDateRangePicker, StatisticCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

type Props = {
  selectedDevice: SelectedDeviceModelProps;
  meterSystemById: GetMeterSystemByIdModelProps;
};

const MeterWaterLevelChart: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { md } = useScreenHook();
  const [dates, setDates] = useState<any>([dayjs().subtract(1, 'month'), dayjs()]);

  const getReq = useRequest(getMeterSystemWaterLevel, { manual: true });
  const meter = props.meterSystemById.unformated;

  const maxValue =
    meter.imeter_set?.length > 0
      ? meter?.imeter_set[0]?.latest_config?.content?.imanage_sensors[0]?.max_value
      : 1;

  const minLimit =
    meter.imeter_set?.length > 0 ? meter?.imeter_set[0]?.latest_config?.min_limit : undefined;
  const maxLimit =
    meter.imeter_set?.length > 0 ? meter?.imeter_set[0]?.latest_config?.max_limit : undefined;

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

  const update = async () => {
    await getReq.runAsync(
      {
        farmId: props.selectedDevice.farmId,
        meterId: props.selectedDevice.deviceId as any,
        otherId: props.selectedDevice.otherProps.imeterSetId,
        params: {},
      },
      {
        date_start: dates[0].toISOString(),
        date_end: dates[1].toISOString(),
      },
    );
  };

  useEffect(() => {
    update();
  }, [dates, props.selectedDevice]);


  return (
    <StatisticCard
      className={className}
      title={intl.formatMessage({ id: 'component.meter.report.chart' })}
      extra={
        <LightFilter style={{ width: md ? 360 : 275 }}>
          <ProFormDateRangePicker
            name="startdate"
            label={intl.formatMessage({
              id: 'component.pivot.tab.history.rangepicker.label',
            })}
            disabled={getReq.loading}
            fieldProps={{
              presets: rangePresets,
              onChange: (v) => {
                if (v && v[0] && v[1]) {
                  setDates(v);
                }
              },

              value: dates,
            }}
          />
        </LightFilter>
      }
      chart={
        <Spin spinning={getReq.loading} >

          <Mix
            appendPadding={0}
            tooltip={{
              shared: true,
            }}
            syncViewPadding={true}
            plots={meter.imeter_set?.length > 0 && maxLimit && minLimit ? [
              meter.imeter_set?.length > 0 && maxLimit
                ? {
                  type: 'line',
                  options: {
                    data: getReq.data
                      ? getReq?.data?.map((item: any) => ({
                        ...item,
                        value:
                          meter.imeter_set?.length > 0
                            ? ((maxLimit / 100) * maxValue) / 10
                            : 0,
                      }))
                      : [],
                    xField: 'from',
                    yField: 'value',
                    yAxis: {
                      max: maxValue / 10,
                      label: {
                        formatter: (item: string) => `${item} m`,
                      },
                    },

                    meta: {
                      value: {
                        alias: intl.formatMessage({
                          id: 'component.meter.report.chart.label.max',
                        }),
                      },
                    },
                    color: 'red',
                  },
                }
                : ({} as any),
              meter.imeter_set?.length > 0 && minLimit
                ? {
                  type: 'line',
                  options: {
                    data: getReq.data
                      ? getReq?.data?.map((item: any) => ({
                        ...item,
                        value:
                          meter.imeter_set?.length > 0
                            ? ((minLimit / 100) * maxValue) / 10
                            : 0,
                      }))
                      : [],
                    xField: 'from',
                    yField: 'value',
                    yAxis: {
                      max: maxValue / 10,
                      label: {
                        formatter: (item: string) => `${item} m`,
                      },
                    },


                    meta: {
                      value: {
                        alias: intl.formatMessage({
                          id: 'component.meter.report.chart.label.min',
                        }),
                      },
                    },
                    color: '#FF6B3B',
                  },
                }
                : ({} as any),
              {
                type: 'area',
                options: {
                  yAxis: {
                    max: maxValue / 10,

                    label: {
                      formatter: (item: string) => `${item} m`,
                    },
                  },
                  // height: 320 as any,
                  data: getReq.data ? getReq.data.map(item => ({ ...item, value: item.value / 10 })) : [],
                  padding: 'auto',
                  xField: 'from',
                  yField: 'value' as any,
                  meta: {
                    value: {
                      alias: intl.formatMessage({
                        id: 'component.meter.report.chart.label.value',
                      }),
                    },
                  },
                },
              },
            ] : [{
              type: 'area',
              options: {
                yAxis: {
                  max: maxValue / 10,

                  label: {
                    formatter: (item: string) => `${item} m`,
                  },
                },
                // height: 320 as any,
                data: getReq.data ? getReq.data.map(item => ({ ...item, value: item.value / 10 })) : [],
                padding: 'auto',
                xField: 'from',
                yField: 'value' as any,
                meta: {
                  value: {
                    alias: intl.formatMessage({
                      id: 'component.meter.report.chart.label.value',
                    }),
                  },
                },
              },
            },]}
          />
        </Spin>
      }
    ></StatisticCard>
  );
};

const mapStateToProps = ({ meterSystemById, selectedDevice }: any) => ({
  selectedDevice,
  meterSystemById,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MeterWaterLevelChart);
