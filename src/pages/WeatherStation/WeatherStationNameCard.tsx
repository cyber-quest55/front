import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Badge, Skeleton } from 'antd';
import moment from 'moment';

const WeatherNameCard = ({ name, isOffline = false, lastCommunication, loading = false }: any) => {
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
        {!loading ? (
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
        ) : (
          <Skeleton style={{ width: 120, height: 40 }} />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{isOffline ? <Badge color="red" /> : null}</div>
        {!loading ? (
          lastCommunication ? (
            <div style={{ color: '#808080', fontSize: 12, textAlign: 'right' }}>
              {intl.formatMessage({
                id: 'component.weatherstation.card.stationname.lastcommunication',
              })}
              :
              <br /> {lastCommunicationDate()}
            </div>
          ) : null
        ) : (
          <Skeleton style={{ width: 120, height: 40 }} />
        )}
      </div>
    </ProCard>
  );
};

export default WeatherNameCard;
