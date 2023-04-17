 
import { Col, Row } from 'antd';
import MapsRender from '../../components/MapsRender' 
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import ShowPivot from '@/components/ShowPivot';

const Welcome: React.FC = () => {
  const [responsive, setResponsive] = useState(false);

  
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <Row   >
        <Col xs={24} style={{ height: ' 100vh ', position: 'relative' }}>
          <MapsRender >
          </MapsRender>
        </Col>
        <Col xs={24} style={{ padding: '15px 15px', minHeight: 'calc(100vh - 116px)' }}>
          <ShowPivot/>
        </Col>
      </Row>
    </RcResizeObserver>
  );
};

export default Welcome;
