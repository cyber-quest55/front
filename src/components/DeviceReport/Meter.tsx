import { GetDeviceHistoryModelProps } from '@/models/device-history';
import { GetPivotReportModelProps } from '@/models/pivot-report';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { PivotStatusColor } from '@/utils/pivot-status';
import {
    CalendarOutlined,
    CaretDownOutlined,
    ClockCircleOutlined,
    CloseCircleFilled,
    CloudFilled,
    DownloadOutlined,
    EditFilled,
    HistoryOutlined,
    RedoOutlined,
    ThunderboltFilled,
} from '@ant-design/icons';
import { ProCard, ProTable, StatisticCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useWindowWidth } from '@react-hook/window-size';
import { useParams } from '@umijs/max';
import { Button, Col, Modal, Row, Select, Space, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { BsFillCloudRainFill } from 'react-icons/bs';
import { GiPadlockOpen, GiSolidLeaf } from 'react-icons/gi';
import { GrObjectGroup } from 'react-icons/gr';
import { TbBrandFlightradar24 } from 'react-icons/tb';
import { connect } from 'umi';
import DeviceMapsRender from '../DeviceMapsRender';
import DevicePanel from '../DevicePanel';

const { Statistic } = StatisticCard;

type Props = {
  pivot: GetPivotModelProps;
  pivotReport: GetPivotReportModelProps;
  pivotHistory: GetDeviceHistoryModelProps;
  pivotInformation: GetPivotInformationModelProps;
  dispatch: any;
};

const failureTitle: any = {
  1: 'Falta de pressão',
  2: 'Queda de energia',
  3: 'Desalinhado',
  4: 'Oscilação de energia',
};

const MeterReport: React.FC<Props> = (props) => {
  const params = useParams();
  const onlyWidth = useWindowWidth();

  const [tab, setTab] = useState('tab1');
  const [option, setOption] = useState<undefined | number>(undefined);

  useEffect(() => {
    props.dispatch({
      type: 'pivotReport/queryPivotReport',
      payload: {
        id: parseInt(params.id as string),
        params: {},
      },
    });

    props.dispatch({
      type: 'pivotHistory/queryDeviceHistory',
      payload: {
        id: parseInt(params.id as string),
        params: {},
      },
    });
  }, [params]);

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

  const classNameSelect = useEmotionCss(() => {
    return {
      '.ant-select-selection-item': {
        fontWeight: 700,
        fontSize: 24,
      },
      '.ant-select-selector': {
        padding: '0 !important',
      },
      '.ant-select-arrow': {
        color: 'black',
        fontSize: 20,
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

  const onChangeDevice = (e: string) => {
    props.dispatch({
      type: 'pivot/setSelectedPivot',
      payload: props.pivot.result.list.find((item) => item.id === parseInt(e)),
    });
  };

  const destroyOnClick = () =>  {
    props.dispatch({
      type: 'selectedDevice/setDeviceClose',
      payload: {},
    });
  }

  const item =
    props.pivotInformation.result.length > 0 ? props.pivotInformation.result[0] : undefined;

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
        <ProCard
          colSpan={{ xs: 24, md: 16, xxl: 9 }}
          style={{ height: onlyWidth > 767 ? 275 : '100%' }}
        >
          <DevicePanel
            actions={
              <Space>
                <Button icon={<GiPadlockOpen />} href="https://www.google.com" />
                <Button icon={<GiSolidLeaf />} href="https://www.google.com" />
                <Button icon={<CloudFilled />} href="https://www.google.com" />
                <Button icon={<EditFilled />} href="https://www.google.com">
                  Edit
                </Button>
                <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>Close</Button>
              </Space>
            }
            status={<Tag color={PivotStatusColor.off}>{item?.statusText}</Tag>}
            deviceSelector={
              <Select
                className={classNameSelect}
                suffixIcon={<CaretDownOutlined />}
                bordered={false}
                showSearch
                value={props.pivot.selectedPivot?.name?.toString()}
                size="large"
                style={{ width: '100%' }}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                onChange={onChangeDevice}
                options={props.pivot.result.list?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            }
            extra={
              <Space direction="vertical" size="middle">
                <Space size="middle">
                  <Space>
                    <Tooltip title="Voltagem">
                      <ThunderboltFilled />
                    </Tooltip>

                    <div>220 V</div>
                  </Space>
                  <Space>
                    <Tooltip title="Barras">
                      <HistoryOutlined />
                    </Tooltip>
                    <div>1.2 bar</div>
                  </Space>
                </Space>
                <Space size="middle">
                  <Space>
                    <Tooltip title="Chuva hoje">
                      <BsFillCloudRainFill />
                    </Tooltip>
                    <div>10 mm </div>
                  </Space>
                  <Space>
                    <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                    <div>1.2 bar</div>
                  </Space>
                </Space>
                <Space size="middle">
                  <Space>
                    <Tooltip title="Grupo">
                      <GrObjectGroup />
                    </Tooltip>
                    <div>10 mm </div>
                  </Space>
                  <Space>
                    <ClockCircleOutlined />
                    <div>262h 33min</div>
                  </Space>
                </Space>
              </Space>
            }
            lastCommunication="19 May 10:15"
            deviceActions={
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button type="primary" style={{ width: onlyWidth > 767 ? '200px' : '100%' }}>
                  Start Pivot
                </Button>
                <Button type="default" danger style={{ width: onlyWidth > 767 ? '200px' : '100%' }}>
                  Stop Pivot
                </Button>
              </Space>
            }
          />
        </ProCard>
        <ProCard
          split={onlyWidth > 767 ? 'vertical' : 'horizontal'}
          colSpan={{ xs: 24, md: 24, xxl: 10 }}
          wrap
        >
          <ProCard
            split={onlyWidth > 1600 ? 'horizontal' : onlyWidth > 767 ? 'vertical' : 'horizontal'}
            colSpan={{ xs: 24, md: 12, xxl: 12 }}
          >
            <StatisticCard
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(1)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: 'Falta de pressão',
                value: props.pivotReport.result?.unexpected_stops?.lack_of_pressure,
                description: (
                  <Statistic className={className} title="Último mês" value="8.04%" trend="down" />
                ),
              }}
            />
            <StatisticCard
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(2)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: 'Queda de energia',
                value: props.pivotReport.result?.unexpected_stops?.energy_blackot,
                description: (
                  <Statistic className={className} title="Último mês" value="8.04%" trend="down" />
                ),
              }}
            />
          </ProCard>
          <ProCard
            split={onlyWidth > 1600 ? 'horizontal' : onlyWidth > 767 ? 'vertical' : 'horizontal'}
            colSpan={{ xs: 24, md: 12, xxl: 12 }}
          >
            <StatisticCard
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(3)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: 'Desalinhado',
                value: props.pivotReport.result?.unexpected_stops?.misalignment,
                description: (
                  <Statistic className={className} title="Último mês" value="8.04%" trend="down" />
                ),
              }}
            />
            <StatisticCard
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(4)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: 'Oscilação de energia',
                value: props.pivotReport.result?.unexpected_stops?.power_surge,
                description: (
                  <Statistic className={className} title="Último mês" value="8.04%" trend="down" />
                ),
              }}
            />
          </ProCard>
        </ProCard>
        <ProCard colSpan={{ xs: 24, lg: 12 }} wrap ghost className={classNameTableProCard}>
          <ProCard
            style={{ minHeight: 1077 }}
            title={
              <Row justify="space-between" style={{ width: '100%' }}>
                <Col>Histórico</Col>
                <Col style={{ display: 'flex', gap: 12 }}>
                  <Button icon={<DownloadOutlined />}>Exportar</Button>
                  <Button icon={<CalendarOutlined />}></Button>
                  <Button icon={<RedoOutlined />}></Button>
                </Col>
              </Row>
            }
            tabs={{
              tabPosition: 'top',
              activeKey: tab,
              items: [
                {
                  label: `Eventos`,
                  key: 'tab1',
                  children: (
                    <ProTable<any>
                      rowSelection={{
                        defaultSelectedRowKeys: [1],
                      }}
                      columns={[
                        {
                          title: 'Ocorrência',
                          dataIndex: 'date',

                          render: (value, item) => {
                            return <>{new Date(item.created).toLocaleDateString()}</>;
                          },
                        },
                        {
                          title: 'Tipo',
                          dataIndex: 'date',
                          responsive: ['lg'],
                          render: () => {
                            return <>Atualização</>;
                          },
                        },
                        {
                          title: 'Status',
                          dataIndex: 'date',
                          render: () => {
                            return <>Programado | Avanço | Molhado | 62%</>;
                          },
                        },
                      ]}
                      dataSource={props.pivotHistory.result}
                      rowKey="key"
                      pagination={{
                        showQuickJumper: true,
                        pageSize: 14,
                      }}
                      search={false}
                      dateFormatter="string"
                      toolbar={{
                        title: 'Lista de eventos',
                        tooltip: '这是一个标题提示',
                      }}
                    />
                  ),
                },
                {
                  label: `Lâminas`,
                  key: 'tab2',
                  children: `内容二`,
                },
              ],
              onChange: (key) => {
                setTab(key);
              },
            }}
            colSpan={{ xs: 24, md: 24 }}
          ></ProCard>
        </ProCard>
      </ProCard>
    </>
  );
};

export default connect(
  ({
    pivot,
    pivotReport,
    pivotHistory,
    pivotInformation,
  }: {
    pivot: any;
    pivotReport: any;
    pivotHistory: any;
    pivotInformation: any;
  }) => ({
    pivot,
    pivotReport,
    pivotHistory,
    pivotInformation,
  }),
)(MeterReport);
