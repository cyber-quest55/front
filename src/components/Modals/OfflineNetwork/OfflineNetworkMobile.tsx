import React from 'react'
import { Modal, Space } from 'antd-mobile'
import { NetworkState } from 'ahooks/lib/useNetwork';
import { WifiOutlined } from '@ant-design/icons';

interface Props {
    networkState: NetworkState;
}

export const OfflineNetworkMobile = (props: Props) => {
    const networkState: NetworkState = props.networkState
    return (
        <>
            <Space direction='vertical' block>
                <Modal
                    visible={!networkState.online}
                    closeOnAction
                    header={(
                        <WifiOutlined
                            style={{
                                fontSize: 64,
                                color: 'var(--adm-color-warning)',
                            }}
                        />
                    )}
                    title={'Sem Conexão'}
                    content={
                        <Space direction='vertical'>
                            <div>Você se encontra sem conneção a internet no momento</div>
                        </Space>
                    }
                />
            </Space>

        </>
    )
}