import { useIntl } from '@umijs/max';
import { Skeleton } from 'antd';

const WeatherForecastPanelSkeleton: React.FC<any> = () => {
  const intl = useIntl();

  return (
    <div style={{ marginBottom: 35 }}>
      <div style={{ fontSize: 24, fontWeight: 500 }}>
        {intl.formatMessage({
          id: 'component.weatherstation.weatherforecast.title',
        })}
      </div>
      <div style={{ position: 'relative', height: 170 }}>
        <div
          style={{
            display: 'flex',
            gap: 10,
            overflowX: 'auto',
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '15px 0',
          }}
        >
          <>
            <Skeleton.Button
              active={true}
              style={{ minWidth: 152, transform: 'none', height: 154 }}
            />
            <Skeleton.Button
              active={true}
              style={{ minWidth: 152, transform: 'none', height: 154 }}
            />
            <Skeleton.Button
              active={true}
              style={{ minWidth: 152, transform: 'none', height: 154 }}
            />
            <Skeleton.Button
              active={true}
              style={{ minWidth: 152, transform: 'none', height: 154 }}
            />
            <Skeleton.Button
              active={true}
              style={{ minWidth: 152, transform: 'none', height: 154 }}
            />
            <Skeleton.Button
              active={true}
              style={{ minWidth: 152, transform: 'none', height: 154 }}
            />
            <Skeleton.Button
              active={true}
              style={{ minWidth: 152, transform: 'none', height: 154 }}
            />
            <Skeleton.Button
              active={true}
              style={{ minWidth: 152, transform: 'none', height: 154 }}
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastPanelSkeleton;
