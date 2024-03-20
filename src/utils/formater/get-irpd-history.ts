// Dependencies
import { getIntl } from '@umijs/max';
import { PumpHistoryOrigin } from '@/utils/enum/pump-history-origin';
import { getCentralEventStatus } from '@/utils/formater/get-irpd-event-status';
import { getIrpdOrigin } from '@/utils/formater/get-irpd-origin';
import { getIrpdStatus, getIrpdTurnedOnOrOffStatus } from '@/utils/formater/get-irpd-status';
import { formatDate, formatDayJsDate } from './get-formated-date';

// Badge status
export const getIrpdBadgeStatus = (messageStatus: number) => {
  return messageStatus === 2 ? 'success': 'processing';
}

export const getIrpdHistoryArrayFmt = (data: APIModels.IrpdHistoryCompleteListItem[]) => {
  // Translations
  const intl = getIntl();

  // Map API data
  return data.map((item: APIModels.IrpdHistoryCompleteListItem, key: number) => {

    // Default action from endpoint (list) [Ok]
    if (item.irpd_action_v5 !== undefined) {

      // Pump is on/off
      let status = getIrpdStatus(item.irpd_action_v5.message_status);
      if (
        item.irpd_action_v5.message_subtype === 'simple' &&
        item.irpd_action_v5.content.pump_action
      ) {
        status = getIrpdTurnedOnOrOffStatus(
          item.irpd_action_v5.content.pump_action.enable
        );
      }

      // Schedule forced status
      if (item.irpd_action_v5.message_subtype === 'schedule') {
        status = getIrpdStatus(5);
      }

      return {
        ...item.irpd_action_v5,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.Command),
        customStatus: status,
        badge: true,
        badgeStatus: getIrpdBadgeStatus(item.irpd_action_v5.message_status),
        origin: PumpHistoryOrigin.Command,
        created: formatDayJsDate(item.irpd_action_v5.created),
        arrived: item.irpd_action_v5.arrived ? formatDate(item.irpd_action_v5.arrived) : null,
      };
    }

    // Default stream from endpoint (list) [OK]
    if (item.irpd_stream_v5 !== undefined) {

      // Pumping virtual status
      let status = getIrpdStatus(item.irpd_stream_v5?.content?.imanage_master_status.status);
      if (
        item.irpd_stream_v5.message_subtype === 'periodic' &&
        [1, 2, 3, 4, 7].includes(
          item.irpd_stream_v5?.content?.imanage_master_status.status
        )
      ) {
        status = intl.formatMessage({
          id: 'component.irpd.tab.history.event.table.status.pumping',
        });
      }

      return {
        ...item.irpd_stream_v5,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.PumpUpdate),
        customStatus: status,
        badge: false,
        badgeStatus: '',
        origin: PumpHistoryOrigin.PumpUpdate,
        created: formatDayJsDate(item.irpd_stream_v5.created),
        arrived: item.irpd_stream_v5.arrived ? formatDate(item.irpd_stream_v5.arrived) : null,
      };
    }

    // Central stream history (Websocket and list) [OK]
    if (item.CentralStream !== undefined) {
      return {
        ...item.CentralStream,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.CentralUpdate),
        customStatus: getCentralEventStatus(item.CentralStream.status),
        badge: false,
        badgeStatus: '',
        origin: PumpHistoryOrigin.CentralUpdate,
        created: formatDayJsDate(item.CentralStream.created),
        arrived: null,
      };
    }

    // Irpd stream (Websocket) [OK]
    if (item.IrpdStreamV5_periodic) {
      // Pumping virtual status
      let status = getIrpdStatus(item.IrpdStreamV5_periodic?.content?.imanage_master_status.status);
      if (
        item.IrpdStreamV5_periodic.message_subtype === 'periodic' &&
        [1, 2, 3, 4, 7].includes(
          item.IrpdStreamV5_periodic?.content?.imanage_master_status.status
        )
      ) {
        status = intl.formatMessage({
          id: 'component.irpd.tab.history.event.table.status.pumping',
        });
      }

      return {
        ...item.IrpdStreamV5_periodic,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.PumpUpdate),
        customStatus: status,
        badge: false,
        badgeStatus: '',
        origin: PumpHistoryOrigin.PumpUpdate,
        created: formatDayJsDate(item.IrpdStreamV5_periodic.created),
        arrived: item.IrpdStreamV5_periodic.arrived ? formatDate(item.IrpdStreamV5_periodic.arrived) : null,
      };
    }

    // Schedule stream (Websocket)
    if (item.IrpdActionV5_schedule) {
      
      // Schedule status
      let status = getIrpdStatus(item.IrpdActionV5_schedule.message_status);
      if (item.IrpdActionV5_schedule.message_subtype === 'schedule') {
        status = getIrpdStatus(5);
      }

      return {
        ...item.IrpdActionV5_schedule,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.Command),
        customStatus: status,
        badge: true,
        badgeStatus: getIrpdBadgeStatus(item.IrpdActionV5_schedule.message_status),
        origin: PumpHistoryOrigin.Command,
        created: formatDayJsDate(item.IrpdActionV5_schedule.created),
        arrived: item.IrpdActionV5_schedule.arrived ? formatDate(item.IrpdActionV5_schedule.arrived) : null,
      };
    }

    // Event stream (Websocket)
    if (item.IrpdStreamV5_event) {
      return {
        ...item.IrpdStreamV5_event,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.PumpUpdate),
        customStatus: getIrpdStatus(item.IrpdStreamV5_event?.content?.imanage_master_status.status),
        badge: false,
        badgeStatus: '',
        origin: PumpHistoryOrigin.PumpUpdate,
        created: formatDayJsDate(item.IrpdStreamV5_event.created),
        arrived: item.IrpdStreamV5_event.arrived ? formatDate(item.IrpdStreamV5_event.arrived) : null,
      };
    }

    // Action stream (Websocket)
    if (item.IrpdActionV5_simple) {

      // Pump is on/off
      let status = getIrpdStatus(item.IrpdActionV5_simple.message_status);
      if (
        item.IrpdActionV5_simple.message_subtype === 'simple' &&
        item.IrpdActionV5_simple.content.pump_action
      ) {
        status = getIrpdTurnedOnOrOffStatus(
          item.IrpdActionV5_simple.content.pump_action.enable
        );
      }

      return {
        ...item.IrpdActionV5_simple,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.Command),
        customStatus: status,
        badge: true,
        badgeStatus: getIrpdBadgeStatus(item.IrpdActionV5_simple.message_status),
        origin: PumpHistoryOrigin.PumpUpdate,
        created: formatDayJsDate(item.IrpdActionV5_simple.created),
        arrived: item.IrpdActionV5_simple.arrived ? formatDate(item.IrpdActionV5_simple.arrived) : null,
      };
    }

    // Dummy return
    return null;
  });
}
