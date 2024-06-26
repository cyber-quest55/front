import { useMapHook } from '@/hooks/map';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdByIdModelProps } from '@/models/irpd-by-id';
import { GetMeterSystemByIdModelProps } from '@/models/meter-by-id';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { DeviceType } from '@/utils/enum/device-type';
import { GoogleMap } from '@react-google-maps/api';
import { connect } from 'dva';
import { FunctionComponent, ReactNode, useEffect, useRef } from 'react';

import LakeLevelMeterDevice from '../Devices/LakeLevelMeter';
import WaterPumpDevice from '../Devices/WaterPump';
import CustomInfoWindow from '../Devices/InfoWindow';
import CirclePivot from '../Devices/CirclePivot';

type Props = {
  zoom: number;
  height: number;
  farm: GetFarmModelProps;
  irpdById: GetIrpdByIdModelProps;
  pivotById: GetPivotByIdModelProps;
  selectedDevice: SelectedDeviceModelProps;
  meterSystemById: GetMeterSystemByIdModelProps;
  pivotInformation: GetPivotInformationModelProps;
  children?: ReactNode
  showDevice?: boolean;
};

const DeviceMapsRender: FunctionComponent<Props> = (props) => {
  const { mapCenter, setMapCenter } = useMapHook(0, { lat: 0, lng: 0 });
  const ref = useRef()
  const containerStyle = {
    width: '100%',
    height: props.height,
  };

  useEffect(() => {
    const type = props.selectedDevice.type;
    switch (type) {
      case DeviceType.Pivot: {
        if (
          props.pivotById.loaded === true &&
          props.pivotById.result.gpsLat &&
          props.pivotById.result.gpsLong
        ) {
          const pivot = props.pivotById.result;
          setMapCenter({ lat: pivot.centerLat, lng: pivot.centerLng });
        }
        break;
      }
      case DeviceType.Pump: {
        if (props.irpdById.loaded === true) {
          const item = props.irpdById.result;
          setMapCenter({ lat: item.centerLat, lng: item.centerLng });
        }
        break;
      }
      case DeviceType.Meter: {
        if (props.meterSystemById.loaded === true) {
          const item = props.meterSystemById.result;
          setMapCenter({ lat: item.centerLat, lng: item.centerLng });
        }
        break;
      }
    }
  }, [props.pivotById.loading, props.irpdById.loading, props.meterSystemById.loading]);


  const renderCorrectDevice = (type: string) => {
    if (props.showDevice)
      switch (type) {
        case DeviceType.Pivot: {
          const item = props.pivotById.loaded ? props.pivotById.result : undefined;

          if (props.pivotById.loaded && item !== undefined)
            return (
              <CirclePivot
                onSelect={() => null}
                id={item.id}
                key={item.id}
                protocol={item.protocol}
                type={item.type}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                referencedLat={item.referencedLat}
                referencedLng={item.referencedLng}
                gpsLat={item.gpsLat}
                gpsLong={item.gpsLong}
                deviceColor={item.deviceColor}
                lineColor="#fff"
                referenceAngle={item.referenceAngle}
                irrigationDirection={item.irrigationDirection}
                stopAngle={item.stopAngle}
                endAngle={item.endAngle}
                sectorAngle={item.sectorAngle}
                lpmGpsStreamLat={item.lpmGpsStreamLat}
                lpmGpsStreamLng={item.lpmGpsStreamLng}
                zoom={14}
                hasMarker={true}
                irrigationStatus={4}
                dashed={false}
                name={item.name}
                updated={item.updated}
                statusText={item.statusText}
                infoWindowRef={ref}
                mapHistory={[]}
              />
            );
          break;
        }
        case DeviceType.Pump: {
          const item = props.irpdById.loaded ? props.irpdById.result : undefined;
          if (props.irpdById.loaded && item !== undefined)
            return (
              <WaterPumpDevice
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                name={item.name}
                updated={item.updated}
                id={item.id}
                onSelect={() => null}
                infoWindowRef={ref}

              />
            );
          break;
        }
        case DeviceType.Meter: {
          const item = props.meterSystemById.loaded ? props.meterSystemById.result : undefined;
          if (props.meterSystemById.loaded && item !== undefined)
            return (
              <LakeLevelMeterDevice
                key={'meter-system'}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                name={item.name}
                updated={item.updated}
                id={item.id}
                width={200}
                height={200}
                onSelect={() => null}
                infoWindowRef={ref}
              />
            );
          break;
        }
      }
    return null;
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      options={{
        keyboardShortcuts: false,
        rotateControl: false,
        mapTypeControl: false,
        isFractionalZoomEnabled: false,
        mapTypeId: 'satellite',
        streetViewControl: false,
        zoomControl: false,
        scaleControl: false,
        panControl: false,
        disableDoubleClickZoom: true,
        draggable: false,
        fullscreenControl: false,
      }}
      zoom={14.5}

    >
      <CustomInfoWindow ref={ref} />
      {props.selectedDevice.open ? renderCorrectDevice(props.selectedDevice.type) : null}
      {props.children}
    </GoogleMap>
  );
};

const mapStateToProps = ({
  farm,
  irpdById,
  pivotById,
  meterSystemById,
  selectedDevice,
  pivotInformation,
}: any) => ({
  farm,
  irpdById,
  pivotById,
  meterSystemById,
  selectedDevice,
  pivotInformation,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMapsRender);
