import MeterReport from '@/components/DeviceReport/Meter';
import PivotReport from '@/components/DeviceReport/Pivot';
import PumpReport from '@/components/DeviceReport/Pump';
import PivotList from '@/components/PivotList';
import RenderPivots from '@/components/RenderPivots';
import { useScreenHook } from '@/hooks/screen';
import { GetFarmModelProps, queryFarm } from '@/models/farm';
import { GetIrpdModelProps, queryIrpd } from '@/models/irpd';
import { GetMeterSystemModelProps, queryMeterSystem } from '@/models/meter-sysem';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotInformationModelProps, queryPivotInformation } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import {
  SelectedDeviceModelProps,
  setDeviceClose,
  setSelectedDevice,
} from '@/models/selected-device';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { DeviceType } from '@/utils/enum/device-type';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useParams } from '@umijs/max';
import { useMount, useUnmount } from 'ahooks';
import { Col, Row, Spin, Tabs } from 'antd';
import { connect } from 'dva';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';

type Props = {
  dispatch?: any;
  children: ReactNode;
  google?: any;
  pivot: GetPivotModelProps;
  farm: GetFarmModelProps;
  selectedDevice: SelectedDeviceModelProps;
  selectedFarm: SelectedFarmModelProps;
  repeater: GetRepeaterModelProps;
  meterSystem: GetMeterSystemModelProps;
  pivotInformation: GetPivotInformationModelProps;
  irpd: GetIrpdModelProps;
  setSelectedDevice: typeof setSelectedDevice;
  setDeviceClose: typeof setDeviceClose;
  queryFarm: typeof queryFarm;
  queryPivotInformation: typeof queryPivotInformation;
  queryMeterSystem: typeof queryMeterSystem;
  queryIrpd: typeof queryIrpd;
};

