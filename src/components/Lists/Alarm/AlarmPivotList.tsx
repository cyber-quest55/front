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
import { BellOutlined, DeleteFilled } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Col,  Modal, Row, Switch, Tag, Typography } from 'antd';
import React, { ReactText, useEffect, useState } from 'react';

export type AlarmPivotListProps = {
  title: string;
  size?: 'small' | 'default' | 'large';
};

const AlarmPivotList: React.FC<AlarmPivotListProps> = (props) => {
  const { lg } = useScreenHook();
  const intl = useIntl();
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

  const handleDeleteNotification = async (id: number) => {
    try {
      await deletePivotNotificationReq.runAsync({ notificationId: id });
      setNotificationsMapped(notificationsMapped.filter((n) => n.id !== id));
      setIsModalOpen(false);
    } catch (err) {
      message.error('Fail');
    }
  };

  const handleEnableNotification = async (id: number, checked: boolean, index: number) => {
    try {
      await enablePivotNotificationReq.runAsync({ notificationId: id }, { enable: checked });
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
      getPivotsReq.runAsync({ id: params.farmId as any }),
      getPivotNotificationsReq.runAsync(),
      getPivotNotificationsReasonsReq.runAsync({ equipmentType: 0, language: 'en' }),
    ]).then(([pivots, notifications, reasons]) => {
      let newNotificationMapped = [];
      for (let notification of notifications) {
        newNotificationMapped.push({
          ...notification,
          title: {
            name: notification.name,
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
          title: {
            name: notification.name,
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
          <AddPivotAlarmForm key="form" reasons={reasons} pivots={pivots} refresh={refresh} />,
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
                    {dom?.devices.map((it: any, index: number) => (
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
              <>
                <EditPivotAlarmForm
                  reasons={reasons}
                  pivots={pivots}
                  refresh={refresh}
                  notification={item}
                />
              </>,
              <>
                <Button
                  onClick={showModal}
                  size={lg ? 'middle' : 'small'}
                  key="2-btn-"
                  icon={<DeleteFilled />}
                />
                <Modal
                  title={intl.formatMessage({
                    id: 'component.alarmpivotlist.deletemodal.title',
                  })}
                  open={isModalOpen}
                  onOk={() => handleDeleteNotification(item.id)}
                  onCancel={handleCancel}
                >
                  <p>
                    {intl.formatMessage({
                      id: 'component.alarmpivotlist.deletemodal.text',
                    })}
                  </p>
                </Modal>
              </>,
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
    </div>
  );
};

export default AlarmPivotList;
