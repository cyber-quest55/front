import { useScreenHook } from '@/hooks/screen';
import { GetCentralModelProps } from '@/models/central';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { DeviceType } from '@/utils/enums';
import {
  ClockCircleOutlined,
  EditFilled,
  InsertRowRightOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Link, useParams } from '@umijs/max';
import { Col, Divider, Row, Select, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect } from 'react';
import { BsCloudRainFill } from 'react-icons/bs';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { connect } from 'umi';
import AddDeviceForm from '../Forms/AddDeviceForm';
import WithConnection from '../WithConnection';

type Props = {
  dispatch: any;
  pivot: GetPivotModelProps;
  pivotInformation: GetPivotInformationModelProps;
  central: GetCentralModelProps;
  farm: GetFarmModelProps;
  irpd: GetIrpdModelProps;
  repeater: GetRepeaterModelProps;
  selectedFarm: SelectedFarmModelProps;
  meterSystem: GetMeterSystemModelProps;
};

const scrollToBottom = () => {
  setTimeout(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, 500);
};

const PivotList: React.FC<Props> = (props) => {
  const params = useParams();
  const { md } = useScreenHook();

  const classNameScrollable = useEmotionCss(({}) => {
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

  const className = useEmotionCss(({}) => {
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

  useEffect(() => {
    props.dispatch({
      type: 'pivot/queryPivot',
      payload: { id: parseInt(params.id as string) },
    });

    props.dispatch({
      type: 'central/queryCentral',
      payload: { id: parseInt(params.id as string) },
    });

    props.dispatch({
      type: 'repeater/queryRepeater',
      payload: { id: parseInt(params.id as string) },
    });
  }, [params]);

  const onSetDevice = (type: string, deviceId: string) => {
    props.dispatch({
      type: 'selectedDevice/setSelectedDevice',
      payload: { type, deviceId, farmId: params.id },
    });
  };

  const dataSource = props.pivotInformation.result?.map((item) => ({
    title: (
      <Row
        onClick={() => {
          onSetDevice(DeviceType.Pivot, item.id.toString());
          scrollToBottom();
        }}
        key={`row-pivot-information-${item.id}`}
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Col>
          <span>{props.pivot.result.list?.find((subItem) => subItem.id === item.id)?.name}</span>
        </Col>
        <Col>
          <Tag color={item.pivotColor}>{item.statusText}</Tag>
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
          <Tooltip title="Pluviometro">
            <BsCloudRainFill style={{ fontSize: 20 }} />
          </Tooltip>{' '}
          - mm
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Tooltip title="Ângulo">
            <RedoOutlined style={{ fontSize: 20 }} />
          </Tooltip>{' '}
          {Math.round(item.referenceAngle)}°
        </span>
        <Typography.Text type="secondary">{item.updated}</Typography.Text>
      </Space>
    ),
  }));

  const dataSource2 = props.repeater.result?.map((item) => ({
    title: (
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col>
          <span>{item.name}</span>
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
        <Typography.Text type="secondary">{item.updated}</Typography.Text>
      </Space>
    ),
  }));

  const dataSource3 = props.irpd.result?.map((item) => ({
    title: (
      <Row
        onClick={() => {
          onSetDevice(DeviceType.Pump, item.id.toString());
          scrollToBottom();
        }}
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Col>
          <span>{item.name}</span>
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
          onSetDevice(DeviceType.Meter, item.id.toString());
          scrollToBottom();
        }}
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Col>
          <span>{item.name}</span>
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
            <InsertRowRightOutlined style={{ fontSize: 20 }} />
          </Tooltip>{' '}
          220% (0.50)
        </span>
        <Typography.Text type="secondary">{item.updated}</Typography.Text>
      </Space>
    ),
  }));

  const getList = (dataSource: any) => {
    return (
      <ProList<any>
        itemLayout="vertical"
        rowKey="id"
        style={{ paddingBottom: 0, marginBottom: 0 }}
        dataSource={dataSource}
        metas={{
          title: {},
          content: {},
          extra: {},
        }}
      />
    );
  };

  console.log('chegou aqui qww');
  return (
    <div className={className}>
      <Row justify="space-between" align="middle" style={{ padding: '0px 16px' }}>
        <Col>
          <Space size="small">
            <WithConnection />
            <span className={classNameSelect}>{props.selectedFarm?.name?.toString()}</span>
          </Space>
        </Col>
        <Col>
          <Link to="/edit/farm">
            <Tooltip title="Editar Fazenda">
              <EditFilled style={{ fontSize: 18 }} />
            </Tooltip>
          </Link>
        </Col>
      </Row>
      <Divider />
      <Row align="middle" style={{ padding: '0px 12px', width: '100%' }}>
        <Col xs={24}>
          <Select showSearch placeholder="Ex: Pivo 1" size="large" style={{ width: '100%' }} />
        </Col>
        <Col></Col>
      </Row>
      <Divider style={{ marginBottom: 0 }} />
      <div className={classNameScrollable} style={{ width: '100%' }}>
        <Typography.Title level={5} style={{ textAlign: 'center', marginTop: 8 }}>
          Pivôs
        </Typography.Title>
        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
        {getList(dataSource)}
        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
        <Typography.Title level={5} style={{ textAlign: 'center', marginTop: 8 }}>
          Repetidores
        </Typography.Title>
        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
        {getList(dataSource2)}
        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
        <Typography.Title level={5} style={{ textAlign: 'center', marginTop: 8 }}>
          Bombas
        </Typography.Title>
        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
        {getList(dataSource3)}
        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
        <Typography.Title level={5} style={{ textAlign: 'center', marginTop: 8 }}>
          Medidores
        </Typography.Title>
        <Divider style={{ marginBottom: 0, marginTop: 0 }} />
        {getList(dataSource4)}
      </div>
      <Row justify="center" style={{ marginTop: -45 }}>
        <Col>
          <AddDeviceForm />
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  ({
    pivot,
    farm,
    pivotInformation,
    central,
    irpd,
    repeater,
    meterSystem,
    selectedFarm,
  }: {
    pivot: any;
    farm: any;
    pivotInformation: any;
    central: any;
    irpd: any;
    repeater: any;
    meterSystem: any;
    selectedFarm: any;
  }) => ({
    pivot,
    farm,
    pivotInformation,
    central,
    irpd,
    repeater,
    meterSystem,
    selectedFarm,
  }),
)(PivotList);
