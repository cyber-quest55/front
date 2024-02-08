import React from 'react';
import Box from '../Box';
import SkeletonAvatar from './Avatar';
import SkeletonInput from './Input';

type Props = any;

const SkeletonPieChart: React.FC<Props> = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 14,
      }}
    >
      <div  style={{
        width: '100%',
        display: 'flex', 
        justifyContent: 'flex-end',  
      }} >
        <div style={{width: "30%"}}>
          <SkeletonInput fullWidth />
        </div>
      </div>
      <SkeletonAvatar size={250} fullWidth />
    </div>
  );
};

export default SkeletonPieChart;