const Welcome: FunctionComponent<Props> = (props) => {
  const [activeKey, setActiveKey] = useState('1');
  const { md } = useScreenHook();
  const params = useParams();

  //const [isConnected, setIsConnected] = useState(false);

  /**
  useMount(() => {
    socket.connect();

    function onConnect() {}

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('msg', (data: any) => {
      props.dispatch({
        type: 'pivotInformation/setNewPivotInformation',
        payload: data,
      });
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('msg');
    };
  });
 */

  const getDeviceBySelected = (selected: string) => {
    switch (selected) {
      case DeviceType.Pivot: {
        return <PivotReport />;
      }
      case DeviceType.Meter: {
        return <MeterReport />;
      }
      case DeviceType.Pump: {
        return <PumpReport />;
      }
    }
  };

  //useEffect(() => {
  //  if ( params.id === ':id' && props.selectedFarm.id !== 0) {
  //    history.push(`${props.selectedFarm.id}`);
  //    return;
  //  }
  //}, [params, props.selectedFarm]);

  useMount(() => {
    if (!props.farm.loaded) {
      const id = parseInt(params.id as string);
      props.queryFarm({ id });
    }
  });

  useEffect(() => {
    if (props.selectedFarm.id !== 0) {
      history.push(`${props.selectedFarm.id}`);
      return;
    }
  }, [props.selectedFarm]);

  useUnmount(() => {
    props.setDeviceClose();
  });

  useEffect(() => {
    if (params.id !== ':id') {
      props.queryPivotInformation({
        id: parseInt(params.id as string),
        params: {},
      });

      props.queryMeterSystem({
        id: parseInt(params.id as string),
      });

      props.queryIrpd({
        id: parseInt(params.id as string),
      });
    }
  }, [params]);

  useEffect(() => {
    if (props.selectedDevice.open && !md) {
      setActiveKey('3');
    }
  }, [props.selectedDevice]);

  const className = useEmotionCss(({}) => {
    return md
      ? {
          position: 'absolute',
          width: 400,
          top: 10,
          left: 45,
          padding: 0,
          [`.ant-pro-card-body`]: {
            paddingInline: '0px !important',
          },
        }
      : {
          width: '100%',
          minHeight: '150px',
          padding: 0,
          [`.ant-pro-card-body`]: {
            paddingInline: '0px !important',
          },
        };
  });

  const classNameFixedMobile = useEmotionCss(({}) => {
    return {
      height: 65,
      width: '100%',
      background: 'white',
      zIndex: 3,
      ['.ant-tabs-nav-wrap']: {
        display: 'flex',
        justifyContent: 'center',
      },
      ['.ant-tabs-nav']: {
        background: 'white',
        zIndex: '5',
        marginTop: '0px',
      },
    };
  });

  const items = [
    {
      key: '1',
      label: `Tab 1`,
      children: (
        <Spin spinning={false}>
          <div style={{ width: '100%', height: 'calc(100vh - 102px)', }}>
            <RenderPivots />
          </div>
        </Spin>
      ),
    },
    {
      key: '2',
      label: `Tab 2`,
      children: (
        <ProCard className={className}>
          <PivotList />
        </ProCard>
      ),
    },
    {
      key: '3',
      label: `Tab 3`,
      disabled: !props.selectedDevice.open,
      children: getDeviceBySelected(props.selectedDevice.type),
    },
  ];

  const classNamts = useEmotionCss(() => ({
    '.ant-pro-page-container-children-container': {
      paddingInline: 0,
      paddingBlock: 0,
      paddingBlockStart: '0px !important',
    },
    '.ant-pro-page-container-warp-page-header': { 
      display: 'none'
    },
  
    '.ant-page-header-heading': {
      paddingBlockStart: '0px !important',
    },
  }));

  return (
    <div className={classNamts}>
      <PageContainer
       token={{
        paddingBlockPageContainerContent:  0,
        paddingInlinePageContainerContent: 0,
      }}
        header={{ children: <div style={{ display: 'none' }}>asd</div> }}
        ghost
        breadcrumb={{}}
        title={' '}
      >
        <Row>
          <Col
            xs={24}
            style={{
              height: md ? '100vh' : 'calc(100vh - 56px - 60px)',
              marginTop: md? -23: 0,
              position: 'relative',
            }}
          >
            <>
              {md ? (
                <Spin
                  spinning={
                    props.pivot.loading ||
                    props.farm.loading ||
                    props.irpd.loading ||
                    props.meterSystem.loading ||
                    props.pivotInformation.loading
                  }
                >
                  <div style={{ width: '100%', height: '100vh' }}>
                    <RenderPivots />
                  </div>
                  <ProCard className={className}>
                    <PivotList />
                  </ProCard>
                </Spin>
              ) : null}

              {!md ? (
                <div className={classNameFixedMobile}>
                  <Tabs
                    defaultActiveKey="1"
                    activeKey={activeKey}
                    onChange={(key) => setActiveKey(key)}
                    items={items}
                    tabPosition="bottom"
                  />
                </div>
              ) : null}
            </>
          </Col>
          {props.selectedDevice.open ? (
            md ? (
              <Col
                xs={24}
                style={{
                  padding: '15px 15px',
                  minHeight: 'calc(100vh - 116px)',
                }}
              >
                {getDeviceBySelected(props.selectedDevice.type)}
              </Col>
            ) : null
          ) : null}
        </Row>
      </PageContainer>
    </div>
  );
};

const mapStateToProps = ({
  pivot,
  pivotInformation,
  farm,
  selectedDevice,
  selectedFarm,
  repeater,
  meterSystem,
  irpd,
}: any) => ({
  pivot,
  pivotInformation,
  farm,
  selectedDevice,
  selectedFarm,
  repeater,
  meterSystem,
  irpd,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
  setDeviceClose: () => dispatch(setDeviceClose()),
  queryFarm: (props: any) => dispatch(queryFarm(props)),
  queryPivotInformation: (props: any) => dispatch(queryPivotInformation(props)),
  queryMeterSystem: (props: any) => dispatch(queryMeterSystem(props)),
  queryIrpd: (props: any) => dispatch(queryIrpd(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
