import PivotList from './PivotList'
import React, { FunctionComponent, ReactNode } from 'react';
import FarmSelect from '@/components/FarmSelect';
import { ProCard } from '@ant-design/pro-components';
import { Col, Row, Space, Typography } from 'antd';
import { LoadScript, } from '@react-google-maps/api';
import RenderPivots from '@/components/RenderPivots';

type Props = {
    dispatch?: any;
    children: ReactNode
    google?: any
}

const MapsRender: FunctionComponent<Props> = () => {
 
    return (
        <>
            <div style={{ width: '100%', height: 'calc(100vh - 55px)' }}>
                <LoadScript
                    googleMapsApiKey="&key=AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU"
                >
                    <RenderPivots />
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