import { getIntl } from '@umijs/max';
import { getPivotEventUpdateStatus, getPivotEventCentralStatus } from './get-pivot-event-status';
import { getPivotStatus } from './get-pivot-status';


export const getPivotBadgeStatus = (messageStatus: number) => {
  return messageStatus === 2 ? "success" : "processing"
}


export const getPivotHistoryFmt = (data: APIModels.PivotHistory[]) => {
  const intl = getIntl();

  return data.map((item, key) => {
    if (item.CentralStream !== undefined) {
      return {
        ...item.CentralStream,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.1',
        }),
        customStatus: getPivotEventCentralStatus(item.CentralStream.status),
        key,
      };
    }

    if (item.ControllerStream_panel !== undefined) {
      const content = item?.ControllerStream_panel?.content;
      return {
        ...item.ControllerStream_panel,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.2',
        }),
        customStatus: getPivotEventUpdateStatus(
          content?.irrigation_status?.irrigation_status,
          content?.current_irrigation_information?.direction,
          content?.current_irrigation_information?.mode,
          content?.current_irrigation_information?.irrigation_percent,
        ),
        key,
      };
    }

    if (item.ControllerStream_gps !== undefined) {
      const content = item?.ControllerStream_gps?.content;
      return {
        ...item.ControllerStream_gps,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.3',
        }),
        customStatus: `${content?.current_angle?.current_angle}°
            | ${content?.current_irrigation_information?.irrigation_percent}%
            | ${content?.center_pressure?.center_pressure} bar
            | ${content?.voltage_measure?.voltage_measure} V`,
        key,
      };
    }

    /**
    if (item.ControllerAction_schedule !== undefined) {
      return {
        ...item.ControllerAction_schedule,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.5',
        }),
        key,
      };
    }
    */

    if (item.ControllerAction_stop !== undefined) {
      return {
        ...item.ControllerAction_stop,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.4',
        }),
        customStatus: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.3.value.1',
        }),
        key,
      };
    }

    if (item.ControllerAction_simple !== undefined) {

      return {
        ...item.ControllerAction_simple,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.4',
        }),
        customStatus: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.3.value.8',
        }),
        badgeStatus: getPivotBadgeStatus(item.ControllerAction_simple.message_status),

        badge: true,
        key,
      };
    }


    if (item.ControllerAction_schedule !== undefined) {

      return {
        ...item.ControllerAction_schedule,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.4',
        }),
        customStatus: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.3.value.9',
        }),
        badgeStatus: getPivotBadgeStatus(item.ControllerAction_schedule.message_status),

        badge: true,

        key,
      };
    }

    if (item.ControllerAction_segment !== undefined) {

      return {
        ...item.ControllerAction_segment,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.4',
        }),
        customStatus: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.3.value.7',
        }),
        badgeStatus: getPivotBadgeStatus(item.ControllerAction_segment.message_status),

        badge: true,

        key,
      };
    }

    const content = (item?.ControllerAction_simple as any)?.content;

    return {
      ...item.ControllerAction_simple || {},
      badge: true,
      customStatus: getPivotStatus(content?.irrigation_status?.irrigation_status as number),
      customType: intl.formatMessage({
        id: 'component.pivot.tab.history.event.table.col.2.value.4',
      }),
      key,
    };
  });
}

