import { ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Skeleton } from 'antd';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const ShowMoreInfoButton = ({ showMore, onClick }: { showMore: boolean; onClick: any }) => {
  const intl = useIntl();

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        fontSize: 12,
        color: '#808080',
        alignItems: 'center',
        justifyContent: 'flex-end',
        cursor: 'pointer',
      }}
    >
      {!showMore ? (
        <>
          {intl.formatMessage({
            id: 'component.weatherstation.card.viewmore',
          })}{' '}
          <BsChevronDown style={{ width: 20 }} />
        </>
      ) : (
        <>
          {intl.formatMessage({
            id: 'component.weatherstation.card.viewless',
          })}{' '}
          <BsChevronUp style={{ width: 20 }} />
        </>
      )}
    </div>
  );
};

interface WeatherInfoCardProps {
  title: string;
  icon: JSX.Element;
  renderInfo: JSX.Element;
  showMoreInfo?: JSX.Element | null;
  loading?: boolean;
}

const LoadingInfoSkeleton = () => (
  <>
    <Skeleton style={{ width: 60, height: 60 }} />
    <Skeleton style={{ width: 60, height: 60 }} />
    <Skeleton style={{ width: 60, height: 60 }} />
  </>
);

const WeatherInfoCard = ({
  title,
  icon,
  renderInfo,
  showMoreInfo = null,
  loading = false,
}: WeatherInfoCardProps) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <ProCard>
      {!loading ? (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {icon}
          <div style={{ fontSize: 20, fontWeight: 400 }}>{title}</div>
        </div>
      ) : (
        <Skeleton style={{ width: 120, height: 40 }} />
      )}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {!loading ? renderInfo : <LoadingInfoSkeleton />}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: showMore ? 'space-between' : 'flex-end',
            marginTop: showMore ? 15 : 0,
          }}
        >
          {showMore ? showMoreInfo : null}
          {showMoreInfo ? (
            <ShowMoreInfoButton showMore={showMore} onClick={toggleShowMore} />
          ) : null}
        </div>
      </div>
    </ProCard>
  );
};

export default WeatherInfoCard;
