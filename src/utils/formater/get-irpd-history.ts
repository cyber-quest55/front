// Dependencies
import { getIntl } from '@umijs/max';
import { PumpHistoryOrigin } from '@/utils/enum/pump-history-origin';
import { getIrpdCommand } from '@/utils/formater/get-irpd-command';
import { getCentralEventStatus } from '@/utils/formater/get-irpd-event-status';
import { getIrpdOrigin } from '@/utils/formater/get-irpd-origin';
import { getIrpdStatus } from '@/utils/formater/get-irpd-status';

// Badge status
export const getIrpdBadgeStatus = (messageStatus: number) => {
  return messageStatus === 2 ? 'success': 'processing';
}

export const getIrpdHistoryArrayFmt = (data: APIModels.IrpdHistoryCompleteListItem[]) => {
  // Translations
  const intl = getIntl();

  // Map API data
  return data.map((item: APIModels.IrpdHistoryCompleteListItem, key: number) => {

    // Default action and stream
    if (item.irpd_action_v5 !== undefined) {
      return {
        ...item.irpd_action_v5,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.Command),
        customStatus: getIrpdCommand(item.irpd_action_v5.content?.pump_schedule_enable?.enable),
      };
    }

    if (item.irpd_stream_v5 !== undefined) {
      return {
        ...item.irpd_stream_v5,
        key: `row-key-table-${key}`,
        customType: getIrpdOrigin(PumpHistoryOrigin.PumpUpdate),
        customStatus: getIrpdStatus(item.irpd_stream_v5?.content?.imanage_master_status.status),
      };
    }

    // Central stream history (Websocket and list)
    if (item.CentralStream !== undefined) {
      return {
        ...item.CentralStream,
        key: `row-key-table-${key}`,
        customType: 'CentralStream',
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
        badgeStatus: getIrpdBadgeStatus(item.IrpdActionV5_schedule.message_status),
        badge: true,
      };
    }

    // Event stream (Websocket)
    if (item.IrpdStreamV5_event) {
      return {
        ...item.IrpdStreamV5_event,
        key: `row-key-table-${key}`,
        customType: 'IrpdStreamV5_event',
        badgeStatus: getIrpdBadgeStatus(item.IrpdStreamV5_event.message_status),
        badge: true,
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
