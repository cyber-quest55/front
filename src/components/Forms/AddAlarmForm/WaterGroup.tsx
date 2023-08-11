import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Col, Form, Row, Space, Steps } from "antd";
import { useState } from "react";
import {
    ModalForm,
    ProCard,
    ProForm,
    ProFormCheckbox,
    ProFormList,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProFormTimePicker
} from "@ant-design/pro-components";
import { useScreenHook } from "@/hooks/screen";


const WaterGroupForm = () => {
    const [form] = Form.useForm<any>();
    const { lg } = useScreenHook();

    const [step, setStep] = useState(0)

    const listOptions = [
        { title: 'Limite de outorga de água', name: 'p1', children: undefined  }, 
    ]

    return (
        <ModalForm<any>
            title="Novos Alarmes"
            submitter={{
                submitButtonProps: {
                    type: "primary",
                    ghost: step < 1 ? true : false
                },
                searchConfig: {
                    submitText: step < 1 ? 'Próximo' : 'Cadastrar'
                },
            }}
            trigger={
                <Button
                    size={lg ? "large" : "middle"}
                    type="primary"
                    icon={<PlusCircleFilled />}>
                    Adicionar Alarme
                </Button>
            }
            form={form}
            autoFocusFirstInput
            onOpenChange={() => setStep(0)}
            submitTimeout={2000}
            onFinish={async () => {
                setStep(step + 1)
            }}
            modalProps={{
                destroyOnClose: true,
            }}
            grid
            rowProps={{ gutter: [12, 12] }}

        >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Steps direction="horizontal"
                    style={{ margin: "24px 0px", width: '80%' }}
                    onChange={(s) => setStep(s)}
                    current={step}
                    items={[
                        {
                            title: 'Informações',
                        },
                        {
                            title: 'Opções',
                        },
                    ]}
                />
            </div>
            {step === 0 ? (
                <>
                    <ProFormText
                        colProps={{ xs: 24, md: 24 }}
                        name="company"
                        label="Nome do equipamento"
                        placeholder="Dispositivo..."
                        required
                        rules={[
                            { required: true }
                        ]}
                    />
                    <ProFormTimePicker
                        colProps={{ xs: 12, md: 5 }}
                        name="started_at"
                        label="Horário de início"
                        placeholder="Dispositivo..."
                    />

                    <ProFormTimePicker
                        colProps={{ xs: 12, md: 5 }}
                        name="started_at"
                        label="Horário de fim"
                        placeholder="Dispositivo..."
                    />

                    <ProFormCheckbox
                        colProps={{ xs: 24, md: 4 }}
                        name="allDay"
                        label="Dia todo?"
                        placeholder="Dispositivo..."

                    />
                </>

            ) : (
                <Space direction="vertical" style={{ width: '100%' }} size="small"  >
                    <ProFormSelect
                        name="select-multiple"
                        label="Pivôs"
                        valueEnum={{
                            red: 'Red',
                            green: 'Green',
                            blue: 'Blue',
                        }}
                        fieldProps={{
                            mode: 'multiple',
                        }}
                        placeholder="Please select favorite colors"
                        rules={[
                            { required: true, message: 'Please select your favorite colors!', type: 'array' },
                        ]}
                    />
                    <ProCard gutter={[0, 8]} ghost wrap style={{
                        maxHeight: 450,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        paddingRight: 4
                    }}>
                        {
                            listOptions.map(item => (<ProCard
                                bordered
                                colSpan={24}
                                key={`list-${item.name}`}
                                style={{ padding: 12 }}

                            >
                                <Space direction="vertical" style={{ width: '100%' }} size="large">

                                    <Row justify="space-between" align={"middle"} >
                                        <Col>
                                            {item.title}
                                        </Col>
                                        <Col>
                                            <ProFormSwitch noStyle name={item.name} style={{ margin: 0 }} />
                                        </Col>
                                    </Row>
                                    <ProForm.Item noStyle shouldUpdate >
                                        {(form) => {
                                            const value = form.getFieldValue(item.name)
                                            return (
                                                item.children && value ?
                                                    <ProFormList
                                                        style={{ padding: 0 }}
                                                        name={`${item.name}.values`}
                                                        initialValue={[{ date: '2022-10-12 10:00:00' }]}
                                                    >
                                                        {() => {
                                                            return (
                                                                <ProFormText
                                                                    colProps={{ xs: 24, md: 12 }}
                                                                    name="test"
                                                                    label={`Defina o valor`}
                                                                    placeholder="Dispositivo..."
                                                                    required
                                                                    rules={[
                                                                        { required: true }
                                                                    ]}
                                                                />
                                                            );
                                                        }}
                                                    </ProFormList>
                                                    : null
                                            );
                                        }}
                                    </ProForm.Item>
                                </Space>
                            </ProCard>))
                        }
                    </ProCard>
                </Space>
            )}
        </ModalForm>
    )
}

export default WaterGroupForm