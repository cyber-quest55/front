import PivotList from './PivotList'
import React, { FunctionComponent, ReactNode } from 'react';
import FarmSelect from '@/components/FarmSelect';
import { ProCard } from '@ant-design/pro-components';
import { Col, Row, Space, Typography } from 'antd';
import { GoogleMap, LoadScript, Circle, Polyline } from '@react-google-maps/api';
import { Rectangle } from '@react-google-maps/api';
import { LatLng, computeDistanceBetween, computeHeading, computeOffset, computeOffsetOrigin } from 'spherical-geometry-js';
import CirclePivot from '@/components/CirclePivot/CirclePivot';

type Props = {
    dispatch?: any;
    children: ReactNode
    google?: any
}

const MapsRender: FunctionComponent<Props> = (props) => {
    const containerStyle = {
        width: '100%',
        height: 'calc(100vh )'
    };

    const center = {
        lat: -22.425491,
        lng: -45.452787
    }

    const centerLat = -22.425491
    const centerLng = -45.452787
    const referencedLat = -22.426115
    const referencedLng = -45.453535
    const gpsLat = -22.0092306
    const gpsLong = -46.8108764
  
    return (
        <>
            <div style={{ width: '100%', height: 'calc(100vh - 55px)' }}>
                <LoadScript
                    googleMapsApiKey="&key=AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        options={{
                            mapTypeId: 'satellite'
                        }}
                        zoom={18}
                    >
                        <CirclePivot
                            version="v5"
                            centerLat={centerLat}
                            centerLng={centerLng}
                            referencedLat={referencedLat}
                            referencedLng={referencedLng}
                            gpsLat={gpsLat}
                            gpsLong={gpsLong}
                            pivotColor="#FF0000"
                            lineColor="#fff"
                            dashed
                        /> 
 
                    </GoogleMap>
                </LoadScript>
            </div>

            <ProCard style={{
                position: 'absolute',
                width: 400,
                top: 65,
                left: 45,
                maxHeight: 500,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: 0
            }}  >
                <Space size="large" direction="vertical" style={{ width: '100%' }}>
                    <Row justify="space-between" align="middle"  >
                        <Col ><Typography.Title level={5} style={{ margin: 0 }} >Pivos</Typography.Title ></Col>
                        <Col ><FarmSelect /></Col>
                    </Row>
                    <PivotList />
                </Space>
            </ProCard>
        </>

    );
};

export default MapsRender