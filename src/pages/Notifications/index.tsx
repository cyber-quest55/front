import AlarmIrpdList from '@/components/Lists/Alarm/AlarmIrpdList';
import AlarmPivotList from '@/components/Lists/Alarm/AlarmPivotList';
import AlarmPivotMonitorList from '@/components/Lists/Alarm/AlarmPivotMonitorList';
import { useScreenHook } from '@/hooks/screen';
import {
  deleteIrpdNotificationAction,
  enableIrpdNotificationAction,
  queryIrpdNotifications,
} from '@/models/irpd-notification';
import {
  deletePivotMonitorNotificationAction,
  enablePivotMonitorNotificationAction,
  queryPivotMonitorNotifications,
} from '@/models/pivot-monitor-notification';
import {
  deletePivotNotificationAction,
  enablePivotNotificationAction,
  queryPivotNotifications,
} from '@/models/pivot-notification';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { connect } from 'dva';
import React from 'react';

const Notifications: React.FC = (props: any) => {
  const { lg } = useScreenHook();
  const intl = useIntl();

  const tabs = [
    {
      key: 'pivot',
      label: intl.formatMessage({
        id: 'pages.notifications.tab.pivot',
      }),
      children: (
        <AlarmPivotList
          notificationsFormatted={props.pivotNotifications.notificationsFormatted}
          reasons={props.pivotNotifications.reasons}
          pivots={props.pivotNotifications.pivots}
          loading={props.pivotNotifications.loading}
          queryPivotNotifications={props.queryPivotNotifications}
          deletePivotNotificationAction={props.deletePivotNotificationAction}
          enablePivotNotificationAction={props.enablePivotNotificationAction}
          title={intl.formatMessage({
            id: 'pages.notifications.tab.pivot',
          })}
        />
      ),
    },
    {
      key: 'monitor',
      label:intl.formatMessage({
        id: 'pages.notifications.tab.pivotmonitor',
      }),
      children: (
        <AlarmPivotMonitorList
          notificationsFormatted={props.pivotMonitorNotifications.notificationsFormatted}
          reasons={props.pivotMonitorNotifications.reasons}
          pivots={props.pivotMonitorNotifications.pivots}
          loading={props.pivotMonitorNotifications.loading}
          queryPivotMonitorNotifications={props.queryPivotMonitorNotifications}
          deletePivotMonitorNotificationAction={props.deletePivotMonitorNotificationAction}
          enablePivotMonitorNotificationAction={props.enablePivotMonitorNotificationAction}
          title={intl.formatMessage({
            id: 'pages.notifications.tab.pivotmonitor',
          })}
        />
      ),
    },
    {
      key: 'pump',
      label: intl.formatMessage({
        id: 'pages.notifications.tab.irpd',
      }),
      children: (
        <AlarmIrpdList
          notificationsFormatted={props.irpdNotifications.notificationsFormatted}
          reasons={props.irpdNotifications.reasons}
          irpds={props.irpdNotifications.irpds}
          loading={props.irpdNotifications.loading}
          queryIrpdNotifications={props.queryIrpdNotifications}
          deleteIrpdNotificationAction={props.deleteIrpdNotificationAction}
          enableIrpdNotificationAction={props.enableIrpdNotificationAction}
          title={intl.formatMessage({
            id: 'pages.notifications.tab.irpd',
          })}
        />
      ),
    },
  ];

  return (
    <div>
      <PageContainer
        breadcrumb={{
          items: [
            {
              path: '',
              title: intl.formatMessage({
                id: 'pages.notifications.breadcrumb.title',
              })
            },
          ],
        }}
      >
        <ProCard
          tabs={{
            tabPosition: lg ? 'left' : 'top',
            items: tabs,
            destroyInactiveTabPane: true,
          }}
        />
      </PageContainer>
    </div>
  );
};

const mapStateToProps = ({ pivotNotifications, pivotMonitorNotifications, irpdNotifications }: any) => ({
  pivotNotifications,
  pivotMonitorNotifications,
  irpdNotifications
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryPivotNotifications: (props: any) => dispatch(queryPivotNotifications(props)),
  deletePivotNotificationAction: (props: any) => dispatch(deletePivotNotificationAction(props)),
  enablePivotNotificationAction: (props: any) => dispatch(enablePivotNotificationAction(props)),
  queryPivotMonitorNotifications: (props: any) => dispatch(queryPivotMonitorNotifications(props)),
  deletePivotMonitorNotificationAction: (props: any) =>
    dispatch(deletePivotMonitorNotificationAction(props)),
  enablePivotMonitorNotificationAction: (props: any) =>
    dispatch(enablePivotMonitorNotificationAction(props)),
  queryIrpdNotifications: (props: any) => dispatch(queryIrpdNotifications(props)),
  deleteIrpdNotificationAction: (props: any) => dispatch(deleteIrpdNotificationAction(props)),
  enableIrpdNotificationAction: (props: any) => dispatch(enableIrpdNotificationAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
