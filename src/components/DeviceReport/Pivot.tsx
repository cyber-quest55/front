import { useScreenHook } from '@/hooks/screen';
import { useTabsHook } from '@/hooks/tabs';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotHistoryModelProps } from '@/models/pivot-history';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetPivotReportModelProps } from '@/models/pivot-report';
import {
  SelectedDeviceModelProps,
  setDeviceClose,
  setSelectedDevice,
} from '@/models/selected-device';
import { DeviceType } from '@/utils/enum/device-type';
import { G2, Line, Pie } from '@ant-design/plots';
import {
  ProCard,
 
  StatisticCard,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max';
import { Col, Modal, Row } from 'antd';
import { useState } from 'react';
import { connect } from 'umi';
import DeviceMapsRender from '../DeviceMapsRender';
import DevicePanelContainer from '../DevicePanel/DevicePanelContainer';
import SkeletonPieChart from '../Skeletons/PieChart';
import SkeletonStatistic from '../Skeletons/Statistic';
import PivotEventTable from '../Tables/PivotEventTable';
import PivotOperationTable from '../Tables/PivotOperationTable';
import PressureComparativeContainer from '../Charts/PressureComparative/PressureComparativeContainer';
import TableSkeleton from '../Skeletons/Table';
import StatisticSkeleton from '../Skeletons/Statistic';
import CardSkeleton from '../Skeletons/Card';

const { Statistic } = StatisticCard;

const failureTitle: any = {
  1: 'Falta de pressão',
  2: 'Queda de energia',
  3: 'Desalinhado',
  4: 'Oscilação de energia',
};

type Props = {
  pivot: GetPivotModelProps;
  pivotReport: GetPivotReportModelProps;
  pivotHistory: GetPivotHistoryModelProps;
  pivotInformation: GetPivotInformationModelProps;
  selectedDevice: SelectedDeviceModelProps;
  setSelectedDevice: typeof setSelectedDevice;
  setDeviceClose: typeof setDeviceClose;
};

const PivotReport: React.FC<Props> = (props) => {
  const intl = useIntl();
  const G = G2.getEngine('canvas');
  const { md, xxl } = useScreenHook();
  const { tab, setTab } = useTabsHook('tab1');

  const [option, setOption] = useState<undefined | number>(undefined);

  const energyConsumption = props.pivotReport.result.energy_consumption;
 
  const data = [
    {
      type: intl.formatMessage({
        id: 'component.pivot.voltage.chart.legend.1',
      }),
      value: parseInt(props.pivotReport.result?.energy_consumption?.ponta?.hours.toString()),
    },
    {
      type: intl.formatMessage({
        id: 'component.pivot.voltage.chart.legend.2',
      }),
      value: parseInt(
        props.pivotReport.result?.energy_consumption?.fora_de_ponta?.hours?.toString(),
      ),
    },
    {
      type: intl.formatMessage({
        id: 'component.pivot.voltage.chart.legend.3',
      }),
      value: parseInt(props.pivotReport.result?.energy_consumption?.reduzido?.hours.toString()),
      color: 'red',
    },
  ];

  const generalClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-pro-card-title ': {
        width: '100%',
      },
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 110px)',
      },
    };
  });

  const className = useEmotionCss(() => {
    return {
      '.ant-pro-card-title ': {
        width: '100%',
      },
    };
  });

  const classNameTableProCard = useEmotionCss(() => {
    return {
      '.ant-pro-card-body': {
        paddingInline: '4px',
      },
    };
  });

  const classNamePieChart = useEmotionCss(({ token }) => {
    return {
      '.g2-html-annotation': {
        color: `${token.colorText} !important`,
      },
    };
  });
  
  return (
    <>
      <Modal
        width={1020}
        title={option !== undefined ? failureTitle[option] : failureTitle[1]}
        onCancel={() => setOption(undefined)}
        open={option ? true : false}
        destroyOnClose
      >
        <Row>
          <Col xs={24} md={12} style={{ height: 360 }}>
            <DeviceMapsRender height={400} />
          </Col>
          <Col xs={24} md={12}></Col>
        </Row>
      </Modal>
      <ProCard
        className={generalClassName}
        ghost
        style={{ marginBlockStart: 8 }}
        gutter={[16, 16]}
        wrap
      >
        <ProCard ghost colSpan={{ xs: 24, md: 8, xxl: 5 }} style={{ height: 275 }}>
          <DeviceMapsRender height={275} />
        </ProCard>
        <ProCard colSpan={{ xs: 24, md: 16, xxl: 9 }} style={{ height: md ? 275 : '100%' }}>
          <DevicePanelContainer type={DeviceType.Pivot} />
        </ProCard>
        <ProCard split={md ? 'vertical' : 'horizontal'} colSpan={{ xs: 24, md: 24, xxl: 10 }} wrap>
          <ProCard
            split={xxl ? 'horizontal' : md ? 'vertical' : 'horizontal'}
            colSpan={{ xs: 24, md: 12, xxl: 12 }}
          >
            <StatisticCard
              loading={props.pivotReport.loading   && <StatisticSkeleton lastRow/>}
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(1)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: intl.formatMessage({
                  id: 'component.pivot.unexpectedstops.1',
                }),
                value: props.pivotReport.result?.unexpected_stops?.lack_of_pressure,
                description: (
                  <Statistic
                    className={className}
                    title={intl.formatMessage({
                      id: 'component.pivot.unexpectedstops.5',
                    })}
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
            <StatisticCard
              loading={props.pivotReport.loading  && <StatisticSkeleton lastRow />}
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(2)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: intl.formatMessage({
                  id: 'component.pivot.unexpectedstops.2',
                }),
                value: props.pivotReport.result?.unexpected_stops?.energy_blackot,
                description: (
                  <Statistic
                    className={className}
                    title={intl.formatMessage({
                      id: 'component.pivot.unexpectedstops.5',
                    })}
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
          </ProCard>
          <ProCard
            split={xxl ? 'horizontal' : md ? 'vertical' : 'horizontal'}
            colSpan={{ xs: 24, md: 12, xxl: 12 }}
          >
            <StatisticCard
              loading={props.pivotReport.loading  && <StatisticSkeleton lastRow />}
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(3)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: intl.formatMessage({
                  id: 'component.pivot.unexpectedstops.3',
                }),
                value: props.pivotReport.result?.unexpected_stops?.misalignment,
                description: (
                  <Statistic
                    className={className}
                    title={intl.formatMessage({
                      id: 'component.pivot.unexpectedstops.5',
                    })}
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
            <StatisticCard
              loading={props.pivotReport.loading  && <StatisticSkeleton lastRow/>}
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(4)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: intl.formatMessage({
                  id: 'component.pivot.unexpectedstops.4',
                }),
                value: props.pivotReport.result?.unexpected_stops?.power_surge,
                description: (
                  <Statistic
                    className={className}
                    title={intl.formatMessage({
                      id: 'component.pivot.unexpectedstops.5',
                    })}
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
          </ProCard>
        </ProCard>
        <ProCard
          title={intl.formatMessage({
            id: 'component.pivot.voltage.title',
          })}
          split={md ? 'horizontal' : 'horizontal'}
          headerBordered
          style={{ minHeight: 450 }}
          colSpan={{ xs: 24, lg: 12 }}
        >
          <ProCard split="horizontal" colSpan={{ xs: 24, lg: 24 }}>
            <ProCard split={md ? 'vertical' : 'horizontal'}>
              <ProCard split={'horizontal'} wrap>
                <StatisticCard
                  loading={props.pivotReport.loading  && <StatisticSkeleton />}
                  onClick={() => {}}
                  statistic={{
                    title: intl.formatMessage({
                      id: 'component.pivot.voltage.label.1',
                    }),
                    value: props.pivotReport.result?.flow?.total_m3h.toFixed(2),
                    suffix: 'm³',
                  }}
                />

                <StatisticCard
                  loading={props.pivotReport.loading  && <StatisticSkeleton />}
                  statistic={{
                    title: intl.formatMessage({
                      id: 'component.pivot.voltage.label.3',
                    }),
                    value: props.pivotReport.result?.hours_count?.wet_total_hours.toFixed(3),
                    suffix: 'h',
                  }}
                />
              </ProCard>
              <ProCard split={'horizontal'} wrap>
                <StatisticCard
                  loading={props.pivotReport.loading  && <StatisticSkeleton />}
                  statistic={{
                    title: intl.formatMessage({
                      id: 'component.pivot.voltage.label.2',
                    }),
                    value: '99.000,31',
                    suffix: 'm³',
                  }}
                />
                <StatisticCard
                  loading={props.pivotReport.loading  && <StatisticSkeleton />}
                  statistic={{
                    title: intl.formatMessage({
                      id: 'component.pivot.voltage.label.4',
                    }),
                    value: '150,03',
                    suffix: 'h',
                  }}
                />
              </ProCard>
            </ProCard>

            <StatisticCard
              loading={props.pivotReport.loading && <SkeletonPieChart />}
              style={{ width: '100%' }}
              title={intl.formatMessage({
                id: 'component.pivot.voltage.label.5',
              })}
              chart={
                <Pie
                  appendPadding={10}
                  data={data}
                  angleField="value"
                  colorField="type"
                  radius={0.8}
                  legend={false}
                  autoFit
                  color={({ type }) => {
                    if (
                      type ===
                      intl.formatMessage({
                        id: 'component.pivot.voltage.chart.legend.1',
                      })
                    ) {
                      return '#ff4d4f';
                    } else if (
                      type ===
                      intl.formatMessage({
                        id: 'component.pivot.voltage.chart.legend.2',
                      })
                    ) {
                      return '#4169E1';
                    }
                    return '#40E0D0';
                  }}
                  label={{
                    type: 'spider',
                    labelHeight: 40,
                    formatter: (data, mappingData) => {
                      const group = new G.Group({});
                      group.addShape({
                        type: 'circle',
                        attrs: {
                          x: 0,
                          y: 0,
                          width: 40,
                          height: 50,
                          r: 5,
                          fill: mappingData.color,
                        },
                      });
                      group.addShape({
                        type: 'text',
                        attrs: {
                          x: 10,
                          y: 8,
                          text: `${data.type}`,
                          fill: mappingData.color,
                        },
                      });

                      return group;
                    },
                  }}
                  interactions={[
                    {
                      type: 'element-selected',
                    },
                    {
                      type: 'element-active',
                    },
                  ]}
                />
              }
            />
          </ProCard>

          <ProCard
            split="horizontal"
            colSpan={{ xs: 24, lg: 24 }}
            style={{ height: md ? 350 : '100%' }}
          >
            <StatisticCard
              loading={props.pivotReport.loading && <SkeletonPieChart />}
              colSpan={{ xs: 24, lg: 24 }}
              style={{ width: '100%' }}
              title={intl.formatMessage({
                id: 'component.pivot.voltage.label.6',
              })}
              chart={
                <Pie
                  className={classNamePieChart}
                  height={275}
                  appendPadding={10}
                  data={data}
                  angleField="value"
                  colorField="type"
                  radius={1}
                  legend={{
                    position: 'right',
                    layout: 'vertical',
                  }}
                  autoFit
                  innerRadius={0.6}
                  statistic={{
                    title: false,
                    content: {
                      style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '16px',
                      },
                      content: intl.formatMessage(
                        {
                          id: 'component.pivot.voltage.label.11',
                        },
                        {
                          value: `R$ ${(
                            energyConsumption?.fora_de_ponta.total +
                            energyConsumption?.ponta.total +
                            energyConsumption?.reduzido.total
                          ).toFixed(2)}`,
                        },
                      ),
                    },
                  }}
                  color={({ type }) => {
                    if (
                      type ===
                      intl.formatMessage({
                        id: 'component.pivot.voltage.chart.legend.1',
                      })
                    ) {
                      return '#ff4d4f';
                    } else if (
                      type ===
                      intl.formatMessage({
                        id: 'component.pivot.voltage.chart.legend.2',
                      })
                    ) {
                      return '#4169E1';
                    }
                    return '#40E0D0';
                  }}
                  label={{
                    type: 'inner',
                    offset: '-50%',
                    content: '{value}',
                    style: {
                      textAlign: 'center',
                      fontSize: 13,
                    },
                  }}
                  interactions={[
                    {
                      type: 'element-selected',
                    },
                    {
                      type: 'element-active',
                    },
                  ]}
                />
              }
            />
            <ProCard
              colSpan={{ xs: 24, lg: 24 }}
              wrap
              split={md ? 'vertical' : 'horizontal'}
              style={{ height: md ? 350 : '100%' }}
            >
              <StatisticCard
                loading={props.pivotReport.loading && <CardSkeleton rows={9} />}
                title={intl.formatMessage({
                  id: 'component.pivot.voltage.label.5',
                })}
                colSpan={{ xs: 24, lg: 16 }}
                style={{ width: '100%' }}
                chart={
                  <Line
                    legend={{
                      position: 'top',
                    }}
                    tooltip={{
                      formatter: (datum) => {
                        return {
                          name: intl.formatMessage({
                            id: 'component.pivot.voltage.label.12',
                          }),
                          value: `${parseFloat(datum.scales).toFixed(2)}(V)`,
                        };
                      },
                    }}
                    height={260}
                    data={
                      props.pivotReport.result?.voltage_array
                        ? props.pivotReport.result?.voltage_array?.map((item) => {
                            return {
                              Date: new Date(item.date).toISOString().split('T')[0],
                              scales: item.voltage,
                            };
                          })
                        : []
                    }
                    padding="auto"
                    xField="Date"
                    yField="scales"
                    yAxis={{
                      label: {
                        formatter: (v) => `${parseInt(v)}V`,
                      },
                    }}
                    xAxis={{
                      tickCount: 5,
                    }}
                    slider={false}
                  />
                }
              ></StatisticCard>
              <ProCard split="vertical" colSpan={{ xs: 24, lg: 8 }}>
                <ProCard split="horizontal">
                  <ProCard split="horizontal">
                    <StatisticCard
                      loading={props.pivotReport.loading && <SkeletonStatistic />}
                      statistic={{
                        title: intl.formatMessage({
                          id: 'component.pivot.voltage.label.8',
                        }),
                        value: props.pivotReport.result?.voltage_min
                          ? props.pivotReport.result?.voltage_min[0]
                          : 0,
                        suffix: 'V',
                      }}
                    />
                  </ProCard>
                  <ProCard split="horizontal">
                    <StatisticCard
                      loading={props.pivotReport.loading && <SkeletonStatistic />}
                      statistic={{
                        title: intl.formatMessage({
                          id: 'component.pivot.voltage.label.9',
                        }),
                        value: props.pivotReport.result?.voltage_med
                          ? props.pivotReport.result?.voltage_med[0]
                          : 0,
                        suffix: 'V',
                      }}
                    />
                  </ProCard>
                  <ProCard split="horizontal">
                    <StatisticCard
                      loading={props.pivotReport.loading && <SkeletonStatistic />}
                      statistic={{
                        title: intl.formatMessage({
                          id: 'component.pivot.voltage.label.10',
                        }),
                        value: props.pivotReport.result?.voltage_max
                          ? props.pivotReport.result?.voltage_max[0]
                          : 0,
                        suffix: 'V',
                      }}
                    />
                  </ProCard>
                </ProCard>
              </ProCard>
            </ProCard>
          </ProCard>
        </ProCard>
        <ProCard     
         
          colSpan={{ xs: 24, lg: 12 }}
          wrap 
          ghost 
           className={classNameTableProCard}
        >
          <ProCard
          loading={props.pivotReport.loading && <TableSkeleton rows={12}/>}
            style={{ minHeight: 1032 }}
            title={intl.formatMessage({
              id: 'component.pivot.tab.history.title',
            })}
            tabs={
              props.pivotHistory.loading
                ? undefined
                : {
                    tabPosition: 'top',
                    activeKey: tab,
                    items: [
                      {
                        label: intl.formatMessage({
                          id: 'component.pivot.tab.history.event',
                        }),
                        key: 'tab1',

                        children: <PivotEventTable />,
                      },
                      {
                        label: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations',
                        }),
                        key: 'tab2',
                        children: <PivotOperationTable />,
                      },
                    ],
                    onChange: (key) => {
                      setTab(key);
                    },
                  }
            }
            colSpan={{ xs: 24, md: 24 }}
          />
          <PressureComparativeContainer/>
        </ProCard>

        <StatisticCard
          loading={props.pivotReport.loading && <CardSkeleton rows={9}/>}
          title={intl.formatMessage({
            id: 'component.pivot.pressure.label.2',
          })}
          chart={
            <Line
              height={320}
              tooltip={{
                title: intl.formatMessage({
                  id: 'component.pivot.pressure.chart.tooltip.label.4',
                }),
                formatter: (datum) => {
                  return {
                    name: intl.formatMessage(
                      {
                        id: 'component.pivot.pressure.chart.tooltip.label.3',
                      },
                      { value: datum.Ângulo },
                    ),
                    value: `${parseFloat(datum.value).toFixed(2)} bar`,
                  };
                },
              }}
              data={
                props.pivotReport.result?.water_blade?.by_angle
                  ? props.pivotReport.result?.water_blade?.by_angle.map((item, index) => {
                      return {
                        Ângulo: index + 1,
                        value: item,
                      };
                    })
                  : []
              }
              padding="auto"
              xField="Ângulo"
              yField="value"
              xAxis={{
                tickCount: 5,
              }}
              slider={false}
            />
          }
          colSpan={{ xs: 24, lg: 24 }}
        />
      </ProCard>
    </>
  );
};

const mapStateToProps = ({
  pivot,
  pivotById,
  pivotReport,
  pivotHistory,
  pivotInformation,
  selectedDevice,
}: any) => ({
  pivot,
  pivotById,
  pivotReport,
  pivotHistory,
  pivotInformation,
  selectedDevice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
  setDeviceClose: () => dispatch(setDeviceClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PivotReport);
