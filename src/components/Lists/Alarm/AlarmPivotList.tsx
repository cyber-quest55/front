import AddPivotAlarmForm from '@/components/Forms/AddAlarmForm/Pivot';
import EditPivotAlarmForm from '@/components/Forms/EditAlarmForm/Pivot';
import { useScreenHook } from '@/hooks/screen';
import {
  deletePivotNotification,
  enablePivotNotification,
  getPivotNotifications,
  getPivotNotificationsReasons,
} from '@/services/notification';
import { getPivots } from '@/services/pivot';
import { BellOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Col, Modal, Row, Space, Switch, Tag, Typography } from 'antd';
import React, { ReactText, useEffect, useState } from 'react';
interface PivotItem {
  id: string;
  name: string;
  image: string;
  description: string[];
  subTitle: {
    date: string;
    pivotList: string[];
  };
}

export type AlarmPivotListProps = {
  title: string;
  dataSource: PivotItem[];
  size?: 'small' | 'default' | 'large';
};

const AlarmPivotList: React.FC<AlarmPivotListProps> = (props) => {
  const { lg } = useScreenHook();
  const getPivotNotificationsReq = useRequest(getPivotNotifications, { manual: true });
  const getPivotsReq = useRequest(getPivots, { manual: true });
  const getPivotNotificationsReasonsReq = useRequest(getPivotNotificationsReasons, {
    manual: true,
  });
  const deletePivotNotificationReq = useRequest(deletePivotNotification, { manual: true });
  const enablePivotNotificationReq = useRequest(enablePivotNotification, { manual: true });
  const { message } = App.useApp();
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const [notificationsMapped, setNotificationsMapped] = useState<any>([]);
  const [reasons, setReasons] = useState<any>([]);
  const [pivots, setPivots] = useState<any>([]);
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeletePivotNotification = async (id: number) => {
    try {
      await deletePivotNotificationReq.runAsync({ notificationId: id });
      setNotificationsMapped(notificationsMapped.filter((n) => n.id !== id));
      message.success('Notificação deletada com sucesso');
      setIsModalOpen(false);
    } catch (err) {
      message.error('Fail');
    }
  };

  const handleEnablePivotNotification = async (id: number, checked: boolean, index: number) => {
    try {
      await enablePivotNotificationReq.runAsync({ notificationId: id }, { enable: checked });
      message.success(`Notificação ${checked ? 'ativada' : 'desativada'} com sucesso`);
      const newNotificationMapped = [...notificationsMapped];
      newNotificationMapped[index].enable = checked;
      setNotificationsMapped(newNotificationMapped);
    } catch (err) {
      message.error('Fail');
    }
  };

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

  useEffect(() => {
    Promise.all([
      getPivotsReq.runAsync({ id: params.farmId as any }),
      getPivotNotificationsReq.runAsync(),
      getPivotNotificationsReasonsReq.runAsync({ equipmentType: 0, language: 'en' }),
    ]).then(([pivots, notifications, reasons]) => {
      let newNotificationMapped = [];
      for (let notification of notifications) {
        newNotificationMapped.push({
          ...notification,
          subTitle: {
            startDate: notification.start,
            endDate: notification.end,
            devices: pivots.filter((pivot: any) => notification.devices.includes(pivot.id)),
          },
          reasons: reasons.filter((reason: any) => notification.reasons.includes(reason.id)),
          criticalReasons: reasons.filter((reason: any) =>
            notification.critical_reasons.includes(reason.id),
          ),
        });
      }
      setReasons(reasons);
      setPivots(pivots);
      setNotificationsMapped(newNotificationMapped);
    });
  }, []);

  const refresh = async () => {
    let newNotificationMapped: any[] = [];
    await getPivotNotificationsReq.runAsync().then((notifications) => {
      for (let notification of notifications) {
        newNotificationMapped.push({
          ...notification,
          subTitle: {
            startDate: notification.start,
            endDate: notification.end,
            devices: pivots.filter((pivot: any) => notification.devices.includes(pivot.id)),
          },
          reasons: reasons.filter((reason: any) => notification.reasons.includes(reason.id)),
          criticalReasons: reasons.filter((reason: any) =>
            notification.critical_reasons.includes(reason.id),
          ),
        });
      }
      setNotificationsMapped(newNotificationMapped);
    });
  };

  return (
    <div className={className}>
      <ProList<PivotItem>
        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
        rowKey="id"
        size={props.size}
        headerTitle={props.title}
        dataSource={notificationsMapped}
        showActions="hover"
        editable={{
          onSave: async () => {
            return true;
          },
        }}
        toolBarRender={() => [
          <AddPivotAlarmForm key="form" reasons={reasons} pivots={pivots} refresh={refresh} />,
        ]}
        metas={{
          title: {
            dataIndex: ['name'],
            render: (it) => <Typography.Text>{it}</Typography.Text>,
          },
          avatar: {
            dataIndex: 'image',
            editable: false,
            render: () => <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
          },
          description: {
            dataIndex: 'reasons',
            render: (dom: any) => {
              return (
                <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                  {dom?.map((it: any, index: number) => (
                    <Col key={`alarm-pivot-monitor-list-tag-${index}`} xs={24} md={12}>
                      <Typography.Text type="secondary">{it.label}</Typography.Text>
                    </Col>
                  ))}
                </Row>
              );
            },
          },
          actions: {
            render: (dom, item, index) => [
              <>
                <EditPivotAlarmForm reasons={reasons} pivots={pivots} refresh={refresh} notification={item} />
              </>,
              <>
                <Button
                  onClick={showModal}
                  size={lg ? 'middle' : 'small'}
                  key="2-btn-"
                  icon={<DeleteFilled />}
                />
                <Modal
                  title="Basic Modal"
                  open={isModalOpen}
                  onOk={() => handleDeletePivotNotification(item.id)}
                  onCancel={handleCancel}
                >
                  <p>Some contents...</p>
                </Modal>
              </>,
              <Switch
                checked={item.enable}
                onChange={(checked) => handleEnablePivotNotification(item.id, checked, index)}
                size={lg ? 'default' : 'small'}
                key="1-swtich"
              />,
            ],
          },
          subTitle: {
            dataIndex: 'subTitle',
            render: (dom: any) => (
              <Space direction="vertical" size={'middle'} style={{ marginTop: 4 }}>
                <Typography.Text type="secondary" style={{ fontWeight: 'lighter' }}>
                  {dom.startDate === '00:00:00' && dom.endDate === '23:59:59'
                    ? 'Dia todo'
                    : `${dom.startDate} > ${dom.endDate}`}
                </Typography.Text>
                <Space size={2} style={{ margin: 0 }} wrap>
                  {dom?.devices.map((it: any, index: number) => (
                    <Tag key={`alarm-pivot-monitor-list-pivot-${index}`}>{it.name}</Tag>
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

export default AlarmPivotList;
