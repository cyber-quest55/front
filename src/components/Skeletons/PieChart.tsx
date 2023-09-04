import React from 'react';
import Box from '../Box';
import SkeletonAvatar from './Avatar';
import SkeletonInput from './Input';

type Props = any;

const SkeletonPieChart: React.FC<Props> = () => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={12}
      paddingBottom={14}
    >
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Box width="30%">
          <SkeletonInput fullWidth />
        </Box>
      </Box>
      <SkeletonAvatar size={250} fullWidth />
    </Box>
  );
};

export default SkeletonPieChart;
