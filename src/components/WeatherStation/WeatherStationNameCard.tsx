import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Badge } from 'antd';
import moment from 'moment';

const WeatherNameCard = ({ name, isOffline = false, lastCommunication }: any) => {
  const intl = useIntl();

  const lastCommunicationDate = () => {
    return lastCommunication ? moment(lastCommunication).format('DD MMM - HH:mm') : '';
  };

  return (
    <ProCard>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            display: 'flex',
          }}
        >
          {intl.formatMessage({
            id: 'component.weatherstation.card.stationname.prefixname',
          })}{' '}
          {name}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{isOffline ? <Badge status="error" text="OFFLINE" /> : null}</div>
        {lastCommunication ? (
          <div style={{ color: '#808080', fontSize: 12, textAlign: 'right' }}>
            {intl.formatMessage({
              id: 'component.weatherstation.card.stationname.lastcommunication',
            })}
            :
            <br /> {lastCommunicationDate()}
          </div>
        ) : null}
      </div>
    </ProCard>
  );
};

export default WeatherNameCard;
