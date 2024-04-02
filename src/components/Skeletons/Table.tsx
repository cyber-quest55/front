import { ProCard } from '@ant-design/pro-components';
import * as React from 'react';
import { Skeleton, Row, Space, Col, Flex } from 'antd'
 
const TableSkeleton: React.FunctionComponent<{rows: number }>  = (props) => {
  return <ProCard style={{padding: 8}} >
      <Row gutter={[16, 24]}>
        <Col span={24}> 
            <Space  size={12}>
                <Skeleton.Input  active  style={{maxWidth: '200px', }}  block={false} />
                <Skeleton.Input  active  style={{maxWidth: '200px', }}   block={false}/>
            </Space>
        </Col>
        <Col span={24}> 
            <Flex justify="space-between" gap={12} >
                <div> <Skeleton.Input  active style={{maxWidth: '250px', }} block={false}/> </div>
                <div> <Skeleton.Input  active style={{maxWidth: '200px', }} block={false}/> </div>
            </Flex>
        </Col>
         <Col span={24}> 
            <Flex vertical  gap={8}>
                <Skeleton.Input active  style={{maxWidth: '100%', marginBottom: 8 }} size='large' block={false}/>
                {[ ...Array(props.rows).keys() ].map(item => {
                    return (            
                        <Flex justify="space-between" key={item} style={{width: '100%',  }}>
                            <div><Skeleton.Input    active  style={{maxWidth: '20%', }} block={false}/></div>
                            <div><Skeleton.Input    active  style={{maxWidth: '20%', }} block={false}/></div>
                            <div><Skeleton.Input    active  style={{maxWidth: '20%', }} block={false}/></div>
                            <div><Skeleton.Input    active  style={{maxWidth: '20%', }} block={false}/></div>
                            <div><Skeleton.Input    active  style={{maxWidth: '20%', }} block={false}/></div>
                        </Flex>
                    )
                })}
            </Flex>
         </Col>
         <Col span={24}> 
            <Flex justify="flex-end"  gap={8}>
            <div><Skeleton.Button    active shape={'square'} style={{maxWidth: '20%', }} block={false}/></div>
            <div><Skeleton.Input    active  style={{maxWidth: '20%', }} block={false}/></div>
            </Flex>
         </Col>  
      </Row> 
    </ProCard>;
};

export default TableSkeleton;
