
import React, { FunctionComponent, ReactNode } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { LoadScript, } from '@react-google-maps/api';
import RenderPivots from '@/components/RenderPivots';
import PivotList from '@/components/PivotList';
import { useEmotionCss } from '@ant-design/use-emotion-css';

type Props = {
    dispatch?: any;
    children: ReactNode
    google?: any
}

const MapsRender: FunctionComponent<Props> = () => {
    const className = useEmotionCss(({ }) => {
        return {
            [`.ant-pro-card-body`]: {
                paddingInline: '0px !important',
            },
        };
    });

    return (
        <>
            <div style={{ width: '100%', height: 'calc(100vh - 55px)' }}>
                <LoadScript
                    googleMapsApiKey="&key=AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU"
                >
                    <RenderPivots />
                </LoadScript>
            </div>
            <ProCard className={className} style={{
                position: 'absolute',
                width: 400,
                top: 65,
                left: 45,
                padding: 0
            }}>
                <PivotList />
            </ProCard>
        </>

    );
};

export default MapsRender