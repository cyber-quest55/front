import { queryPivotInformation } from '@/models/pivot-information';
import { createPivot } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { hpToCv } from '@/utils/data/potency-calc';
import {
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Col, Row } from 'antd';
import { useState } from 'react';
import * as yup from 'yup';

interface PivotFormProps {
  form: any;
  base: string | null;
  setLoading: (loading: boolean) => void;
  closeModalForm: () => void;
  queryPivotInformation: typeof queryPivotInformation;
}

const PivotForm: React.FC<PivotFormProps> = (props) => {
  const createPivotReq = useRequest(createPivot, { manual: true });
  const intl = useIntl();
  const { message } = App.useApp();
  const params = useParams();
  const [panelTypeOptions, setPanelTypeOptions] = useState<any>({
    1: 'Nexus',
    2: 'SmartConnect',
  });

  const schema = yup.object().shape(
    {
      name: yup
        .string()
        .max(
          16,
          intl.formatMessage(
            {
              id: 'validations.max',
            },
            { value: 16 },
          ),
        )
        .required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      latitude: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      longitude: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      brand_model: yup.string().when(['brand_model'], {
        is: (brandModel: string) => brandModel !== 'other',
        then(schema) {
          return schema.required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          );
        },
      }),
      other_brand_model: yup.string().when('brand_model', {
        is: 'other',
        then(schema) {
          return schema.required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          );
        },
      }),
      panel_type: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      communication_type: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      control: yup
        .string()
        .matches(
          /^[0-9A-F]{16}$/,
          intl.formatMessage({
            id: 'validations.invalid',
          }),
        )
        .when('communication_type', {
          is: '0',
          then(schema) {
            return schema.required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            );
          },
        }),
      monitor: yup
        .string()
        .matches(
          /^[0-9A-F]{16}$/,
          intl.formatMessage({
            id: 'validations.invalid',
          }),
        )
        .when('communication_type', {
          is: '0',
          then(schema) {
            return schema.required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            );
          },
        }),
      pump: yup.string().matches(
        /^[0-9A-F]{16}$|^$/,
        intl.formatMessage({
          id: 'validations.invalid',
        }),
      ),
      gateway: yup
        .string()
        .matches(
          /^[0-9A-F]{16}$/,
          intl.formatMessage({
            id: 'validations.invalid',
          }),
        )
        .when('communication_type', {
          is: '1',
          then(schema) {
            return schema.required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            );
          },
        }),
      potency_unit: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      potency: yup
        .number()
        .min(
          1,
          intl.formatMessage(
            {
              id: 'validations.min',
            },
            { value: 1 },
          ),
        )
        .when('potency_unit', {
          is: 'cv',
          then(schema) {
            return schema.required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            );
          },
        }),
      performance: yup
        .number()
        .min(
          1,
          intl.formatMessage(
            {
              id: 'validations.min',
            },
            { value: 1 },
          ),
        )
        .when('potency_unit', {
          is: 'cv',
          then(schema) {
            return schema.required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            );
          },
        }),
      converted_potency: yup
        .number()
        .min(
          1,
          intl.formatMessage(
            {
              id: 'validations.min',
            },
            { value: 1 },
          ),
        )
        .when('potency_unit', {
          is: 'cv',
          then(schema) {
            return schema.required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            );
          },
        }),
      pump_potency: yup
        .number()
        .min(
          1,
          intl.formatMessage(
            {
              id: 'validations.min',
            },
            { value: 1 },
          ),
        )
        .when('potency_unit', {
          is: 'kw',
          then(schema) {
            return schema.required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            );
          },
        }),
    },
    [['brand_model', 'brand_model']],
  );

  const yupSync = yupValidator(schema, props.form.getFieldsValue);

  return (
    <ProForm
      validateTrigger="onBlur"
      layout="vertical"
      submitter={false}
      preserve={false}
      form={props.form}
      name="pivot_form"
      initialValues={{
        potency_unit: 'kw',
        communication_type: props.base ? '0' : '1',
      }}
      onFinish={async (values: any) => {
        try {
          props.setLoading(true);
          const data = {
            name: values.name,
            potency: parseFloat(
              values.pump_potency && values.pump_potency !== 0
                ? values.pump_potency
                : values.converted_potency,
            ),
            communication_type: Number(values.communication_type),
            base: values.communication_type === '0' ? props.base : null,
            control: values.communication_type === '0' ? values.control : values.gateway,
            monitor: values.monitor ? values.monitor : null,
            automation_type: 0,
            panel_type: Number(values.panel_type),
            brand_model:
              values.brand_model !== 'other' ? values.brand_model : values.other_brand_model,
            pluviometer: values.pluviometer,
            pump: values.pump ? values.pump : null,
            protocol: '5.0',
          };
          await createPivotReq.runAsync({ farmId: params.id as any }, data);
          message.success('Equipamento Criado com Sucesso');
          props.queryPivotInformation({
            id: parseInt(params.id as string),
            params: {},
          });
          props.closeModalForm();
        } catch (err) {
          console.error(err);
          message.error('Fail');
        } finally {
          props.setLoading(false);
        }
      }}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.pivot.name.label',
            })}
            rules={[yupSync]}
          />
        </Col>

        <Col xs={24} sm={12}>
          <ProFormSelect
            name="brand_model"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.pivot.brand.label',
            })}
            rules={[yupSync]}
            valueEnum={{
              bauer: 'Bauer',
              carborundum: 'Carborundum',
              fockink: 'Fockink',
              irrigabras: 'Irrigabras',
              krebs: 'Krebs',
              lindsay: 'Lindsay',
              reinke: 'Reinke',
              valley: 'Valley',
              other: 'Outro',
            }}
            onChange={(value) => {
              if (value === 'bauer') {
                setPanelTypeOptions({
                  1: 'Nexus',
                  2: 'SmartConnect',
                });
              } else {
                setPanelTypeOptions({ 1: 'Nexus' });
              }

              props.form.setFieldValue('panel_type', null);
            }}
          />
        </Col>
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            return form.getFieldValue('brand_model') === 'other' ? (
              <>
                <Col xs={24} sm={12}>
                  <ProFormText
                    rules={[yupSync]}
                    name="other_brand_model"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.pivot.otherbrand.label',
                    })}
                  />
                </Col>
              </>
            ) : null;
          }}
        </ProForm.Item>
        <Col xs={24} sm={12}>
          <ProFormSelect
            name="panel_type"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.pivot.paneltype.label',
            })}
            rules={[yupSync]}
            valueEnum={panelTypeOptions}
          />
        </Col>

        <Col xs={24} sm={12}>
          <ProFormSelect
            name="communication_type"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.pivot.communicationtype.label',
            })}
            rules={[yupSync]}
            valueEnum={{
              '0': 'XBEE',
              '1': '4G',
            }}
          />
        </Col>
        <ProForm.Item noStyle shouldUpdate>
          {() => {
            {
              console.log(props.form.getFieldValue('communication_type'));
            }
            return props.form.getFieldValue('communication_type') === '0' ? (
              <>
                <Col xs={24} sm={12}>
                  <ProFormText
                    name="control"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.pivot.control.label',
                    })}
                    rules={[yupSync]}
                    fieldProps={{
                      onInput: (e: any) => (e.target.value = e.target.value.toUpperCase()),
                    }}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <ProFormText
                    name="monitor"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.pivot.monitor.label',
                    })}
                    rules={[yupSync]}
                    fieldProps={{
                      onInput: (e: any) => (e.target.value = e.target.value.toUpperCase()),
                    }}
                  />
                </Col>

                <Col xs={24} sm={12}>
                  <ProFormText
                    name="pump"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.pivot.pump.label',
                    })}
                    rules={[yupSync]}
                    fieldProps={{
                      onInput: (e: any) => (e.target.value = e.target.value.toUpperCase()),
                    }}
                  />
                </Col>
              </>
            ) : (
              <Col xs={24} sm={12}>
                <ProFormText
                  name="gateway"
                  label={intl.formatMessage({
                    id: 'component.adddevice.modal.form.step2.pivot.gateway.label',
                  })}
                  rules={[yupSync]}
                  fieldProps={{
                    onInput: (e: any) => (e.target.value = e.target.value.toUpperCase()),
                  }}
                />
              </Col>
            );
          }}
        </ProForm.Item>
        <Col xs={24} sm={24}>
          <ProFormCheckbox name="pluviometer">
            {intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.pivot.pluviometer.label',
            })}
          </ProFormCheckbox>
        </Col>
        <Col xs={24} sm={24}>
          <ProFormRadio.Group
            name="potency_unit"
            layout="horizontal"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.pivot.potencyunit.label',
            })}
            rules={[yupSync]}
            options={[
              {
                label: 'CV',
                value: 'cv',
              },
              {
                label: 'kW',
                value: 'kw',
              },
            ]}
          />
        </Col>
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            return form.getFieldValue('potency_unit') === 'cv' ? (
              <>
                <Col xs={24} sm={8}>
                  <ProFormDigit
                    name="potency"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.pivot.potency.label',
                    })}
                    rules={[yupSync]}
                    min={1}
                    fieldProps={{
                      addonAfter: 'cv',
                      controls: false,
                      type: 'number',
                      onChange: (value: number | null) => {
                        const performance = parseFloat(form.getFieldValue('performance'));
                        const potency = value;
                        if (performance && potency) {
                          form.setFieldValue('converted_potency', hpToCv(potency, performance));
                        } else {
                          form.setFieldValue('converted_potency', null);
                        }
                      },
                    }}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <ProFormDigit
                    name="performance"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.pivot.performance.label',
                    })}
                    rules={[yupSync]}
                    min={1}
                    fieldProps={{
                      addonAfter: '%',
                      controls: false,
                      type: 'number',
                      onChange: (value: number | null) => {
                        const performance = value;
                        const potency = parseFloat(form.getFieldValue('potency'));
                        if (performance && potency) {
                          form.setFieldValue('converted_potency', hpToCv(potency, performance));
                        } else {
                          form.setFieldValue('converted_potency', null);
                        }
                      },
                    }}
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <ProFormDigit
                    name="converted_potency"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.pivot.convertedpotency.label',
                    })}
                    rules={[yupSync]}
                    min={1}
                    fieldProps={{
                      addonAfter: 'kW',
                      controls: false,
                      type: 'number',
                    }}
                  />
                </Col>
              </>
            ) : (
              <Col xs={24} sm={12}>
                <ProFormDigit
                  name="pump_potency"
                  label={intl.formatMessage({
                    id: 'component.adddevice.modal.form.step2.pivot.pumppotency.label',
                  })}
                  rules={[yupSync]}
                  min={1}
                  fieldProps={{
                    addonAfter: 'kW',
                    controls: false,
                    type: 'number',
                  }}
                />
              </Col>
            );
          }}
        </ProForm.Item>
      </Row>
    </ProForm>
  );
};

export default PivotForm;
