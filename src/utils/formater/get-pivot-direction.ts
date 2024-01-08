import { getIntl } from '@umijs/max';

export function getPivotDirection(direction: number): string {
  const intl = getIntl();

  switch (direction) {
    case 1: {
      return intl.formatMessage({ id: 'component.pivot.direction.1' });
    }
    default: {
      return intl.formatMessage({ id: 'component.pivot.direction.2' });
    }
  }
}
