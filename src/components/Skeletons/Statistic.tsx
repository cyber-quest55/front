import { Skeleton } from 'antd';
import React from 'react';

const SkeletonStatistic: React.FC = () => {
  const size: any = 5;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: "relative"
      }}
    > 

      <Skeleton.Button
        style={{ width: '100%' }}
        active={true}
        size={size}
        block={true}
        shape={'round'}
      />
      <Skeleton.Button
        style={{ width: '100%' }}
        active={true}
        size={size}
        block={true}
        shape={'round'}
      />
      <Skeleton.Button
        style={{ width: '100%' }}
        active={true}
        size={size}
        block={true}
        shape={'round'}
      /> 
    </div>
  );
};

export default SkeletonStatistic;
