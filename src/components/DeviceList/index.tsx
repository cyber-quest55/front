import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { CaretDownOutlined, SettingOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useParams } from '@umijs/max';
import { useMount } from 'ahooks';
import { Button, Col, Popover, Row, Select, Space, Switch, Tabs, Tag, Typography } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';

type Props = {
  dispatch: any;
  pivot: GetPivotModelProps;
  farm: GetFarmModelProps;
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
      '.ant-tabs-nav-wrap': {
        paddingLeft: 12,
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

  const dataSource = [
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Central 1</span>
          </Col>
          <Col>
             <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Central 2</span>
          </Col>
          <Col>
             <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
  ];

  const dataSource2 = [
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Pivô 1</span>
          </Col>
          <Col>
            <Tag color="#2db7f5">V5</Tag>
            <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Pivô 2</span>
          </Col>
          <Col>
            <Tag color="#2db7f5">V5</Tag>
            <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Pivô 3</span>
          </Col>
          <Col>
            <Tag color="#2db7f5">V5</Tag>
            <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Pivô 4</span>
          </Col>
          <Col>
            <Tag color="#2db7f5">V5</Tag>
            <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
  ];

  const dataSource3 = [
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Repetidor 1</span>
          </Col>
          <Col>
            <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Repetidor 2</span>
          </Col>
          <Col>
            <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
    {
      title: (
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>
            <span>Repetidor 2</span>
          </Col>
          <Col>
            <Tag color="#f50">Sem Comunicação</Tag>
          </Col>
        </Row>
      ),
    },
  ];

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
            content: {
              render: () => {
                return (
                  <Space direction="vertical">
                    <Typography.Text type="secondary">22 mar 13:00</Typography.Text>
                  </Space>
                );
              },
            },
          }}
        />
      </div>
    );
  };

  const items = [
    {
      key: '1',
      label: `Central`,
      children: getList(dataSource),
    },
    {
      key: '2',
      label: `Pivôs`,
      children: getList(dataSource2),
    },
    {
      key: '3',
      label: `Repetidor`,
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

export default connect(({ pivot, farm }: { pivot: any; farm: any }) => ({
  pivot,
  farm,
}))(DeviceList);
