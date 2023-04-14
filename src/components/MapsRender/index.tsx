
import React, { FunctionComponent, ReactNode } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { LoadScript, } from '@react-google-maps/api';
import RenderPivots from '@/components/RenderPivots';
import PivotList from '@/components/PivotList';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { connect } from 'dva';
import { Spin } from 'antd';
import { GetPivotModelProps } from '@/models/pivot';
import { GetFarmModelProps } from '@/models/farm';

type Props = {
    dispatch?: any;
    children: ReactNode
    google?: any;
    pivot: GetPivotModelProps;
    farm: GetFarmModelProps;
}

const MapsRender: FunctionComponent<Props> = (props) => {
    const className = useEmotionCss(({ }) => {
        return {
            [`.ant-pro-card-body`]: {
                paddingInline: '0px !important',
            },
        };
    });

    return (
        <Spin spinning={props.pivot.loading || props.farm.loading}>
            <div style={{ width: '100%', height: ' 100vh ' }}>
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
        </Spin>
    );
};


export default connect(({ pivot, farm }: { pivot: any, farm: any }) => ({
    pivot, farm
}))(MapsRender); 