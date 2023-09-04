import { useScreenHook } from '@/hooks/screen';
import { DeviceType } from '@/utils/enum/device-type';
import { Col, Row, Skeleton, Space } from 'antd';
import { TbBrandFlightradar24 } from 'react-icons/tb';

type Props = {
  type: DeviceType;
 
};

const DevicePanelSkeleton: React.FC<Props> = (props) => {
  const { md } = useScreenHook();
  const { type } = props;

  const extra = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return (
          <Space direction="vertical" size="middle">
            <Space size="middle">
              <Space>
                <Skeleton.Input />
              </Space>
              <Space>
                <Skeleton.Input />
              </Space>
            </Space>
            <Space size="middle">
              <Space>
                <Skeleton.Input />
              </Space>
              <Space>
                <Skeleton.Input />
              </Space>
            </Space>
          </Space>
        );
      }

      case DeviceType.Meter: {
        return (
          <Space direction="vertical" size="middle">
            <Space size="middle">
              <Space>
                <Skeleton.Input />
              </Space>
              <Space>
                <Skeleton.Input />
              </Space>
            </Space>
            <Space size="middle">
              <Space>
                <Skeleton.Input />
              </Space>
              <Space>
                <Skeleton.Input />
              </Space>
            </Space>
          </Space>
        );
      }

      case DeviceType.Pump: {
        return (
          <Space direction="vertical" size="middle">
            <Space size="middle">
              <Space>
                <Skeleton.Input />
              </Space>
              <Space>
                <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                <Skeleton.Input />
              </Space>
            </Space>
            <Space size="middle">
              <Space>
                <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                <Skeleton.Input />
              </Space>
              <Space>
                <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                <Skeleton.Input />
              </Space>
            </Space>
          </Space>
        );
      }
    }
  };

  const deviceActions = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Skeleton.Button />

            <Skeleton.Button />
          </Space>
        );
      }

      case DeviceType.Meter: {
        return <Space direction="vertical" size="middle" style={{ width: '100%' }}></Space>;
      }

      case DeviceType.Pump: {
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Skeleton.Button />

            <Skeleton.Button />
          </Space>
        );
      }
    }
  };

  const actions = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return (
          <Space>
            <Skeleton.Button />
            <Skeleton.Button />
            <Skeleton.Button />
            <Skeleton.Button />
            <Skeleton.Button />
          </Space>
        );
      }

      case DeviceType.Meter: {
        return (
          <Space>
            <Skeleton.Button />
            <Skeleton.Button />
          </Space>
        );
      }

      case DeviceType.Pump: {
        return (
          <Space>
            <Skeleton.Button />
            <Skeleton.Button />
          </Space>
        );
      }
    }
  };

  const status = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return <Skeleton.Button />;
      }

      case DeviceType.Meter: {
        return <Skeleton.Button />;
      }

      case DeviceType.Pump: {
        return <Skeleton.Button />;
      }
    }
  };
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Row justify="space-between" align="middle" gutter={[12, 12]}>
        <Col>{status(type)}</Col>
        <Col>{actions(type)}</Col>
      </Row>
      <Row style={{ maxWidth: 250 }}>
        <Col style={{ width: '100%' }}>
          <Skeleton.Input />
        </Col>
        <Col>
          <Skeleton.Button />
        </Col>
      </Row>
      <Row gutter={[12, 16]} justify="space-between">
        <Col style={{ width: md ? '195px' : '100%' }}>{extra(type)}</Col>
        <Col style={{ width: md ? '235px' : '100%' }}>{deviceActions(type)}</Col>
      </Row>
    </Space>
  );
};

export { DevicePanelSkeleton };
