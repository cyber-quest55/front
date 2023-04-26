import { PlusCircleFilled } from "@ant-design/icons";
import { CheckCard, ModalForm, ProForm, ProFormCheckbox, ProFormRadio, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Button, Col, Form, Row, Steps } from "antd";
import { useState } from "react";

const AddDeviceForm = () => {
    const [form] = Form.useForm<{
        device: number;
        version: string;
        check: boolean;
        potency: string;
    }>();

    const [step, setStep] = useState(0)

    const automationPivotForm = (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Nome do equipamento" placeholder="Dispositivo..." />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormSelect name="builder" label="Fabricante" placeholder="Selecione" valueEnum={{
                    bauer: 'Bauer',
                    carborundum: 'Carborundum',
                    fockink: 'Fockink',
                    irrigabras: 'Irrigabras',
                    krebs: 'Krebs',
                    lindsay: 'Lindsay',
                    reinke: 'Reinke',
                    valley: 'Valley',
                    outro: 'Outro',
                }} />
            </Col>

            <ProForm.Item noStyle shouldUpdate>
                {(form) => {
                    return (
                        form.getFieldValue("builder") === 'outro' ? (
                            <>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="dd" label="Nome do Fabricante" placeholder="Selecione" />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormSelect valueEnum={{
                                        g1: 'G1',
                                        g2: 'G2',
                                    }} name="version" label="Versão" placeholder="Selecione" >

                                    </ProFormSelect>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormSelect name="company" label="Tipo de Painel" placeholder="Selecione" />
                                </Col>
                            </>
                        ) : <>
                            <Col xs={24} sm={12}>
                                <ProFormSelect valueEnum={{
                                    g1: 'G1',
                                    g2: 'G2',
                                }} name="version" label="Versão" placeholder="Selecione" >

                                </ProFormSelect>
                            </Col>
                            <Col xs={24} sm={12}>
                                <ProFormSelect name="company" label="Tipo de Painel" placeholder="Selecione" />
                            </Col>
                        </>

                    );
                }}
            </ProForm.Item>

            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Rádio do Controlador" placeholder="Selecione" />
            </Col>

            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Rádio do GPS" placeholder="Selecione" />
            </Col>

            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Rádio do Cabo de Bomba (Spoti)" placeholder="Selecione" />
            </Col>

            <Col xs={24} sm={12}>
                <ProFormRadio.Group
                    name="potency"
                    layout="horizontal"
                    label="Unidade de Potência"
                    options={[
                        {
                            label: 'CV',
                            value: 'a',
                        },
                        {
                            label: 'kW',
                            value: 'b',
                        },
                    ]}
                />
            </Col>
            <ProForm.Item noStyle shouldUpdate>
                {(form) => {
                    return (
                        form.getFieldValue("potency") === 'a' ? (
                            <>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Potência" placeholder="Selecione" />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Rendimento" placeholder="Selecione" />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Potência Convertida" placeholder="Selecione" />
                                </Col>
                            </>
                        ) : <Col xs={24} sm={8}>
                            <ProFormText name="company" label="Potência da Bomba" placeholder="Selecione" />
                        </Col>

                    );
                }}
            </ProForm.Item>
            <ProForm.Item noStyle shouldUpdate>
                {(form) => {
                    return (
                        form.getFieldValue("version") === 'g1' ? (
                            <>
                                <Col xs={24} sm={12}>
                                    <ProFormCheckbox
                                        label="Pluviômetro"
                                        name="check"
                                    />
                                </Col>
                            </>
                        ) : null

                    );
                }}
            </ProForm.Item>
        </Row>
    )

    const monitorPivotForm = (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Nome do equipamento" placeholder="Dispositivo..." />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormSelect name="builder" label="Fabricante" placeholder="Selecione" valueEnum={{
                    bauer: 'Bauer',
                    carborundum: 'Carborundum',
                    fockink: 'Fockink',
                    irrigabras: 'Irrigabras',
                    krebs: 'Krebs',
                    lindsay: 'Lindsay',
                    reinke: 'Reinke',
                    valley: 'Valley',
                    outro: 'Outro',
                }} />
            </Col>

            <ProForm.Item noStyle shouldUpdate>
                {(form) => {
                    return (
                        form.getFieldValue("builder") === 'outro' ? (
                            <>
                                <Col xs={24} sm={12}>
                                    <ProFormText name="dd" label="Nome do Fabricante" placeholder="Selecione" />
                                </Col>
                            </>
                        ) : null

                    );
                }}
            </ProForm.Item>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Rádio do Monitor" placeholder="Selecione" />
            </Col>

            <Col xs={24} sm={24}>
                <ProFormRadio.Group
                    name="potency"
                    layout="horizontal"
                    label="Unidade de Potência"
                    options={[
                        {
                            label: 'CV',
                            value: 'a',
                        },
                        {
                            label: 'kW',
                            value: 'b',
                        },
                    ]}
                />
            </Col>
            <ProForm.Item noStyle shouldUpdate>
                {(form) => {
                    return (
                        form.getFieldValue("potency") === 'a' ? (
                            <>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Potência" placeholder="Selecione" />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Rendimento" placeholder="Selecione" />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Potência Convertida" placeholder="Selecione" />
                                </Col>
                            </>
                        ) : <Col xs={24} sm={8}>
                            <ProFormText name="company" label="Potência da Bomba" placeholder="Selecione" />
                        </Col>

                    );
                }}
            </ProForm.Item>
        </Row>
    )

    const linearPivotMonitorForm = (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Nome do equipamento" placeholder="Dispositivo..." />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormSelect name="builder" label="Fabricante" placeholder="Selecione" valueEnum={{
                    bauer: 'Bauer',
                    carborundum: 'Carborundum',
                    fockink: 'Fockink',
                    irrigabras: 'Irrigabras',
                    krebs: 'Krebs',
                    lindsay: 'Lindsay',
                    reinke: 'Reinke',
                    valley: 'Valley',
                    outro: 'Outro',
                }} />
            </Col>
            <ProForm.Item noStyle shouldUpdate>
                {(form) => {
                    return (
                        form.getFieldValue("builder") === 'outro' ? (
                            <>
                                <Col xs={24} sm={12}>
                                    <ProFormText name="dd" label="Nome do Fabricante" placeholder="Selecione" />
                                </Col>
                            </>
                        ) : null

                    );
                }}
            </ProForm.Item>

            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Rádio do Monitor" placeholder="Selecione" />
            </Col>

            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Vazão" placeholder="Selecione" />
            </Col>

            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Comprimento" placeholder="Selecione" />
            </Col>

            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Velocidade" placeholder="Selecione" />
            </Col>
        </Row>
    )

    const actionBombRemoteForm = (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Nome do equipamento" placeholder="Dispositivo..." />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormSelect name="builder" label="Fabricante" placeholder="Selecione" valueEnum={{
                    bauer: 'Bauer',
                    carborundum: 'Carborundum',
                    fockink: 'Fockink',
                    irrigabras: 'Irrigabras',
                    krebs: 'Krebs',
                    lindsay: 'Lindsay',
                    reinke: 'Reinke',
                    valley: 'Valley',
                    outro: 'Outro',
                }} />
            </Col>

            <ProForm.Item noStyle shouldUpdate>
                {(form) => {
                    return (
                        form.getFieldValue("builder") === 'outro' ? (
                            <>
                                <Col xs={24} sm={12}>
                                    <ProFormText name="dd" label="Nome do Fabricante" placeholder="Selecione" />
                                </Col>
                            </>
                        ) : null

                    );
                }}
            </ProForm.Item>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Rádio do Monitor" placeholder="Selecione" />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormSelect valueEnum={{
                    '5.0': '5.0',
                    '5.1': '5.1',
                }} name="version" label="Versão" placeholder="Selecione" >
                </ProFormSelect>
            </Col>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Latitude" placeholder="Selecione" />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Longitude" placeholder="Selecione" />
            </Col>
            <Col xs={24} sm={24}>
                <ProFormRadio.Group
                    name="potency"
                    layout="horizontal"
                    label="Unidade de Potência"
                    options={[
                        {
                            label: 'CV',
                            value: 'a',
                        },
                        {
                            label: 'kW',
                            value: 'b',
                        },
                    ]}
                />
            </Col>
            <ProForm.Item noStyle shouldUpdate>
                {(form) => {
                    return (
                        form.getFieldValue("potency") === 'a' ? (
                            <>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Potência" placeholder="Selecione" />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Rendimento" placeholder="Selecione" />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormText name="company" label="Potência Convertida" placeholder="Selecione" />
                                </Col>
                            </>
                        ) : <Col xs={24} sm={8}>
                            <ProFormText name="company" label="Potência da Bomba" placeholder="Selecione" />
                        </Col>

                    );
                }}
            </ProForm.Item>
        </Row>
    )

    const repeaterForm = (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={8}>
                <ProFormText name="company" label="Nome do equipamento" placeholder="Dispositivo..." />
            </Col>

            <Col xs={24} sm={8}>
                <ProFormText name="company" label="Rádio do Repetidor" placeholder="Selecione" />
            </Col>
            <Col xs={24} sm={8}>
                <ProFormSelect name="builder" label="Tipo" placeholder="Selecione" valueEnum={{
                    solar: 'Solar',
                    bivolt: 'Bivolt',
                }} />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Latitude" placeholder="Selecione" />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Longitude" placeholder="Selecione" />
            </Col>
        </Row>
    )

    const measureSystemForm = (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={8}>
                <ProFormText name="company" label="Nome do equipamento" placeholder="Dispositivo..." />
            </Col>

            <Col xs={24} sm={8}>
                <ProFormText name="company" label="Radio do IMeter" placeholder="Selecione" />
            </Col>
            <Col xs={24} sm={8}>
                <ProFormSelect name="builder" label="Sensor" placeholder="Selecione" valueEnum={{
                    '5MCAD': '5MCA - Novus', 
                }} />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Latitude" placeholder="Selecione" />
            </Col>
            <Col xs={24} sm={12}>
                <ProFormText name="company" label="Longitude" placeholder="Selecione" />
            </Col>
        </Row>
    )

    return (
        <ModalForm<{
            device: number;
            version: string;
            check: boolean;
            potency: string;
        }>
            title="Cadastrar equipamento"
            submitter={{
                submitButtonProps: {
                    type: "primary",
                    ghost: step === 0 ? true : false
                },
                searchConfig: {
                    submitText: step === 0 ? 'Próximo' : 'Cadastrar'
                },
            }}
            trigger={
                <Button
                    size="large"
                    type="primary"
                    icon={<PlusCircleFilled />}>
                    Cadastrar Equipamento
                </Button>
            }
            form={form}
            autoFocusFirstInput
            onOpenChange={() => setStep(0)}
            submitTimeout={2000}
            onFinish={async (v: any) => {
                if (step === 0 && v.device) {
                    setStep(1)
                }
                if (step === 1)
                    console.log('there ')
            }}
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
        >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Steps direction="horizontal"
                    style={{ margin: "24px 0px", width: '80%' }}
                    onChange={(s) => setStep(s)}
                    current={step}
                    items={[
                        {
                            title: 'Modelo',
                        },
                        {
                            title: 'Configuração',

                            disabled: true
                        },
                    ]}
                />
            </div>
            {step === 0 ? (
                <Form.Item name="device" >
                    <CheckCard.Group style={{ width: '100%', padding: 0 }} value="group" defaultValue="a" >
                        <Row gutter={[16, 16]}>
                            <Col xs={12}  >
                                <CheckCard
                                    defaultChecked
                                    style={{ width: '100%' }}
                                    title="Automação de Pivô"
                                    avatar="/images/devices/device-1.svg"
                                    description="lorem impsum dorem mackial oggyir mistake dore"
                                    value={1}
                                />
                            </Col>
                            <Col xs={12}  >
                                <CheckCard
                                    style={{ width: '100%' }}
                                    title="Monitor de Pivô"
                                    avatar="/images/devices/device-2.svg"
                                    description="lorem impsum dorem mackial oggyir mistake dore"
                                    value={2}
                                />
                            </Col>
                            <Col xs={12}  >
                                <CheckCard
                                    style={{ width: '100%' }}
                                    title="Monitor de Pivô Linear"
                                    avatar="/images/devices/device-2.svg"
                                    description="lorem impsum dorem mackial oggyir mistake dore"
                                    value={3}
                                />
                            </Col>
                            <Col xs={12}  >
                                <CheckCard
                                    style={{ width: '100%' }}
                                    title="Acionamento Remoto de Bomba"
                                    avatar="/images/devices/device-3.svg"
                                    description="lorem impsum dorem mackial oggyir mistake dore"
                                    value={4}
                                />
                            </Col>
                            <Col xs={12}  >
                                <CheckCard
                                    style={{ width: '100%' }}
                                    title="Repetidor"
                                    avatar="/images/devices/device-4.svg"
                                    description="lorem impsum dorem mackial oggyir mistake dore"
                                    value={5}
                                />
                            </Col>
                            <Col xs={12}  >
                                <CheckCard
                                    style={{ width: '100%' }}
                                    title="Sistema de Medição"
                                    avatar="/images/devices/device-4.svg"
                                    description="lorem impsum dorem mackial oggyir mistake dore"
                                    value={6}
                                />
                            </Col>
                        </Row>
                    </CheckCard.Group>
                </Form.Item>
            ) : (
                <ProForm.Item noStyle shouldUpdate>
                    {(form) => {
                        return (
                            form.getFieldValue("device") === 1 ? automationPivotForm :
                                form.getFieldValue("device") === 2 ? monitorPivotForm :
                                    form.getFieldValue("device") === 3 ? linearPivotMonitorForm :
                                        form.getFieldValue("device") === 4 ? actionBombRemoteForm :
                                            form.getFieldValue("device") === 5 ? repeaterForm :
                                                form.getFieldValue("device") === 6 ? measureSystemForm : null
                        )
                    }}
                </ProForm.Item>
            )}
        </ModalForm>
    )
}

export default AddDeviceForm