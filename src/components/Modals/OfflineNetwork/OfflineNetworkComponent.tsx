import React from 'react'
import { Modal, Space } from 'antd'
import { NetworkState } from 'ahooks/lib/useNetwork';
import { WifiOutlined } from '@ant-design/icons';

interface Props {
    networkState: NetworkState;
}

export const OfflineNetworkComponent = (props: Props) => {
    const networkState: NetworkState = props.networkState
    return (
        <Space direction='vertical'>
            <Modal
                centered
                open={!networkState.online}
                title={'Sem Conexão'}
            >
                <Space direction='vertical'>
                    <WifiOutlined
                        style={{
                            fontSize: 64,
                            color: 'var(--adm-color-warning)',
                        }}
                    />
                    <div>Você se encontra sem conneção a internet no momento</div>
                </Space>
            </Modal>
        </Space>
    )
}
