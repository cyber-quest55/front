import { useScreenHook } from '@/hooks/screen';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { DeviceType } from '@/utils/enums';
import { CaretDownOutlined, CloseCircleFilled, EditFilled } from '@ant-design/icons';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useParams } from '@umijs/max';
import { Button, Select, Space, Tag } from 'antd';
import { useState } from 'react';
import { connect } from 'umi';
import MeterWaterLevel from '../Charts/MeterWaterLevel';
import DeviceMapsRender from '../DeviceMapsRender';
import DevicePanel from '../DevicePanel';
import MeterActivityEventTable from '../Tables/MeterActivityEventTable';

type Props = {
  meterSystem: GetMeterSystemModelProps;
  selectedDevice: SelectedDeviceModelProps;
  dispatch: any;
};

const MeterReport: React.FC<Props> = (props) => {
  const params = useParams();
  const { md } = useScreenHook();

  const [tab, setTab] = useState('tab1');

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
    const deviceId = props.meterSystem.result.find((item) => item.id === parseInt(e))?.id;

    props.dispatch({
      type: 'selectedDevice/setSelectedDevice',
      payload: { type: DeviceType.Meter, deviceId, farmId: params.id },
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
              status={<Tag color={'#115186'}>{'25.0% (0.25m)'}</Tag>}
              deviceSelector={
                <Select
                  className={classNameSelect}
                  suffixIcon={<CaretDownOutlined />}
                  bordered={false}
                  showSearch
                  value={props.meterSystem?.result[0].name.toString() as string}
                  size="large"
                  style={{ width: '100%' }}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={onChangeDevice}
                  options={props.meterSystem.result?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
              }
              extra={
                <Space direction="vertical" size="middle">
                  <Space size="small">
                    <Space style={{ color: 'red' }}>Valor máximo: 100%</Space>
                  </Space>
                  <Space size="small">
                    <Space style={{ color: 'orange' }}>Valor mínimo: 47%</Space>
                  </Space>
                </Space>
              }
              lastCommunication="19 May 10:15"
              deviceActions={
                <Space direction="vertical" size="middle" style={{ width: '100%' }}></Space>
              }
            />
          </ProCard>
          <StatisticCard ghost colSpan={{ xs: 24 }}>
            <MeterWaterLevel />
          </StatisticCard>
        </ProCard>

        <ProCard
          colSpan={{ xs: 24, lg: 10 }}
          wrap
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
                  label: `Medições`,
                  key: 'tab1',
                  children: <MeterActivityEventTable />,
                },
                {
                  label: `Relatório`,
                  key: 'tab2',
                  disabled: true,

                  children: <MeterActivityEventTable />,
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
  ({ selectedDevice, meterSystem }: { selectedDevice: any; meterSystem: any }) => ({
    selectedDevice,
    meterSystem,
  }),
)(MeterReport);
