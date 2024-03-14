import { getIntl } from '@umijs/max';

export function getCentralEventStatus(status: number): string {
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

 