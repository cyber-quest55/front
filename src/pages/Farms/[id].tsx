import MeterReport from '@/components/DeviceReport/Meter';
import PivotReport from '@/components/DeviceReport/Pivot';
import PumpReport from '@/components/DeviceReport/Pump';
import PivotList from '@/components/DeviceBox';
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
  setSelectedDevice,
} from '@/models/selected-device';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { DeviceType } from '@/utils/enum/device-type';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useParams } from '@umijs/max';
import { useMount } from 'ahooks';
import { Col, Row, Spin } from 'antd';
import { connect } from 'dva';
import { FC, FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { queryRepeater } from '../../models/repeaters';
import { queryPivot } from '../../models/pivot';
import { AppOutline, MessageOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { TabBar } from 'antd-mobile'

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
  queryFarm: typeof queryFarm;
  queryPivotInformation: typeof queryPivotInformation;
  queryMeterSystem: typeof queryMeterSystem;
  queryIrpd: typeof queryIrpd;
  queryPivot: typeof queryPivot;
  queryRepeater: typeof queryRepeater;
  connectWebsocket: any;

};



const Welcome: FunctionComponent<Props> = (props) => {
  const [activeKey, setActiveKey] = useState('1');
  const { md, xs } = useScreenHook();
  const params = useParams();

  //const [isConnected, setIsConnected] = useState(false);

  const Bottom: FC = () => {
    const disabled = !props.selectedDevice.open;

    const setRouteActive = (value: string) => {
      /** Caso nosso dispositivo ainda não esteja selecionado */
      if (value === '3' && disabled) {
        return;
      }
      setActiveKey(value)
    }

    const tabs = [
      {
        key: '1',
        title: 'Mapa',
        icon: <AppOutline />,
      },
      {
        key: '2',
        title: 'Lista',
        icon: <UnorderedListOutline />,
      },
      {
        key: '3',
        title: 'Dispositivo',
        icon: <MessageOutline />,
        disabled,
      },
    ]

    return (
      <TabBar safeArea activeKey={activeKey} onChange={value => setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }} />
        ))}
      </TabBar>
    )
  }

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

  useEffect(() => {
    if (params.id === ':id' && props.selectedFarm.id !== 0) {
      history.push(`${props.selectedFarm.id}`);
      return;
    }
  }, [params, props.selectedFarm]);

  useMount(() => {
    if (!props.farm.loaded) {
      if (params.id !== ':id') {
        props.queryFarm({ id: Number(params.id) });
      } else {
        props.queryFarm({});
      }
    }
  });

  useEffect(() => {
    if (
      props.selectedFarm.id !== 0 && (
        params.id !== ':id' &&
        props.selectedFarm.id !== Number(params.id)
      )
    ) {
      history.push(`${props.selectedFarm.id}`);
      return;
    }
  }, [props.selectedFarm]);


  useEffect(() => {
    if (params.id !== ':id') {
      props.queryMeterSystem({ id: parseInt(params.id as string), });
      props.queryIrpd({ id: parseInt(params.id as string), });
      props.queryPivot({ id: parseInt(params.id as string) });
      props.queryRepeater({ id: parseInt(params.id as string) });
      props.queryPivotInformation({ id: parseInt(params.id as string), params: {}, });
    }
  }, [params]);

  useEffect(() => {
    if (props.selectedDevice.open && !md) {
      setActiveKey('3');
    }
  }, [props.selectedDevice]);

  useMount(async () => {
    props.connectWebsocket()
  })

  const className = useEmotionCss(({ }) => {
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
        padding: 0,
        [`.ant-pro-card-body`]: {
          paddingInline: '0px !important',
        },
      };
  });

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
    <section className={classNamts}  >
      <PageContainer

        header={{ children: <div style={{ display: 'none' }}>asd</div> }}
        ghost
        breadcrumb={{}}
        title={''}
      >
        {md ? <Row >
          <Col
            xs={24}
            style={{
              height: '100vh',
              marginTop: -23,
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

            </>
          </Col>
          {props.selectedDevice.open ? (
            md ? (
               
                <Col
                  xs={24}
                  id={"page-container"}
                  style={{
                    padding: '15px 15px',
                    minHeight: 'calc(100vh - 116px)',
                  }}
                >
                  {
                    getDeviceBySelected(props.selectedDevice.type)
                  }
                </Col>
             

            ) : null
          ) : null}
        </Row> : null}

        {xs ? <div className={'app'}>
          <div className={'body'}>
            {activeKey === '1' &&
              <Spin spinning={
                props.pivot.loading ||
                props.farm.loading ||
                props.irpd.loading ||
                props.meterSystem.loading ||
                props.pivotInformation.loading
              }>
                <div style={{ width: '100vw', }}>
                  <RenderPivots />
                </div>
              </Spin>}
            {activeKey === '2' && <ProCard className={className}>
              <PivotList />
            </ProCard>}
            {activeKey === '3' && <Spin spinning={false}>
              {getDeviceBySelected(props.selectedDevice.type)}
            </Spin>}
          </div>
          <div className={'bottom'}>
            <Bottom />
          </div>
        </div> : null}

      </PageContainer>
    </section>
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
  connectWebsocket: () => dispatch({ type: "socket/connect", payload: {} }),
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
  queryFarm: (props: any) => dispatch(queryFarm(props)),
  queryPivotInformation: (props: any) => dispatch(queryPivotInformation(props)),
  queryMeterSystem: (props: any) => dispatch(queryMeterSystem(props)),
  queryIrpd: (props: any) => dispatch(queryIrpd(props)),
  queryRepeater: (props: any) => dispatch(queryRepeater(props)),
  queryPivot: (props: any) => dispatch(queryPivot(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
