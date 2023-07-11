import MeterReport from '@/components/DeviceReport/Meter';
import PivotReport from '@/components/DeviceReport/Pivot';
import PumpReport from '@/components/DeviceReport/Pump';
import PivotList from '@/components/PivotList';
import RenderPivots from '@/components/RenderPivots';
import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { DeviceType } from '@/utils/enums';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useWindowWidth } from '@react-hook/window-size';
import {  history, useParams } from '@umijs/max';
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
};

const Welcome: FunctionComponent<Props> = (props) => {
  const onlyWidth = useWindowWidth();
  const [activeKey, setActiveKey] = useState('1');
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

  useEffect(() => {
    if ( props.selectedFarm.id !== 0) {
      history.push(`${props.selectedFarm.id}`);
      return;
    }
  }, [props.selectedFarm]);


  useEffect(() => {
    if ( params.id === ':id' && props.selectedFarm.id !== 0) {
      history.push(`${props.selectedFarm.id}`);
      return;
    }
  }, [params, props.selectedFarm]);


  useMount(() => {
    if (!props.farm.loaded)
      props.dispatch({
        type: 'farm/queryFarm',
        payload: { id: params.id },
      });
  });

  useUnmount(() => {
    props.dispatch({
      type: 'selectedDevice/setDeviceClose',
      payload: {},
    });
  });

  const className = useEmotionCss(({}) => {
    return onlyWidth > 767
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
          <div style={{ width: '100%', height: 'calc(100vh - 102px)' }}>
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

  useEffect(() => {
    if (props.selectedDevice.open && onlyWidth < 767) {
      setActiveKey('3');
    }
  }, [props.selectedDevice]);

  return (
    <Row>
      <Col
        xs={24}
        style={{
          height: onlyWidth > 767 ? '100vh' : 'calc(100vh - 56px - 60px)',
          position: 'relative',
        }}
      >
        <>
          {onlyWidth > 767 ? (
            <Spin spinning={props.pivot.loading || props.farm.loading}>
              <div style={{ width: '100%', height: '100vh' }}>
                <RenderPivots />
              </div>
              <ProCard className={className}>
                <PivotList />
              </ProCard>
            </Spin>
          ) : null}

          {onlyWidth > 767 ? null : (
            <div className={classNameFixedMobile}>
              <Tabs
                defaultActiveKey="1"
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={items}
                tabPosition="bottom"
              />
            </div>
          )}
        </>
      </Col>
      {props.selectedDevice.open ? (
        onlyWidth > 767 ? (
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
  );
};

export default connect(
  ({
    pivot,
    farm,
    selectedDevice,
    selectedFarm,
  }: {
    pivot: any;
    farm: any;
    selectedDevice: any;
    selectedFarm: any;
  }) => ({
    pivot,
    farm,
    selectedDevice,
    selectedFarm,
  }),
)(Welcome);
