import { postPivotConfig } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormDigit,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Col, Form, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import * as yup from 'yup';

const format = 'HH:mm';

const EditPivotRushHourComponent: React.FunctionComponent<any> = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { message } = App.useApp();
  const [form] = Form.useForm<any>();

  const [loading, setLoading] = React.useState(false);
 
  const postReq = useRequest(postPivotConfig, { manual: true });

  const schema = yup.object().shape({
    controllerconfig: yup.object().shape({
      kwh_peak: yup.number().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      kwh_out_of_peak: yup.number().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      kwh_reduced: yup.number().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    }),
    firstBeginPickHour: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    firstEndPickHour: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    secondBeginPickHour: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    secondEndPickHour: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  const { pivot } = props;

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Descrição
        </Typography.Title>
      }
      ghost
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          Salvar
        </Button>
      }
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          Horários de Pico são faixas de tempo no qual o pivô não deve operar com água para evitar o
          uso em horários críticos, por exemplo, quando o custo da energia elétrica é alto.
        </Typography.Text>
      </div>
      <ProForm
        validateTrigger="onBlur"
        layout="vertical"
        rowProps={{ gutter: [8, 8] }}
        grid
        form={form}
        submitter={false}
        name="HourForm"
        onInit={(value, fm) => {
          const minut1 = pivot.controllerconfig.content.pause_time.end_pause_time_hour_1;
          const minut2 = pivot.controllerconfig.content.pause_time.end_pause_time_minute_1;
          const minut3 = pivot.controllerconfig.content.pause_time.start_pause_time_hour_1;
          const minut4 = pivot.controllerconfig.content.pause_time.start_pause_time_minute_1;
          const minut5 = pivot.controllerconfig.content.pause_time.end_pause_time_hour_2;
          const minut6 = pivot.controllerconfig.content.pause_time.end_pause_time_minute_2;
          const minut7 = pivot.controllerconfig.content.pause_time.start_pause_time_hour_2;
          const minut8 = pivot.controllerconfig.content.pause_time.start_pause_time_minute_2;

          const startDate1 = dayjs().hour(minut3).minute(minut4);
          const endDate1 = dayjs().hour(minut1).minute(minut2);

          const startDate2 = dayjs().hour(minut7).minute(minut8);
          const endDate2 = dayjs().hour(minut5).minute(minut6);

          form.setFieldValue('firstBeginPickHour', startDate1);
          form.setFieldValue('firstEndPickHour', endDate1);

          form.setFieldValue('secondBeginPickHour', startDate2);
          form.setFieldValue('secondEndPickHour', endDate2);

          if (minut1 === 0 && minut2 === 0 && minut3 === 0 && minut4 === 0) {
            fm.setFieldValue('firstHour', false);
          } else {
            fm.setFieldValue('firstHour', true);
          }

          if (fm.getFieldsValue()['firstHour'] === true) {
            if (minut5 === 0 && minut6 === 0 && minut7 === 0 && minut8 === 0) {
              fm.setFieldValue('secondHour', false);
            } else {
              fm.setFieldValue('secondHour', true);
            }
          } else {
            fm.setFieldValue('secondHour', false);
          }
        }}
        initialValues={{ ...pivot }}
        onFinish={async (v2: any) => {
          setLoading(true);

          try {
            const date1 = v2.firstBeginPickHour.split(':');
            const date2 = v2.firstEndPickHour.split(':');
            const date3 = v2.secondBeginPickHour.split(':');
            const date4 = v2.secondEndPickHour.split(':');

            const newObj = {
              ...pivot.controllerconfig,
              ...v2.controllerconfig,
              content: {
                ...pivot.controllerconfig.content,
                ...v2.controllerconfig.content,
                pause_time: {
                  ...pivot.controllerconfig.content.pause_time,
                  start_pause_time_hour_1: date1[0],
                  start_pause_time_minute_1: date1[1],
                  end_pause_time_hour_1: date2[0],
                  end_pause_time_minute_1: date2[1],
                  start_pause_time_hour_2: date3[0],
                  start_pause_time_minute_2: date3[1],
                  end_pause_time_hour_2: date4[0],
                  end_pause_time_minute_2: date4[1],
                },
              },
              name_pivot_on_config: pivot.name,
            };

            delete newObj.uuid;
            delete newObj.device;
            delete newObj.name;
            delete newObj.firstBeginPickHour;
            delete newObj.firstEndPickHour;
            delete newObj.secondBeginPickHour;
            delete newObj.secondEndPickHour;

            await postReq.runAsync(
              {
                farmId: params.farmId as any,
                pivotId: params.pivotId as any,
                deviceId: pivot.control as any,
              },
              newObj,
            );

            props.queryPivotByIdStart({
              farmId: params.farmId as any,
              pivotId: params.pivotId as any,
            });
            message.success('Configs Atualizadas com Sucesso');
          } catch (err) {
            console.log(err);
            message.error('erro');
          }
          setLoading(false);
        }}
      >
        <Col style={{ padding: 0 }} span={24}>
          <Typography.Title style={{ marginTop: 12 }} level={4}>
            Preços das Faixas de Energia
          </Typography.Title>
        </Col>
        <ProFormDigit
          colProps={{ xs: 24, md: 8 }}
          label="Ponta"
          rules={[yupSync]}
          name={['controllerconfig', 'kwh_peak']}
          fieldProps={{ precision: 2, addonBefore: 'R$' }}
          min={0}
          max={999}
        />
        <ProFormDigit
          rules={[yupSync]}
          name={['controllerconfig', 'kwh_out_of_peak']}
          colProps={{ xs: 24, md: 8 }}
          label="Fora de Ponta"
          fieldProps={{ precision: 2, addonBefore: 'R$' }}
          min={0}
          max={999}
        />
        <ProFormDigit
          rules={[yupSync]}
          name={['controllerconfig', 'kwh_reduced']}
          colProps={{ xs: 24, md: 8 }}
          label="Reduzido"
          fieldProps={{ precision: 2, addonBefore: 'R$' }}
          min={0}
          max={999}
        />
        <Col style={{ padding: 0 }} span={24}>
          <Typography.Title style={{ marginTop: 12 }} level={4}>
            Dias da Semana
          </Typography.Title>
        </Col>
        <ProFormDependency name={['firstHour']}>
          {({ firstHour }) => {
            return (
              <Space>
                <ProFormCheckbox
                  name={['controllerconfig', 'content', 'pause_time', 'enable_friday']}
                  colProps={{ xs: 24, md: 1 }}
                  disabled={!firstHour}
                >
                  DOM
                </ProFormCheckbox>
                <ProFormCheckbox
                  name={['controllerconfig', 'content', 'pause_time', 'enable_monday']}
                  colProps={{ xs: 24, md: 1 }}
                  disabled={!firstHour}
                >
                  SEG
                </ProFormCheckbox>
                <ProFormCheckbox
                  name={['controllerconfig', 'content', 'pause_time', 'enable_sunday']}
                  colProps={{ xs: 24, md: 1 }}
                  disabled={!firstHour}
                >
                  TER
                </ProFormCheckbox>
                <ProFormCheckbox
                  name={['controllerconfig', 'content', 'pause_time', 'enable_tuesday']}
                  colProps={{ xs: 24, md: 1 }}
                  disabled={!firstHour}
                >
                  QUA
                </ProFormCheckbox>
                <ProFormCheckbox
                  name={['controllerconfig', 'content', 'pause_time', 'enable_saturday']}
                  colProps={{ xs: 24, md: 1 }}
                  disabled={!firstHour}
                >
                  QUI
                </ProFormCheckbox>
                <ProFormCheckbox
                  name={['controllerconfig', 'content', 'pause_time', 'enable_thursday']}
                  colProps={{ xs: 24, md: 1 }}
                  disabled={!firstHour}
                >
                  SEX
                </ProFormCheckbox>
                <ProFormCheckbox
                  name={['controllerconfig', 'content', 'pause_time', 'enable_wednesday']}
                  colProps={{ xs: 24, md: 1 }}
                  disabled={!firstHour}
                >
                  SAB
                </ProFormCheckbox>
              </Space>
            );
          }}
        </ProFormDependency>

        <Col style={{ padding: 0 }} span={24}>
          <Typography.Title style={{ marginTop: 12 }} level={4}>
            Configurações
          </Typography.Title>
        </Col>
        <ProFormCheckbox
          name="firstHour"
          fieldProps={{ style: { paddingTop: '30px' } }}
          colProps={{ xs: 24, md: 4 }}
        >
          Ativar horário de pico 1
        </ProFormCheckbox>
        <ProFormDependency name={['firstHour']}>
          {({ firstHour }) => {
            return (
              <>
                <ProFormTimePicker
                  rules={[yupSync]}
                  name={['firstBeginPickHour']}
                  dataFormat={format}
                  disabled={!firstHour}
                  label="Início do horário de pico"
                  fieldProps={{ style: { width: '100%' }, format: format }}
                  colProps={{ xs: 24, md: 10 }}
                />
                <ProFormTimePicker
                  rules={[yupSync]}
                  name={['firstEndPickHour']}
                  disabled={!firstHour}
                  label="Final do horário de pico"
                  fieldProps={{ style: { width: '100%' }, format: format }}
                  colProps={{ xs: 24, md: 10 }}
                />
                <ProFormCheckbox
                  name="secondHour"
                  disabled={!firstHour}
                  fieldProps={{ style: { paddingTop: '30px' } }}
                  colProps={{ xs: 24, md: 4 }}
                >
                  Ativar horário de pico 2
                </ProFormCheckbox>
              </>
            );
          }}
        </ProFormDependency>

        <ProFormDependency name={['firstHour', 'secondHour']}>
          {({ secondHour, firstHour }) => {
            return (
              <>
                <ProFormTimePicker
                  rules={[yupSync]}
                  name={['secondBeginPickHour']}
                  disabled={!secondHour || !firstHour}
                  label="Início do horário de pico"
                  fieldProps={{ style: { width: '100%' }, format: format }}
                  colProps={{ xs: 24, md: 10 }}
                />
                <ProFormTimePicker
                  rules={[yupSync]}
                  name={['secondEndPickHour']}
                  disabled={!secondHour || !firstHour}
                  label="Final do horário de pico"
                  fieldProps={{ style: { width: '100%' }, format: format }}
                  colProps={{ xs: 24, md: 10 }}
                />
              </>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotRushHourComponent;
