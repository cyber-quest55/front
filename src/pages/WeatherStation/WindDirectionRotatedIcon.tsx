import WindDirectionIcon from '@/icons/weatherstation/wind-direction-icon.svg';

const WindDirectionRotatedIcon = ({ deg }: { deg: number | undefined }) => {
  return (
    <img src={WindDirectionIcon} style={{ transform: deg ? `rotateZ(${deg - 45}deg)` : '' }} />
  );
};

export default WindDirectionRotatedIcon;
