import { useScreenHook } from '@/hooks/screen';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import {
  SelectedDeviceModelProps,
  setDeviceClose,
  setSelectedDevice,
} from '@/models/selected-device';
import { DeviceType } from '@/utils/enum/device-type';
import { getCommonDateParam } from '@/utils/formater/get-common-date-param';
import { Dispatch, useParams } from '@umijs/max';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import { DevicePanelComponent } from './DevicePanelComponent';
import DevicePanelMobile from './DevicePanelMobile';
import { DevicePanelSkeleton } from './DevicePanelSkeleton';

type Props = {
  type: DeviceType;
  irpd: GetIrpdModelProps;
  pivot: GetPivotModelProps;
  pivotById: GetPivotByIdModelProps;
  meterSystem: GetMeterSystemModelProps;
  selectedDevice: SelectedDeviceModelProps;
  setSelectedDevice: typeof setSelectedDevice;
  setDeviceClose: typeof setDeviceClose;
};

const DevicePanelContainer: React.FC<Props> = (props) => {
  const params = useParams();
  const { xs } = useScreenHook();
  const [device, setDevice] = useState<any>({});
  const [options, setOptions] = useState<Array<{ value: number; label: string }>>([]);

  const {
    irpd,
    pivot,
    pivotById,
    meterSystem,
    type,
    selectedDevice,
    setSelectedDevice,
    setDeviceClose,
  } = props;

  const loading = pivot.loading || irpd.loading || meterSystem.loading;

  useEffect(() => {
    console.log(pivotById);
    switch (type) {
      case DeviceType.Pivot: {
        const device = pivotById.result;
        setDevice({
          ...device,
          base_radio_id: pivotById.unformated.base_radio_id,
          unformated: pivotById.unformated,
        });
        break;
      }
      case DeviceType.Meter: {
        const device = meterSystem.result.find((item) => item.id === selectedDevice.deviceId);
        setDevice(device);
        break;
      }
      case DeviceType.Pump: {
        const device = irpd.result.find((item) => item.id === selectedDevice.deviceId);
        setDevice(device);
        break;
      }
    }
  }, [selectedDevice.deviceId, pivotById]);

  useEffect(() => {
    switch (type) {
      case DeviceType.Pivot: {
        const newOptions = pivot?.result.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setOptions(newOptions);
        break;
      }
      case DeviceType.Meter: {
        const newOptions = meterSystem?.result.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        setOptions(newOptions);
        break;
      }
      case DeviceType.Pump: {
        const newOptions = irpd?.result.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        setOptions(newOptions);
        break;
      }
    }
  }, [irpd, pivot, meterSystem]);

  const onChangeDevice = (e: string) => {
    switch (type) {
      case DeviceType.Pivot: {
        const device = pivot.result.find((item) => item.id === parseInt(e));
        const farmId = parseInt(params.id as string);
        if (device && farmId)
          setSelectedDevice({
            type: DeviceType.Pivot,
            deviceId: device.id,
            farmId,
            otherProps: {},
          });
        break;
      }
      case DeviceType.Meter: {
        const device = meterSystem.result.find((item) => item.id === parseInt(e));
        const farmId = parseInt(params.id as string);
        if (device && farmId)
          setSelectedDevice({
            type: DeviceType.Meter,
            deviceId: device.id,
            farmId,
            otherProps: device.imeterSetId,
          });
        break;
      }
      case DeviceType.Pump: {
        const device = irpd.result.find((item) => item.id === parseInt(e));
        const farmId = parseInt(params.id as string);
        if (device && farmId)
          setSelectedDevice({
            type: DeviceType.Pump,
            deviceId: device.id,
            farmId,
            otherProps: { waterId: device.waterId, params: getCommonDateParam(true) },
          });
        break;
      }
    }
  };

  return (
    <>
      {loading ? (
        <DevicePanelSkeleton type={type} />
      ) : xs ? (
        <DevicePanelMobile
          options={options}
          type={type}
          onChangeDevice={onChangeDevice}
          device={device}
        />
      ) : (
        <DevicePanelComponent
          options={options}
          type={type}
          onChangeDevice={onChangeDevice}
          device={device}
          setDeviceClose={setDeviceClose}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ pivot, pivotById, selectedDevice, meterSystem, irpd }: any) => ({
  irpd,
  pivot,
  pivotById,
  meterSystem,
  selectedDevice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
  setDeviceClose: () => dispatch(setDeviceClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DevicePanelContainer);
