import { createRepeater } from '@/services/repeaters';
import { yupValidator } from '@/utils/adapters/yup';
import { ProForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Col, Row } from 'antd';
import * as yup from 'yup';

const RepeaterForm: React.FC<any> = (props) => {
  const createRepeaterReq = useRequest(createRepeater, { manual: true });
  const intl = useIntl();
  const { message } = App.useApp();
  const params = useParams();

  const schema = yup.object().shape({
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
    energy_type: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    repeater: yup
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
  });

  const yupSync = yupValidator(schema, props.form.getFieldsValue);
  return (
    <ProForm
      validateTrigger="onBlur"
      layout="vertical"
      submitter={false}
      preserve={false}
      form={props.form}
      name="repeater_form"
      onFinish={async (values: any) => {
        try {
          props.setLoading(true);
          const position = `${values.latitude},${values.longitude}`;
          const data = {
            name: values.name,
            base: props.base,
            position: position,
            repeater: values.repeater,
            energy_type: values.energy_type,
          };
          await createRepeaterReq.runAsync({ farmId: params.id as any }, data);
          message.success('Equipamento Criado com Sucesso');
        } catch (err) {
          console.error(err);
          message.error('Fail');
        } finally {
          props.setLoading(false);
        }
      }}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={8}>
          <ProFormText name="name" label="Nome do equipamento" rules={[yupSync]} />
        </Col>

        <Col xs={24} sm={8}>
          <ProFormText
            name="repeater"
            label="Rádio do Repetidor"
            rules={[yupSync]}
            fieldProps={{
              onInput: (e: any) => (e.target.value = e.target.value.toUpperCase()),
            }}
          />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormSelect
            name="energy_type"
            rules={[yupSync]}
            label="Tipo"
            options={[
                {
                  value: 'Solar',
                  label: 'Solar',
                },
                {
                  value: 'Bivolt',
                  label: 'Bivolt',
                },
              ]}
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
      </Row>
    </ProForm>
  );
};

export default RepeaterForm;
