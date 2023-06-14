import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdByIdModelProps } from '@/models/irpd-by-id';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { DeviceType } from '@/utils/enums';
import { GoogleMap } from '@react-google-maps/api';
import { connect } from 'dva';
import { FunctionComponent, useEffect, useState } from 'react';
import CirclePivot from '../Devices/CirclePivot';
import LakeLevelMeterDevice from '../Devices/LakeLevelMeter';
import WaterPumpDevice from '../Devices/WaterPump';

type Props = {
  zoom: number;
  height: number;
  dispatch: any;
  farm: GetFarmModelProps;
  irpdById: GetIrpdByIdModelProps;
  pivotById: GetPivotByIdModelProps;
  selectedDevice: SelectedDeviceModelProps;
  pivotInformation: GetPivotInformationModelProps;
};

const DeviceMapsRender: FunctionComponent<Props> = (props) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const containerStyle = {
    width: '100%',
    height: props.height,
  };

  useEffect(() => {
    const type = props.selectedDevice.type;
    switch (type) {
      case DeviceType.Pivot: {
        if (props.pivotById.loaded === true) {
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
    }
  }, [props.pivotById.loaded, props.irpdById]);

  const renderCorrectDevice = (type: string) => {
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
              pivotColor={item.pivotColor}
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
            />
          );
        break;
      }
      case DeviceType.Meter: {
        const item = props.pivotById.loaded ? props.pivotById.result : undefined;
        if (props.irpdById.loaded && item !== undefined)
          return (
            <LakeLevelMeterDevice
              key={'meter-system'}
              centerLat={item.centerLat}
              centerLng={item.centerLng}
              name={item.name}
              updated={item.updated}
              id={item.id}
              onSelect={() => null}
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
      }}
      zoom={14.5}
    >
      {props.selectedDevice.open ? renderCorrectDevice(props.selectedDevice.type) : null}
    </GoogleMap>
  );
};

export default connect(
  ({
    farm,
    irpdById,
    pivotById,
    selectedDevice,
    pivotInformation,
  }: {
    farm: any;
    irpdById: any;
    pivotById: any;
    selectedDevice: any;
    pivotInformation: any;
  }) => ({
    farm,
    irpdById,
    pivotById,
    selectedDevice,
    pivotInformation,
  }),
)(DeviceMapsRender);