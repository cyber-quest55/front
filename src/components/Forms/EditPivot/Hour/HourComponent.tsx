import { postPivotConfig } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import * as yup from 'yup';
import * as React from 'react';

const EditPivotHourComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const ref = React.useRef();
  const params = useParams();
  const { message } = App.useApp();

  const postReq = useRequest(postPivotConfig, { manual: true });
  const intl = useIntl();
  const [loading, setLoading] = React.useState(false);

  const { pivot } = props;

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Horários
        </Typography.Title>
      }
      ghost
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          Salvar
        </Button>
      }
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>Última configuração: 19 Out 2023 09:55- Internet</Typography.Text>
      </div>
      <ProForm
        validateTrigger="onBlur"
        layout="vertical"
        rowProps={{ gutter: [8, 8] }}
        grid
        onInit={(v2, form) => {
          const day = v2.controllerconfig.content?.clock?.day || 1
          const hour =v2.controllerconfig.content?.clock?.hour || 1
          const year =  v2.controllerconfig.content?.clock?.year || 1
          const month = v2.controllerconfig.content?.clock?.month || 1
          const minute = v2.controllerconfig.content?.clock?.minute || 1
          const second =  v2.controllerconfig.content?.clock?.second || 1 
          const date = dayjs( `${year}-${month}-${day} ${hour}:${minute}:${second}`)  
          form.setFieldValue('controllerconfig', {
            ...v2.controllerconfig,
            content: {
              ...v2.content,
              clock: date,
            },
          });
        }}
        form={form}
        submitter={false}
        name="HourForm"
        initialValues={{ deviceHour: 'others', ...pivot }}
        onFinish={async (v2: any) => {
          setLoading(true);

          try {
            const date = dayjs(v2.controllerconfig?.content?.clock);
            const newObj = {
              ...pivot.controllerconfig,
              ...v2.controllerconfig,
              content: {
                ...pivot.controllerconfig.content,
                ...v2.controllerconfig.content,
                clock: {
                  day: date.get('D'),
                  hour: date.get('h'),
                  year: date.get('y'),
                  month: date.get('M') + 1,
                  minute: date.get('m'),
                  second: date.get('s'),
                },
              },
              name_pivot_on_config: pivot.name,
            };

            delete newObj.uuid;
            delete newObj.device;
            delete newObj.name;

            console.log('aqui', newObj);

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
            message.success('Configs Atualizadas com Sucesso');
          }
          setLoading(false);
        }}
      >
        <ProFormSelect
          label="Relógio do equipamento"
          colProps={{ xs: 24, md: 6 }}
          options={[
            {
              value: 'select',
              label: 'Configurar relógio do equipamento com horário atual',
            },
            {
              value: 'others',
              label: 'Configurar relógio do equipamento manualmente',
            },
          ]}
          name="deviceHour"
        />

        <ProFormDependency name={['deviceHour']}>
          {({ deviceHour }) => {
            return (
              <ProFormDateTimePicker
                name={['controllerconfig', 'content', 'clock']}
                label="Data do equipamento"
                disabled={!(deviceHour === 'others')}
              />
            );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotHourComponent;
