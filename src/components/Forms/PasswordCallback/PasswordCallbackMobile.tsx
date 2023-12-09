import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Link, SelectLang, useIntl } from '@umijs/max';
import { Alert, Col, Row, Space, Typography } from 'antd';
import { Button, Form, Input } from 'antd-mobile';
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';
import { yupValidator } from '@/utils/adapters/yup';
import * as yup from 'yup';

type Props = {
    handleSubmit: (values: any) => Promise<void>;
    loading: boolean;
    error?: string;
};

const PasswordCallbackMobile: React.FC<Props> = (props) => {
    const [form] = Form.useForm<any>();

    const intl = useIntl();
    const { handleSubmit, loading, error } = props;

    const schema = yup.object().shape({
        email: yup
            .string()
            .email(intl.formatMessage({
                id: 'pages.passwordRecovery.invalid',
            }),)
            .required(
                intl.formatMessage({
                    id: 'validations.required',
                }),
            ),
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
                                    id: 'pages.passwordRecovery.info',
                                    defaultMessage:
                                        'Insira o seu endereço de email para enviarmos um link de recuperação da sua conta.',
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
                                                    loading={loading}
                                                    style={{ minWidth: '150px' }}
                                                >
                                                    {intl.formatMessage({
                                                        id: 'pages.passwordRecovery.btn.back',
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
                                                loading={loading}
                                                style={{ minWidth: '150px' }}
                                            >
                                                {intl.formatMessage({
                                                    id: 'pages.passwordRecovery.btn.send',
                                                    defaultMessage: 'Enviar ',
                                                })}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Space>
                            }
                            style={{ width: '100%' }}
                        >
                            <Form.Item name="email" rules={[yupSync]}>
                                <Input
                                    type="email"
                                    placeholder={intl.formatMessage({
                                        id: 'pages.passwordRecovery.email.placeholder',
                                        defaultMessage: 'example@mail.com',
                                    })}
                                />
                            </Form.Item>
                            <Form.Item name="email" rules={[yupSync]}>
                                <Input
                                    type="email"
                                    placeholder={intl.formatMessage({
                                        id: 'pages.passwordRecovery.email.placeholder',
                                        defaultMessage: 'example@mail.com',
                                    })}
                                />
                            </Form.Item>
                        </Form>
                    </Space>
                </Space>
            </ProCard>
        </div>
    );
};

export { PasswordCallbackMobile };
