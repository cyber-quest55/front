import React from 'react';
import Box from '../Box';
import SkeletonButton from './Button';

type Props = {
  size?: number;
  rows?: number;
  p?: number;
};

const SkeletonList: React.FC<Props> = ({ size, rows , p}) => {
  const s: any = size;

  return (
    <Box width={'100%'} display="flex" flexDirection={'column'} gap={2} p={p}>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <SkeletonButton key={'skeleton' + i} active={true} size={s} block={true} shape={'round'} />
        ))}
    </Box>
  );
};

export default SkeletonList;
