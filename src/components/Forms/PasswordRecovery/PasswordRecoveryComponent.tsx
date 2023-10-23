import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { SelectLang, useIntl } from '@umijs/max';
import { Alert, Button, Col, Divider, Row, Space, Typography } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';
import { createRef } from 'react';

type Props = {
    handleSubmit: (values: any, recaptchaRef: any) => Promise<void>;
    loading: boolean;
    error?: string;
    validateEmail: (values: any) => Promise<void>;
}

const PasswordRecoveryComponent: React.FC<Props> = (props) => {
    const intl = useIntl();
    const { handleSubmit, loading, error, validateEmail } = props;
    const recaptchaRef = createRef();

    const handleFormSubmit = async (values: any) => {
        handleSubmit(values, recaptchaRef);
    };

    function onChange(value: any) {
        console.log("Captcha value:", value);
    }

    const className = useEmotionCss(({ }) => {
        return {
            maxWidth: `375px`,
            background: 'rgb(255 255 255 / 0.2)',
            backdropFilter: 'blur(8px)',
            padding: 0,
        };
    });

    return (
        <div
            style={{
                color: 'white',
                display: 'flex',
                height: 'calc(100vh - 84px)',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
            }}
        >
            <ProCard className={className}>
                <Space direction="vertical" size={'large'}>
                    <Row justify="space-between">
                        <Col>
                            <Space size="small">
                                <img src={ImageBgLogo} style={{ width: 35 }} alt="logo-enchant" />
                                <Typography.Title level={4} style={{ margin: 0, color: 'white' }}>
                                    Irricontrol
                                </Typography.Title>
                            </Space>
                        </Col>
                        <Col style={{ color: 'white' }}>
                            <SelectLang />
                        </Col>
                    </Row>
                    <Space direction="vertical" size={'large'}>
                        <ProForm
                            layout="vertical"
                            rowProps={{ gutter: 4 }}
                            grid
                            submitter={{
                                render: () => (
                                    <Space direction="vertical" align="center" size="large" style={{ width: '100%', justifyContent: 'center' }}>

                                    </Space>
                                ),
                            }}
                            size="large"
                            name="loging_form"
                            initialValues={{
                                email:
                                    process.env.NODE_ENV === 'development'
                                        ? 'wellington.ferreira@irricontrol.com.br'
                                        : '',
                            }}
                            onFinish={handleFormSubmit}
                        >
                            <Space style={{ width: '100%' }} direction="vertical" align="center">
                                <Typography.Text type="secondary">
                                    {intl.formatMessage({
                                        id: 'pages.login.therms.firstx',
                                        defaultMessage:
                                            'Insira o seu endereço de email para enviarmos um link de recuperação da sua conta.',
                                    })}
                                </Typography.Text>
                            </Space>
                            <Divider />
                            <ProFormText
                                width="md"
                                required
                                name="email"
                                placeholder={intl.formatMessage({
                                    id: 'pages.login.input.email.placeholder',
                                    defaultMessage: 'John Vicioda',
                                })}
                                onMetaChange={validateEmail}
                            />
                            <Space style={{ width: '100%' }} direction="vertical" align="center">
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    style={{ margin: 0, padding: 0, transform: "scale(1.08)" }}
                                    sitekey="6LeH4_cUAAAAAJn1YZUm-91DpXPz35kLOEH5RSUr"
                                    size="normal"
                                    name='recaptcha'
                                    onChange={onChange}
                                />
                            </Space>
                            {error ? <Alert style={{
                                width: '100%', textAlign: "center"
                                , marginTop: "20px"
                            }} description={error} type="error" /> : null}
                            <Divider />
                            <Row gutter={[25, 25]} justify="center">
                                <Col flex="auto">
                                    <Button
                                        block
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        style={{ minWidth: '150px' }}
                                    >
                                        {intl.formatMessage({
                                            id: 'pages.login.btn.text1',
                                            defaultMessage: 'Voltar ',
                                        })}
                                    </Button>
                                </Col>
                                <Col flex="auto">
                                    <Button
                                        block
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        style={{ minWidth: '150px' }}
                                    >
                                        {intl.formatMessage({
                                            id: 'pages.login.btn.text1',
                                            defaultMessage: 'Enviar ',
                                        })}
                                    </Button>
                                </Col>
                            </Row>
                        </ProForm>
                    </Space>
                </Space>
            </ProCard>
        </div>
    );
};

export { PasswordRecoveryComponent };
