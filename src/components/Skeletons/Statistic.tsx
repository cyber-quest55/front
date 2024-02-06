import React from 'react';
import Box from '../Box';
import SkeletonButton from './Button';

const SkeletonStatistic: React.FC = () => {
  const size: any = 8;

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 2}} >
      <SkeletonButton active={true} size={size} block={true} shape={'round'} />
      <SkeletonButton active={true} size={size} block={true} shape={'round'} />
      <SkeletonButton active={true} size={size} block={true} shape={'round'} />
    </div>
  );
};

export default SkeletonStatistic;
