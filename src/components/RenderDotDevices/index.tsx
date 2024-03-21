import { useMapHook } from '@/hooks/map';
import { useScreenHook } from '@/hooks/screen';
import { GetCentralModelProps } from '@/models/central';
import { GetFarmModelProps } from '@/models/farm';
import { GetIrpdModelProps } from '@/models/irpd';
import { GetMeterSystemModelProps } from '@/models/meter-sysem';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetRepeaterModelProps } from '@/models/repeaters';
import { GoogleMap } from '@react-google-maps/api';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import DotDevice from '../Devices/DotDevice';

export type RenderPivotsProps = {
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps;
  meterSystem: GetMeterSystemModelProps;
  irpd: GetIrpdModelProps;
  central: GetCentralModelProps;
  repeater: GetRepeaterModelProps;
};

const RenderDotDevices: React.FC<RenderPivotsProps> = (props) => {
  const { xl } = useScreenHook();
  
  const { zoom, setZoom, map, setMap, mapCenter, setMapCenter } = useMapHook(14, {
    lat: 0,
    lng: 0,
  });

  const containerStyle = {
    width: '100%',
    height: xl ? '100vh' : 'calc(100vh -  102px)',
  };

  useEffect(() => {
    if (props.pivotInformation.loaded === true) {
      const pivot = props.pivotInformation.result[0];
      setMapCenter({ lat: pivot.centerLat, lng: pivot.centerLng });
    }
  }, [props.pivotInformation.loaded]);

  return (
    <>
      <GoogleMap
        onLoad={(map) => setMap(map)}
        onZoomChanged={() => {
          if (map !== null) setZoom(map.getZoom());
        }}
        mapContainerStyle={containerStyle}
        center={mapCenter}
        options={{
          keyboardShortcuts: false,
          rotateControl: false,
          mapTypeControl: false,
          isFractionalZoomEnabled: false,
          mapTypeId: 'satellite',
          zoomControl: false,
          scaleControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }}
        zoom={zoom}
      >
        {!props.pivotInformation.loading
          ? props.pivotInformation.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="#FF0000"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={null}
              />
            ))
          : null}
        {!props.meterSystem.loading
          ? props.meterSystem.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="#FF0000"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={null}
              />
            ))
          : null}
        {!props.irpd.loading
          ? props.irpd.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="#FF0000"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={null}
              />
            ))
          : null}
        {!props.central.loading
          ? props.central.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="yellow"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={null}
              />
            ))
          : null}
        {!props.repeater.loading
          ? props.repeater.result?.map((item) => (
              <DotDevice
                id={item.id}
                key={item.id}
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                deviceColor="blue"
                lineColor="#fff"
                name={item.name}
                updated={item.updated}
                mapRef={null}
                infoWindowRef={null}
              />
            ))
          : null}
      </GoogleMap>
    </>
  );
};

const mapStateToProps = 
({
  pivotInformation,
  farm,
  meterSystem,
  irpd,
  central,
  repeater,
}:  any) => ({
  pivotInformation,
  farm,
  meterSystem,
  irpd,
  central,
  repeater,
});


const mapDispatchToProps = () => ({ 
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderDotDevices);
