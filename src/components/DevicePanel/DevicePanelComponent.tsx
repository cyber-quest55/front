import { useScreenHook } from '@/hooks/screen';
import { setDeviceClose } from '@/models/selected-device';
import { DeviceType } from '@/utils/enum/device-type';
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
import { useIntl } from '@umijs/max';
import { Button, Col, Dropdown, Row, Select, Space, Tag, Tooltip, Typography } from 'antd';
import { MenuProps } from 'rc-menu';
import { BsFillCloudRainFill } from 'react-icons/bs';
import { GiPadlockOpen, GiSolidLeaf } from 'react-icons/gi';
import { TbBrandFlightradar24 } from 'react-icons/tb';
import StartPivotSimpleFormContainer from '../Forms/StartPivotSimple/StartPivotSimpleContainer';

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
  const intl = useIntl();

  const { options, device, type, onChangeDevice } = props;

  const classNameSelect = useEmotionCss(({token}) => {
    return {
      '.ant-select-selection-item': {
        fontWeight: 700,
        fontSize: 24,
      },
      '.ant-select-selector': {
        padding: '0 !important',
      },
      '.ant-select-arrow': {
        color: token.colorTextBase,
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

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <StartPivotSimpleFormContainer />,
    },
    {
      key: '2',
      label: intl.formatMessage({
        id: 'component.pivot.operationalpanel.button.start.opt.2',
      }),
    },
    {
      key: '3',
      label: intl.formatMessage({
        id: 'component.pivot.operationalpanel.button.start.opt.3',
      }),
    },
    {
      key: '4',
      label: intl.formatMessage({
        id: 'component.pivot.operationalpanel.button.start.opt.4',
      }),
    },
  ];

  const deviceActions = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Dropdown menu={{ items }} placement="top" arrow>
              <Button type="primary" style={{ width: md ? '200px' : '100%' }}>
                {intl.formatMessage({
                  id: 'component.pivot.operationalpanel.button.start',
                })}
              </Button>
            </Dropdown>
            <Button type="default" danger style={{ width: md ? '200px' : '100%' }}>
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.stop',
              })}{' '}
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
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.start',
              })}
            </Button>
            <Button type="default" danger style={{ width: md ? '200px' : '100%' }}>
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.stop',
              })}{' '}
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
            <Button icon={<EditFilled />}>
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.edit',
              })}
            </Button>
            <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.close',
              })}
            </Button>
          </Space>
        );
      }

      case DeviceType.Meter: {
        return (
          <Space>
            <Button icon={<EditFilled />}>
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.edit',
              })}
            </Button>
            <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.close',
              })}
            </Button>
          </Space>
        );
      }

      case DeviceType.Pump: {
        return (
          <Space>
            <Button icon={<EditFilled />}>
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.edit',
              })}
            </Button>
            <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>
              {intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.close',
              })}
            </Button>
          </Space>
        );
      }
    }
  };

  const status = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return <Tag color={device.deviceColor}>{device.statusText}</Tag>;
      }

      case DeviceType.Meter: {
        return <Tag color={'#115186'}>{'25.0% (0.25m)'}</Tag>;
      }

      case DeviceType.Pump: {
        return <Tag color={device.deviceColor}>{device.statusText}</Tag>;
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
            suffixIcon={<CaretDownOutlined className="" />}
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
            {intl.formatMessage({ id: 'component.lastcomunication' }, { value: device.updated })}
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
