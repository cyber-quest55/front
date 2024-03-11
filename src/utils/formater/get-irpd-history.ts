// Dependencies
import { getIntl } from '@umijs/max';

// Badge status
export const getIrpdBadgeStatus = (messageStatus: number) => {
  return messageStatus === 2 ? "success": "processing"
}

// Get Irpd history based on socket return
export const getIrpdHistoryFmt = (data: any) => {
  const intl = getIntl();
  console.log(data, intl);
}