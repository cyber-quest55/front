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
          {intl.formatMessage({
            id: 'component.edit.pivot.pluviometer.title',
          })}
        </Typography.Title>
      }
      extra={
        <Button
          loading={loading}
          icon={<SaveOutlined />}
          disabled={!disabled}
          type="primary"
          onClick={form.submit}
        >
          {intl.formatMessage({
            id: 'component.edit.pivot.button.save',
          })}
        </Button>
      }
      ghost
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.pivot.pluviometer.value.label',
          })}
          : 19 Out 2023 09:55- Internet
        </Typography.Text>
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
            setDisabled(changedField[0].value);
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
          checkedChildren={intl.formatMessage({
            id: 'component.switch.disabled',
          })}
          unCheckedChildren={intl.formatMessage({
            id: 'component.switch.enable',
          })}
        />

        <ProFormDependency name={['controllerconfig', 'pluviometer']}>
          {({ pluviometer, controllerconfig }) => {
            if (pluviometer)
              return (
                <>
                  <ProFormSelect
                    rules={[yupSync]}
                    name={['controllerconfig', 'content', 'pluviometer_stop_mode', 'stop_mode']}
                    label={intl.formatMessage({
                      id: 'component.edit.pivot.pluviometer.stopcdn.label',
                    })}
                    colProps={{ xs: 24, md: 8 }}
                    options={[
                      {
                        value: 0,
                        label: intl.formatMessage({
                          id: 'component.edit.pivot.pluviometer.stopcdn.opt.1',
                        }),
                      },
                      {
                        value: 1,
                        label: intl.formatMessage({
                          id: 'component.edit.pivot.pluviometer.stopcdn.opt.2',
                        }),
                      },
                      {
                        value: 2,
                        label: intl.formatMessage({
                          id: 'component.edit.pivot.pluviometer.stopcdn.opt.3',
                        }),
                      },
                    ]}
                  />
                  <ProFormDigit
                    rules={[yupSync]}
                    name={['controllerconfig', 'content', 'mm_to_stop', 'value']}
                    label={intl.formatMessage({
                      id: 'component.edit.pivot.pluviometer.value.label',
                    })}
                    colProps={{ xs: 24, md: 8 }}
                    fieldProps={{
                      addonAfter: 'mm',
                    }}
                    disabled={controllerconfig?.content?.pluviometer_stop_mode?.stop_mode !== 1}
                  />
                  <ProFormDigit
                    rules={[yupSync]}
                    name={['controllerconfig', 'content', 'pluviometer_scale', 'mm']}
                    label={intl.formatMessage({
                      id: 'component.edit.pivot.pluviometer.sensorscale.label',
                    })}
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
