import { ProCard, ProList, ProSkeleton } from '@ant-design/pro-components';
import GoogleMapReact from 'google-map-react';
import { FunctionComponent, ReactNode, ReactText, useState } from 'react';
import { connect } from 'umi';
import { GetFarmModelProps } from '@/models/farm';
import FarmSelect from '@/components/FarmSelect';
import { useMount } from 'ahooks';


type Props = {
    dispatch: any;
    farm: GetFarmModelProps
    children: ReactNode
}

const MapsRender: FunctionComponent<Props> = (props) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
    console.log('chegou aqui')
    useMount(() => {
        props.dispatch({
            type: 'farm/queryFarm',
            payload: {}
        })
    })
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
                    <div style={{
                        position: 'absolute',
                        width: 400,
                        top: 65,
                        left: 45,
                        maxHeight: 500,
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}>
                        {
                            !props.farm.loading ?
                                <ProList<Models.Farm>
                                    rowKey="title"
                                    headerTitle={
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center', 
                                            width: '360px' 
                                        }}>
                                            <div>Fazendas</div>
                                            <FarmSelect />
                                        </div>
                                    }
                                    style={{ width: '100%' }}
                                    expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                                    dataSource={props.farm.result.list}
                                    metas={{
                                        title: {
                                            dataIndex: 'name',
                                        },
                                        actions: {
                                            render: () => {
                                                return <a key="invite">Editar</a>;
                                            },
                                        },
                                    }}
                                /> :
                                <ProCard >
                                    <ProSkeleton
                                        statistic={false}
                                        list={3}
                                        pageHeader={false}
                                        toolbar={false}
                                        type="list"
                                    />
                                </ProCard>
                        }

                    </div>
                </>
            }
        </>
    );
};

export default connect(({ farm }: { farm: GetFarmModelProps }) => ({
    farm,
}))(MapsRender); 
