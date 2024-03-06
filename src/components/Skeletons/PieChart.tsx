import { ProCard } from '@ant-design/pro-components';
import * as React from 'react';
import { Skeleton, Row, Space, Col, Flex } from 'antd'

type Props = any;

const SkeletonPieChart: React.FC<Props> = () => {
  return ( 
      <Row gutter={[16, 24]} style={{width: '100%'}}>
         <Col span={24}>  
            <Flex align="center" vertical gap={24}>
              <div>
                <Skeleton.Avatar active style={{width: 250, height: 250 }}/>
              </div>
              <Space size={24}>
                <Space>
                  <Skeleton.Avatar active style={{width: 16, height: 16  }}/>
                  <div style={{width: 80}}>
                  <Skeleton.Button  active  style={{  maxWidth: "100%",  maxHeight: 16, }} block/>
                  </div>
                </Space>
                <Space>
                  <Skeleton.Avatar active style={{width: 16, height: 16  }}/>
                  <div style={{width: 80}}>
                  <Skeleton.Button  active  style={{  maxWidth: "100%",  maxHeight: 16, }} block/>
                  </div>                </Space>
                <Space>
                  <Skeleton.Avatar active style={{width: 16, height: 16  }}/>
                  <div style={{width: 80}}>
                    <Skeleton.Button  active  style={{  maxWidth: "100%",  maxHeight: 16, }} block/>
                  </div>                
                </Space>
            </Space>
            </Flex>
          </Col> 
      </Row>  
  );
};

export default SkeletonPieChart;
