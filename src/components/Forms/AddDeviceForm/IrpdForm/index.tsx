import { createIrpd } from '@/services/irpd';
import { yupValidator } from '@/utils/adapters/yup';
import {
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Col, Row } from 'antd';
import { useRef } from 'react';
import * as yup from 'yup';

const cvHpRatio = 0.7355;

const hpToCv = (devicePotencyHP: number, devicePerformance: number) =>
  ((devicePotencyHP * cvHpRatio * 100) / devicePerformance).toFixed(2);

const IrpdForm: React.FC<any> = (props) => {
  const createIrpdReq = useRequest(createIrpd, { manual: true });
  const intl = useIntl();
  const { message } = App.useApp();
  const params = useParams();

  const schema = yup.object().shape({
    name: yup
      .string()
      .max(
        20,
        intl.formatMessage(
          {
            id: 'validations.max',
          },
          { value: 20 },
        ),
      )
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    latitude: yup.number().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    longitude: yup.number().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    protocol: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
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
    pump: yup
      .string()
      .matches(
        /[0-9A-F]{16}/g,
        intl.formatMessage({
          id: 'validations.invalid',
        }),
      )
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
  });

  const yupSync = yupValidator(schema, props.form.getFieldsValue);
  const ref = useRef<any>();

  return (
    <ProForm
      validateTrigger="onBlur"
      layout="vertical"
      submitter={false}
      preserve={false}
      formRef={ref}
      form={props.form}
      name="irpd_form"
      onFinish={async (values: any) => {
        try {
          props.setLoading(true);
          const position = `${values.latitude},${values.longitude}`;
          const data = {
            name: values.name,
            base: props.base,
            pump: values.pump,
            potency: parseFloat(
              values.pump_potency && values.pump_potency !== 0
                ? values.pump_potency
                : values.converted_potency,
            ),
            flow: '100',
            position: position,
            protocol: Number(values.protocol),
          };
          await createIrpdReq.runAsync({ farmId: params.id as any }, data);
          message.success('Equipamento Criado com Sucesso');
        } catch (err) {
          console.error(err);
          message.error('Fail');
        } finally {
          props.setLoading(false);
        }
      }}
      initialValues={{
        potency_unit: 'kw',
      }}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12}>
          <ProFormText name="name" label="Nome do equipamento" rules={[yupSync]} />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormText
            name="pump"
            label="Rádio do Cabo de Bomba (Irripump)"
            rules={[yupSync]}
            fieldProps={{
              onInput: (e: any) => (e.target.value = e.target.value.toUpperCase()),
            }}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormDigit
            rules={[yupSync]}
            name="latitude"
            label="Latitude"
            min={-999}
            max={999}
            fieldProps={{
              controls: false,
              type: 'number',
              precision: 6,
            }}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormDigit
            rules={[yupSync]}
            name="longitude"
            label="Longitude"
            min={-999}
            max={999}
            fieldProps={{
              controls: false,
              type: 'number',
              precision: 6,
            }}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormSelect
            rules={[yupSync]}
            valueEnum={{
              '5.0': '5.0',
              '5.1': '5.1',
            }}
            name="protocol"
            label="Versão"
          />
        </Col>
        <Col xs={24} sm={24}>
          <ProFormRadio.Group
            name="potency_unit"
            layout="horizontal"
            label="Unidade de Potência"
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
                    label="Potência"
                    rules={[yupSync]}
                    min={1}
                    fieldProps={{
                      addonAfter: 'cv',
                      controls: false,
                      type: 'number',
                      onChange: (value: number | null) => {
                        const performance = parseFloat(ref.current.getFieldValue('performance'));
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
                    label="Rendimento"
                    rules={[yupSync]}
                    min={1}
                    fieldProps={{
                      addonAfter: '%',
                      controls: false,
                      type: 'number',
                      onChange: (value: number | null) => {
                        const performance = value;
                        const potency = parseFloat(ref.current.getFieldValue('potency'));
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
                    label="Potência Convertida"
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
                  label="Potência da Bomba"
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

export default IrpdForm;
