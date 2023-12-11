import { yupValidator } from '@/utils/adapters/yup';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { SelectLang, useIntl } from '@umijs/max';
import { Button, Col, Divider, Form, Row, Space, Typography } from 'antd';
import * as yup from 'yup';
import ImageBgLogo from '../../../../public/images/logo/icon-logo-white-128x128.png';

type Props = {
    handleSubmit: (values: any) => Promise<void>;
    loading: boolean;
    error?: string;
};

const PasswordResetComponent: React.FC<Props> = (props) => {
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
            }),)
    });

    const yupSync = yupValidator(schema, form.getFieldsValue);


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
                            form={form}
                            validateTrigger="onBlur"
                            layout="vertical"
                            rowProps={{ gutter: [8, 8] }}
                            grid
                            submitter={{
                                searchConfig: {
                                    resetText: 'reset',
                                    submitText: 'submit',
                                },
                                render: () => (
                                    <Space
                                        direction="vertical"
                                        align="center"
                                        size="large"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        <Row gutter={[25, 25]} justify="center">
                                            <Col flex="auto">
                                                <Button
                                                    block
                                                    type="primary"
                                                    htmlType="reset"
                                                    key="rest"
                                                    loading={loading}
                                                    style={{ minWidth: '150px' }}
                                                    href="/user/login"
                                                >
                                                    {intl.formatMessage({
                                                        id: 'component.form.PasswordReset.btn.back',
                                                        defaultMessage: 'Voltar ',
                                                    })}
                                                </Button>
                                            </Col>

                                            <Col flex="auto">
                                                <Button
                                                    block
                                                    type="primary"
                                                    htmlType="submit"
                                                    key="submit"
                                                    loading={loading}
                                                    style={{ minWidth: '150px' }}
                                                >
                                                    {intl.formatMessage({
                                                        id: 'component.form.PasswordReset.btn.send',
                                                        defaultMessage: 'Enviar ',
                                                    })}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Space>
                                ),
                            }}
                            size="large"
                            name="password_callback_form"
                            onFinish={handleSubmit}
                            autoFocusFirstInput
                        >
                            <Typography.Text type="secondary">
                                {intl.formatMessage({
                                    id: 'component.form.passwordReset.info',
                                    defaultMessage:
                                        'Digite sua nova senha.',
                                })}
                            </Typography.Text>
                            <Divider />
                            <ProFormText.Password
                                rules={[yupSync]}
                                required
                                name="password"
                                placeholder={intl.formatMessage({
                                    id: 'component.form.passwordReset.input.password.placeholder',
                                    defaultMessage: 'Sua Senha',
                                })}
                                label={intl.formatMessage({
                                    id: 'component.form.PasswordReset.input.password.label',
                                    defaultMessage: 'Senha',
                                })}
                            />
                            <ProFormText.Password
                                rules={[yupSync]}
                                required
                                name="confirmPassword"
                                placeholder={intl.formatMessage({
                                    id: 'component.form.PasswordReset.input.confirmPassword.placeholder',
                                    defaultMessage: 'Confirme sua Senha',
                                })}
                                label={intl.formatMessage({
                                    id: 'component.form.PasswordReset.input.confirmPassword.label',
                                    defaultMessage: 'Confirmar Senha',
                                })}
                            />
                            <Divider />
                        </ProForm>
                    </Space>
                </Space>
            </ProCard>
        </div>
    );
};

export { PasswordResetComponent };
