import { useScreenHook } from '@/hooks/screen';
import { setDeviceClose } from '@/models/selected-device';
import { DeviceType } from '@/utils/enum/device-type';
import { PivotStatusColor } from '@/utils/enum/pivot-status';
import {
  CaretDownOutlined,
  ClockCircleOutlined,
  CloseCircleFilled,
  CloudFilled,
  EditFilled,
  HistoryOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Link, useParams } from '@umijs/max';
import { Button, Col, Row, Select, Space, Tag, Tooltip, Typography } from 'antd';
import { BsFillCloudRainFill } from 'react-icons/bs';
import { GiPadlockOpen, GiSolidLeaf } from 'react-icons/gi';
import { TbBrandFlightradar24 } from 'react-icons/tb';

const { Text } = Typography;

type Props = {
  type: DeviceType;

  options: Array<{
    value: number;
    label: string;
  }>;

  onChangeDevice: (e: string) => void;

  device: any;

  setDeviceClose: typeof setDeviceClose;
};

export const DevicePanelComponent: React.FC<Props> = (props) => {
  const { md } = useScreenHook();
  // const navigate = useNavigate();
  const params = useParams();

  const { options, device, type, onChangeDevice } = props;

  const classNameSelect = useEmotionCss(() => {
    return {
      '.ant-select-selection-item': {
        fontWeight: 700,
        fontSize: 24,
      },
      '.ant-select-selector': {
        padding: '0 !important',
      },
      '.ant-select-arrow': {
        color: 'black',
        fontSize: 20,
      },
    };
  });

  const destroyOnClick = () => {
    props.setDeviceClose();
  };

  const extra = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return (
          <Space direction="vertical" size="middle">
            <Space size="middle">
              <Space>
                <Tooltip title="Voltagem">
                  <ThunderboltFilled />
                </Tooltip>

                <div>220 V</div>
              </Space>
              <Space>
                <Tooltip title="Barras">
                  <HistoryOutlined />
                </Tooltip>
                <div>1.2 bar</div>
              </Space>
            </Space>
            <Space size="middle">
              <Space>
                <Tooltip title="Chuva hoje">
                  <BsFillCloudRainFill />
                </Tooltip>
                <div>10 mm </div>
              </Space>
              <Space>
                <Tooltip title="Horímetro">
                  <ClockCircleOutlined />
                </Tooltip>

                <div>262h 33min</div>
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
                <Tooltip title="Voltagem">
                  <ThunderboltFilled />
                </Tooltip>

                <div>220 V</div>
              </Space>
              <Space>
                <Tooltip title="Barras">
                  <HistoryOutlined />
                </Tooltip>
                <div>1.2 bar</div>
              </Space>
            </Space>
            <Space size="middle">
              <Space>
                <Tooltip title="Chuva hoje">
                  <BsFillCloudRainFill />
                </Tooltip>
                <div>10 mm </div>
              </Space>
              <Space>
                <Tooltip title="Horímetro">
                  <ClockCircleOutlined />
                </Tooltip>

                <div>262h 33min</div>
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
                <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                <div>1.2 bar</div>
              </Space>
              <Space>
                <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                <div>250V</div>
              </Space>
            </Space>
            <Space size="middle">
              <Space>
                <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                <div>1.2 bar</div>
              </Space>
              <Space>
                <TbBrandFlightradar24 style={{ fontSize: 20 }} />
                <div>250V</div>
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
            <Button type="primary" style={{ width: md ? '200px' : '100%' }}>
              Start Pivot
            </Button>
            <Button type="default" danger style={{ width: md ? '200px' : '100%' }}>
              Stop Pivot
            </Button>
          </Space>
        );
      }

      case DeviceType.Meter: {
        return <Space direction="vertical" size="middle" style={{ width: '100%' }}></Space>;
      }

      case DeviceType.Pump: {
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Button type="primary" style={{ width: md ? '200px' : '100%' }}>
              Ligar Bomba
            </Button>
            <Button type="default" danger style={{ width: md ? '200px' : '100%' }}>
              Parar Bomba
            </Button>
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
            <Button icon={<GiPadlockOpen />} />
            <Button icon={<GiSolidLeaf />} />
            <Button icon={<CloudFilled />} />
            <Button icon={<EditFilled />}>Edit</Button>
            <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>
              Close
            </Button>
          </Space>
        );
      }

      case DeviceType.Meter: {
        return (
          <Space>
            <Link
              to={`/farms/${params.id}/metersystem/${device.id}/meter/${device.imeterSetId}/edit`}
            >
              <Button icon={<EditFilled />}>Edit</Button>
            </Link>
            <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>
              Close
            </Button>
          </Space>
        );
      }

      case DeviceType.Pump: {
        return (
          <Space>
            <Button icon={<EditFilled />}>Edit</Button>
            <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>
              Close
            </Button>
          </Space>
        );
      }
    }
  };

  const status = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return <Tag color={PivotStatusColor.off}>{'LIGADA APÓS QUEDA DE ENERGIA'}</Tag>;
      }

      case DeviceType.Meter: {
        return <Tag color={'#115186'}>{'25.0% (0.25m)'}</Tag>;
      }

      case DeviceType.Pump: {
        return <Tag color={'#115186'}>{'LIGADA APÓS QUEDA DE ENERGIA'}</Tag>;
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
          <Select
            className={classNameSelect}
            suffixIcon={<CaretDownOutlined />}
            bordered={false}
            showSearch
            value={device?.name?.toString()}
            size="large"
            style={{ width: '100%' }}
            filterOption={(input, option) =>
              (option?.label ?? '')?.toLowerCase().includes(input.toLowerCase())
            }
            onChange={onChangeDevice}
            options={options}
          />
        </Col>
        <Col>
          <Text type="secondary" style={{ fontSize: 11 }}>
            Last communication: 19 May 10:15
          </Text>
        </Col>
      </Row>
      <Row gutter={[12, 16]} justify="space-between">
        <Col style={{ width: md ? '195px' : '100%' }}>{extra(type)}</Col>
        <Col style={{ width: md ? '235px' : '100%' }}>{deviceActions(type)}</Col>
      </Row>
    </Space>
  );
};

export default DevicePanelComponent;
