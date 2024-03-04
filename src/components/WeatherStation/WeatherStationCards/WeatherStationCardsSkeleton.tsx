import { ProCard } from '@ant-design/pro-components';
import { Flex, Skeleton } from 'antd';

const LoadingInfoSkeleton = () => (
  <>
    <Skeleton active={true} paragraph={{ rows: 2 }} />
    <Skeleton active={true} paragraph={{ rows: 2 }} />
    <Skeleton active={true} paragraph={{ rows: 2 }} />
  </>
);

const WeatherStationCardsSkeleton: React.FC<any> = () => {
  return (
    <Flex gap="middle" vertical>
      <ProCard>
        <div>
          <Skeleton.Button active={true} block={true} size="small" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
            <div style={{ width: 120 }}>
              <Skeleton.Button block={true} size="small" />
            </div>
          </div>
        </div>
      </ProCard>
      {[...Array(4)].map((_, index) => (
        <ProCard key={index}>
          <Skeleton active={true} paragraph={{ rows: 0 }} />
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <LoadingInfoSkeleton />
            </div>
          </div>
        </ProCard>
      ))}
    </Flex>
  );
};

export default WeatherStationCardsSkeleton;
