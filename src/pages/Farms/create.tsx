import { ProCard, PageContainer, StepsForm, ProFormInstance, ProFormText, ProFormSelect } from "@ant-design/pro-components"
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { GoogleMap  } from "@react-google-maps/api";
import { Avatar, Col, Divider, Row, Typography } from "antd";
import { useRef } from "react";
import { RiGpsFill } from "react-icons/ri";

export const CreateFarm = () => {

    const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);

    const className = useEmotionCss(({ token }) => {
        return {
            '.ant-pro-page-container-warp-page-header': {
                paddingBlockStart: '12px',
                paddingBlockEnd: '12px',
                paddingInlineStart: '40px',
                paddingInlineEnd: '40px',
                marginBottom: 24,
                background: 'white',
            },
            '.ant-pro-page-container-children-content': {
                [`@media screen and (max-width: ${token.screenXS}px)`]: {
                    paddingInline: '12px',
                },
                paddingInline: '40px',

            },
            '.ant-pro-steps-form-container': {
                minWidth: '0px',
                width: '700px',
                [`@media screen and (max-width: ${token.screenXS})`]: {
                    width: '100%',
                },
            }
        };
    });

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    return (
        <div className={className}>
            <PageContainer
                title="Criação da Fazenda"
                loading={false}
                content={"Labore qui occaecat adipisicing anim, abore qui occaecat anim."}
                breadcrumb={{
                    items: [{
                        path: '',
                        title: 'Início',
                    },
                    {
                        path: 'create',
                        title: 'Criar Fazenda',
                    }
                    ],
                }}>
                <ProCard   >
                    <StepsForm
                        submitter={{ submitButtonProps: { size: 'large' }, resetButtonProps: { size: 'large' } }}
                        formProps={{ size: 'large' }}
                        formMapRef={formMapRef}
                        onFinish={() => {
                            return Promise.resolve(true);
                        }}
                    >
                        <StepsForm.StepForm name="step1" title="Informações">
                            <Row gutter={[12, 12]} style={{ width: '100%' }}>

                                <Col xs={24} lg={12}>
                                    <ProFormText label="Rádio da Central" name={['jobInfo', 'name']} />
                                </Col>
                                <Col xs={24} lg={12}>
                                    <ProFormText label="Nome da Fazenda" name={['jobInfo', 'name']} />
                                </Col>
                                <Col xs={24} lg={12}>
                                    <ProFormText label="Dia da Fatura de Energia" name={['jobInfo', 'name']} />
                                </Col>
                                <Col xs={24} lg={12}>
                                    <ProFormText label="Dia da Fatura de Água" name={'adsad'} />
                                </Col>
                                <Col xs={24} lg={12}>
                                    <ProFormSelect label="Fuso Horário" name={'name'} />
                                </Col>
                            </Row>

                        </StepsForm.StepForm>
                        <StepsForm.StepForm name="step2" title="Localização da Central">
                            <Row align="middle" gutter={12}>
                                <Col>
                                    <Avatar size="large" icon={<RiGpsFill />} />
                                </Col>
                                <Col>
                                    <ProFormText
                                        label="Latitude e Longitude"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} style={{ marginBottom: 24 }}>

                                    <GoogleMap
                                        center={{
                                            lat: -22.380033,
                                            lng: -46.955198
                                        }}
                                        mapContainerStyle={containerStyle}
                                        options={{
                                            keyboardShortcuts: false,
                                            rotateControl: false,
                                            mapTypeControl: false,
                                            isFractionalZoomEnabled: false,
                                            mapTypeId: 'satellite'
                                        }}
                                        zoom={13}
                                    >
                                    </GoogleMap>

                                </Col>
                            </Row>
                        </StepsForm.StepForm>
                        <StepsForm.StepForm name="step3" title='Contato'>
                            <Row gutter={12} >
                                <Col xs={24} md={12}>
                                    <ProFormText label="CEP" name={['jobInfo', 'name']} />
                                </Col>

                                <Col xs={24} sm={12}>
                                    <ProFormText label="Cidade" name={['jobInfo', 'name']} />
                                </Col>
                            </Row>
                            <Row gutter={12} >
                                <Col xs={24} sm={16}>
                                    <ProFormText label="Endereço" name={['jobInfo', 'name']} />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormText label="Telefone" name={['jobInfo', 'name']} />
                                </Col>
                            </Row>
                            <Row gutter={12}>

                                <Col xs={24} sm={8}>
                                    <ProFormSelect label="País" name={'name'} />
                                </Col>
                                <Col xs={24} sm={8}>
                                    <ProFormSelect label="Estado" name={'name'} />
                                </Col>

                            </Row>
                        </StepsForm.StepForm>
                    </StepsForm>
                    <Divider />

                    <Typography style={{ fontSize: 16 }}>
                        Lorem
                    </Typography>
                    <Typography style={{ fontSize: 16 }}>
                        Lorem impsun
                    </Typography>
                    <Typography style={{ fontSize: 16 }}>
                        Lorem in labore deserunt ullamco quis officia proident adipisicing Lorem est ad. Ullamco minim sit proident pariatur ea minim elit duis pariatur.
                    </Typography>

                    <Typography style={{ fontSize: 16 }}>
                        Lorem
                    </Typography>
                    <Typography style={{ fontSize: 16 }}>
                        Lorem impsun
                    </Typography>
                    <Typography style={{ fontSize: 16 }}>
                        Lorem in labore deserunt ullamco quis officia proident adipisicing Lorem est ad. Ullamco minim sit proident pariatur ea minim elit duis pariatur.
                    </Typography>
                </ProCard>
            </PageContainer>
        </div>
    )
}

export default CreateFarm