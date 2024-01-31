import { getIntl } from "@umijs/max";

export function getIrpdStatus(status: number): string {
  const intl = getIntl()

   switch (status) {
    case 0: {
      return  intl.formatMessage({id: 'component.irpd.status.0'}) ;
    }
    case 1: {
      return  intl.formatMessage({id: 'component.irpd.status.1'}) ;
    }
    case 2: {
      return  intl.formatMessage({id: 'component.irpd.status.2'}) ;
    }
    case 3: {
      return  intl.formatMessage({id: 'component.irpd.status.3'}) ;
    }
    case 4: {
      return  intl.formatMessage({id: 'component.irpd.status.4'}) ;
    }
    case 5: {
      return  intl.formatMessage({id: 'component.irpd.status.5'}) ;
    }
    case 6: {
      return  intl.formatMessage({id: 'component.irpd.status.6'}) ;
    }
    case 7: {
      return  intl.formatMessage({id: 'component.irpd.status.7'}) ;
    }
    case 8: {
      return  intl.formatMessage({id: 'component.irpd.status.8'}) ;
    }
    case 66: {
      return  intl.formatMessage({id: 'component.irpd.status.66'}) ;
    }
    case 192: {
      return  intl.formatMessage({id: 'component.irpd.status.192'}) ;
    }
    case 193: {
      return  intl.formatMessage({id: 'component.irpd.status.193'}) ;
    }
    case 194: {
      return  intl.formatMessage({id: 'component.irpd.status.194'}) ;
    }
    case 247: {
      return  intl.formatMessage({id: 'component.irpd.status.247'}) ;
    }
    case 248: {
      return  intl.formatMessage({id: 'component.irpd.status.248'}) ;
    }
    case 249: {
      return  intl.formatMessage({id: 'component.irpd.status.249'}) ;
    }
    case 250: {
      return  intl.formatMessage({id: 'component.irpd.status.250'}) ;
    }
    case 251: {
      return  intl.formatMessage({id: 'component.irpd.status.251'}) ;
    }
    case 252: {
      return  intl.formatMessage({id: 'component.irpd.status.252'}) ;
    }
    case 253: {
      return  intl.formatMessage({id: 'component.irpd.status.253'}) ;
    }
    case 254: {
      return  intl.formatMessage({id: 'component.irpd.status.254'}) ;
    }
    case 255: {
      return  intl.formatMessage({id: 'component.irpd.status.255'}) ;
    }
 
    default: {
      return  intl.formatMessage({id: 'component.irpd.status'}) ;
    }
  }
}
