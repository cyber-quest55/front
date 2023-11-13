import { postPivotConfig } from '@/services/pivot';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormSegmented,
  ProFormSelect,
  ProFormSwitch,
  useIntl,
} from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Typography } from 'antd';
import * as React from 'react';

const EditPivotAutoreversionComponent: React.FunctionComponent<any> = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { message } = App.useApp();
  const [form] = Form.useForm<any>();

  const [loading, setLoading] = React.useState(false);

  const postReq = useRequest(postPivotConfig, { manual: true });

 
  const { pivot } = props;

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          AutoReversão
        </Typography.Title>
      }
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          Salvar
        </Button>
      }
      ghost
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          A autoreversão é um recurso que possibilita que o pivô chegue ao final do seu percurso e
          retorne automaticamente, realizando uma operação. O retorno do pivô acontece quando ele
          alcança um obstáculo físico, chamado de fim de curso - disponível em painéis SmartConnect
          - ou quando chega ao ângulo final de trabalho.
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
        initialValues={{ segmented2: 'by_angle', time: '30', ...pivot }}
        onFinish={async (values: any) => {
          setLoading(true);
          try {
            const newObj = {
              ...pivot.controllerconfig,
              ...values.controllerconfig,
              content: {
                ...pivot.controllerconfig.content,
                ...values.controllerconfig.content,
                autoreversion_command: {
                  command: values.controllerconfig.content.autoreversion_command.command ? 1 : 0,
                },
              },
              name_pivot_on_config: pivot.name,
            };

            delete newObj.uuid;
            delete newObj.device;
            delete newObj.message_packets;
            delete newObj.name;

            await postReq.runAsync(
              {
                farmId: params.farmId as any,
                pivotId: params.pivotId as any,
                deviceId: pivot.control as any,
              },
              newObj,
            );

            await props.queryPivotByIdStart({
              farmId: params.farmId as any,
              pivotId: params.pivotId as any,
            });

            message.success('Configs Atualizadas com Sucesso');
          } catch (err) {
            message.error('Fail');
          }

          setLoading(false);
        }}
      >
        <ProFormSwitch
          name={['controllerconfig', 'content', 'autoreversion_command', 'command']}
          checkedChildren="Desabilitar"
          unCheckedChildren="Habilitar"
        />
        <ProFormDependency name={['controllerconfig']}>
          {({ controllerconfig }) => {
            if (controllerconfig.content.autoreversion_command.command)
              return (
                <>
                  <ProFormSegmented
                    name={['controllerconfig', 'content', 'autoreversion_configurations', 'mode']}
                    label="Condição de parada"
                    request={async () => [
                      { label: 'Por ângulo', value: 1 },
                      { label: 'Por fim de curso', value: 0 },
                    ]}
                  />
                  <ProFormSelect
                    name={['controllerconfig', 'content', 'autoreversion_configurations', 'time']}
                    label="Tempo de espera para autoreversão"
                    colProps={{ xs: 24, md: 8 }}
                    options={[
                      {
                        value: 30,
                        label: '30 Segundos',
                      },
                      {
                        value: 60,
                        label: 'Um minuto',
                      },
                      {
                        value: 120,
                        label: 'Dois minutos',
                      },
                    ]}
                  />
                </>
              );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotAutoreversionComponent;
