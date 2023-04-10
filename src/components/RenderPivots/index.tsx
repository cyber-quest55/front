import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { Dispatch } from '@umijs/max';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import CirclePivot from '../CirclePivot';
import { GoogleMap } from '@react-google-maps/api';

export type RenderPivotsProps = {
  dispatch: Dispatch;
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
};

const RenderPivots: React.FC<RenderPivotsProps> = (props) => {
  const [zoom, setZoom] = useState(13)
  const [map, setMap] = useState<any>(null)
  const [mapCenter, setMapCenter] = useState({lat: 0, lng: 0})

  const containerStyle = {
    width: '100%',
    height: 'calc(100vh )'
  };
 

  useMount(() => {
    props.dispatch({
      type: 'pivotInformation/queryPivotInformation',
      payload: {
        id: 310,
        params: {}
      }
    })
  })

  useEffect(() => { 
    if(props.pivotInformation.loading === false){
      const pivot = props.pivotInformation.result[0]
      setMapCenter({lat: pivot.centerLat, lng: pivot.centerLng})
    }

  }, [props.pivotInformation.loading])
  

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
        mapTypeId: 'satellite'
      }}
      zoom={zoom}
    >
      {!props.pivotInformation.loading ?
        props.pivotInformation.result?.map(item => (
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
            zoom={zoom}
            hasMarker={true}
            irrigationStatus={4}
            dashed={false}
          />
        )) : null}
    </GoogleMap>
  </>
};

export default connect(({ pivotInformation }: { pivotInformation: any }) => ({
  pivotInformation,
}))(RenderPivots);  
