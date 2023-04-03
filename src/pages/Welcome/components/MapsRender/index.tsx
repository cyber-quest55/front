import GoogleMapReact from 'google-map-react';
import PivotList from './PivotList'
import { FunctionComponent, ReactNode } from 'react';
import FarmSelect from '@/components/FarmSelect';
import { ProCard } from '@ant-design/pro-components';
import { Col, Row, Space, Typography } from 'antd';

type Props = {
    dispatch: any;
    children: ReactNode
}

const MapsRender: FunctionComponent<Props> = (props) => {

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 8
    };

    return (
        <>
            {
                <>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "&key=AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU" as string }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    >
                        {props.children}
                    </GoogleMapReact>
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
                        <Space size="large" direction="vertical" style={{width :'100%'}}>
                            <Row justify="space-between" align="middle"  >
                                <Col ><Typography.Title level={5} style={{ margin: 0 }} >Pivos</Typography.Title ></Col>
                                <Col ><FarmSelect /></Col>
                            </Row>
                            <PivotList />
                        </Space>
                    </ProCard>
                </>
            }
        </>
    );
};

export default MapsRender; 
