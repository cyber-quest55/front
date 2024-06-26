import { useEmotionCss } from '@ant-design/use-emotion-css';
import { NodeElement, RadioCoordinate } from '@/models/signal';
import { useIntl } from '@umijs/max';
import {
  Badge,
  Col,
  Drawer,
  Flex,
  Progress,
  Row,
  Tooltip,
  Typography
} from 'antd';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

type Props = {
  isOpen: boolean,
  toggleDrawer: () => void;
  title?: string;
  currentRadio?: string;
  nodes: NodeElement[];
  signals: RadioCoordinate[],
  isGps: boolean,
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
  isGps,
}: Props) => {
  // Hooks
  const intl = useIntl();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [
    timedOut,
    setTimedOut,
  ] = useState<boolean>(false);

  // Classes
  const classNameScrollable = useEmotionCss(({ }) => {
    return {
      maxHeight: 'calc(100vh - 192px)',
      [`@media screen and (max-width: 762px)`]: {
        maxHeight: 'calc(100vh - 184px)',
        height: '100vh',
      },
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
    };
  });

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

  // Actions
  const handleCloseModal = () => {
    toggleDrawer();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  // Effects
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimedOut(false);
    if (isOpen) {
      const newTimeoutId = setTimeout(() => setTimedOut(true), 60000);
      setTimeoutId(newTimeoutId);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    isOpen,
    currentRadio
  ]);

  // TSX
  return (
    <Drawer
      title={isGps ? `${title} GPS` : title}
      open={isOpen}
      onClose={handleCloseModal}
      mask={false}
    >
      <div
        className={classNameScrollable}
        style={{
          width: '100%',
          paddingBottom: '60px',
        }}
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
                  <Flex style={{
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Typography.Text
                      ellipsis={{ tooltip: item.name }}
                    >
                      {item.name}
                    </Typography.Text>
                    {
                      (
                        !timedOut &&
                        item.percentage === 0
                      ) ? (
                        <Tooltip
                          key="tooltip_status"
                          title={intl.formatMessage({
                            id: 'component.signal.box.loading.status.normal',
                          })}
                        >
                          <Badge status="processing" />
                        </Tooltip>
                      ) : null
                    }
                  </Flex>
                  <Progress
                    percent={item.percentage}
                    steps={4}
                  />
                </Flex>
              </Col>
            ) : null)
          }        
        </Row>
      </div>

    </Drawer>
  )
}

export default IntesitiesDrawer
