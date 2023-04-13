import { ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import MapsRender from './components/MapsRender'
 
const Welcome: React.FC = () => {
  
  return (
    <Row   >
      <Col xs={24} style={{ height: ' 100vh ', position: 'relative' }}>
        <MapsRender >  
        </MapsRender>
      </Col>
      <Col xs={24}>
        <ProCard style={{ marginBlockStart: 8, }} gutter={[16, 16]} wrap>
          <ProCard colSpan={{ xs: 24, sm: 4 }}  >
          </ProCard>
        </ProCard>
      </Col>
    </Row>
  );
};

export default Welcome;
