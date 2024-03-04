import { ProCard } from '@ant-design/pro-components';
import * as React from 'react';
import { Skeleton, Row,Col, Flex, Space } from 'antd'
 
const CardSkeleton: React.FunctionComponent<{rows: number }>  = (props) => {
  return   <Row gutter={[16, 24]}>
         <Col span={24}> 
            <Flex vertical  gap={8} style={{width: '100%',  }}>
                 {[ ...Array(props.rows).keys() ].map(item => {
                    const random = Math.floor(Math.random() * 9);
                     return (     
                        <div key={item}  style={{display: 'flex', gap: 12, width: '100%',  }}>
                            <div style={{width: `${random}0%`,   }}>
                                <Skeleton.Button    active  style={{maxWidth: '100%',  maxHeight: '21px' }} block />
                            </div>
                            <div style={{width: `${10 - random}0%`,   }}>
                                <Skeleton.Button    active  style={{maxWidth: '100%',  maxHeight: '21px' }} block />
                            </div>
                        </div>
                    )
                })}
            </Flex>
         </Col>
      </Row> 
    ;
};

export default CardSkeleton;
