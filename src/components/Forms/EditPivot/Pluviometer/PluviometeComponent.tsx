import { patchPivotGlobalConfig, postPivotConfig } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Typography } from 'antd';
import * as React from 'react';
import * as yup from 'yup';

const EditPivotPluviometerComponent: React.FunctionComponent<any> = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { message } = App.useApp();
  const [form] = Form.useForm<any>();

  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const postReq = useRequest(postPivotConfig, { manual: true });
  const patchReq = useRequest(patchPivotGlobalConfig, { manual: true });

  const schema = yup.object().shape({
    pluviometer: yup.boolean().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    controllerconfig: yup.object().shape({
      content: yup.object().shape({
        pluviometer_stop_mode: yup.object().shape({
          stop_mode: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),
        mm_to_stop: yup.object().shape({
          value: yup.string().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),

        pluviometer_scale: yup.object().shape({
          mm: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),
      }),
    }),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);
  const { pivot } = props;

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Pluviômetro
        </Typography.Title>
      }
      extra={
        <Button loading={loading} icon={<SaveOutlined />} disabled={!disabled} type="primary" onClick={form.submit}>
          Salvar
        </Button>
      }
      ghost
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>Última configuração: 19 Out 2023 09:55- Internet</Typography.Text>
      </div>
      <ProForm
        validateTrigger="onBlur"
        layout="vertical"
        rowProps={{ gutter: [8, 8] }}
        grid
        form={form}
        submitter={false}
        name="PluviometerForm"
        onFieldsChange={(changedField) => {
          if (changedField[0]?.name[0] === 'pluviometer') {
            setDisabled(changedField[0].value)
            patchReq.runAsync(
              {
                farmId: params.farmId as any,
                pivotId: params.pivotId as any,
              },
              { pluviometer: changedField[0].value },
            );
          }
        }}
        initialValues={{ ...pivot }}
        onFinish={async (values: any) => {
          setLoading(true);
          try {
            const newObj = {
              ...pivot.controllerconfig,
              ...values.controllerconfig,
              content: {
                ...pivot.controllerconfig.content,
                ...values.controllerconfig.content,
              },
              name_pivot_on_config: pivot.name,
            };

            delete newObj.uuid;
            delete newObj.device;

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
          name={['pluviometer']}
          rules={[yupSync]}
          checkedChildren="Desabilitar"
          unCheckedChildren="Habilitar"
        />

        <ProFormDependency name={['controllerconfig', 'pluviometer']}>
          {({ pluviometer, controllerconfig }) => {
            if (pluviometer)
              return (
                <>
                  <ProFormSelect
                    rules={[yupSync]}
                    name={['controllerconfig', 'content', 'pluviometer_stop_mode', 'stop_mode']}
                    label="Condição de parada"
                    colProps={{ xs: 24, md: 8 }}
                    options={[
                      {
                        value: 0,
                        label: 'Desabilitado',
                      },
                      {
                        value: 1,
                        label: 'Por valor',
                      },
                      {
                        value: 2,
                        label: 'Por decremento',
                      },
                    ]}
                  />
                  <ProFormDigit
                    rules={[yupSync]}
                    name={['controllerconfig', 'content', 'mm_to_stop', 'value']}
                    label="Valor"
                    colProps={{ xs: 24, md: 8 }}
                    fieldProps={{
                      addonAfter: 'mm',
                    }}
                    disabled={controllerconfig?.content?.pluviometer_stop_mode?.stop_mode !== 1}
                  />
                  <ProFormDigit
                    rules={[yupSync]}
                    name={['controllerconfig', 'content', 'pluviometer_scale', 'mm']}
                    label="Escala do sensor"
                    colProps={{ xs: 24, md: 8 }}
                    fieldProps={{
                      addonAfter: 'mm',
                    }}
                  />
                </>
              );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotPluviometerComponent;
