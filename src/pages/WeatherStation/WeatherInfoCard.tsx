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
        alignItems: 'flex-end',
        cursor: 'pointer',
      }}
    >
      {!showMore ? (
        <>
          {intl.formatMessage({
            id: 'component.weatherstation.card.viewmore',
          })}{' '}
          <div style={{ position: 'relative', top: 2 }}>
          <BsChevronDown style={{ width: 20 }} />
        </div>
        </>
      ) : (
        <>
          {intl.formatMessage({
            id: 'component.weatherstation.card.viewless',
          })}{' '}<div style={{ position: 'relative', top: 2 }}>
          <BsChevronUp style={{ width: 20 }} />
          </div>
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
    <Skeleton active={true} paragraph={{ rows: 2 }} />
    <Skeleton active={true} paragraph={{ rows: 2 }} />
    <Skeleton active={true} paragraph={{ rows: 2 }} />
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
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
          {icon}
          <div style={{ fontSize: 20, fontWeight: 400 }}>{title}</div>
        </div>
      ) : (
        <Skeleton active={true} paragraph={{ rows: 0 }} />
      )}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
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
