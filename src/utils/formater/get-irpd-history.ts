// Badge status
export const getIrpdBadgeStatus = (messageStatus: number) => {
  return messageStatus === 2 ? "success": "processing"
}

// Get Irpd history based on socket return
export const getIrpdHistoryFmt = (
  payload: APIModels.IrpdHistoryEventPayload
): APIModels.IrpdHistoryListItem | null => {

  //! Old events possobility to be removed from system
  if (payload.WsStream !== undefined) {
  }
  if (payload.WsAction !== undefined) {
  }

  // Event callback
  if (payload.WsEvent !== undefined) {

  }

  // Schedule callback
  if (payload.WsSchedule !== undefined) {
    return {
      arrived: payload.WsSchedule.arrived,
      content: {
        pump_action: {
          enable: payload.WsSchedule.content.pump_schedule_enable.enable,
        },
      },
      created: payload.WsSchedule.created,
      created_by: payload.WsSchedule.created_by,
      created_on_hardware: payload.WsSchedule.created_on_hardware,
      device: payload.WsSchedule.device,
      id: payload.WsSchedule.id,
      irpd: payload.WsSchedule.irpd,
      message_error: payload.WsSchedule.message_error,
      message_packets: payload.WsSchedule.message_packets,
      message_status: payload.WsSchedule.message_status,
      message_subtype: payload.WsSchedule.message_subtype,
      updated: payload.WsSchedule.updated,
      username: payload.WsSchedule.username,
      uuid: payload.WsSchedule.uuid,
    }  
  }

  // Periodic callback
  if (payload.WsPeriodic !== undefined) {
    return {
      arrived: payload.WsPeriodic.arrived,
      content: {
        pump_action: {
          enable: payload.WsPeriodic.content.imanage_master_status.status,
        },
      },
      created: payload.WsPeriodic.created,
      created_by: payload.WsPeriodic.created_by,
      created_on_hardware: payload.WsPeriodic.created_on_hardware,
      device: payload.WsPeriodic.device,
      id: payload.WsPeriodic.id,
      irpd: payload.WsPeriodic.irpd,
      message_error: payload.WsPeriodic.message_error,
      message_packets: payload.WsPeriodic.message_packets,
      message_status: payload.WsPeriodic.message_status,
      message_subtype: payload.WsPeriodic.message_subtype,
      updated: payload.WsPeriodic.updated,
      username: '???',
      uuid: payload.WsPeriodic.uuid,
    }   
  }

  // Central callback
  if (payload.WsCentral !== undefined) {
    return {
      arrived: '???',
      content: {
        pump_action: {
          enable: 3,
        },
      },
      created: payload.WsCentral.created,
      created_by: 4242,
      created_on_hardware: false,
      device: '???',
      id: payload.WsCentral.id,
      irpd: 34,
      message_error: '???',
      message_packets: [3],
      message_status: 3,
      message_subtype: '???',
      updated: payload.WsCentral.updated,
      username: '???',
      uuid: payload.WsCentral.uuid,
    }
  }

  // Simple callback
  if (payload.WsSimple !== undefined) {
    return { ...payload.WsSimple }
  }

  return null;
}