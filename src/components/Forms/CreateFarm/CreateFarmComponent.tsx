import { CustomInput } from '@/components/Input';
import { createFarm } from '@/services/farm';
import { getCep } from '@/services/user';
import { yupValidator } from '@/utils/adapters/yup';
import countries from '@/utils/data/country';
import {
  ProFormCheckbox,
  ProFormDependency,
  ProFormDigit,
  ProFormField,
  ProFormGroup,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Col, Modal, Row, Typography } from 'antd';
import React, { FocusEventHandler, useEffect, useRef } from 'react';
import * as yup from 'yup';
import MarkerGreen from '../../../../public/images/devices/marker-green.svg';
import LocationFormContainer from '../Location/LocationContainer';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateFarmFormComponent: React.FunctionComponent = () => {
  const intl = useIntl();
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
  const form1Ref = useRef<ProFormInstance<any> | undefined>();
  const form2Ref = useRef<ProFormInstance<any> | undefined>();
  const form3Ref = useRef<ProFormInstance<any> | undefined>();
  const form4Ref = useRef<ProFormInstance<any> | undefined>();

  const [visible, setVisible] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [billAddrs, setBillAddrs] = React.useState(false);
  const postReq = useRequest(createFarm, { manual: true });
  const timezones = Intl.supportedValuesOf('timeZone');
  const { message } = App.useApp();

  useEffect(() => {
    console.log(formMapRef.current[2]);
    if (billAddrs) {
      const billing = formMapRef?.current[1].current?.getFieldsValue()?.billing;
      formMapRef?.current[2].current?.setFieldsValue({
        country: billing.country,
        state: billing.state,
        city: billing.city,
        address: billing.address,
        postal_code: billing.postal_code,
      });
    }
  }, [billAddrs]);

  const onBlurBilling: FocusEventHandler<HTMLInputElement> = async (v) => {
    const { data } = await getCep(v.target.value);
    const formsValue = form2Ref.current?.getFieldsValue();
    console.log('asdygsaygdgyas', !data.erro);

    if (data && !data.erro) {
      form2Ref.current?.setFieldsValue({
        ...formsValue,
        billing: {
          ...formsValue.billing,
          address: `${data.logradouro}-${data.bairro} ${data.complemento}`,
          state: data.uf,
          city: data.localidade,
        },
      });
    }
  };

  const onBlurDefault: FocusEventHandler<HTMLInputElement> = async (v) => {
    const { data } = await getCep(v.target.value);
    const formsValue = form3Ref.current?.getFieldsValue();

    if (data && !data.erro) {
      form3Ref.current?.setFieldsValue({
        ...formsValue.billing,
        address: `${data.logradouro}-${data.bairro} ${data.complemento}`,
        state: data.uf,
        city: data.localidade,
      });
    }
  };

  const className = useEmotionCss(({}) => {
    return {
      '.ant-pro-form-group-container': {
        width: '100%',
      },
      '.ant-space-item': {
        width: '100% !important',
      },
    };
  });

  const schema1 = yup.object().shape({
    name: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    billing_date: yup
      .number()
      .min(
        1,
        intl.formatMessage(
          {
            id: 'validations.min.number',
          },
          { value: 1 },
        ),
      )
      .max(
        31,
        intl.formatMessage(
          {
            id: 'validations.max.number',
          },
          { value: 31 },
        ),
      )
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    water_billing_date: yup
      .number()
      .min(
        1,
        intl.formatMessage(
          {
            id: 'validations.min.number',
          },
          { value: 1 },
        ),
      )
      .max(
        31,
        intl.formatMessage(
          {
            id: 'validations.max.number',
          },
          { value: 31 },
        ),
      )
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    central_linked: yup.boolean(),
    location: yup.string().required(),
  });
  const yupSync1 = yupValidator(schema1, form1Ref.current?.getFieldsValue as any);

  const schema2 = yup.object().shape({
    billing: yup.object().shape({
      country: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),

      document: yup.string().matches(
        /^[^_]+$/,
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      company_name: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      state: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      city: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      address: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      postal_code: yup.string().matches(
        /^[^_]+$/,
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      email: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      phone: yup.string().matches(
        /^[^_]+$/,
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    }),
  });
  const yupSync2 = yupValidator(schema2, form2Ref.current?.getFieldsValue as any);

  const schema3 = yup.object().shape({
    country: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    document: yup.string(),

    state: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    city: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    address: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    postal_code: yup.string().matches(
      /^[^_]+$/,
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    email: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    phone: yup.string().matches(
      /^[^_]+$/,
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
  });

  const yupSync3 = yupValidator(schema3, form3Ref.current?.getFieldsValue as any);

  const schema4 = yup.object().shape({
    base: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
  });
  const yupSync4 = yupValidator(schema4, form4Ref.current?.getFieldsValue as any);

  useEffect(() => {
    if (form1Ref.current && form2Ref.current && form3Ref.current && form4Ref.current) {
      setDisabled(false);
    }
  }, [visible]);

  return (
    <>
      <a onClick={() => setVisible(true)}> Nova Fazenda</a>

      <StepsForm
        onFinish={async (v) => {
          try {
            await postReq.runAsync(
              {},
              {
                ...v,
                billing: { ...v.billing, docType: form2Ref.current?.getFieldValue(['billing', 'docType']) },
                administrators: [2050],
              },
            );
            message.success('Success');
          } catch (err) {
            message.error('Fail');
          } finally {
            setVisible(false);
          }
        }}
        formMapRef={formMapRef}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title={intl.formatMessage({
                id: 'component.edit.pivot.general.title',
              })}
              width={800}
              className={className}
              onCancel={() => setVisible(false)}
              open={visible}
              footer={submitter}
            >
              {dom}
            </Modal>
          );
        }}
      >
        {visible ? (
          <>
            <StepsForm.StepForm
              disabled={disabled}
              name="general"
              title={intl.formatMessage({
                id: 'component.create.farm.modal.steps.1',
              })}
              initialValues={{
                name: '',
                central_linked: false,
                location: timezones[0],
              }}
              formRef={form1Ref}
              onFinish={async () => {
                await waitTime(2000);
                return true;
              }}
            >
              <ProFormText
                rules={[yupSync1]}
                name="name"
                width="md"
                label={intl.formatMessage({
                  id: 'component.create.farm.modal.farmname.label',
                })}
              />

              <ProFormDigit
                rules={[yupSync1]}
                name="billing_date"
                width="sm"
                label={intl.formatMessage({
                  id: 'component.create.farm.modal.pwinvoiceday.label',
                })}
              />

              <ProFormDigit
                rules={[yupSync1]}
                name="water_billing_date"
                width="sm"
                label={intl.formatMessage({
                  id: 'component.create.farm.modal.wainvoiceday.label',
                })}
              />

              <ProFormCheckbox name="central_linked" width="md" rules={[yupSync1]}>
                {intl.formatMessage({
                  id: 'component.create.farm.modal.havecentral.label',
                })}
              </ProFormCheckbox>

              <ProFormSelect
                request={async () => {
                  return timezones.map((item) => ({
                    label: item,
                    value: item,
                  }));
                }}
                rules={[yupSync1]}
                name="location"
                width="md"
                showSearch
                label={intl.formatMessage({
                  id: 'component.create.farm.modal.timezone.label',
                })}
              />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              formRef={form2Ref}
              initialValues={{
                billing: {
                  country: '',
                  document_type: '',
                  document: '',
                  farm: null,
                  company_name: '',
                  state: '',
                  city: '',
                  address: '',
                  postal_code: '',
                  email: '',
                  phone: '',
                  docType: 1
                },
              }}
              name="billing"
              title="Faturamento"
            >
              <Typography.Text style={{ lineHeight: 4 }}>
                {intl.formatMessage({
                  id: 'component.create.farm.modal.desc.1',
                })}
              </Typography.Text>
              <ProFormGroup
                style={{ width: '100%' }}
                title={intl.formatMessage({
                  id: 'component.create.farm.modal.subt.2',
                })}
              >
                <ProFormDependency name={['billing']} colon style={{ width: '100%' }}>
                  {({ billing }) => {
                    return (
                      <Row gutter={[12, 0]} style={{ width: '100%' }}>
                        <Col xs={24} sm={24} md={billing.country === '' ? 24 : 8}>
                          <ProFormSelect
                            rules={[yupSync2]}
                            request={async () => {
                              return countries.map((item) => {
                                const country = item.content.split('_');
                                delete country[0];
                                return {
                                  label: country.join(' '),
                                  value: item.iso,
                                };
                              });
                            }}
                            name={['billing', 'country']}
                            showSearch
                            label={intl.formatMessage({
                              id: 'component.create.farm.modal.country.label',
                            })}
                          />
                        </Col>

                        {billing.country !== '' ? (
                          <>
                            <CustomInput.Cep
                              country={billing.country}
                              colProps={{ xs: 24, sm: 24, md: 6 }}
                              formItemProps={{
                                rules: [yupSync2],
                                label: intl.formatMessage({
                                  id: 'component.create.farm.modal.cep.label',
                                }),
                                name: ['billing', 'postal_code'],
                              }}
                              fieldProps={{
                                onBlur: onBlurBilling,
                              }}
                            />

                            <Col xs={24} sm={24} md={10}>
                              <ProFormField
                                rules={[yupSync2]}
                                name={['billing', 'city']}
                                label={intl.formatMessage({
                                  id: 'component.create.farm.modal.city.label',
                                })}
                              />
                            </Col>

                            <Col xs={24} sm={24} md={16}>
                              <ProFormField
                                rules={[yupSync2]}
                                name={['billing', 'address']}
                                label={intl.formatMessage({
                                  id: 'component.create.farm.modal.address.label',
                                })}
                              />
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                              <ProFormField
                                rules={[yupSync2]}
                                name={['billing', 'state']}
                                label={intl.formatMessage({
                                  id: 'component.create.farm.modal.state.label',
                                })}
                              />
                            </Col>
                          </>
                        ) : null}
                      </Row>
                    );
                  }}
                </ProFormDependency>
              </ProFormGroup>
              <ProFormDependency name={['billing']} colon style={{ width: '100%' }}>
                {({ billing }) => {
                  const country = countries.find((item) => item.iso === billing.country);

                  if (billing.country !== '')
                    return (
                      <ProFormGroup
                        style={{ width: '100%', justifyContent: 'stretch' }}
                        title={intl.formatMessage({
                          id: 'component.create.farm.modal.subt.1',
                        })}
                      >
                        <Row gutter={[12, 0]} style={{ width: '100%' }}>
                          <CustomInput.Document
                            colProps={{ xs: 24, sm: 24, md: 12 }}
                            formItemProps={{
                              rules: [yupSync2],
                              label: intl.formatMessage({
                                id: 'component.create.farm.modal.doc.label',
                              }),
                              name: ['billing', 'document'],
                            }}
                            country={billing.country}
                            formRef={form2Ref}
                            selectItemProps={{
                              name: ['billing', 'docType'],
                            }}
                          />

                          <Col xs={24} sm={24} md={12}>
                            <ProFormField
                              rules={[yupSync2]}
                              label={intl.formatMessage({
                                id: 'component.create.farm.modal.companyname.label',
                              })}
                              name={['billing', 'company_name']}
                            />
                          </Col>

                          <CustomInput.Cellphone
                            countryCode={country?.phone}
                            colProps={{ xs: 24, sm: 24, md: 7 }}
                            formItemProps={{
                              rules: [yupSync2],
                              label: intl.formatMessage({
                                id: 'component.create.farm.modal.tel.label',
                              }),

                              name: ['billing', 'phone'],
                            }}
                            country={billing.country}
                          />

                          <Col xs={24} sm={24} md={17}>
                            <ProFormField
                              rules={[yupSync2]}
                              name={['billing', 'email']}
                              label={intl.formatMessage({
                                id: 'component.create.farm.modal.email.label',
                              })}
                            />
                          </Col>
                        </Row>
                      </ProFormGroup>
                    );
                }}
              </ProFormDependency>
            </StepsForm.StepForm>
            <StepsForm.StepForm
              formRef={form3Ref}
              initialValues={{
                country: '',
                postal_code: '',
                city: '',
                address: '',
                state: '',
                phone: '',
              }}
              title="Contato"
            >
              <ProFormGroup
                style={{ width: '100%', justifyContent: 'stretch' }}
                title={intl.formatMessage({
                  id: 'component.create.farm.modal.subt.4',
                })}
              >
                <ProFormDependency name={['country']} colon style={{ width: '100%' }}>
                  {({ country }) => {
                    return (
                      <Row gutter={[12, 0]} style={{ width: '100%' }}>
                        {country !== '' ? (
                          <Col xs={24} sm={24} md={24}>
                            <ProFormSwitch
                              fieldProps={{
                                onChange: (v) => setBillAddrs(v),
                              }}
                              label={intl.formatMessage({
                                id: 'component.create.farm.modal.samebill.label',
                              })}
                            />
                          </Col>
                        ) : null}

                        <Col xs={24} sm={24} md={country === '' ? 24 : 8}>
                          <ProFormSelect
                            rules={[yupSync3]}
                            disabled={billAddrs}
                            request={async () => {
                              return countries.map((item) => {
                                const country = item.content.split('_');
                                delete country[0];
                                return {
                                  label: country.join(' '),
                                  value: item.iso,
                                };
                              });
                            }}
                            name={['country']}
                            showSearch
                            label={intl.formatMessage({
                              id: 'component.create.farm.modal.country.label',
                            })}
                          />
                        </Col>
                        {country !== '' ? (
                          <>
                            <CustomInput.Cep
                              colProps={{ xs: 24, sm: 24, md: 6 }}
                              fieldProps={{
                                disabled: billAddrs,
                                onBlur: onBlurDefault,
                              }}
                              formItemProps={{
                                rules: [yupSync3],
                                label: intl.formatMessage({
                                  id: 'component.create.farm.modal.cep.label',
                                }),
                                name: 'postal_code',
                              }}
                              country={country}
                            />
                            <Col xs={24} sm={24} md={10}>
                              <ProFormField
                                disabled={billAddrs}
                                name={['city']}
                                rules={[yupSync3]}
                                label={intl.formatMessage({
                                  id: 'component.create.farm.modal.city.label',
                                })}
                              />
                            </Col>
                            <Col xs={24} sm={24} md={16}>
                              <ProFormField
                                rules={[yupSync3]}
                                disabled={billAddrs}
                                name={['address']}
                                label={intl.formatMessage({
                                  id: 'component.create.farm.modal.address.label',
                                })}
                              />
                            </Col>

                            <Col xs={24} sm={24} md={8}>
                              <ProFormField
                                disabled={billAddrs}
                                rules={[yupSync3]}
                                name={['state']}
                                label={intl.formatMessage({
                                  id: 'component.create.farm.modal.state.label',
                                })}
                              />
                            </Col>
                          </>
                        ) : null}
                      </Row>
                    );
                  }}
                </ProFormDependency>
              </ProFormGroup>
              <ProFormDependency name={['country']} colon style={{ width: '100%' }}>
                {({ country }) => {
                  if (country !== '')
                    return (
                      <ProFormGroup
                        style={{ width: '100%', justifyContent: 'stretch' }}
                        title={intl.formatMessage({
                          id: 'component.create.farm.modal.subt.3',
                        })}
                      >
                        <Row gutter={[12, 0]} style={{ width: '100%' }}>
                          <CustomInput.Cellphone
                            colProps={{ xs: 24, sm: 24, md: 8 }}
                            formItemProps={{
                              rules: [yupSync3],

                              label: intl.formatMessage({
                                id: 'component.create.farm.modal.phone.label',
                              }),
                              name: 'phone',
                            }}
                            country={country}
                          />
                        </Row>
                      </ProFormGroup>
                    );
                }}
              </ProFormDependency>
            </StepsForm.StepForm>
            <StepsForm.StepForm
              formRef={form4Ref}
              title="Localização"
              onFinish={async () => {
                await waitTime(2000);
                return true;
              }}
              initialValues={{
                base: '',
                location: '',
              }}
            >
              <LocationFormContainer
                layout="vertical"
                northValue={false}
                extra={
                  <ProFormField
                    rules={[yupSync4]}
                    name="base"
                    label={intl.formatMessage({
                      id: 'component.create.farm.modal.central.label',
                    })}
                  ></ProFormField>
                }
                locations={[
                  {
                    color: 'green',
                    value: { lat: 0, lng: 0 },
                    name: 'Location',
                    onChange: (v: any) => form4Ref.current?.setFieldValue('location', v),
                    marker: MarkerGreen,
                  },
                ]}
                defaultLocation={true}
              />
            </StepsForm.StepForm>
          </>
        ) : null}
      </StepsForm>
    </>
  );
};

export default CreateFarmFormComponent;
