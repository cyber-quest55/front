import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { Dispatch, useParams } from '@umijs/max';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import CirclePivot from '../CirclePivot';
import { GoogleMap } from '@react-google-maps/api';
import { GetFarmModelProps } from '@/models/farm';
import { Spin } from 'antd';

export type RenderPivotsProps = {
  dispatch: Dispatch;
  zoom: number;
  pivotInformation: GetPivotInformationModelProps;
  farm: GetFarmModelProps
};

const RenderPivots: React.FC<RenderPivotsProps> = (props) => {
  const params = useParams()

  const [zoom, setZoom] = useState(13)
  const [map, setMap] = useState<any>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 })

  const containerStyle = {
    width: '100%',
    height: 'calc(100vh)'
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
    <Spin spinning={props.pivotInformation.loading}>
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
    </Spin>
  </>
};

export default connect(({ pivotInformation, farm }: { pivotInformation: any, farm: any }) => ({
  pivotInformation, farm
}))(RenderPivots);  
