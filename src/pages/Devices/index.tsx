import SignalDevices from '@/components/SignalDevices';
import RenderDotDevices from '@/components/RenderDotDevices';
import { useScreenHook } from '@/hooks/screen';
import { GetPivotModelProps } from '@/models/pivot';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { GetPivotInformationModelProps, queryPivotInformation } from '@/models/pivot-information';
import { GetIrpdModelProps, queryIrpd } from '@/models/irpd';
import { queryPivot } from '@/models/pivot';
import { GetRepeaterModelProps, queryRepeater } from '@/models/repeaters';
import { GetFarmModelProps, queryFarm } from '@/models/farm';
import { useParams } from '@umijs/max';
import { useMount } from 'ahooks';
import { Col, Row, Spin } from 'antd';
import { TabBar } from 'antd-mobile';
import { AppOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { connect } from 'dva';
import {
  FC,
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';

type Props = {
  children: ReactNode;
  google?: any;
  pivot: GetPivotModelProps;
  pivotInformation: GetPivotInformationModelProps;
  irpd: GetIrpdModelProps;
  repeater: GetRepeaterModelProps;
  farm: GetFarmModelProps;
  selectedFarm: SelectedFarmModelProps;
  queryFarm: typeof queryFarm;
  queryPivotInformation: typeof queryPivotInformation;
  queryIrpd: typeof queryIrpd;
  queryPivot: typeof queryPivot;
  queryRepeater: typeof queryRepeater;
  connectWebsocket: () => void;
};

const Devices: FunctionComponent<Props> = (props) => {
  const params = useParams();
  const { xs, md } = useScreenHook();
  const [ activeKey, setActiveKey ] = useState('1');
  const [ hoveredDevice, setHoveredDevice ] = useState<{ 
    lat: number,
    lng: number 
  } | null>(null);

  // Page component styles
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

  const classNames = useEmotionCss(() => ({
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

  // Renderers
  const Bottom: FC = useCallback(() => {
    const disabled = false;

    const setRouteActive = (value: string) => {
      if (value === '3' && disabled) {
        return;
      }
      setActiveKey(value);
    };

    const tabs = [
      {
        key: '1',
        title: 'Mapa',
        icon: <AppOutline />,
      },
      {
        key: '2',
        title: 'Radios',
        icon: <UnorderedListOutline />,
      },
      {
        key: '3',
        title: 'Sinal',
        icon: <UnorderedListOutline />,
      },
    ];

    return (
      <TabBar
        safeArea
        activeKey={activeKey}
        onChange={value => {
          setRouteActive(value);
        }}
      >
        {
          tabs.map(item => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              style={{ 
                cursor: disabled ? 'not-allowed' : 'pointer'
              }}
            />
          ))
        }
      </TabBar>
    );
  }, [
    activeKey,
    setActiveKey
  ]);

  // Page effects
  useMount(() => {
    if (!props.farm.loaded) {
      if (params.id !== ':id') {
        props.queryFarm({ id: Number(params.id) });
      } else {
        props.queryFarm({});
      }
    }
    props.connectWebsocket();
  });


  useEffect(() => {
    if (params.id !== ':id') {
      props.queryIrpd({
        id: parseInt(params.id as string),
      });
      props.queryPivot({
        id: parseInt(params.id as string),
      });
      props.queryRepeater({
        id: parseInt(params.id as string),
      });
      props.queryPivotInformation({
        id: parseInt(params.id as string),
        params: {},
      });
    }
  }, [
    params
  ]);

  // TSX
  return (
    <section className={classNames}>
      <PageContainer
        header={{
          children: (
            <div style={{ display: 'none' }}>

            </div>
          ) 
        }}
        ghost
        breadcrumb={{}}
        title={''}
      >
        {
          md ? (
            <Row>            
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
                      spinning={
                        props.pivot.loading ||
                        props.farm.loading ||
                        props.irpd.loading ||
                        props.pivotInformation.loading
                      }
                    >
                      <div
                        style={{ 
                          width: '100%',
                          height: '100vh' 
                        }}
                      >
                        <RenderDotDevices
                          deviceCenterCoordinates={hoveredDevice}
                        />
                      </div>
                      <ProCard
                        className={className}
                      >
                        <SignalDevices 
                          onDeviceMouseOver={({ lat, lng }) => {
                            setHoveredDevice({ lat, lng });
                          }}
                        />
                      </ProCard>
                    </Spin>
                  ) : null
                }
              </Col>
            </Row>
          ) : null
        }
        {xs ? (
          <div className={'app'}>
            <div className={'body'}>
              {
                activeKey === '1' ? (
                  <Spin
                    spinning={
                      props.pivot.loading ||
                      props.farm.loading ||
                      props.irpd.loading ||
                      props.pivotInformation.loading
                    }
                  >
                    <div style={{ width: '100vw', }}>
                      <RenderDotDevices
                        deviceCenterCoordinates={hoveredDevice}
                      />
                    </div>
                  </Spin>
                ) : null
              }
              {
                activeKey === '2' ? ( 
                  <ProCard
                    className={className}
                  >
                    <SignalDevices 
                      onDeviceMouseOver={({ lat, lng }) => {
                        setHoveredDevice({ lat, lng });
                      }}
                    />
                  </ProCard> 
                ) : null
              }
              {
                activeKey === '3' ? ( 
                  <ProCard
                    className={className}
                  >
                  
                  </ProCard> 
                ) : null
              }
            </div>
            <div className={'bottom'}>
              <Bottom />
            </div>
          </div>
        ) : null}
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
  irpd,
}: any) => ({
  pivot,
  pivotInformation,
  farm,
  selectedDevice,
  selectedFarm,
  repeater,
  irpd,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connectWebsocket: () => dispatch({ type: "socket/connect", payload: {} }),
  queryFarm: (props: any) => dispatch(queryFarm(props)),
  queryPivotInformation: (props: any) => dispatch(queryPivotInformation(props)),
  queryIrpd: (props: any) => dispatch(queryIrpd(props)),
  queryRepeater: (props: any) => dispatch(queryRepeater(props)),
  queryPivot: (props: any) => dispatch(queryPivot(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Devices);
