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
  setSelectedDevice,
} from '@/models/selected-device';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { DeviceType } from '@/utils/enum/device-type';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useLocation, useParams } from '@umijs/max';
import { useMount } from 'ahooks';
import { Col, Row, Spin, Switch, Tabs } from 'antd';
import { connect } from 'dva';
import { FC, FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { queryRepeater } from '../../models/repeaters';
import { queryPivot } from '../../models/pivot';
import { AppOutline, MessageFill, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
import { Badge, TabBar } from 'antd-mobile'

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

const Bottom: FC = () => {
  const setRouteActive = (value: string) => {
    history.push(value)
  }

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/todo',
      title: '待办',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return (
    <TabBar activeKey={'/home'} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

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
      console.log('entrando aqui')
      props.queryFarm({});
    }
  });

  useEffect(() => {
    if (props.selectedFarm.id !== 0) {
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
        minHeight: '150px',
        padding: 0,
        [`.ant-pro-card-body`]: {
          paddingInline: '0px !important',
        },
      };
  });

  const classNameFixedMobile = useEmotionCss(({ }) => {
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
    <section className={classNamts}>
      <PageContainer
        header={{ children: <div style={{ display: 'none' }}>asd</div> }}
        ghost
        breadcrumb={{}}
        title={''}
      >
        <div className={'app'}>
          <div className={'body'}>
             qeqwe
          </div>
          <div className={'bottom'}>
            <Bottom />
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
