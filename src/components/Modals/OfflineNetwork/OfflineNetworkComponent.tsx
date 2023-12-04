import React from 'react'
import { Badge, Modal, Space, Tooltip, Typography } from 'antd'
import { NetworkState } from 'ahooks/lib/useNetwork';
import { WifiOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';

interface Props {
    networkState: NetworkState;
}

export const OfflineNetworkComponent = (props: Props) => {
    const networkState: NetworkState = props.networkState
    const intl = useIntl();

    return (
        <Space direction='vertical'>
            <Modal
                centered
                open={!networkState.online}
                title={<Space direction="vertical" style={{ textAlign: 'center' }}>
                    <Typography.Text type="secondary" style={{ fontSize: 20, textAlign: 'justify', color: "black" }}>
                        {intl.formatMessage({
                            id: 'component.modal.wifi.title',
                            defaultMessage: 'Não foi possível conectar a internet, verifique seu acesso a rede.',
                        })}
                    </Typography.Text>
                </Space>}
                closable={false}
                footer
            >
                <Space direction='vertical' style={{ textAlign: 'center', alignItems: "center" }}>
                    <Badge count={'x'} size="small" style={{
                        color: 'white', width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        fontSize: '22px',
                        textAlign: "center",
                        paddingTop: "5px",
                        marginTop: "10px"
                    }}>
                        <Tooltip title={intl.formatMessage({
                            id: 'component.modal.wifi.title',
                            defaultMessage: 'Sem conexão'
                        })}>
                            <WifiOutlined
                                style={{
                                    fontSize: 64,
                                    color: 'var(--adm-color-warning)',
                                }}
                            />
                        </Tooltip>
                    </Badge>
                    <Space direction="vertical" style={{ textAlign: 'center' }}>
                        <Typography.Text type="secondary" style={{ fontSize: 16, textAlign: 'justify' }}>
                            {intl.formatMessage({
                                id: 'component.modal.wifi.description',
                                defaultMessage: 'Não foi possível conectar a internet, verifique seu acesso a rede.',
                            })}
                        </Typography.Text>
                    </Space>
                </Space>
            </Modal>
        </Space>
    )
}
