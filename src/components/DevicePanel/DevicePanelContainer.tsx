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
import { DevicePanelSkeleton } from './DevicePanelSkeleton';
import { GetMeterSystemByIdModelProps } from '@/models/meter-by-id';
import { useUnmount } from 'ahooks'
import { DevicePanelModelProps, togglePivotMaintenance } from '../../models/device-panel';

type Props = {
  type: DeviceType;
  irpd: GetIrpdModelProps;
  pivot: GetPivotModelProps;
  pivotById: GetPivotByIdModelProps;
  meterSystem: GetMeterSystemModelProps;
  meterSystemById: GetMeterSystemByIdModelProps;
  selectedDevice: SelectedDeviceModelProps;
  devicePanel: DevicePanelModelProps;
  togglePivotMaintenance: typeof togglePivotMaintenance;
  setSelectedDevice: typeof setSelectedDevice;
  setDeviceClose: typeof setDeviceClose;
};

const DevicePanelContainer: React.FC<Props> = (props) => {
  const params = useParams();
  const { xs } = useScreenHook();
  const [device, setDevice] = useState<any>({});
  const [options, setOptions] = useState<Array<{ value: number; label: string }>>([]);

  const {
    irpd, pivot, pivotById, meterSystem,
    meterSystemById, type, selectedDevice, setSelectedDevice,
    setDeviceClose, devicePanel, togglePivotMaintenance,
  } = props;

  const loading = pivot.loading || irpd.loading || meterSystem.loading;

  useEffect(() => {
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
        setDevice({
          ...device,
          unformated: meterSystemById.unformated,
        });
        break;
      }
      case DeviceType.Pump: {
        const device = irpd.result.find((item) => item.id === selectedDevice.deviceId);
        setDevice(device);
        break;
      }
    }
  }, [selectedDevice.deviceId, pivotById, meterSystemById]);

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
            otherProps: { imeterSetId: device.imeterSetId },
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

  useUnmount(() => {
    if (!xs)
      setDeviceClose()
  })

  return (
    <>
      {loading ? (
        <DevicePanelSkeleton type={type} />
      ) : xs ? (
        <DevicePanelComponent
          options={options}
          type={type}
          onChangeDevice={onChangeDevice}
          device={device}
          setDeviceClose={setDeviceClose}
          devicePanel={devicePanel}
          togglePivotMaintenance={togglePivotMaintenance}
          selectedDevice={selectedDevice}
        />
      ) : (
        <DevicePanelComponent
          options={options}
          type={type}
          onChangeDevice={onChangeDevice}
          device={device}
          setDeviceClose={setDeviceClose}
          devicePanel={devicePanel}
          togglePivotMaintenance={togglePivotMaintenance}
          selectedDevice={selectedDevice}
        />
      )}
    </>
  );
};

const mapStateToProps = ({
  pivot,
  pivotById,
  selectedDevice,
  meterSystem,
  irpd,
  meterSystemById,
  devicePanel
}: any) => ({
  irpd,
  pivot,
  pivotById,
  meterSystem,
  meterSystemById,
  selectedDevice,
  devicePanel
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
  setDeviceClose: () => dispatch(setDeviceClose()),
  togglePivotMaintenance: (props: any) => dispatch(togglePivotMaintenance(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DevicePanelContainer);
