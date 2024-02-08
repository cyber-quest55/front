import { useScreenHook } from '@/hooks/screen';
import { setDeviceClose } from '@/models/selected-device';
import {
  getDeviceIsOnline,
  getPivotMaintnanceMode,
  patchPivotMaintnanceMode,
  stopPivot,
} from '@/services/pivot';
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
  Alert,
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
import { GiPadlock, GiPadlockOpen } from 'react-icons/gi';
import { TbBrandFlightradar24 } from 'react-icons/tb';
import StartPivotAngleContainer from '../Forms/StartPivotAngle/StartPivotAngleContainer';
import StartPivotScheduleContainer from '../Forms/StartPivotSchedule/StartPivotScheduleContainer';
import StartPivotSegmentContainer from '../Forms/StartPivotSegment/StartPivotSegmentContainer';
import StartPivotSimpleFormContainer from '../Forms/StartPivotSimple/StartPivotSimpleContainer';
import CropSegmentsModalContainer from '../Modals/Crop/CropContainer';
import StartPumpScheduleContainer from '../Forms/StartPumpSchedule/StartPumpScheduleContainer';

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
  const isOnReq = useRequest(getDeviceIsOnline, { manual: true });

  const meter: API.GetMeterSystemByIdResponse =
    props.type === DeviceType.Meter ? props.device.unformated : null;

  // For pivot
  const isDisabled = !isOnReq.data?.is_online || mtncGetReq.data?.maintenance;

  // For IRPD
  const isDisabledIrpd = !isOnReq.data?.is_online;

  const maxValue =
    meter?.imeter_set?.length > 0
      ? meter?.imeter_set[0]?.latest_config?.content?.imanage_sensors[0]?.max_value
      : 1;

  const minValue =
    meter?.imeter_set?.length > 0
      ? meter?.imeter_set[0]?.latest_config?.content?.imanage_sensors[0]?.min_value
      : 1;

  const minLimit =
    meter?.imeter_set?.length > 0 ? meter?.imeter_set[0]?.latest_config?.min_limit : undefined;
  const maxLimit =
    meter?.imeter_set?.length > 0 ? meter?.imeter_set[0]?.latest_config?.max_limit : undefined;

  const meterVolume =
    meter?.imeter_set?.length > 0
      ? meter?.imeter_set[0]?.latest_periodic_stream?.content?.imanage_sensor_measure_value[0]
          ?.value
      : undefined;

  const { options, device, type, onChangeDevice } = props;

  console.log(maxValue, maxLimit, meterVolume);

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

                <div>
                  {
                    device?.unformated?.controllerstream_panel?.content?.voltage_measure
                      ?.voltage_measure
                  }{' '}
                  V
                </div>
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
                <div>- </div>
              </Space>
              <Space>
                <Tooltip title="Horímetro">
                  <ClockCircleOutlined />
                </Tooltip>

                <div>
                  {device?.unformated?.controllerstream_panel?.content?.operation_time?.total_hour}{' '}
                  h{' '}
                  {
                    device?.unformated?.controllerstream_panel?.content?.operation_time
                      ?.total_minute
                  }{' '}
                  min
                </div>
              </Space>
            </Space>
          </Space>
        );
      }

      case DeviceType.Meter: {
        return (
          <Space direction="vertical" size="middle">
            <Space direction="vertical" size="middle">
              <Typography.Text type="warning">
                {intl.formatMessage({ id: 'component.meter.report.chart.label.min' })}:{' '}
                {minLimit && ((minLimit / 100) * maxValue) / 10}%
              </Typography.Text>
              <Typography.Text type="danger">
                {intl.formatMessage({ id: 'component.meter.report.chart.label.max' })}:{' '}
                {maxLimit && ((maxLimit / 100) * maxValue) / 10}%
              </Typography.Text>
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
                <div>- bar</div>
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
      label: <StartPivotAngleContainer />,
    },
    {
      key: '3',
      label: <StartPivotSegmentContainer />,
    },
    {
      key: '4',
      label: <StartPivotScheduleContainer />,
    },
  ];

  const itemsIrpd: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Popconfirm
          placement="bottom"
          title={intl.formatMessage({
            id: 'component.popconfirm.oktext',
          })}
          onConfirm={handleStopPivot}
        >
          <Typography.Link style={{ width: '100%' }}>
            {intl.formatMessage({
              id: 'component.pivot.operationalpanel.button.start.opt.1',
            })}
          </Typography.Link>
        </Popconfirm>
      ),
    },
    {
      key: '2',
      label: <StartPumpScheduleContainer />,
    },
  ];

  // To lo((minLimit / 100) * maxValue) / 10 ad maintain mode
  useEffect(() => {
    if (device.id && type === DeviceType.Pivot && !mtncGetReq.loading) {
      mtncGetReq.runAsync(
        {
          farmId: params.id as any,
          pivotId: device.id as any,
        },
        {},
      );
      isOnReq.runAsync({ deviceId: props.device.base_radio_id }, {});
    }

    if (DeviceType.Pump) {
      isOnReq.runAsync({ deviceId: props.device.base_radio_id }, {});
    }
  }, [device]);

  const deviceActions = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Pivot: {
        return (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Dropdown
              disabled={isDisabled}
              trigger={['click']}
              menu={{ items }}
              placement="top"
              arrow
            >
              <Button type="primary" style={{ width: md ? '200px' : '100%' }}>
                {intl.formatMessage({
                  id: 'component.pivot.operationalpanel.button.start',
                })}
              </Button>
            </Dropdown>
            <Button
              disabled={isDisabled}
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
            <Dropdown
              disabled={isDisabledIrpd}
              trigger={['click']}
              menu={{ items: itemsIrpd }}
              placement="top"
              arrow
            >
              <Button type="primary" style={{ width: md ? '200px' : '100%' }}>
                {intl.formatMessage({
                  id: 'component.irpd.operationalpanel.button.start',
                })}
              </Button>
            </Dropdown>
            <Popconfirm
              disabled={isDisabledIrpd}
              placement="bottom"
              title={intl.formatMessage({
                id: 'component.popconfirm.oktext',
              })}
              onConfirm={handleStopPivot}
            >
              <Button
                disabled={isDisabledIrpd}
                loading={stopReq.loading}
                type="default"
                danger
                style={{ width: md ? '200px' : '100%' }}
              >
                {intl.formatMessage({
                  id: 'component.irpd.operationalpanel.button.stop',
                })}
              </Button>
            </Popconfirm>
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
              title={
                mtncGetReq.data?.maintenance
                  ? `${intl.formatMessage({
                      id: 'component.pivot.operationalpanel.button.tooltip.maintain.2',
                    })}?`
                  : `${intl.formatMessage({
                      id: 'component.pivot.operationalpanel.button.tooltip.maintain',
                    })}?`
              }
            >
              <Button icon={mtncGetReq.data?.maintenance ? <GiPadlock /> : <GiPadlockOpen />} />
            </Popconfirm>
            <CropSegmentsModalContainer />
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
            <Link
              to={`/farms/${params.id}/metersystem/${device.id}/meter/${device.imeterSetId}/edit`}
            >
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

      case DeviceType.Pump: {
        return (
          <Space>
               <Link to={`/farms/${params.id}/irpd/${device.id}/edit`}>
                <Button icon={<EditFilled />}>
                  {intl.formatMessage({
                    id: 'component.pivot.operationalpanel.button.edit',
                  })}
                </Button>
              </Link>
          
              <Link to={`/farms/${params.id}/irpd/${device.id}/editv4`}>
                <Button icon={<CloseCircleFilled />} onClick={destroyOnClick}>
                  {intl.formatMessage({
                    id: 'component.pivot.operationalpanel.button.close',
                  })}
                </Button>
              </Link>
          
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
        return (
          <Tag color={'#115186'}>
            {meterVolume
              ? `${((meterVolume / maxValue) * 100).toFixed(1)}% (${meterVolume / 100} m)`
              : ''}
          </Tag>
        );
      }

      case DeviceType.Pump: {
        return <Tag color={device.deviceColor}>{device.statusText}</Tag>;
      }
    }
  };

  const RenderPivotAlert = () => {
    if (type === DeviceType.Pivot)
      return isOnReq.data?.is_online ? (
        mtncGetReq.data?.maintenance ? (
          <Row style={{ width: 259 }} align={'middle'}>
            <Col style={{ width: '100%' }}>
              <Alert
                message={intl.formatMessage({ id: 'component.pivot.alert.maintenance' })}
                type="warning"
                showIcon
              />
            </Col>
          </Row>
        ) : null
      ) : (
        <Row style={{ width: 259 }} align={'middle'}>
          <Col style={{ width: '100%' }}>
            <Alert
              message={intl.formatMessage({ id: 'component.pivot.alert.without' })}
              type="warning"
              showIcon
            />
          </Col>
        </Row>
      );

    return <></>;
  };

  const RenderIRPDAlert = () => {
    if (type === DeviceType.Pump)
      return isOnReq.data?.is_online ? (
        <></>
      ) : (
        <Row style={{ width: 259 }} align={'middle'}>
          <Col style={{ width: '100%' }}>
            <Alert
              message={intl.formatMessage({ id: 'component.irpd.alert.without' })}
              type="warning"
              showIcon
            />
          </Col>
        </Row>
      );

    return <></>;
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Row justify="space-between" align="middle" gutter={[12, 12]}>
        <Col>{status(type)}</Col>
        <Col>{actions(type)}</Col>
      </Row>
      <Row justify="space-between">
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
        <RenderPivotAlert />
        <RenderIRPDAlert />
      </Row>

      <Row gutter={[12, 16]} justify="space-between">
        <Col style={{ width: md ? '195px' : '100%' }}>{extra(type)}</Col>
        <Col style={{ width: md ? '235px' : '100%' }}>{deviceActions(type)}</Col>
      </Row>
    </Space>
  );
};

export default DevicePanelComponent;
