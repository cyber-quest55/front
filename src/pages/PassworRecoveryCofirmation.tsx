import { history, useIntl } from '@umijs/max';
import { Button, Card, Col, Result, Typography } from 'antd';
import React from 'react';

const PassworRecoveryCofirmation: React.FC = () => {
    const intl = useIntl();
    return (
        <Col style={{ display: 'flex', justifyContent: 'center' }} span={24}>
            <Result
                status="success"
                title={intl.formatMessage({
                    id: 'pages.recoveryConfirmation.title',
                    defaultMessage: "Email de recuperação enviado com sucesso"
                })}
                subTitle={<Card>
                    <Col style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} span={24}>
                        <Typography.Text type="secondary">
                            {intl.formatMessage({
                                id: 'pages.recoveryConfirmation.text1',
                                defaultMessage: 'Um email foi enviado para o endereço indicado.'
                            })}
                        </Typography.Text>
                        <Typography.Text type="secondary">
                            {intl.formatMessage({
                                id: 'pages.recoveryConfirmation.text2',
                                defaultMessage: 'Siga as instruções no email e recupere sua senha.'
                            })}
                        </Typography.Text>
                        <Typography.Text type="secondary">
                            {intl.formatMessage({
                                id: 'pages.recoveryConfirmation.text3',
                                defaultMessage: 'Este email pode demorar até 1 hora para chegar.'
                            })}
                        </Typography.Text>
                    </Col>
                </Card>}
                extra={
                    <Button
                        type="primary"
                        htmlType="button"
                        style={{ minWidth: '150px' }}
                        onClick={() => history.push('/user/login')}>
                        Ok
                    </Button>
                }
            />
        </Col>)
};

export default PassworRecoveryCofirmation;