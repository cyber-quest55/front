import PumpEnergyConsumptionChart from '@/components/Charts/PumpEnergyComsumption';
import IrpdActivityEventTable from '@/components/Tables/IrpdActivityEventTable';
import IrpdActivityHistoricTable from '@/components/Tables/IrpdActivityHistoricTable';
import { useScreenHook } from '@/hooks/screen';
import { useTabsHook } from '@/hooks/tabs';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetIrpdByIdModelProps } from '@/models/irpd-by-id';
import { GetIrpdWaterModelProps } from '@/models/irpd-water-consumption';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { DeviceType } from '@/utils/enums';
import { CaretDownOutlined, CloseCircleFilled, EditFilled } from '@ant-design/icons';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useParams } from '@umijs/max';
import { Button, Select, Space, Tag } from 'antd';
import { TbBrandFlightradar24 } from 'react-icons/tb';
import { connect } from 'umi';
import DeviceMapsRender from '../DeviceMapsRender';
import DevicePanel from '../DevicePanel';

type Props = {
  irpd: GetIrpdModelProps;
  irpdById: GetIrpdByIdModelProps;
  iprdWaterConsumption: GetIrpdWaterModelProps;
  selectedDevice: SelectedDeviceModelProps;
  dispatch: any;
};

const PumpReport: React.FC<Props> = (props) => {
  const params = useParams();
  const { md } = useScreenHook();

  const { tab, setTab } = useTabsHook('tab1');

  const generalClassName = useEmotionCss(({ token }) => {
    return {
      height: '100vh',
      '.ant-pro-card-title ': {
        width: '100%',
      },
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        overflowY: 'auto',
        height: 'calc(100vh - 110px)',
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
    const deviceId = props.irpd.result.find((item) => item.id === parseInt(e))?.id;
    props.dispatch({
      type: 'selectedDevice/setSelectedDevice',
      payload: { type: DeviceType.Pump, deviceId, farmId: params.id },
    });
    props.dispatch({
      type: 'pivot/setSelectedPivot',
      payload: props.irpd.result.find((item) => item.id === parseInt(e)),
    });
  };

  const destroyOnClick = () => {
    props.dispatch({
      type: 'selectedDevice/setDeviceClose',
      payload: {},
    });
  };

  return (
    <>
      <ProCard
        className={generalClassName}
        ghost
        style={{ marginBlockStart: 8 }}
        gutter={[8, 8]}
        wrap
      >
        <ProCard ghost colSpan={{ xs: 24, md: 14 }} wrap gutter={[16, 16]}>
          <ProCard ghost colSpan={{ xs: 24, md: 8, xxl: 9 }} style={{ height: 275 }}>
            <DeviceMapsRender height={275} />
          </ProCard>
          <ProCard colSpan={{ xs: 24, md: 16, xxl: 15 }} style={{ height: md ? 275 : '100%' }}>
            <DevicePanel
              actions={
                <Space>
                  <Button icon={<EditFilled />}>Edit</Button>
                  <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>
                    Close
                  </Button>
                </Space>
              }
              status={<Tag color={'#115186'}>{'LIGADA APÓS QUEDA DE ENERGIA'}</Tag>}
              deviceSelector={
                <Select
                  className={classNameSelect}
                  suffixIcon={<CaretDownOutlined />}
                  bordered={false}
                  showSearch
                  value={props.irpd?.result[0].name.toString() as string}
                  size="large"
                  style={{ width: '100%' }}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={onChangeDevice}
                  options={props.irpd.result?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
              }
              extra={
                <Space direction="vertical" size="middle">
                  <Space size="middle">
                    <Space>
                      <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                      <div>1.2 bar</div>
                    </Space>
                    <Space>
                      <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                      <div>250V</div>
                    </Space>
                  </Space>
                  <Space size="middle">
                    <Space>
                      <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                      <div>1.2 bar</div>
                    </Space>
                    <Space>
                      <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                      <div>250V</div>
                    </Space>
                  </Space>
                </Space>
              }
              lastCommunication="19 May 10:15"
              deviceActions={
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Button type="primary" style={{ width: md ? '200px' : '100%' }}>
                    Ligar Bomba
                  </Button>
                  <Button type="default" danger style={{ width: md ? '200px' : '100%' }}>
                    Parar Bomba
                  </Button>
                </Space>
              }
            />
          </ProCard>
          <StatisticCard
            title="Gráfico de Consumo"
            chart={<PumpEnergyConsumptionChart />}
            colSpan={{ xs: 24 }}
          />
        </ProCard>

        <ProCard
          colSpan={{ xs: 24, lg: 10 }}
          ghost
          className={classNameTableProCard}
          gutter={[0, 16]}
        >
          <ProCard
            title="Histórico"
            tabs={{
              tabPosition: 'top',
              activeKey: tab,
              items: [
                {
                  label: `Eventos`,
                  key: 'tab1',
                  children: <IrpdActivityHistoricTable />,
                },
                {
                  label: `Operações`,
                  key: 'tab2',
                  children: <IrpdActivityEventTable />,
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
    irpd,
    irpdById,
    selectedDevice,
    iprdWaterConsumption,
  }: {
    irpd: any;
    irpdById: any;
    selectedDevice: any;
    iprdWaterConsumption: any;
  }) => ({
    irpd,
    irpdById,
    selectedDevice,
    iprdWaterConsumption,
  }),
)(PumpReport);
