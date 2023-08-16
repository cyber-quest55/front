import { useScreenHook } from '@/hooks/screen';
import { Col, Row, Space, Typography } from 'antd';
import { ReactNode } from 'react';

const { Text } = Typography;

type Props = {
  status: ReactNode;
  deviceSelector: ReactNode;
  extra: ReactNode;
  deviceActions: ReactNode;
  actions: ReactNode;
  lastCommunication: string;
  otherProps?: any;
};

export const DevicePanel: React.FC<Props> = (props) => {
  const { md } = useScreenHook();

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Row justify="space-between" align="middle" gutter={[12, 12]}>
          <Col>{props.status}</Col>
          <Col>{props.actions}</Col>
        </Row>
        <Row style={{ maxWidth: 250 }}>
          <Col style={{ width: '100%' }}>{props.deviceSelector}</Col>
          <Col>
            <Text type="secondary" style={{ fontSize: 11 }}>
              Last communication: {props.lastCommunication}
            </Text>
          </Col>
        </Row>
        <Row gutter={[12, 16]} justify="space-between">
          <Col style={{ width: md ? '195px' : '100%' }}>{props.extra}</Col>
          <Col style={{ width: md ? '235px' : '100%' }}>{props.deviceActions}</Col>
        </Row>
      </Space>
    </>
  );
};

export default DevicePanel;
