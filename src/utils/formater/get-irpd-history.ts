// Dependencies
import { getIntl } from '@umijs/max';
import { PumpHistoryOrigin } from '@/utils/enum/pump-history-origin';
import { getIrpdCommand } from '@/utils/formater/get-irpd-command';
import { getCentralEventStatus } from '@/utils/formater/get-irpd-event-status';
import { getIrpdOrigin } from '@/utils/formater/get-irpd-origin';
import { getIrpdStatus, getIrpdTurnedOnOrOffStatus } from '@/utils/formater/get-irpd-status';

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
      let status = getIrpdStatus(item.irpd_action_v5.message_status);
      if (item.irpd_action_v5.content.pump_action) {
        status = getIrpdTurnedOnOrOffStatus(item.irpd_action_v5.content.pump_action.enable);
      }
      if (
        item.irpd_action_v5.content.pump_schedule &&
        item.irpd_action_v5.content.pump_schedule_enable &&
        item.irpd_action_v5.content.pump_schedule_enable.enable === 1
      ) {
        status = getIrpdStatus(5);
      }

      return {
        ...item.irpd_action_v5,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.Command),
        customStatus: status,
        badge: true,
        badgeStatus: getIrpdBadgeStatus(item.irpd_action_v5.message_status),
      };
    }

    // Default stream from endpoint (list) [OK]
    if (item.irpd_stream_v5 !== undefined) {
      return {
        ...item.irpd_stream_v5,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.PumpUpdate),
        customStatus: getIrpdStatus(item.irpd_stream_v5?.content?.imanage_master_status.status),
      };
    }

    // Central stream history (Websocket and list) [OK]
    if (item.CentralStream !== undefined) {
      return {
        ...item.CentralStream,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.CentralUpdate),
        customStatus: getCentralEventStatus(item.CentralStream.status),
      };
    }

    // Irpd stream (Websocket)
    if (item.IrpdStreamV5_periodic) {
      return {
        ...item.IrpdActionV5_simple,
        key: `row-key-table-${key}`,
        customType: intl.formatMessage({
          id: 'component.irpd.tab.history.event.table.command',
        }),
        badgeStatus: getIrpdBadgeStatus(item.IrpdStreamV5_periodic.content.imanage_master_status.status),
      };
    }

    // Schedule stream (Websocket)
    if (item.IrpdActionV5_schedule) {
      return {
        ...item.IrpdActionV5_schedule,
        key: `row-key-table-${key}`,
        customType: 'IrpdActionV5_schedule',
        customStatus: getIrpdBadgeStatus(item.IrpdActionV5_schedule.message_status),
      };
    }

    // Event stream (Websocket)
    if (item.IrpdStreamV5_event) {
      return {
        ...item.IrpdStreamV5_event,
        key: `row-key-table-${key}`,
        customType: 'IrpdStreamV5_event',
      };
    }

    // Action stream (Websocket)
    if (item.IrpdActionV5_simple) {
      return {
        ...item.IrpdActionV5_simple,
        customType: 'IrpdActionV5_simple',
        customStatus: getIrpdCommand(item.IrpdActionV5_simple.content.pump_action.enable),
        key: `row-key-table-${key}`,
      };
    }

    // Dummy return
    return null;
  });
}
