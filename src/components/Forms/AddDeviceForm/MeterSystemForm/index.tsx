import { createMeterSystem, getMeterSystemSensors } from '@/services/metersystem';
import { yupValidator } from '@/utils/adapters/yup';
import {
  ProForm,
  ProFormDigit,
  ProFormItem,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Col, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

const MeterSystemForm: React.FC<any> = (props) => {
  const createMeterSystemReq = useRequest(createMeterSystem, { manual: true });
  const sensorsReq = useRequest(getMeterSystemSensors, { manual: true });
  const [sensorOptions, setSensorOptions] = useState<any[]>([]);
  const intl = useIntl();
  const { message } = App.useApp();
  const params = useParams();

  useEffect(() => {
    sensorsReq.runAsync().then((data: any) => {
      const sensors = data
        .filter((sensor: any) => sensor.available)
        .map((sensor: any) => ({
          label: sensor.sensor.name,
          value: sensor.id,
        }));
      setSensorOptions(sensors);
    });
  }, []);

  const schema = yup.object().shape({
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
    sensor_id: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    imeter_device: yup
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
          const position = `${values.latitude},${values.longitude}`;
          const data = {
            name: values.name,
            position: position,
            imeter_device: values.imeter_device,
            base: props.base,
            local_actuation: false,
            protocol: '5.2',
            function: 'LEVEL',
            sensor_id: Number(values.sensor_id),
          };
          await createMeterSystemReq.runAsync({ farmId: params.id as any }, data);
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
          <ProFormText name="name" rules={[yupSync]} label="Nome do equipamento" />
        </Col>
        <Col xs={24} sm={8}>
          <ProFormText
            name="imeter_device"
            rules={[yupSync]}
            label="Radio do IMeter"
            fieldProps={{
              onInput: (e: any) => (e.target.value = e.target.value.toUpperCase()),
            }}
          />
        </Col>
        <Col xs={24} sm={8}>
          {sensorsReq.loading ? (
            <ProFormItem label="Sensor">
              <Skeleton.Input />
            </ProFormItem>
          ) : (
            <ProFormSelect
              name="sensor_id"
              label="Sensor"
              rules={[yupSync]}
              options={sensorOptions}
            />
          )}
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
              precision: 6
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
              precision: 6
            }}
          />
        </Col>
      </Row>
    </ProForm>
  );
};

export default MeterSystemForm;
