import { ProCard } from '@ant-design/pro-components';
import * as React from 'react';
import { Skeleton, Row, Space, Col, Flex } from 'antd'

const StatisticSkeleton: React.FunctionComponent<{lastRow?: boolean }>  = (props) => {

  return <Space direction="vertical" style={{width: '100%'}}>
      <Skeleton.Input  active  style={{maxWidth: '85%',  maxHeight: 16, }} block/>
      <Space style={{width: '100%'}}>
        <Skeleton.Button  active  style={{maxWidth: '35%',  maxHeight: 16, }} block/>
        <Skeleton.Input  active  style={{maxWidth: '65%',  maxHeight: 16, }} block/>
      </Space>
      <Space style={{width: '100%'}}>
        <Skeleton.Input  active  style={{maxWidth: '65%',  maxHeight: 16, }} block/>
        <Skeleton.Button  active  style={{maxWidth: '35%',  maxHeight: 16, }} block/>
      </Space>
      {props.lastRow?  <Skeleton.Button  active  style={{maxWidth: '80%',  maxHeight: 16, }} block/>  : null}
   </Space>;
};

export default StatisticSkeleton;
