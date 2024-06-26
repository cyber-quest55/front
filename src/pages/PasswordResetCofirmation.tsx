import { history, useIntl } from '@umijs/max';
import { Button, Col, Result, Typography } from 'antd';
import React from 'react';

const PasswordResetCofirmation: React.FC = () => {
    const intl = useIntl();
    return (
        <Col style={{ display: 'flex', justifyContent: 'center' }} span={24}>
            <Result
                status="success"
                title={intl.formatMessage({
                    id: 'pages.passwordResetCofirmation.title',
                    defaultMessage: "Senha alterada com sucesso"
                })}
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

export default PasswordResetCofirmation;