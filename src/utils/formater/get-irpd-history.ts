// Dependencies
import { getIntl } from '@umijs/max';
import { PumpHistoryOrigin } from '@/utils/enum/pump-history-origin';
import { getIrpdCommand } from '@/utils/formater/get-irpd-command';
import { getIrpdOrigin } from '@/utils/formater/get-irpd-origin';
import { getIrpdStatus } from '@/utils/formater/get-irpd-status';

// Badge status
export const getIrpdBadgeStatus = (messageStatus: number) => {
  return messageStatus === 2 ? "success": "processing"
}

export const getIrpdHistoryArrayFmt = (
  data: APIModels.IrpdHistoryCompleteListItem[]
) => {
  //const intl = getIntl();

  // Map API data
  return data.map((item: APIModels.IrpdHistoryCompleteListItem, key: number) => {
    const intl = getIntl();

    // Default action and stram
    if (item.irpd_action_v5 !== undefined) {
      return {
        ...item.irpd_action_v5,
        key: `row-key-table-${key}`,
        origin: getIrpdOrigin(PumpHistoryOrigin.CentralUpdate),
        command: getIrpdCommand(item.irpd_action_v5.content?.pump_schedule_enable?.enable),
      };
    }

    if (item.irpd_stream_v5 !== undefined) {
      return {
        ...item.irpd_stream_v5,
        key: `row-key-table-${key}`,
        origin: getIrpdOrigin(PumpHistoryOrigin.Command),
        command: getIrpdStatus(item.irpd_stream_v5?.content?.imanage_master_status.status),
      };
    }

    // Central stream history (Websocket and list)
    if (item.CentralStream !== undefined) {
      return {
        ...item.CentralStream,
        customType: intl.formatMessage({
          id: 'component.pivot.tab.history.event.table.col.2.value.1',
        }),
        customStatus: 'getPivotEventCentralStatus(item.CentralStream.status)',
        key,
      };
    }

    // Irpd stream (Websocket)
    if (item.IrpdStreamV5_periodic) {

    }

    // Schedule stream (Websocket)
    if (item.IrpdActionV5_schedule) {

    }

    // Event stream (Websocket)
    if (item.IrpdStreamV5_event) {

    }

    // Action stream (Websocket)
    if (item.IrpdActionV5_simple) {

    }

    // Dummy return
    return null
  })
}
