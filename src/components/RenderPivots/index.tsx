import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { Dispatch } from '@umijs/max';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import React from 'react';
import CirclePivot from '../CirclePivot';

export type RenderPivotsProps = {
  dispatch: Dispatch;
  pivotInformation: GetPivotInformationModelProps;
};

const RenderPivots: React.FC<RenderPivotsProps> = (props) => {

  useMount(() => {
    props.dispatch({
      type: 'pivotInformation/queryPivotInformation',
      payload: {
        id: 310,
        params: {}
      }
    })
  })
 
  return <>
    {!props.pivotInformation.loading? 
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
      />
    )): null}
  </>
};

export default connect(({ pivotInformation }: { pivotInformation: any }) => ({
  pivotInformation,
}))(RenderPivots);  
