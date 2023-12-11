import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Link, SelectLang, useIntl } from '@umijs/max';
import { Alert, Col, Row, Space, Typography } from 'antd';
import { Button, Form, Input } from 'antd-mobile';
import { createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';
import { yupValidator } from '@/utils/adapters/yup';
import * as yup from 'yup';

type Props = {
    handleSubmit: (values: any) => Promise<void>;
    loading: boolean;
    error?: string;
};

const PasswordResetMobile: React.FC<Props> = (props) => {
    const [form] = Form.useForm<any>();

    const intl = useIntl();
    const { handleSubmit, loading, error } = props;

    const schema = yup.object().shape({
        password: yup
            .string()
            .min(8, intl.formatMessage({ id: 'validations.min' }, { value: 8 }))
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@'"!$!-_%*#?&]{8,}$/,
                intl.formatMessage({
                    id: 'validations.strong.password',
                }),
            ),
        confirmPassword: yup
            .string()
            .min(8, intl.formatMessage({ id: 'validations.min' }, { value: 8 }))
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@'"!$!-_%*#?&]{8,}$/,
                intl.formatMessage({
                    id: 'validations.strong.password',
                }),
            ).oneOf([yup.ref('password')], intl.formatMessage({
                id: 'validations.password.match',
            }),),
    });

    const yupSync = yupValidator(schema, form.getFieldsValue);

    const className = useEmotionCss(({ }) => {
        return {
            maxWidth: `96%`,
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
                        <Space style={{ width: '100%' }} direction="vertical" align="center">
                            <Typography.Text type="secondary">
                                {intl.formatMessage({
                                    id: 'component.form.passwordReset.info',
                                    defaultMessage:
                                        'Digite sua nova senha.',
                                })}
                            </Typography.Text>
                        </Space>
                    </Row>
                    <Space direction="vertical" size={'large'} style={{ width: '85vw' }}>
                        <Form
                            form={form}
                            validateTrigger="onBlur"
                            layout="horizontal"
                            mode="card"
                            onFinish={handleSubmit}
                            footer={
                                <Space direction="vertical" size={'large'}>
                                    {error ? (
                                        <Alert
                                            style={{
                                                width: '100%',
                                                textAlign: 'center',
                                                marginTop: '20px',
                                            }}
                                            description={error}
                                            type="error"
                                        />
                                    ) : null}
                                    <Row gutter={[25, 25]} justify="center">
                                        <Col flex="auto">
                                            <Link to={'/user/login'}>
                                                <Button
                                                    block
                                                    color="primary"
                                                    type="button"
                                                    style={{ minWidth: '150px' }}
                                                    loading={loading}
                                                >
                                                    {intl.formatMessage({
                                                        id: 'component.form.PasswordReset.btn.back',
                                                        defaultMessage: 'Voltar ',
                                                    })}
                                                </Button>
                                            </Link>
                                        </Col>
                                        <Col flex="auto">
                                            <Button
                                                block
                                                color="primary"
                                                type="submit"
                                                style={{ minWidth: '150px' }}
                                                loading={loading}
                                            >
                                                {intl.formatMessage({
                                                    id: 'component.form.PasswordReset.btn.send',
                                                    defaultMessage: 'Enviar ',
                                                })}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Space>
                            }
                            style={{ width: '100%' }}
                        >
                            <Form.Item
                                required
                                rules={[yupSync]}
                                name="password"
                            >
                                <Input
                                    clearable
                                    type="password"
                                    placeholder={intl.formatMessage({
                                        id: 'component.form.passwordReset.input.password.placeholder',
                                        defaultMessage: 'Sua Senha',
                                    })}
                                />
                            </Form.Item>
                            <Form.Header />
                            <Form.Item
                                required
                                rules={[yupSync]}
                                name="confirmPassword"
                            >
                                <Input
                                    clearable
                                    type="password"
                                    placeholder={intl.formatMessage({
                                        id: 'component.form.PasswordReset.input.confirmPassword.placeholder',
                                        defaultMessage: 'Confirme sua Senha',
                                    })}
                                />
                            </Form.Item>
                            <Form.Header />
                        </Form>
                    </Space>
                </Space>
            </ProCard>
        </div>
    );
};

export { PasswordResetMobile };
