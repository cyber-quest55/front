import { getIntl } from "@umijs/max";

export function getMeterStatus(status: number): string {
  const intl = getIntl();

  switch (status) {
    case 1: {
      return intl.formatMessage({id: 'component.imeter.status.1'});
    }
    case 2: {
      return intl.formatMessage({id: 'component.imeter.status.2'});
    }
    case 3: {
      return intl.formatMessage({id: 'component.imeter.status.3'});
    }
    case 176: {
      return intl.formatMessage({id: 'component.imeter.status.176'});
    }
    case 177: {
      return intl.formatMessage({id: 'component.imeter.status.177'});
    }
    case 208: {
      return intl.formatMessage({id: 'component.imeter.status.208'});
    }
    case 209: {
      return intl.formatMessage({id: 'component.imeter.status.209'});
    }
    case 210: {
      return intl.formatMessage({id: 'component.imeter.status.210'});
    }
    case 211: {
      return intl.formatMessage({id: 'component.imeter.status.211'});
    }
    case 212: {
      return intl.formatMessage({id: 'component.imeter.status.212'});
    }
    case 213: {
      return intl.formatMessage({id: 'component.imeter.status.213'});
    }
    default: {
      return intl.formatMessage({id: 'component.imeter.status.none'});
    }
  }
}
