import React from 'react'
import { Modal, Space } from 'antd-mobile'
import { Badge, Tooltip, Typography } from 'antd';
import { useNetworkHook } from '@/hooks/network-status';
import { WifiOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';

export const OfflineNetwork = () => {
    const networkState = useNetworkHook()
    const intl = useIntl();

    return (
        <Modal
            closeOnAction
            visible={!networkState.online}
            header={(
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
            )}
            title={intl.formatMessage({
                id: 'component.modal.wifi.title',
                defaultMessage: 'Sem conexão'
            })}
            content={
                <Space direction="vertical" style={{ textAlign: 'center' }}>
                    <Typography.Text type="secondary" style={{ fontSize: 16, textAlign: 'justify' }}>
                        {intl.formatMessage({
                            id: 'component.modal.wifi.description',
                            defaultMessage: 'Não foi possível conectar a internet, verifique seu acesso a rede.',
                        })}
                    </Typography.Text>
                </Space>

            }
        />
    )
}