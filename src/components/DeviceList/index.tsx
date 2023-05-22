import { GetCentralModelProps } from '@/models/central';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import { CaretDownOutlined, ClockCircleOutlined, RedoOutlined, SettingOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useParams } from '@umijs/max';
import { useMount } from 'ahooks';
import {
  Button,
  Col,
  Popover,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect } from 'react';
import { BsCloudRainFill } from 'react-icons/bs';
import { connect } from 'umi';

type Props = {
  dispatch: any;
  pivot: GetPivotModelProps;
  pivotInformation: GetPivotInformationModelProps;
  central: GetCentralModelProps;
  farm: GetFarmModelProps;
  irpd: GetIrpdModelProps;
  repeater: GetRepeaterModelProps;
};

const DeviceList: React.FC<Props> = (props) => {
  const params = useParams();

  useMount(() => {});

  useEffect(() => {}, [props.farm]);

  useEffect(() => {}, [params]);

  const onChange = (key: string) => {
    console.log(key);
  };

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
      '.ant-tabs-tab+.ant-tabs-tab': {
        margin: '0 0 0 16px',
      },
      '.ant-tabs-tab-btn': {
        paddingInline: 8,
      },
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

  const dataSource = props.central?.result?.map((item) => ({
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

  const dataSource2 = props.pivotInformation.result?.map((item) => ({
    title: (
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col>
          <span>{props.pivot.result.list?.find((subItem) => subItem.id === item.id)?.name}</span>
        </Col>
        <Col>
          <Tag color="#2db7f5">V5</Tag>
          <Tag color="#f50">Sem Comunicação</Tag>
        </Col>
      </Row>
    ),
    content: (
      <Space direction="vertical">
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


  const dataSource3 = props.repeater.result?.map((item) => ({
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


  const dataSource4 = props.irpd.result?.map((item) => ({
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
            <ClockCircleOutlined  style={{ fontSize: 20 }} />
          </Tooltip>{' '}
          - bar
        </span>
        <Typography.Text type="secondary">{item.updated}</Typography.Text>
      </Space>
    ),
  }));


  const getList = (dataSource: any) => {
    return (
      <div className={classNameScrollable}>
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
      </div>
    );
  };

  const items = [
    {
      key: '1',
      label: `Centrais`,
      children: getList(dataSource),
    },
    {
      key: '2',
      label: `Pivôs`,
      children: getList(dataSource2),
    },
    {
      key: '3',
      label: `Repetidores`,
      children: getList(dataSource3),
    },
    {
      key: '4',
      label: `Bombas`,
      children: getList(dataSource4),
    },
    {
      key: '5',
      label: `Medidores`,
      children: getList(dataSource3),
    },
  ];

  return (
    <div className={className}>
      <Row
        gutter={4}
        align="middle"
        justify={'space-between'}
        style={{ padding: '0px 12px', width: '100%' }}
      >
        <Col>
          <Select
            className={classNameSelect}
            suffixIcon={<CaretDownOutlined />}
            bordered={false}
            showSearch
            value={'Fazenda 1'}
            size="large"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={(e) => {
              history.push(e.toString());
            }}
            options={props.farm.result.list?.map((item) => ({ value: item.id, label: item.name }))}
          />{' '}
        </Col>
        <Col>
          <Popover
            trigger="click"
            placement="bottom"
            content={
              <Space direction="vertical">
                <Space>
                  <Switch size="small" title="adssa" />
                  <Typography.Text>Manter Linhas</Typography.Text>
                </Space>
                <Space>
                  <Switch size="small" title="adssa" />
                  <Typography.Text>Mostrar GPS</Typography.Text>
                </Space>
                <Space>
                  <Switch size="small" title="adssa" />
                  <Typography.Text>Relevo</Typography.Text>
                </Space>
                <Button size="small" style={{ width: '100%', marginTop: 8 }}>
                  Buscar Rádios
                </Button>
              </Space>
            }
          >
            <Button size="middle" ghost>
              <SettingOutlined style={{ color: 'black' }} />
            </Button>
          </Popover>
        </Col>
      </Row>
      <Row align="middle" style={{ padding: '0px 0px', width: '100%' }}>
        <Col xs={24}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
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
    repeater
  }: {
    pivot: any;
    farm: any;
    pivotInformation: any;
    central: any;
    irpd: any;
    repeater: any;
  }) => ({
    pivot,
    farm,
    pivotInformation,
    central,
    irpd,
    repeater
  }),
)(DeviceList);
