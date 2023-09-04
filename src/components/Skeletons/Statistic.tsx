import React from 'react';
import Box from '../Box';
import SkeletonButton from './Button';

const SkeletonStatistic: React.FC = () => {
  const size: any = 8;

  return (
    <Box width={'100%'} display="flex" flexDirection={'column'} gap={2}>
      <SkeletonButton active={true} size={size} block={true} shape={'round'} />
      <SkeletonButton active={true} size={size} block={true} shape={'round'} />
      <SkeletonButton active={true} size={size} block={true} shape={'round'} />
    </Box>
  );
};

export default SkeletonStatistic;
