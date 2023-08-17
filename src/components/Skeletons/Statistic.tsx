import { Skeleton } from 'antd';
import React from 'react';

const SkeletonStatistic: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <div style={{width: "30%"}}>

        <Skeleton.Input active block={true}></Skeleton.Input>
        </div>

      </div>
      <Skeleton.Avatar active size={250} />
    </div>
  );
};

export default SkeletonStatistic;
