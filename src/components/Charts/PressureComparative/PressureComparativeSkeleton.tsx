 import { ProCard } from '@ant-design/pro-components';
import * as React from 'react';
import { Skeleton, Row, Col, Flex } from 'antd'
 
const PressureComparativeSkeleton: React.FunctionComponent  = () => {
   
  return <ProCard style={{marginBlock: 20, padding: 8}} >
      <Row gutter={[16, 24]}>
        <Col span={24}> 
        <Flex justify="space-between" gap={12}>
            <Skeleton.Input  active shape={'circle'} style={{maxWidth: '200px', }} block={false}/>
            <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
          </Flex>
         </Col>
         <Col span={24}> 
        <Flex vertical  gap={8}>
             <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
            <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
            <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
            <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
            <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
            <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
            <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
            <Skeleton.Input active shape={'circle'} style={{maxWidth: '100%', }} block={false}/>
          </Flex>
         </Col>
      </Row> 
    </ProCard>;
};

export default PressureComparativeSkeleton;
