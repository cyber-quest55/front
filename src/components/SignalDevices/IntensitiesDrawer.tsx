import { NodeElement, RadioCoordinate } from '@/models/signal';
import {
  Col,
  Drawer,
  Flex,
  Progress,
  Row,
  Typography
} from 'antd';
import React, {
  useCallback,
} from 'react';

type Props = {
  isOpen: boolean,
  toggleDrawer: () => void;
  title?: string;
  currentRadio?: string;
  nodes: NodeElement[];
  signals: RadioCoordinate[],
}

// Percentage values
const INTENSITY_VALUES = {
  "weak": 25,
  "moderate": 50,
  "strong": 75,
  "very strong": 100,
}

const IntesitiesDrawer: React.FC<Props> = ({
  isOpen,
  toggleDrawer,
  title = 'Drawer',
  currentRadio,
  nodes,
  signals,
}: Props) => {

  // Computed info
  const connectedNodes = useCallback(
    () => nodes.filter(
      n => n.from === currentRadio
    ),
    [nodes]
  );

  // This computed array is to render the percentage list on drawer
  const possibleNodeConnections = useCallback(() => signals.map((sig) => {
    if (currentRadio === sig.mainRadio) {
      return null;
    }

    // If device has some connection to node return present info
    const connectedNode = connectedNodes().find(cn => cn.to === sig.mainRadio);
    if (connectedNode) {
      return {
        name: sig.name,
        percentage: INTENSITY_VALUES[connectedNode.quality],
      };
    }

    // When device has no connection to node
    return {
      name: sig.name,
      percentage: 0,
    }
  }), [
    currentRadio,
    connectedNodes,
    signals,
  ]);

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
          possibleNodeConnections().map((item, index) => item ? (
            <Col
              span={12}
              key={index}
            >
              <Flex
                gap="10px"
                style={{
                  flexDirection: 'column',
                  alignItems: 'start',
                  justifyContent: 'center'
                }}
              >
                <Typography.Text
                  ellipsis={{ tooltip: item.name }}
                >
                  {item.name}
                </Typography.Text>
                <Progress
                  percent={item.percentage}
                  steps={4}
                />
              </Flex>
            </Col>
          ) : null)
        }
      </Row>
    </Drawer>
  )
}

export default IntesitiesDrawer
