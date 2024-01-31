import { getIntl } from '@umijs/max';
import { getPivotStatus } from './get-pivot-status';
import { getPivotDirection } from './get-pivot-direction';

export function getPivotEventCentralStatus(status: number): string {
  const intl = getIntl();

  switch (status) {
    case 0: {
      return intl.formatMessage({ id: 'component.pivot.tab.history.event.table.col.3.value.4' });
    }
    case 1: {
      return intl.formatMessage({ id: 'component.pivot.tab.history.event.table.col.3.value.5' });
    }
    default: {
      return intl.formatMessage({ id: 'component.pivot.tab.history.event.table.col.3.value.5' });
    }
  }
}

export function getPivotEventUpdateStatus(status: number, direction: number, mode?: number, percentage?: number): string {
  const intl = getIntl();

  switch (status) {
    case 4: {
      return `${getPivotStatus(status)} | ${getPivotDirection(direction)} | ${intl.formatMessage({
        id: 'component.pivot.tab.history.event.table.col.3.value.6',
      })} | ${percentage}%`;
    } 
    default: {
      return getPivotStatus(status);
    }
  }
}


 