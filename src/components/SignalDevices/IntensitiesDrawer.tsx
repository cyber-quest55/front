import { NodeElement } from '@/models/signal';
import {
  Col,
  Drawer,
  Flex,
  Progress,
  Row,
  Typography
} from 'antd';
import React from 'react';

type Props = {
  isOpen: boolean,
  toggleDrawer: () => void;
  title?: string;
  currentRadio?: string;
  nodes: NodeElement[];
}

const SignalDevices: React.FC<Props> = ({
  isOpen,
  toggleDrawer,
  title = 'Drawer',
  currentRadio,
  nodes,
}: Props) => {

  // Computed info
  const connectedNodes = nodes.filter(
    n => n.from === currentRadio
  );

  // TSX
  return (
    <Drawer
      title={title}
      open={isOpen}
      onClose={toggleDrawer}
      mask={false}
    >

      <Row gutter={[16, 16]}>
        {
          connectedNodes.map((item, index) => (
            <Col
              span={12}
              key={index}
            >
              <Flex
                gap="10px"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography.Text>
                  {item.toName}
                </Typography.Text>
                <Progress
                  percent={50}
                  steps={4}
                />
              </Flex>
            </Col>
          ))
        }
      </Row>
    </Drawer>
  )
}

export default SignalDevices
