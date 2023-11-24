import { postPivotConfig } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Col, Divider, Form, Typography } from 'antd';
import * as React from 'react';
import * as yup from 'yup';

const EditPivotPumpComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const { message } = App.useApp();
  const params = useParams();
  const postReq = useRequest(postPivotConfig, { manual: true });
  const intl = useIntl();
  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    aux_brand_model: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    controllerconfig: yup.object().shape({
      content: yup.object().shape({
        power_delay: yup.object().shape({
          power_delay: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),

        pressure_config: yup.object().shape({
          read_pressure_by: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),

          pump_time_out: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),

          pump_press_delay: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),

          pump_press_switch: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),

          press_sensor_min_range: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),

          press_sensor_max_range: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),

          sensor_scale_end: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),
      }),
      injection_pump: yup.boolean().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      potency: yup.number().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    }),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  const { pivot } = props;
  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          {intl.formatMessage({
            id: 'component.edit.pivot.pressure.title',
          })}
        </Typography.Title>
      }
      ghost
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          {intl.formatMessage({
            id: 'component.edit.pivot.button.save',
          })}
        </Button>
      }
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.pivot.lastconfig',
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
        name="PumpForm"
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
        initialValues={{ ...pivot }}
      >
        <ProFormDigit
          rules={[yupSync]}
          name={['controllerconfig', 'potency']}
          label={intl.formatMessage({
            id: 'component.edit.pivot.pressure.pumppw.label',
          })}
          colProps={{ xs: 24, md: 6 }}
          fieldProps={{
            addonAfter: 'kW',
          }}
        />
        <ProFormDigit
          rules={[yupSync]}
          name={['controllerconfig', 'content', 'power_delay', 'power_delay']}
          label={intl.formatMessage({
            id: 'component.edit.pivot.pressure.pumptm.label',
          })}
          colProps={{ xs: 24, md: 6 }}
          fieldProps={{
            addonAfter: 'min',
          }}
        />
        <Col style={{ padding: 0 }} span={24}>
          <Divider style={{ margin: 4 }} />

          <Typography.Title style={{ marginTop: 12 }} level={4}>
            {intl.formatMessage({
              id: 'component.edit.pivot.pressure.subtitle.1',
            })}
          </Typography.Title>
        </Col>
        <ProFormSelect
          rules={[yupSync]}
          name={['controllerconfig', 'content', 'pressure_config', 'read_pressure_by']}
          label={intl.formatMessage({
            id: 'component.edit.pivot.pressure.pmptimeout.label',
          })}
          colProps={{ xs: 24, md: 24 }}
          options={[
            {
              value: 0,
              label: intl.formatMessage({
                id: 'component.edit.pivot.pressure.pressuredng.opt.1',
              }),
            },
            {
              value: 1,
              label: intl.formatMessage({
                id: 'component.edit.pivot.pressure.pressuredng.opt.2',
              }),
            },
            {
              value: 2,
              label: intl.formatMessage({
                id: 'component.edit.pivot.pressure.pressuredng.opt.3',
              }),
            },
          ]}
        />

        <ProFormDependency name={['controllerconfig']}>
          {({ controllerconfig }) => {
            const pressureListener = controllerconfig.content.pressure_config.read_pressure_by;

            return (
              <>
                <ProFormDigit
                  rules={[yupSync]}
                  name={['controllerconfig', 'content', 'pressure_config', 'pump_time_out']}
                  label={intl.formatMessage({
                    id: 'component.edit.pivot.pressure.pmptimeout.label',
                  })}
                  disabled={pressureListener === 0}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    addonAfter: 'min',
                  }}
                />
                <ProFormDigit
                  rules={[yupSync]}
                  name={['controllerconfig', 'content', 'pressure_config', 'pump_press_delay']}
                  label={intl.formatMessage({
                    id: 'component.edit.pivot.pressure.delaytime.label',
                  })}
                  disabled={pressureListener === 0}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    addonAfter: 's',
                  }}
                />
                <ProFormDigit
                  rules={[yupSync]}
                  name={['controllerconfig', 'content', 'pressure_config', 'pump_press_switch']}
                  label={intl.formatMessage({
                    id: 'component.edit.pivot.pressure.unstpress.label',
                  })}
                  disabled={pressureListener === 0}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    addonAfter: 'min',
                  }}
                />
                <ProFormDigit
                  rules={[yupSync]}
                  name={[
                    'controllerconfig',
                    'content',
                    'pressure_config',
                    'press_sensor_min_range',
                  ]}
                  label={intl.formatMessage({
                    id: 'component.edit.pivot.pressure.minsensvalue.label',
                  })}
                  disabled={pressureListener === 0 || pressureListener === 1}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    addonAfter: 'bar',
                  }}
                />
                <ProFormDigit
                  rules={[yupSync]}
                  name={[
                    'controllerconfig',
                    'content',
                    'pressure_config',
                    'press_sensor_max_range',
                  ]}
                  label={intl.formatMessage({
                    id: 'component.edit.pivot.pressure.pressenmax.label',
                  })}
                  disabled={pressureListener === 0 || pressureListener === 1}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    addonAfter: 'bar',
                  }}
                />
                <ProFormDigit
                  rules={[yupSync]}
                  name={['controllerconfig', 'content', 'pressure_config', 'sensor_scale_end']}
                  label={intl.formatMessage({
                    id: 'component.edit.pivot.pressure.senscale.label',
                  })}
                  disabled={pressureListener === 0 || pressureListener === 1}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    addonAfter: 'bar',
                  }}
                />
              </>
            );
          }}
        </ProFormDependency>
        <Col style={{ padding: 0 }} span={24}>
          <Divider style={{ margin: 4 }} />

          <Typography.Title style={{ marginTop: 12 }} level={4}>
            {intl.formatMessage({
              id: 'component.edit.pivot.pressure.subtitle.2',
            })}
          </Typography.Title>
        </Col>
        <ProFormCheckbox rules={[yupSync]} name={['controllerconfig', 'injection_pump']}>
          {intl.formatMessage({
            id: 'component.edit.pivot.pressure.active.label',
          })}
        </ProFormCheckbox>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotPumpComponent;
