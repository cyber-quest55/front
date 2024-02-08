import { toOneDecimalPlace } from '@/utils/data/weatherstation';
import { useIntl } from '@umijs/max';
import { useEffect, useRef } from 'react';

const DeltaTChartImage = require('@/icons/weatherstation/deltat-chart.png');
const DeltaTChartPinImage = require('@/icons/weatherstation/deltat-pin-icon.png');

const DeltaTTable = (props: any) => {
  const pinRef = useRef<any>(null);
  const intl = useIntl();

  useEffect(() => {
    if (pinRef.current && props.weatherStation?.temperature) {
      pinRef.current.style.marginTop = `${
        (100 - props.weatherStation.temperature.humidity) * 4 + 66
      }px`;
      pinRef.current.style.marginLeft = `${props.weatherStation.temperature.current * 9.2 + 50}px`;
    }
  }, [pinRef.current, props.weatherStation]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        {intl.formatMessage({
          id: 'component.weatherstation.deltat.tab.table.title',
        })}
      </div>
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          fontSize: 16,
          color: '#555',
          marginTop: 15,
          padding: '0 10px 25px 0',
          background: '#fff',
          borderRadius: 8,
        }}
        className="deltat-container"
      >
        <span style={{ position: 'absolute', marginTop: 6, marginLeft: 85 }}>
          {intl.formatMessage({
            id: 'component.weatherstation.deltat.tab.table.adequate.legend',
          })}
        </span>
        <span style={{ position: 'absolute', marginTop: 30, marginLeft: 85 }}>
          {intl.formatMessage({
            id: 'component.weatherstation.deltat.tab.table.risky.legend',
          })}
        </span>
        <span style={{ position: 'absolute', marginTop: 53, marginLeft: 85 }}>
          {intl.formatMessage({
            id: 'component.weatherstation.deltat.tab.table.inadequate.legend',
          })}
        </span>
        <span style={{ position: 'absolute', marginTop: 6, marginLeft: 395 }}>
          {intl.formatMessage({
            id: 'component.weatherstation.deltat.tab.table.riskytoinadequate.legend',
          })}
        </span>
        <span
          style={{
            transform: 'rotate(270deg)',
            position: 'absolute',
            marginTop: 284,
            marginLeft: -40,
          }}
        >
          {intl.formatMessage({
            id: 'component.weatherstation.deltat.tab.table.yaxis.label',
          })}{' '}
          {toOneDecimalPlace(props.weatherStation?.temperature?.humidity) ?? '-'} %
        </span>
        <span style={{ position: 'absolute', marginTop: 490, marginLeft: 222 }}>
          {intl.formatMessage({
            id: 'component.weatherstation.deltat.tab.table.xaxis.label',
          })}{' '}
          {toOneDecimalPlace(props.weatherStation?.temperature?.current) ?? '-'} °C
        </span>
        <img
          ref={pinRef}
          src={DeltaTChartPinImage}
          style={{ position: 'absolute' }}
          width={30}
          height={30}
        />
        <img width={600} style={{ marginLeft: 20 }} src={DeltaTChartImage} />
      </div>
    </div>
  );
};

export default DeltaTTable;
