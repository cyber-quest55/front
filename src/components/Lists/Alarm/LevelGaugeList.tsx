import { useScreenHook } from '@/hooks/screen';
import { TinyArea } from '@ant-design/charts';
import { BellOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Col, Row, Space, Switch, Tag, Typography } from 'antd';
import React, { ReactNode, ReactText, useState } from 'react';
interface Value {
  key: string;
  value: string;
}

interface PivotItem {
  id: string;
  name: string;
  image: string;
  description: {
    graph: any;
    value: Value[];
  };
  subTitle: {
    pivotList: string[];
  };
}

export type AlarmPivotMonitorListProps = {
  title: string;
  dataSource: PivotItem[];
  form: ReactNode;
  size?: 'small' | 'default' | 'large';
};

const LevelGaugeList: React.FC<AlarmPivotMonitorListProps> = (props) => {
  const { lg } = useScreenHook();

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
    243, 226, 192,
  ];

  const className = useEmotionCss(({ token }) => {
    return {
      '.ant-pro-list-row-header-title': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      '.ant-pro-card .ant-pro-card-body': {
        [`@media screen and (max-width: ${token.screenMD}px)`]: {
          paddingInline: 4,
        },
      },
      '.ant-pro-table-list-toolbar-container': {
        [`@media screen and (max-width: ${token.screenMD}px)`]: {
          flexWrap: 'nowrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      '.ant-pro-table-list-toolbar-left': {
        [`@media screen and (max-width: ${token.screenMD}px)`]: {
          marginBlockEnd: 0,
        },
      },
      '.ant-list-item': {
        [`@media screen and (max-width: ${token.screenMD}px)`]: {
          padding: '16px 0px',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 12,
        },
      },
    };
  });

  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);

  return (
    <div className={className}>
      <ProList<PivotItem>
        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
        rowKey="id"
        size={props.size}
        headerTitle={props.title}
        dataSource={props.dataSource}
        showActions="hover"
        editable={{
          onSave: async () => {
            return true;
          },
        }}
        toolBarRender={() => {
          return [props.form];
        }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          avatar: {
            dataIndex: 'image',
            editable: false,
            render: () => <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
          },
          description: {
            dataIndex: 'description',
            render: (dom: any) => {
              return (
                <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <TinyArea
                      height={100}
                      autoFit={false}
                      data={data}
                      smooth={true}
                      tooltip={false}
                      color={'#E5EDFE'}
                      pattern={{
                        type: 'line',
                        cfg: {
                          stroke: '#5B8FF9',
                        },
                      }}
                      annotations={[
                        {
                          type: 'line',
                          start: ['min', 'mean'],
                          end: ['max', 'mean'],
                          text: {
                            content: 'ffff',
                            offsetY: -2,
                            style: {
                              textAlign: 'left',
                              fontSize: 10,
                              fill: 'rgba(44, 53, 66, 0.45)',
                              textBaseline: 'bottom',
                            },
                          },
                          style: {
                            stroke: 'rgba(0, 0, 0, 0.25)',
                          },
                        },
                        {
                          type: 'line',
                          start: ['min', 800],
                          end: ['max', 800],
                          text: {
                            content: 'eeee',
                            offsetY: -2,
                            style: {
                              textAlign: 'left',
                              fontSize: 10,
                              fill: 'rgba(44, 53, 66, 0.45)',
                              textBaseline: 'bottom',
                            },
                          },
                          style: {
                            stroke: 'rgba(0, 0, 0, 0.55)',
                          },
                        },
                      ]}
                    />
                  </Col>
                  <Col span={12}>
                    <Row align={'middle'} style={{ height: '100%' }}>
                      <Space direction="vertical" size={'large'}>
                        {dom.value?.map((item: any, index: number) => (
                          <Space key={`alarm-level-gauge-list-pivot-${index}`}>
                            <Typography.Text type="secondary">{item.key}</Typography.Text>

                            <Typography.Text>{item.value}</Typography.Text>
                          </Space>
                        ))}
                      </Space>
                    </Row>
                  </Col>
                </Row>
              );
            },
          },
          actions: {
            render: () => [
              <Button size={lg ? 'middle' : 'small'} key="1-btn-" icon={<EditFilled />} />,
              <Button size={lg ? 'middle' : 'small'} key="2-btn-" icon={<DeleteFilled />} />,
              <Switch size={lg ? 'default' : 'small'} key="1-swtich" />,
            ],
          },
          subTitle: {
            dataIndex: 'subTitle',
            render: (dom: any) => (
              <Space direction="vertical" size={'middle'} style={{ marginTop: 12 }}>
                <Space size={2} style={{ margin: 0 }} wrap>
                  {dom?.pivotList?.map((it: string, index: number) => (
                    <Tag key={`alarm-pivot-monitor-list-pivot-${index}`}>{it}</Tag>
                  ))}
                </Space>
              </Space>
            ),
          },
        }}
      />
    </div>
  );
};

export default LevelGaugeList;
