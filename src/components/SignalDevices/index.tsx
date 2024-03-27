// Dependencies
import { setSelectedDevice } from '@/models/selected-device';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { GetPivotModelProps } from '@/models/pivot';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import {
  GetSignalModelProps,
  pingDevices,
  loadRadioCoordinates
} from '@/models/signal';
import { ProList } from '@ant-design/pro-components';
import { WifiOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { useUnmount } from 'ahooks';
import {
  Button,
  Col,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { connect } from 'umi';
import IntensityDrawer from './IntensitiesDrawer';
import WithConnection from '../WithConnection';
import { GetFarmModelProps } from '@/models/farm';

// Component props
type Props = {
  farm: GetFarmModelProps,
  signal: GetSignalModelProps;
  pivot: GetPivotModelProps;
  pivotInformation: GetPivotInformationModelProps;
  irpd: GetIrpdModelProps;
  repeater: GetRepeaterModelProps;
  selectedFarm: SelectedFarmModelProps;
  pingDevices: typeof pingDevices;
  onDeviceMouseOver: (params: { lat: number, lng: number }) => void;
  subscribeWs: () => void;
  unsubscribeWs: () => void;
  loadRadioCoordinates: () => void;
};

// Component
const SignalDevices: React.FC<Props> = (props) => {
  // Hooks
  const intl = useIntl();  
  const [
    isDeviceDrawerOpen,
    setDeviceDrawerState,
  ] = useState<boolean>(false);
  const [
    currentRadio,
    setCurrentRadio,
  ] = useState<{
    controlRadio: string;
    gpsRadio?: string;
    name: string;
  } | null>(null);

  const toggleDrawer = () => setDeviceDrawerState(prev => !prev);

  // Styles
  const className = useEmotionCss(({ }) => {
    return {
      [`.ant-pro-card-body`]: {
        paddingInline: '0px !important',
      },
      '.ant-pro-list-row-title': {
        width: '100%',
      },
      '.ant-list-item .ant-list-item-meta': {
        marginBlockEnd: 0,
      },
    };
  });

  const classNameScrollable = useEmotionCss(({ }) => {
    return {
      maxHeight: 'calc(100vh - 350px)',
      [`@media screen and (max-width: 762px)`]: {
        maxHeight: 'calc(100vh - 283px)',
        height: '100vh',
      },
      overflowY: 'auto',
      overflowX: 'hidden',
      [`.ant-list-item`]: {
        paddingLeft: '12px !important;',
        flexDirection: 'row-reverse',
      },
      ['.ant-pro-list-row-content']: {
        marginInline: 0,
      },
      ['.ant-list-vertical .ant-list-item .ant-list-item-extra']: {
        marginInlineStart: 0,
      },
      position: 'relative',
      '.ant-pro-card-body': {
        paddingBlock: 0,
      },
    };
  });

  // Data sources
  const pivotDatasource = props?.pivotInformation?.result?.map((item) => ({
    title: (
      <Row
        key={`row-pivot-information-${item.id}`}
        justify="space-between"
        style={{ width: '100%' }}
        onClick={() => {
          const hasSignal = props.signal.signalResponses.some(
            itm => itm.radio_id === item.controlRadio
          );
          if (hasSignal) {
            setCurrentRadio({ 
              controlRadio: item.controlRadio,
              gpsRadio: item.monitorRadio,
              name: item.name,
            });
            props.pingDevices({
              id: props.selectedFarm.id.toString(),
              device: item.controlRadio || item.monitorRadio,
              keepLines: false,
            })
            toggleDrawer();
          }
        }}
        onMouseEnter={() => {
          props.onDeviceMouseOver({
            lat: item.centerLat,
            lng: item.centerLng,
          })
        }}
      >
        <Col>
          <span>
            {item.name}
          </span>
        </Col>
        <Col>
          <Tag
            color={
              props.signal.signalResponses.some(
                itm => itm.radio_id === item.controlRadio
              ) ? '#03a05e'
                : '#dc4446'
            }
          >
            {intl.formatMessage({
              id: 'component.signal.box.devices.item.controller',
            })}
          </Tag>
          <Tag
            color={
              props.signal.signalResponses.some(
                itm => itm.radio_id === item.monitorRadio
              ) ? '#03a05e'
                : '#dc4446'
            }
          >
            {intl.formatMessage({
              id: 'component.signal.box.devices.item.gps',
            })}
          </Tag>
        </Col>
      </Row>
    ),
    extra: (
      <></>
    ),
    content: (
      <Typography.Text type="secondary">
        {item.updated}
      </Typography.Text>
    ),
  }));

  const irpdDatasource = props?.irpd?.result?.map((item) => ({
    title: (
      <Row
        key={`row-irpd-information-${item.id}`}
        justify="space-between"
        style={{ width: '100%' }}
        onMouseEnter={() => {
          props.onDeviceMouseOver({
            lat: item.centerLat,
            lng: item.centerLng,
          })
        }}
        onClick={() => {
          const hasSignal = props.signal.signalResponses.some(
            itm => itm.radio_id === item.controlRadio
          );
          if (hasSignal) {
            setCurrentRadio({ 
              controlRadio: item.controlRadio,
              gpsRadio: '',
              name: item.name,
            });
            props.pingDevices({
              id: props.selectedFarm.id.toString(),
              device: item.controlRadio,
              keepLines: false,
            })
            toggleDrawer();
          }
        }}
      >
        <Col>
          <span>
            {item.name}
          </span>
        </Col>
        <Col>
          <Tag
            color={
              props.signal.signalResponses.some(
                itm => itm.radio_id === item.controlRadio
              ) ? '#03a05e'
                : '#dc4446'
            }
          >
            {intl.formatMessage({
              id: 'component.signal.box.devices.item.radio',
            })}
          </Tag>
        </Col>
      </Row>
    ),
    extra: (
      <></>
    ),
    content: (
      <Typography.Text type="secondary">
        {item.updated}
      </Typography.Text>
    ),
  }));

  const repeaterDatasource = props?.repeater?.result?.map((item) => ({
    title: (
      <Row
        key={`row-repeaters-information-${item.id}`}
        justify="space-between"
        style={{ width: '100%' }}
        onMouseEnter={() => {
          props.onDeviceMouseOver({
            lat: item.centerLat,
            lng: item.centerLng,
          })
        }}
        onClick={() => {
          const hasSignal = props.signal.signalResponses.some(
            itm => itm.radio_id === item.controlRadio
          );
          if (hasSignal) {
            setCurrentRadio({ 
              controlRadio: item.controlRadio,
              gpsRadio: '',
              name: item.name,
            });
            props.pingDevices({
              id: props.selectedFarm.id.toString(),
              device: item.controlRadio,
              keepLines: false,
            })
            toggleDrawer();
          }
        }}
      >
        <Col>
          <span>
            {item.name}
          </span>
        </Col>
        <Col>
          <Tag
            color={
              props.signal.signalResponses.some(
                itm => itm.radio_id === item.controlRadio
              ) ? '#03a05e'
                : '#dc4446'
            }
          >
            {intl.formatMessage({
              id: 'component.signal.box.devices.item.radio',
            })}
          </Tag>
        </Col>
      </Row>
    ),
    extra: (
      <></>
    ),
    content: (
      <Typography.Text type="secondary">
        {item.updated}
      </Typography.Text>
    ),
  }));

  const finalDatasource = [
    ...pivotDatasource,
    ...irpdDatasource,
    ...repeaterDatasource,
  ];

  // Effects
  useUnmount(() => {
    props.unsubscribeWs();
  });

  useEffect(() => {
    if (props.farm.loaded) {
      props.subscribeWs();
    }
  }, [
    props.farm.loaded
  ]);

  useEffect(() => {
    if (
      props.irpd.loaded &&
      props.repeater.loaded &&
      props.pivotInformation.loaded
    ) {
      props.loadRadioCoordinates();
    }
  }, [
    props.pivotInformation.loaded,
    props.irpd.loaded,
    props.repeater.loaded
  ]);

  // Renderers
  const renderDeviceList = useCallback((datasource: {
    title: React.ReactElement,
    extra?: React.ReactElement,
    content: React.ReactElement,
  }[]) => {
    return (
      <ProList 
        itemLayout="vertical"
        rowKey="id"
        dataSource={datasource}
        style={{
          paddingBottom: 0,
          marginBottom: 0
        }}
        metas={{
          title: {},
          content: {},
          extra: {},
        }}
      />
    );
  },[]);

  // TSX
  return (
    <div className={className}>
      {/* Signal intensity drawer */}
      <IntensityDrawer 
        title={currentRadio?.name}
        isOpen={isDeviceDrawerOpen}
        toggleDrawer={toggleDrawer}
        nodes={props.signal.nodeResponses}
        currentRadio={currentRadio?.controlRadio || currentRadio?.gpsRadio}
      />
      {/* Component default content */}
      <Row
        justify="space-between"
        align="middle"
        style={{ padding: '0px 16px' }}
      >
        <Col>
          <Space size="small">
            <WithConnection />
            <Typography.Title
              level={4}
            >
              {props.selectedFarm?.name?.toString()}
            </Typography.Title>
          </Space>
        </Col>
      </Row>
      <Divider 
        style={{
          marginBottom: 0
        }}
      />
      <div 
        className={classNameScrollable}
        style={{
          width: '100%',
          paddingBottom: '60px',
        }}
      >
        {
          /* Unified list */
          (
            props?.pivot?.result.length > 0,
            props?.irpd?.result.length > 0,
            props?.repeater?.result.length > 0
          ) ? (
            <>
              <Typography.Title
                level={5}
                style={{ textAlign: 'center', marginTop: 8 }}
              >
                {intl.formatMessage({
                  id: 'component.signal.box.devices.label',
                })}
              </Typography.Title>
              <Divider
                style={{
                  marginBottom: 0,
                  marginTop: 0,
                }}
              />
              {renderDeviceList(finalDatasource)}
              <Divider
                style={{
                  marginBottom: 0,
                  marginTop: 0
                }}
              />
            </>
          ) : null
        }
      </div>
      <Row justify="center" style={{ marginTop: -45 }}>
        <Col>
          <Button
            size="large"
            type="primary"
            icon={<WifiOutlined />}
            onClick={() => {
              props.pingDevices({
                id: props.selectedFarm.id.toString(),
              })
            }}
          >
            {intl.formatMessage({
              id: 'component.signal.box.radio.search',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

// Redux mappings
const mapStateToProps = ({
  pivot,
  farm,
  pivotInformation,
  central,
  irpd,
  repeater,
  selectedFarm,
  signal,
}: any) => ({
  pivot,
  farm,
  pivotInformation,
  central,
  irpd,
  repeater,
  selectedFarm,
  signal,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
  pingDevices: (props: any) => dispatch(pingDevices(props)),
  loadRadioCoordinates: () => dispatch(loadRadioCoordinates()),
  subscribeWs: () => dispatch({ type: 'signal/onInit', payload: {} }),
  unsubscribeWs: () => dispatch({ type: 'signal/onDestroy', payload: {} }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalDevices);
