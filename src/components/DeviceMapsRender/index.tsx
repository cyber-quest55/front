
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'dva';
import { GetFarmModelProps } from '@/models/farm';
import { GoogleMap } from '@react-google-maps/api';
import { Dispatch } from '@umijs/max';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import CirclePivot from '../CirclePivot';
import { GetGoogleMapsProps } from '@/models/google-maps';

type Props = {
  dispatch: Dispatch;
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps,
  googleMaps: GetGoogleMapsProps
  height: number
}

const DeviceMapsRender: FunctionComponent<Props> = (props) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })

  const containerStyle = {
    width: '100%',
    height: props.height
  };

  useEffect(() => {
    if (props.pivotInformation.loaded === true) {
      const pivot = props.pivotInformation.result[0]
      setMapCenter({ lat: pivot.centerLat, lng: pivot.centerLng })
    }
  }, [props.pivotInformation.loaded])

  const item = props.pivotInformation.result.length > 0 ? props.pivotInformation.result[0] : undefined
  
  return  props.googleMaps?  <GoogleMap
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
      zoom={15}
    >
      {!props.pivotInformation.loading ?
        item !== undefined ?
          <CirclePivot
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
            pivotColor="#FF0000"
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
          /> : null : null}
    </GoogleMap> : null
};

export default connect(({ pivotInformation, farm, googleMaps }: { pivotInformation: any, farm: any, googleMaps: any }) => ({
  pivotInformation, farm, googleMaps
}))(DeviceMapsRender); 