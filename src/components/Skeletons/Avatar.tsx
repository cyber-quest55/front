import { Skeleton } from 'antd';

type SkeletonProps = {
  fullWidth?: boolean;
  size?: number;
  style?: any;
};

const SkeletonAvatar: React.FC<SkeletonProps> = (props) => {
  return (
    <Skeleton.Avatar
      {...props}
      style={{
        animationName: 'css-dev-only-do-not-override-1tnweky-card-loading',
        background:
          'linear-gradient(90deg, rgba(54, 61, 64, 0.2), rgba(54, 61, 64, 0.4), rgba(54, 61, 64, 0.2))',
        backgroundSize: '600% 600%',
        animationDuration: '1.4s',
        animationTimingFunction: 'ease',
        animationIterationCount: 'infinite',
      }}
    />
  );
};
export default SkeletonAvatar;
