import AddPivotMonitorAlarmForm from '@/components/Forms/AddAlarmForm/PivotMonitor';
import EditPivotMonitorAlarmForm from '@/components/Forms/EditAlarmForm/PivotMonitor';
import { useScreenHook } from '@/hooks/screen';
import {
  deletePivotMonitorNotificationAction,
  enablePivotMonitorNotificationAction,
  NotificationMapped,
  queryPivotMonitorNotifications,
} from '@/models/pivot-monitor-notification';
import {
  deletePivotMonitorNotification,
  enablePivotMonitorNotification,
} from '@/services/notification';
import { BellOutlined, DeleteFilled } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Col, Empty, Modal, Row, Spin, Switch, Tag, Tooltip, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

export type AlarmPivotMonitorListProps = {
  title: string;
  queryPivotMonitorNotifications: typeof queryPivotMonitorNotifications;
  enablePivotMonitorNotificationAction: typeof enablePivotMonitorNotificationAction;
  deletePivotMonitorNotificationAction: typeof deletePivotMonitorNotificationAction;
  notificationsFormatted: NotificationMapped[];
  reasons: APIModels.NotificationReason[];
  loading: boolean;
  pivots: APIModels.PivotByFarm[];
};

const AlarmPivotMonitorList: React.FC<AlarmPivotMonitorListProps> = (props) => {
  const { lg } = useScreenHook();
  const intl = useIntl();
  const { reasons, pivots, loading, notificationsFormatted } = props;
  const deletePivotMonitorNotificationReq = useRequest(deletePivotMonitorNotification, {
    manual: true,
  });
  const enablePivotMonitorNotificationReq = useRequest(enablePivotMonitorNotification, {
    manual: true,
  });
  const { message } = App.useApp();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number>(-1);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteNotification = async () => {
    try {
      await deletePivotMonitorNotificationReq.runAsync({ notificationId: itemToDeleteId });
      props.deletePivotMonitorNotificationAction(itemToDeleteId);
      setIsModalOpen(false);
    } catch (err) {
      message.error('Fail');
    }
  };

  const handleEnableNotification = async (id: number, checked: boolean, index: number) => {
    try {
      await enablePivotMonitorNotificationReq.runAsync({ notificationId: id }, { enable: checked });
      props.enablePivotMonitorNotificationAction({ enable: checked, index });
    } catch (err) {
      message.error('Fail');
    }
  };

  useEffect(() => {
    props.queryPivotMonitorNotifications({ farmId: params.farmId });
  }, []);

  const className = useEmotionCss(() => {
    return {
      '.ant-pro-card-header': {
        alignItems: 'baseline'
      },
    };
  });

  return (
    <ProCard
      ghost
      className={className}
      title={props.title}
      loading={
        loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        ) : (
          false
        )
      }
      direction="column"
      gutter={[0, 16]}
      extra={
        <AddPivotMonitorAlarmForm
          reasons={reasons}
          pivots={pivots}
          queryPivotMonitorNotifications={props.queryPivotMonitorNotifications}
        />
      }
    >
      {notificationsFormatted.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        notificationsFormatted.map((notification: any, index: number) => {
          return (
            <ProCard
              key={notification.id}
              title={
                <span>
                  <span>
                    <BellOutlined style={{ fontSize: 18, marginTop: 2 }}></BellOutlined>
                  </span>
                  <span style={{ marginLeft: 8 }}>
                    <Typography.Text strong>{notification.name}</Typography.Text>{' '}
                  </span>
                  <span style={{ marginLeft: 8 }}>
                    <Typography.Text type="secondary" style={{ fontWeight: 'lighter' }}>
                      {notification.start === '00:00:00' && notification.end === '23:59:59'
                        ? intl.formatMessage({
                            id: 'component.alarmlist.allday.text',
                          })
                          : `${moment(notification.start, 'HH:mm:ss').format('HH:mm')} > ${moment(
                            notification.end,
                            'HH:mm:ss',
                          ).format('HH:mm')}`}
                    </Typography.Text>
                    <div style={{ marginLeft: 22, marginTop: 8 }}>
                      {notification?.devices.map((it: any, index: number) => (
                        <Tag key={index}>{it.name}</Tag>
                      ))}
                    </div>
                  </span>
                </span>
              }
              bordered
              headerBordered
              collapsible
              defaultCollapsed
              size="small"
              extra={
                <Row
                  gutter={[8, 8]}
                  align="middle"
                  style={{ flexDirection: lg ? 'row' : 'column' }}
                >
                  <Col>
                    <EditPivotMonitorAlarmForm
                      reasons={reasons}
                      pivots={pivots}
                      queryPivotMonitorNotifications={props.queryPivotMonitorNotifications}
                      notification={notification}
                    />
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        showModal();
                        setItemToDeleteId(notification.id);
                      }}
                      size={lg ? 'middle' : 'small'}
                      key="2-btn-"
                      icon={<DeleteFilled />}
                    />
                  </Col>
                  <Col>
                    <Switch
                      checked={notification.enable}
                      onChange={(checked) =>
                        handleEnableNotification(notification.id, checked, index)
                      }
                      size={lg ? 'default' : 'small'}
                      key="1-swtich"
                    />
                  </Col>
                </Row>
              }
            >
              <Row gutter={[8, 8]} style={{ flexDirection: 'column' }}>
                <Row gutter={[0, 8]}>
                  {notification?.reasons?.map((reason: any, index: number) => (
                    <Col key={index}>
                      <Tag
                        style={{ display: 'flex', alignItems: 'center' }}
                        icon={
                          notification.critical_reasons.includes(reason.id) ? (
                            <Tooltip
                              title={intl.formatMessage({
                                id: 'component.alarmlist.critical.tooltip',
                              })}
                            >
                              <IoAlertCircleOutline
                                color="#DA1D29"
                                size={18}
                                style={{ marginRight: 7 }}
                              />
                            </Tooltip>
                          ) : null
                        }
                      >
                        {reason.label}
                      </Tag>
                    </Col>
                  ))}
                </Row>
              </Row>
            </ProCard>
          );
        })
      )}
      <Modal
        title={intl.formatMessage({
          id: 'component.alarmlist.deletemodal.title',
        })}
        centered
        open={isModalOpen}
        onOk={handleDeleteNotification}
        onCancel={handleCancel}
      >
        <p>
          {intl.formatMessage({
            id: 'component.alarmlist.deletemodal.text',
          })}
        </p>
      </Modal>
    </ProCard>
  );
};

export default AlarmPivotMonitorList;
