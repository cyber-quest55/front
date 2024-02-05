import { createLinearPivotMonitor } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Col, Row } from 'antd';
import * as yup from 'yup';

const LinearPivotMonitorForm: React.FC<any> = (props) => {
  const createLinearPivotMonitorReq = useRequest(createLinearPivotMonitor, { manual: true });
  const intl = useIntl();
  const { message } = App.useApp();
  const params = useParams();

  const schema = yup.object().shape(
    {
      name: yup
        .string()
        .max(
          17,
          intl.formatMessage(
            {
              id: 'validations.max',
            },
            { value: 17 },
          ),
        )
        .required(
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
      monitor: yup
        .string()
        .matches(
          /^[0-9A-F]{16}$/,
          intl.formatMessage({
            id: 'validations.invalid',
          }),
        )
        .required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      flow_rate: yup
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
        .required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      pivot_length: yup
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
        .required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      pivot_speed: yup
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
        .required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
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
      name="linear_pivot_monitor_form"
      onFinish={async (values: any) => {
        try {
          props.setLoading(true);
          const data = {
            name: values.name,
            monitor: values.monitor,
            base: props.base,
            automation_type: 2,
            brand_model:
              values.brand_model !== 'other' ? values.brand_model : values.other_brand_model,
            protocol: '5.0',
            flowRate: parseFloat(values.flow_rate),
            pivotLength: parseFloat(values.pivot_length),
            pivotSpeed: parseFloat(values.pivot_speed),
          };
          await createLinearPivotMonitorReq.runAsync({ farmId: params.id as any }, data);
          message.success('Equipamento Criado com Sucesso');
          window.location.reload();
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
            rules={[yupSync]}
            name="name"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.linearpivotmonitor.name.label',
            })}
          />
        </Col>
        <Col xs={24} sm={12}>
          <ProFormSelect
            name="brand_model"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.linearpivotmonitor.brand.label',
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
                      id: 'component.adddevice.modal.form.step2.linearpivotmonitor.otherbrand.label',
                    })}
                  />
                </Col>
              </>
            ) : null;
          }}
        </ProForm.Item>

        <Col xs={24} sm={12}>
          <ProFormText
            rules={[yupSync]}
            name="monitor"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.linearpivotmonitor.monitor.label',
            })}
            fieldProps={{
              onInput: (e: any) => (e.target.value = e.target.value.toUpperCase()),
            }}
          />
        </Col>

        <Col xs={24} sm={12}>
          <ProFormDigit
            rules={[yupSync]}
            name="flow_rate"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.linearpivotmonitor.flowrate.label',
            })}
            min={1}
            fieldProps={{
              addonAfter: 'm³/h',
              controls: false,
              type: 'number',
            }}
          />
        </Col>

        <Col xs={24} sm={12}>
          <ProFormDigit
            rules={[yupSync]}
            name="pivot_length"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.linearpivotmonitor.length.label',
            })}
            min={1}
            fieldProps={{
              addonAfter: 'm',
              controls: false,
              type: 'number',
            }}
          />
        </Col>

        <Col xs={24} sm={12}>
          <ProFormDigit
            rules={[yupSync]}
            name="pivot_speed"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.linearpivotmonitor.speed.label',
            })}
            min={1}
            fieldProps={{
              addonAfter: 'm/h',
              controls: false,
              type: 'number',
            }}
          />
        </Col>
      </Row>
    </ProForm>
  );
};

export default LinearPivotMonitorForm;
