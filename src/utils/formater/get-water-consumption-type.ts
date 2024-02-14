import { getIntl } from '@umijs/max';

export function getWaterConsumptionType(status: number): string {
  const intl = getIntl();

  switch (status) {
    case 3: {
      return intl.formatMessage({ id: 'component.irpd.report.chart.label.3' });
    }
    case 2: {
      return intl.formatMessage({ id: 'component.irpd.report.chart.label.2' });
    }
    default: {
      return intl.formatMessage({ id: 'component.irpd.report.chart.label.1' });
    }
  }
}
