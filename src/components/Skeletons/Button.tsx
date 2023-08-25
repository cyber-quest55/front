import { Skeleton } from 'antd';
import { SkeletonButtonProps } from 'antd/es/skeleton/Button';

type SkeletonProps = {
  fullWidth?: boolean;
};

const SkeletonButton: React.FC<SkeletonButtonProps & SkeletonProps> = (props) => {
  return (
    <Skeleton.Button
      {...props}
      style={{
        width: props.fullWidth? '100%': props.style?.width,
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
export default SkeletonButton;
