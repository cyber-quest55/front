import AddIrpdAlarmForm from '@/components/Forms/AddAlarmForm/Irpd';
import EditIrpdAlarmForm from '@/components/Forms/EditAlarmForm/Irpd';
import EditPivotMonitorAlarmForm from '@/components/Forms/EditAlarmForm/PivotMonitor';
import { useScreenHook } from '@/hooks/screen';
import { getIrpds } from '@/services/irpd';
import {
  deleteIrpdNotification,
  enableIrpdNotification,
  getIrpdNotifications,
  getPivotNotificationsReasons,
} from '@/services/notification';
import { BellOutlined, DeleteFilled } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Col, Modal, Row, Switch, Tag, Typography } from 'antd';
import React, { ReactText, useEffect, useState } from 'react';

export type AlarmIrpdListProps = {
  title: string;
  size?: 'small' | 'default' | 'large';
};

const AlarmIrpdList: React.FC<AlarmIrpdListProps> = (props) => {
  const { lg } = useScreenHook();
  const intl = useIntl();
  const getIrpdNotificationsReq = useRequest(getIrpdNotifications, {
    manual: true,
  });
  const getIrpdsReq = useRequest(getIrpds, { manual: true });
  const getPivotNotificationsReasonsReq = useRequest(getPivotNotificationsReasons, {
    manual: true,
  });
  const deleteIrpdNotificationReq = useRequest(deleteIrpdNotification, {
    manual: true,
  });
  const enableIrpdNotificationReq = useRequest(enableIrpdNotification, {
    manual: true,
  });
  const { message } = App.useApp();
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const [notificationsMapped, setNotificationsMapped] = useState<any>([]);
  const [reasons, setReasons] = useState<any>([]);
  const [irpds, setIrpds] = useState<any>([]);
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteNotification = async () => {
    try {
      await deleteIrpdNotificationReq.runAsync({ notificationId: itemToDeleteId });
      setNotificationsMapped(notificationsMapped.filter((n) => n.id !== itemToDeleteId));
      setIsModalOpen(false);
    } catch (err) {
      message.error('Fail');
    }
  };

  const handleEnableNotification = async (id: number, checked: boolean, index: number) => {
    try {
      await enableIrpdNotificationReq.runAsync({ notificationId: id }, { enable: checked });
      const newNotificationMapped = [...notificationsMapped];
      newNotificationMapped[index].enable = checked;
      setNotificationsMapped(newNotificationMapped);
    } catch (err) {
      message.error('Fail');
    }
  };

  const className = useEmotionCss(({ token }) => {
    return {
      '.ant-list .ant-list-item': {
        alignItems: 'baseline',
      },
    };
  });

  useEffect(() => {
    Promise.all([
      getIrpdsReq.runAsync({ id: params.farmId as any }),
      getIrpdNotificationsReq.runAsync(),
      getPivotNotificationsReasonsReq.runAsync({ equipmentType: 2, language: 'en' }),
    ]).then(([irpds, notifications, reasons]) => {
      let newNotificationMapped = [];
      for (let notification of notifications) {
        newNotificationMapped.push({
          ...notification,
          title: {
            name: notification.name,
            startDate: notification.start,
            endDate: notification.end,
            devices: irpds.filter((pivot: any) => notification.devices.includes(pivot.id)),
          },
          reasons: reasons.filter((reason: any) => notification.reasons.includes(reason.id)),
          criticalReasons: reasons.filter((reason: any) =>
            notification.critical_reasons.includes(reason.id),
          ),
        });
      }
      setReasons(reasons);
      setIrpds(irpds);
      setNotificationsMapped(newNotificationMapped);
    });
  }, []);

  const refresh = async () => {
    let newNotificationMapped: any[] = [];
    await getIrpdNotificationsReq.runAsync().then((notifications) => {
      for (let notification of notifications) {
        newNotificationMapped.push({
          ...notification,
          title: {
            name: notification.name,
            startDate: notification.start,
            endDate: notification.end,
            devices: irpds.filter((pivot: any) => notification.devices.includes(pivot.id)),
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
    <div>
      <ProList<any>
        className={className}
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
          <AddIrpdAlarmForm
            key="form"
            reasons={reasons}
            irpds={irpds}
            refresh={refresh}
          />,
        ]}
        metas={{
          title: {
            dataIndex: ['title'],
            render: (dom) => (
              <Row justify="space-between" gutter={[12, 12]}>
                <Col>
                  <div>
                    <Typography.Text>{dom.name}</Typography.Text>
                  </div>
                  <div>
                    <Typography.Text type="secondary" style={{ fontWeight: 'lighter' }}>
                      {dom.startDate === '00:00:00' && dom.endDate === '23:59:59'
                        ? intl.formatMessage({
                            id: 'component.alarmpivotlist.allday.text',
                          })
                        : `${dom.startDate} > ${dom.endDate}`}
                    </Typography.Text>
                  </div>
                  <div>
                    {dom?.devices?.map((it: any, index: number) => (
                      <Tag key={`alarm-pivot-monitor-list-pivot-${index}`}>{it.name}</Tag>
                    ))}
                  </div>
                </Col>
              </Row>
            ),
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
                <Row gutter={[12, 4]}>
                  {dom?.map((it: any, index: number) => (
                    <Col key={`alarm-pivot-monitor-list-tag-${index}`}>
                      <Typography.Text type="secondary">{it.label}</Typography.Text>
                    </Col>
                  ))}
                </Row>
              );
            },
          },
          actions: {
            render: (dom, item, index) => [
              <EditIrpdAlarmForm
                key={item.id}
                reasons={reasons}
                irpds={irpds}
                refresh={refresh}
                notification={item}
              />,
              <div key={item.id}>
                <Button
                  onClick={() => {
                    showModal();
                    setItemToDeleteId(item.id);
                  }}
                  size={lg ? 'middle' : 'small'}
                  icon={<DeleteFilled />}
                />
              </div>,
              <Switch
                checked={item.enable}
                onChange={(checked) => handleEnableNotification(item.id, checked, index)}
                size={lg ? 'default' : 'small'}
                key="1-swtich"
              />,
            ],
          },
        }}
      />
      <Modal
        title={intl.formatMessage({
          id: 'component.alarmpivotlist.deletemodal.title',
        })}
        open={isModalOpen}
        onOk={handleDeleteNotification}
        onCancel={handleCancel}
      >
        <p>
          {intl.formatMessage({
            id: 'component.alarmpivotlist.deletemodal.text',
          })}
        </p>
      </Modal>
    </div>
  );
};

export default AlarmIrpdList;
