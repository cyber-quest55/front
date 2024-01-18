import { postMeterSystemConfig } from '@/services/metersystem';

import { yupValidator } from '@/utils/adapters/yup';
import { getDefaultMeterContentConfig } from '@/utils/data/default-meter-content-config';
import { SaveOutlined } from '@ant-design/icons';
import { ProCard, ProForm, ProFormDigit, ProFormGroup } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Row, Typography } from 'antd';
import * as React from 'react';
import * as yup from 'yup';

const EditMeterLevelComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();
  const ref = React.useRef();
  const params = useParams();
  const postMeterSystemConfigReq = useRequest(postMeterSystemConfig, { manual: true });

  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    imeter_set: yup.array().of(
      yup.object().shape({
        latest_config: yup.object().shape({
          graphic_max_value: yup
            .number()
            .min(1, intl.formatMessage({ id: 'validations.min.number' }, { value: 1 }))
            .required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            ),
          sensor_offset: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
          min_limit: yup
            .number()
            .min(0, intl.formatMessage({ id: 'validations.min.number' }, { value: 0 }))
            .max(100, intl.formatMessage({ id: 'validations.max.number' }, { value: 100 }))
            .required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            ),
          max_limit: yup
            .number()
            .min(0, intl.formatMessage({ id: 'validations.min.number' }, { value: 0 }))
            .max(100, intl.formatMessage({ id: 'validations.max.number' }, { value: 100 }))
            .required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            ),
        }),
      }),
    ),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);
  const { meter } = props;

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {intl.formatMessage({
            id: 'component.edit.meter.level.title',
          })}
        </Typography.Title>
      }
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          {intl.formatMessage({
            id: 'component.edit.meter.button.save',
          })}
        </Button>
      }
      ghost
      gutter={[12, 12]}
    >
      {meter ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <Typography.Text>
              {intl.formatMessage({
                id: 'component.edit.meter.lastconfig',
              })}
              : 19 Out 2023 09:55- Internet
            </Typography.Text>
          </div>
          <ProForm
            validateTrigger="onBlur"
            layout="vertical"
            rowProps={{ gutter: [8, 8] }}
            grid
            submitter={false}
            form={form}
            formRef={ref}
            name="general_form"
            onFinish={async (values: any) => {
              setLoading(true);

              try {
                const latestConfig = meter.imeter_set[0].latest_config;
                const defaultContentConfig = getDefaultMeterContentConfig(latestConfig);

                const newConfig = {
                  content: { ...defaultContentConfig },
                  graphic_max_value: parseFloat(
                    values.imeter_set[0].latest_config.graphic_max_value.toString(),
                  ),
                  sensor_offset: values.imeter_set[0].latest_config.sensor_offset * 100,
                  measure_scale: latestConfig.measure_scale,
                  measure_unit: latestConfig.measure_unit,
                  min_limit: values.imeter_set[0].latest_config.min_limit,
                  max_limit: values.imeter_set[0].latest_config.max_limit,
                  position_imeter: latestConfig.position_imeter,
                  metersystem_name: meter.name,
                  imeter_name: meter.imeter_set[0].name,
                  flow_curve_equation: latestConfig.flow_curve_equation,
                  sensor_process_controller_pair:
                    meter.imeter_set[0].sensor_process_controller_pair.id,
                };

                await postMeterSystemConfigReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    meterSystemId: params.meterSystemId as any,
                    meterId: params.meterId as any,
                  },
                  newConfig,
                );

                await props.queryMeterSystemById({
                  farmId: params.farmId as any,
                  meterId: params.meterSystemId as any,
                });

                message.success('Configs Atualizadas com Sucesso');
              } catch (err) {
                console.error(err);
                message.error('Fail');
              }

              setLoading(false);
            }}
            onInit={(pvalues, pform) => {
              pform.setFieldValue(
                ['imeter_set', '0', 'latest_config', 'sensor_offset'],
                meter.imeter_set[0].latest_config.sensor_offset / 100,
              );
            }}
            initialValues={{ ...meter }}
          >
            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.meter.level.sensorinformation.title',
              })}
            >
              <ProFormDigit
                tooltip={intl.formatMessage({
                  id: 'component.edit.meter.level.sensorinformation.graphicscale.tooltip',
                })}
                rules={[yupSync]}
                name={['imeter_set', '0', 'latest_config', 'graphic_max_value']}
                label={intl.formatMessage({
                  id: 'component.edit.meter.level.sensorinformation.graphicscale.label',
                })}
                min={1}
                colProps={{ xs: 24, md: 8 }}
                fieldProps={{
                  addonAfter: 'm',
                  controls: false,
                  type: 'number',
                }}
              />
              <ProFormDigit
                tooltip={intl.formatMessage({
                  id: 'component.edit.meter.level.sensorinformation.measurementoffset.tooltip',
                })}
                rules={[yupSync]}
                name={['imeter_set', '0', 'latest_config', 'sensor_offset']}
                label={intl.formatMessage({
                  id: 'component.edit.meter.level.sensorinformation.measurementoffset.label',
                })}
                max={9999.99999999}
                min={-9999.99999999}
                colProps={{ xs: 24, md: 8 }}
                fieldProps={{
                  addonAfter: 'm',
                  controls: false,
                  type: 'number',
                }}
              />
            </ProFormGroup>

            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.meter.level.chartconfiguration.title',
              })}
            >
              <div style={{ marginBottom: 20 }}>
                <Typography.Text>
                  {intl.formatMessage({
                    id: 'component.edit.meter.level.chartconfiguration.description',
                  })}
                </Typography.Text>
              </div>
              <Row style={{ width: '100%', marginBottom: 12 }} gutter={[8, 8]}>
                <ProFormDigit
                  rules={[yupSync]}
                  name={['imeter_set', '0', 'latest_config', 'min_limit']}
                  label={intl.formatMessage({
                    id: 'component.edit.meter.level.chartconfiguration.min.label',
                  })}
                  colProps={{ xs: 24, md: 8 }}
                  min={0}
                  max={100}
                  fieldProps={{
                    addonAfter: '%',
                    controls: false,
                    type: 'number',
                  }}
                />
                <ProFormDigit
                  rules={[yupSync]}
                  name={['imeter_set', '0', 'latest_config', 'max_limit']}
                  label={intl.formatMessage({
                    id: 'component.edit.meter.level.chartconfiguration.max.label',
                  })}
                  min={0}
                  max={100}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    addonAfter: '%',
                    controls: false,
                    type: 'number',
                  }}
                />
              </Row>
            </ProFormGroup>
          </ProForm>
        </>
      ) : null}
    </ProCard>
  );
};

export default EditMeterLevelComponent;
