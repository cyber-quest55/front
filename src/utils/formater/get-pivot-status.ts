import { getIntl } from "@umijs/max";

export function getPivotStatus(status: number): string {
  const intl = getIntl()
  
  switch (status) {
    case 0: {
      return  intl.formatMessage({id: 'component.pivot.status.0'}) ;
    }
    case 1: {
      return  intl.formatMessage({id: 'component.pivot.status.1'}) ;
    }
    case 2: {
      return  intl.formatMessage({id: 'component.pivot.status.2'}) ;
    }
    case 3: {
      return  intl.formatMessage({id: 'component.pivot.status.3'}) ;
    }
    case 4: {
      return  intl.formatMessage({id: 'component.pivot.status.4'}) ;
    }
    case 5: {
      return  intl.formatMessage({id: 'component.pivot.status.5'}) ;
    }
    case 6: {
      return  intl.formatMessage({id: 'component.pivot.status.6'}) ;
    }
    case 7: {
      return  intl.formatMessage({id: 'component.pivot.status.7'}) ;
    }
    case 8: {
      return  intl.formatMessage({id: 'component.pivot.status.8'}) ;
    }
    case 9: {
      return  intl.formatMessage({id: 'component.pivot.status.9'}) ;
    }
    case 10: {
      return  intl.formatMessage({id: 'component.pivot.status.10'}) ;
    }
    case 11: {
      return  intl.formatMessage({id: 'component.pivot.status.11'}) ;
    }
    case 12: {
      return  intl.formatMessage({id: 'component.pivot.status.12'}) ;
    }
    case 13: {
      return  intl.formatMessage({id: 'component.pivot.status.13'}) ;
    }
    case 14: {
      return  intl.formatMessage({id: 'component.pivot.status.14'}) ;
    }
    case 15: {
      return  intl.formatMessage({id: 'component.pivot.status.15'}) ;
    }
    case 16: {
      return  intl.formatMessage({id: 'component.pivot.status.16'}) ;
    }
    case 17: {
      return  intl.formatMessage({id: 'component.pivot.status.17'}) ;
    }
    case 18: {
      return  intl.formatMessage({id: 'component.pivot.status.18'}) ;
    }
    case 19: {
      return  intl.formatMessage({id: 'component.pivot.status.19'}) ;
    }
    case 20: {
      return  intl.formatMessage({id: 'component.pivot.status.20'}) ;
    }
    case 21: {
      return  intl.formatMessage({id: 'component.pivot.status.21'}) ;
    }
    case 22: {
      return  intl.formatMessage({id: 'component.pivot.status.22'}) ;
    }
    case 23: {
      return  intl.formatMessage({id: 'component.pivot.status.23'}) ;
    }
    case 24: {
      return  intl.formatMessage({id: 'component.pivot.status.24'}) ;
    }
    case 25: {
      return  intl.formatMessage({id: 'component.pivot.status.25'}) ;
    }
    case 26: {
      return  intl.formatMessage({id: 'component.pivot.status.26'}) ;
    }
    case 27: {
      return  intl.formatMessage({id: 'component.pivot.status.27'}) ;
    }
    case 28: {
      return  intl.formatMessage({id: 'component.pivot.status.28'}) ;
    }
    case 29: {
      return  intl.formatMessage({id: 'component.pivot.status.29'}) ;
    }
    case 30: {
      return  intl.formatMessage({id: 'component.pivot.status.30'}) ;
    }
    case 31: {
      return  intl.formatMessage({id: 'component.pivot.status.31'}) ;
    }
    case 32: {
      return  intl.formatMessage({id: 'component.pivot.status.32'}) ;
    }
    case 33: {
      return  intl.formatMessage({id: 'component.pivot.status.33'}) ;
    }
    case 38: {
      return  intl.formatMessage({id: 'component.pivot.status.38'}) ;
    }
    default: {
      return  intl.formatMessage({id: 'component.pivot.status'}) ;
    }
  }
}
