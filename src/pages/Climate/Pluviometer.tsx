import MeterReport from '@/components/DeviceReport/Meter';
import PivotReport from '@/components/DeviceReport/Pivot';
import PumpReport from '@/components/DeviceReport/Pump';
import PivotList from '@/components/DeviceBox';
import RenderPivots from '@/components/RenderPivots';
import { useScreenHook } from '@/hooks/screen';
import {
  setSelectedDevice,
} from '@/models/selected-device';
import { DeviceType } from '@/utils/enum/device-type';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
 import { Col, Row, Spin } from 'antd';
import { connect } from 'dva';
import { FC, FunctionComponent, useState } from 'react';
import { AppOutline, MessageOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { TabBar } from 'antd-mobile'

type Props = {
  selectedDevice: any;
  connectWebsocket: any;
};

const Page: FunctionComponent<Props> = (props) => {
  const [activeKey, setActiveKey] = useState('1');
  const { md, xs } = useScreenHook();
 
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
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          />
        ))}
      </TabBar>
    )
  }

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
    <section className={classNamts}>
      <PageContainer
        className='no-padding'
        header={{ children: <div style={{ display: 'none' }}>asd</div> }}
        ghost
        breadcrumb={{}}
        title={''}
      >
        {
          md ? <Row >
            <Col
              xs={24}
              style={{
                height: '100vh',
                marginTop: -23,
                position: 'relative',
              }}
            >
              {
                md ? (
                  <Spin
                    spinning={ false }
                  >
                    <div style={{ width: '100%', height: '100vh', }}>
                      <RenderPivots />
                    </div>
                    <ProCard className={className}>
                      <PivotList />
                    </ProCard>
                  </Spin>
                ) : null
              }
            </Col>
            {
              props.selectedDevice.open ? (
                md ? (
                  <Col
                    xs={24}
                    id="page-container"
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
              ) : null
            }
          </Row> : null
        }
        {
          xs ? <div className={'app'}>
            <div className={'body'} >
              {
                activeKey === '1' ? (
                  <Spin spinning={ false }
                  >
                    <div style={{ width: '100vw', }} >
                      <RenderPivots />
                    </div>
                  </Spin>
                ) : null
              }
              {
                activeKey === '2' ? (
                  <ProCard className={className}>
                    <PivotList />
                  </ProCard>
                ) : null
              }
              {
                activeKey === '3' ? (
                  <>
                    {
                      getDeviceBySelected(props.selectedDevice.type)
                    }
                  </>
                ) : null
              }
            </div>
            <div className={'bottom'}>
              <Bottom />
            </div>
          </div> : null
        }
      </PageContainer>
    </section>
  );
};

const mapStateToProps = ({  
  selectedDevice,  
}: any) => ({
  selectedDevice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({ 
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)), 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
