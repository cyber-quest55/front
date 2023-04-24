 
import { Col, Row } from 'antd';
import MapsRender from '../../components/MapsRender'  
import ShowPivot from '@/components/ShowPivot';
 
const Welcome: React.FC = () => {
  
  return ( 
      <Row   >
        <Col xs={24} style={{ height: ' 100vh ', position: 'relative' }}>
          <MapsRender >
          </MapsRender>
        </Col>
        <Col xs={24} style={{ padding: '15px 15px', minHeight: 'calc(100vh - 116px)' }}>
          <ShowPivot/>
        </Col>
      </Row> 
  );
};

export default Welcome;
