import { getIntl } from '@umijs/max';

export function getIrpdCommand(status: number): string {
  const intl = getIntl();

  switch (status) {
    case 0: {
      return intl.formatMessage({ id: 'component.irpd.command.opt.0' });
    }
    case 1: {
      return intl.formatMessage({ id: 'component.irpd.command.opt.1' });
    }
    default: {
      return intl.formatMessage({ id: 'component.irpd.command.opt.2' });
    }
  }
}
