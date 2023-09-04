import { useScreenHook } from '@/hooks/screen';
import { BellOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Col, Row, Switch, Typography } from 'antd';
import React, { ReactNode, ReactText, useState } from 'react';

interface PivotItem {
  id: string;
  name: string;
  image: string;
  description: string[];
}

export type AlarmServiceOrdersListProps = {
  title: string;
  dataSource: PivotItem[];
  form: ReactNode;
  size?: 'small' | 'default' | 'large';
};

const AlarmServiceOrdersList: React.FC<AlarmServiceOrdersListProps> = (props) => {
  const { lg } = useScreenHook();

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
          display: 'flex',
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
                  {dom?.map((it: string, index: number) => (
                    <Col key={`alarm-pivot-monitor-list-tag-${index}`} xs={24} md={12}>
                      <Typography.Text type="secondary">{it}</Typography.Text>
                    </Col>
                  ))}
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
          },
        }}
      />
    </div>
  );
};

export default AlarmServiceOrdersList;
