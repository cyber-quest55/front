import { useScreenHook } from '@/hooks/screen';
import { GetCentralModelProps } from '@/models/central';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import { setSelectedDevice } from '@/models/selected-device';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { DeviceType } from '@/utils/enum/device-type';
import { getCommonDateParam } from '@/utils/formater/get-common-date-param';
import {
  ClockCircleOutlined,
  InsertRowRightOutlined,
  MoreOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl, useParams, useNavigate } from '@umijs/max';
import { useUnmount } from 'ahooks';
import {
  Col,
  Divider,
  Dropdown,
  MenuProps,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import React from 'react';
import { BsCloudRainFill } from 'react-icons/bs';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { connect } from 'umi';
import CreateFarmFormContainer from '../Forms/CreateFarm/CreateFarmContainer';
import WithConnection from '../WithConnection';
import AddDeviceFormContainer from '../Forms/AddDeviceForm/AddDeviceFormContainer';

type Props = {
  pivot: GetPivotModelProps;
  pivotInformation: GetPivotInformationModelProps;
  central: GetCentralModelProps;
  farm: GetFarmModelProps;
  irpd: GetIrpdModelProps;
  repeater: GetRepeaterModelProps;
  selectedFarm: SelectedFarmModelProps;
  meterSystem: GetMeterSystemModelProps;
  setSelectedDevice: typeof setSelectedDevice;
  destroyPivotWs: () => void,
  destroyIrpdWs: () => void,
  destroyMeterSystemWs: () => void,
};

const scrollToBottom = () => {
  setTimeout(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, 500);
};

const DeviceBox: React.FC<Props> = (props) => {
  const params = useParams();
  const intl = useIntl();
  const { md } = useScreenHook();
  const navigate = useNavigate();

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

  const classNameSelect = useEmotionCss(() => {
    return {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    };
  });

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
  const onSetDevice = (type: DeviceType, deviceId: number, otherProps: any) => {
    const farmId = parseInt(params.id as string);
    if (farmId)
      props?.setSelectedDevice({
        type: type,
        deviceId: deviceId,
        farmId,
        otherProps: otherProps,
      });
  };

  const dataSource = props?.pivotInformation?.result?.map((item) => ({
    title: (
      <Row
        onClick={() => {
          onSetDevice(DeviceType.Pivot, item.id, {});
          scrollToBottom();
        }}
        key={`row-pivot-information-${item.id}`}
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Col>
          <span>
            {props.pivot.result?.find((subItem) => subItem.id === item.id)?.name}
          </span>
        </Col>
        <Col>
          <Tag color={item.deviceColor}>
            {item.statusText}
          </Tag>
        </Col>
      </Row>
    ),
    extra: !md ? (
      <div style={{ marginRight: 12 }}>
        <StaticGoogleMap
          size="100x100"
          className="img-fluid"
          apiKey="AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU"
          maptype="satellite"
          zoom={13}
          center={`${item.centerLat},${item.centerLng}`}
        >
          <Marker location={`${item.centerLat},${item.centerLng}`} color="blue" />
        </StaticGoogleMap>
      </div>
    ) : null,
    content: (
      <Space key={`row-pivot-information-space-${item.id}`} direction="vertical">
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Tooltip title={
            item.isRaining 
              ? intl.formatMessage({ id: 'component.farm.devices.pivot.raining' }) 
              : intl.formatMessage({ id: 'component.farm.devices.pivot.pluviometer' }) 
            }
          >
            <BsCloudRainFill style={{ fontSize: 20 }} />
          </Tooltip>{' '}
          {item.pluviometerMeasure || '-'} mm
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Tooltip title="Ângulo">
            <RedoOutlined style={{ fontSize: 20 }} />
          </Tooltip>{' '}
          {
            item.currentAngle < 0
            ? item.currentAngle * -1
            : item.currentAngle === 0 
              ? '-' 
              : item.currentAngle
          } °
        </span>
        <Typography.Text type="secondary">
          {item.updated}
        </Typography.Text>
      </Space>
    ),
  }));

  const dataSource2 = props?.repeater.result?.map((item) => ({
    title: (
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col>
          <span
            onClick={() => {
              navigate(`/farms/${params.id}/repeater/${item.id}/edit`) 
            }}
          >
            {item.name}
          </span>
        </Col>
      </Row>
    ),
    extra: !md ? (
      <div style={{ marginRight: 12 }}>
        <StaticGoogleMap
          size="100x100"
          className="img-fluid"
          apiKey="AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU"
          maptype="satellite"
          zoom={13}
          center={`${item.centerLat},${item.centerLng}`}
        >
          <Marker
            location={`${item.centerLat},${item.centerLng}`}
            color="blue"
          />
        </StaticGoogleMap>
      </div>
    ) : null,
    content: (
      <Space direction="vertical">
        <Typography.Text type="secondary">
          {item.updated}
        </Typography.Text>
      </Space>
    ),
  }));

  const dataSource3 = props?.irpd.result?.map((item) => ({
    title: (
      <Row
        onClick={() => {
          onSetDevice(DeviceType.Pump, item.id, {
            waterId: item.waterId,
            params: getCommonDateParam(true),
          });
          scrollToBottom();
        }}
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Col>
          <span>{item.name}</span>
        </Col>
        <Col>
          <Tag color={item.deviceColor}>
            {item.statusText}
          </Tag>
        </Col>
      </Row>
    ),
    extra: !md ? (
      <div style={{ marginRight: 12 }}>
        <StaticGoogleMap
          size="100x100"
          className="img-fluid"
          apiKey="AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU"
          maptype="satellite"
          zoom={13}
          center={`${item.centerLat},${item.centerLng}`}
        >
          <Marker location={`${item.centerLat},${item.centerLng}`} color="blue" />
        </StaticGoogleMap>
      </div>
    ) : null,
    content: (
      <Space direction="vertical">
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Tooltip title="Ângulo">
            <ClockCircleOutlined style={{ fontSize: 20 }} />
          </Tooltip>{' '}
          - bar
        </span>
        <Typography.Text type="secondary">{item.updated}</Typography.Text>
      </Space>
    ),
  }));

  const dataSource4 = props.meterSystem.result?.map((item) => ({
    title: (
      <Row
        onClick={() => {
          onSetDevice(
            DeviceType.Meter,
            item.id,
            { imeterSetId: item.imeterSetId }
          );
          scrollToBottom();
        }}
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Col>
          <span>{item.name}</span>
        </Col>
        <Col>
          <Tag color={item.deviceColor}>
            {item.statusText}
          </Tag>
        </Col>
      </Row>
    ),
    extra: !md ? (
      <div style={{ marginRight: 12 }}>
        <StaticGoogleMap
          size="100x100"
          className="img-fluid"
          apiKey="AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU"
          maptype="satellite"
          zoom={13}
          center={`${item.centerLat},${item.centerLng}`}
        >
          <Marker
            location={`${item.centerLat},${item.centerLng}`}
            color="blue"
          />
        </StaticGoogleMap>
      </div>
    ) : null,
    content: (
      <Space direction="vertical">
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <Tooltip title="Ângulo">
            <InsertRowRightOutlined
              style={{ fontSize: 20 }}
            />
          </Tooltip>{' '}
          {item.percentage}% ({item.meterLevel}m)
        </span>
        <Typography.Text type="secondary">
          {item.updated}
        </Typography.Text>
      </Space>
    ),
  }));

  const getList = (dataSource: any) => {
    return (
      <ProList<any>
        itemLayout="vertical"
        rowKey="id"
        style={{
          paddingBottom: 0,
          marginBottom: 0
        }}
        dataSource={dataSource}
        metas={{
          title: {},
          content: {},
          extra: {},
        }}
      />
    );
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`/farms/${params.id}/edit`}
        >
          {intl.formatMessage({
            id: 'component.farm.devices.actions.edit.title',
          })}
        </a>
      ),
    },
    {
      key: '2',
      label: <CreateFarmFormContainer />,
    },
  ];

  // Destroy WS connections
  useUnmount(() => {
    console.log('[unmount ws here]');
    props.destroyPivotWs();
    props.destroyIrpdWs();
    props.destroyMeterSystemWs();
  });

  return (
    <div className={className}>
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
              className={classNameSelect}
            >
              {props.selectedFarm?.name?.toString()}
            </Typography.Title>
          </Space>
        </Col>
        <Col>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <MoreOutlined style={{ fontSize: 24 }} />
            </a>
          </Dropdown>
        </Col>
      </Row>
      <Divider />
      <Row
        align="middle"
        style={{ padding: '0px 12px', width: '100%' }}
      >
        <Col xs={24}>
          <Select
            showSearch
            placeholder="Ex: Pivo 1"
            size="large"
            style={{ width: '100%' }}
          />
        </Col>
        <Col></Col>
      </Row>
      <Divider style={{ marginBottom: 0 }} />
      <div className={classNameScrollable} style={{ width: '100%' }}>
        {props?.pivot?.result.length > 0 ? (
          <>
            <Typography.Title
              level={5}
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              {intl.formatMessage({ id: 'component.farm.devices.type.pivot' })}
            </Typography.Title>
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
            {getList(dataSource)}
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          </>
        ) : null}
        {props?.repeater?.result.length > 0 ? (
          <>
            <Typography.Title
              level={5}
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              {intl.formatMessage({ id: 'component.farm.devices.type.repeaters' })}
            </Typography.Title>
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
            {getList(dataSource2)}
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          </>
        ) : null}

        {props?.irpd.result.length > 0 ? (
          <>
            <Typography.Title
              level={5}
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              {intl.formatMessage({ id: 'component.farm.devices.type.irpd' })}
            </Typography.Title>
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
            {getList(dataSource3)}
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
          </>
        ) : null}

        {props?.meterSystem.result.length > 0 ? (
          <>
            <Typography.Title
              level={5}
              style={{ textAlign: 'center', marginTop: 8 }}
            >
              {intl.formatMessage({ id: 'component.farm.devices.type.metersystem' })}
            </Typography.Title>
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
            {getList(dataSource4)}
          </>
        ) : null}
        
      </div>
      <Row justify="center" style={{ marginTop: -45 }}>
        <Col>
          <AddDeviceFormContainer
            base={(props.selectedFarm as any)?.base?.radio_id}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({
  pivot,
  farm,
  pivotInformation,
  central,
  irpd,
  repeater,
  meterSystem,
  selectedFarm,
}: any) => ({
  pivot,
  farm,
  pivotInformation,
  central,
  irpd,
  repeater,
  meterSystem,
  selectedFarm,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
  destroyPivotWs: () => dispatch({ type: 'pivotInformation/onDestroy', payload: {} }),
  destroyIrpdWs: () => dispatch({ type: 'irpd/onDestroyDeviceBox', payload: {} }),
  destroyMeterSystemWs: () => dispatch({ type: 'meterSystem/onDestroyDeviceBox', payload: {} }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceBox);
