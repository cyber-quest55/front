import { Skeleton } from 'antd';

const FarmSelectSkeleton: React.FC = () => {
  return <Skeleton.Input style={{ marginBottom: 12, marginTop: 16 }} active={true} size="large" />;
};

export { FarmSelectSkeleton };
