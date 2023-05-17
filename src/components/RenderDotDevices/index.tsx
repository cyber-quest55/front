import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { Dispatch, useParams } from '@umijs/max';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { GetFarmModelProps } from '@/models/farm';
import { useWindowWidth } from '@react-hook/window-size'
import DotDevice from '../Devices/DotDevice';
import LakeLevelMeterDevice from '../Devices/LakeLevelMeter';

export type RenderPivotsProps = {
  dispatch: Dispatch;
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps
};

const RenderDotDevices: React.FC<RenderPivotsProps> = (props) => {
  const params = useParams()
  const onlyWidth = useWindowWidth()

  const [zoom, setZoom] = useState(14)
  const [map, setMap] = useState<any>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })

  const containerStyle = {
    width: '100%',
    height: onlyWidth > 1210? '100vh': 'calc(100vh -  102px)'
  };

  useEffect(() => {
    props.dispatch({
      type: 'pivotInformation/queryPivotInformation',
      payload: {
        id: parseInt(params.id as string),
        params: {}
      }
    })
  }, [params])

  useEffect(() => {
    if (props.pivotInformation.loaded === true) {
      const pivot = props.pivotInformation.result[0]
      setMapCenter({ lat: pivot.centerLat, lng: pivot.centerLng })
    }
  }, [props.pivotInformation.loaded])


  return <> 
      <GoogleMap
        onLoad={(map => setMap(map))}
        onZoomChanged={() => {
          if (map !== null)
            setZoom(map.getZoom())
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
          streetViewControl: false
        }}
        zoom={zoom}
      >
        {!props.pivotInformation.loading ?
          props.pivotInformation.result?.map(item => (
            <LakeLevelMeterDevice
              id={item.id}
              key={item.id}  
              centerLat={item.centerLat}
              centerLng={item.centerLng}
              referencedLat={item.referencedLat}
              referencedLng={item.referencedLng}
              gpsLat={item.gpsLat}
              gpsLong={item.gpsLong}
              pivotColor="#FF0000"
              lineColor="#fff"          
            />
          )) : null}
      </GoogleMap> 
  </>
};

export default connect(({ pivotInformation, farm }: { pivotInformation: any, farm: any }) => ({
  pivotInformation, farm
}))(RenderDotDevices);  
