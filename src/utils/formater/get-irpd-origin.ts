import { getIntl } from '@umijs/max';
import { PumpHistoryOrigin } from '../enum/pump-history-origin';

export function getIrpdOrigin(status: PumpHistoryOrigin): string {
  const intl = getIntl();

  switch (status) {
    case PumpHistoryOrigin.Command: {
      return intl.formatMessage({id: 'component.irpd.command.origin.opt.1'})  ;
    }
    case PumpHistoryOrigin.CentralUpdate: {
      return  intl.formatMessage({id: 'component.irpd.command.origin.opt.2'})  
    }
    default: {
      return  intl.formatMessage({id: 'component.irpd.command.origin.opt.2'})   
    }
  }
}
