import { useScreenHook } from '@/hooks/screen';
import { setDeviceClose } from '@/models/selected-device';
import { getPivotMaintnanceMode, patchPivotMaintnanceMode, stopPivot } from '@/services/pivot';
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
import { Link, useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import {
  App,
  Button,
  Col,
  Dropdown,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { MenuProps } from 'rc-menu';
import { useEffect } from 'react';
import { BsFillCloudRainFill } from 'react-icons/bs';
import { GiPadlock, GiPadlockOpen, GiSolidLeaf } from 'react-icons/gi';
import { TbBrandFlightradar24 } from 'react-icons/tb';
import StartPivotSimpleFormContainer from '../Forms/StartPivotSimple/StartPivotSimpleContainer';
import StartPivotScheduleContainer from '../Forms/StartPivotSchedule/StartPivotScheduleContainer';

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
  const { message } = App.useApp();
  const params = useParams();

  const mtncReq = useRequest(patchPivotMaintnanceMode, { manual: true });
  const mtncGetReq = useRequest(getPivotMaintnanceMode, { manual: true });
  const stopReq = useRequest(stopPivot, { manual: true });

  const { options, device, type, onChangeDevice } = props;

  const classNameSelect = useEmotionCss(({ token }) => {
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

  const onMaintenanceModeToggle = async () => {
    try {
      if (mtncGetReq.data) {
        await mtncReq.runAsync(
          {
            farmId: params.id as any,
            pivotId: device.id as any,
          },
          {
            maintenance: !mtncGetReq.data?.maintenance,
          },
        );

        await mtncGetReq.refreshAsync();

        message.success(
          intl.formatMessage({
            id: 'component.message.success',
          }),
        );
      }
    } catch (err) {
      message.error(
        intl.formatMessage({
          id: 'component.message.error',
        }),
      );
      return false;
    }
    return true;
  };

  const handleStopPivot = async () => {
    try {
      await stopReq.runAsync(
        {
          farmId: params.id as any,
          pivotId: device.id as any,
        },
        {
          maintenance: !mtncGetReq.data?.maintenance,
        },
      );

      message.success(
        intl.formatMessage({
          id: 'component.message.success',
        }),
      );
    } catch (err) {
      message.error(
        intl.formatMessage({
          id: 'component.message.error',
        }),
      );
      return false;
    }
    return true;
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
      label: <StartPivotScheduleContainer/>
    },
  ];

  // To load maintain mode
  useEffect(() => {
    if (device.id && type === DeviceType.Pivot && !mtncGetReq.loading)
      mtncGetReq.run(
        {
          farmId: params.id as any,
          pivotId: device.id as any,
        },
        {},
      );
  }, [device]);

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
            <Button
              loading={stopReq.loading}
              onClick={handleStopPivot}
              type="default"
              danger
              style={{ width: md ? '200px' : '100%' }}
            >
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
            <Popconfirm
              onConfirm={onMaintenanceModeToggle}
              title={`${intl.formatMessage({
                id: 'component.pivot.operationalpanel.button.tooltip.maintain',
              })}?`}
            >
              <Button icon={mtncGetReq.data?.maintenance ? <GiPadlockOpen /> : <GiPadlock />} />
            </Popconfirm>
            <Button icon={<GiSolidLeaf />} />
            <Button icon={<CloudFilled />} />
            <Link to={`/farms/${params.id}/pivot/${device.id}/edit`}>
              <Button icon={<EditFilled />}>
                {intl.formatMessage({
                  id: 'component.pivot.operationalpanel.button.edit',
                })}
              </Button>
            </Link>
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
