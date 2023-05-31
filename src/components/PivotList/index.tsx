import { GetCentralModelProps } from '@/models/central';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import {
  CaretDownOutlined,
  ClockCircleOutlined,
  EditFilled,
  InsertRowRightOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, Link, useParams } from '@umijs/max';
import { useMount } from 'ahooks';
import { Col, Divider, Row, Select, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect } from 'react';
import { BsCloudRainFill } from 'react-icons/bs';
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
  meterSystem: GetMeterSystemModelProps;
};

const PivotList: React.FC<Props> = (props) => {
  const params = useParams();

  useMount(() => {
    if (!props.farm.loaded)
      props.dispatch({
        type: 'farm/queryFarm',
        payload: { id: params.id },
      });
  });

  useEffect(() => {
    if (props.farm.loaded)
      if (params.id === ':id') {
        history.push(`${props.farm.result.list[0].id}`);
        return;
      }

    const selectedFarm = props.farm.result?.list?.find(
      (f) => f.id === parseInt(params.id as string),
    );

    if (props.farm.loaded)
      if (!selectedFarm) {
        // history.push(`/404`)
      }
  }, [props.farm]);

  useEffect(() => {
    const selectedFarm = props.farm.result?.list?.find(
      (f) => f.id === parseInt(params.id as string),
    );

    props.dispatch({
      type: 'farm/setSelectedFarm',
      payload: selectedFarm,
    });

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
      },
      ['.ant-pro-list-row-content']: {
        marginInline: 0,
      },
      position: 'relative',
      '.ant-pro-card-body': {
        paddingBlock: 0
      }
    };
  });

  const classNameSelect = useEmotionCss(() => {
    return {
      '.ant-select-selection-item': {
        fontWeight: 700,
        fontSize: 19,
        paddingInlineEnd: '35px !important',
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

  const dataSource = props.pivotInformation.result?.map((item) => ({
    title: (
      <Row key={`row-pivot-information-${item.id}`} justify="space-between" style={{ width: '100%' }}>
        <Col>
          <span>{props.pivot.result.list?.find((subItem) => subItem.id === item.id)?.name}</span>
        </Col>
        <Col>
          <Tag color="#2db7f5">V5</Tag>
          <Tag color={item.pivotColor}>{item.statusText}</Tag>
        </Col>
      </Row>
    ),
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
    content: (
      <Space direction="vertical">
        <Typography.Text type="secondary">{item.updated}</Typography.Text>
      </Space>
    ),
  }));

  const dataSource3 = props.irpd.result?.map((item) => ({
    title: (
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col>
          <span>{item.name}</span>
        </Col>
      </Row>
    ),
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
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col>
          <span>{item.name}</span>
        </Col>
      </Row>
    ),
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
        }}
      />
    );
  };

  return (
    <div className={className}>
      <Row justify="space-between" align="middle" style={{ padding: '0px 16px' }}>
        <Col>
          <Space size="small">
            <WithConnection />
            <Select
              className={classNameSelect}
              suffixIcon={<CaretDownOutlined />}
              bordered={false}
              showSearch
              value={props.farm.selectedFarm?.name?.toString()}
              size="large"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              onChange={(e) => {
                history.push(e.toString());
              }}
              options={props.farm.result.list?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
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
  }: {
    pivot: any;
    farm: any;
    pivotInformation: any;
    central: any;
    irpd: any;
    repeater: any;
    meterSystem: any;
  }) => ({
    pivot,
    farm,
    pivotInformation,
    central,
    irpd,
    repeater,
    meterSystem,
  }),
)(PivotList);
