import RadioInputContainer from '@/components/RadioInput/RadioInputContainer';
import {
  getEditIrpdDeviceTable,
  patchChangeIrpdRadio,
  patchIrpd,
  postIrpdConfig,
  postChangeIrpdManualRadio,
} from '@/services/irpd';

import { yupValidator } from '@/utils/adapters/yup';
import { getDefaultIrpdContentConfig } from '@/utils/data/default-irpd-content-config';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormField,
  ProFormGroup,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Row, Typography } from 'antd';
import moment from 'moment';
import * as React from 'react';
import * as yup from 'yup';

const EditIrpdGeneralComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();
  const ref = React.useRef();
  const params = useParams();
  const { irpd } = props;
  const patchIrpdConfigReq = useRequest(postIrpdConfig, { manual: true });
  const patchIrpdReq = useRequest(patchIrpd, { manual: true });
  const [loading, setLoading] = React.useState(false);

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
    deviceHour: yup.boolean(),
    deviceClock: yup.string().nullable(),
    enableMonthlyWaterLimit: yup.boolean(),
    enableSensorScale: yup.boolean(),
    flow: yup
      .number()
      .min(1, intl.formatMessage({ id: 'validations.min.number' }, { value: 1 }))
      .max(1000, intl.formatMessage({ id: 'validations.max.number' }, { value: 1000 }))
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    latest_irpd_config_v5: yup.object().shape({
      potency: yup
        .number()
        .min(1, intl.formatMessage({ id: 'validations.min.number' }, { value: 1 }))
        .max(22000, intl.formatMessage({ id: 'validations.max.number' }, { value: 22000 }))
        .required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      monthly_water_limit: yup
        .number()
        .min(0, intl.formatMessage({ id: 'validations.min.number' }, { value: 0 }))
        .max(100000, intl.formatMessage({ id: 'validations.max.number' }, { value: 100000 }))
        .required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      content: yup.object().shape({
        imanage_sensors: yup.array().of(
          yup.object().shape({
            max_value: yup
              .number()
              .min(-100, intl.formatMessage({ id: 'validations.min.number' }, { value: -100 }))
              .max(100, intl.formatMessage({ id: 'validations.max.number' }, { value: 100 }))
              .required(
                intl.formatMessage({
                  id: 'validations.required',
                }),
              ),
          }),
        ),
        pump_power_time: yup.object().shape({
          minutes: yup
            .number()
            .min(0, intl.formatMessage({ id: 'validations.min.number' }, { value: 0 }))
            .max(300, intl.formatMessage({ id: 'validations.max.number' }, { value: 300 }))
            .required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            ),
        }),
      }),
    }),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  const setPumpRadioId = (value: string) => {
    form.setFieldValue('pump', value);
  };

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {intl.formatMessage({
            id: 'component.edit.irpd.general.title',
          })}
        </Typography.Title>
      }
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          {intl.formatMessage({
            id: 'component.edit.irpd.button.save',
          })}
        </Button>
      }
      ghost
      gutter={[12, 12]}
    >
      {irpd ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <Typography.Text>
              {intl.formatMessage({
                id: 'component.edit.irpd.lastconfig',
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
                const defaultContentConfig = getDefaultIrpdContentConfig(irpd);
                const deviceClock = moment(values.deviceClock);

                const newConfig = {
                  content: {
                    ...defaultContentConfig,
                    imanage_sensors: [
                      {
                        ...defaultContentConfig.imanage_sensors[0],
                        max_value: parseInt(
                          String(
                            values.latest_irpd_config_v5.content.imanage_sensors[0].max_value * 10,
                          ),
                        ),
                      },
                    ],
                    clock: {
                      second: values.deviceHour ? deviceClock.second() : moment().second(),
                      minute: values.deviceHour ? deviceClock.minute() : moment().minute(),
                      hour: values.deviceHour ? deviceClock.hour() : moment().hour(),
                      day: values.deviceHour ? deviceClock.date() : moment().date(),
                      month: values.deviceHour ? deviceClock.month() + 1 : moment().month() + 1,
                      year: values.deviceHour ? deviceClock.year() - 2000 : moment().year() - 2000,
                    },
                    pump_power_time: {
                      minutes: values.latest_irpd_config_v5.content.pump_power_time.minutes
                    }
                  },
                  monthly_water_limit: !values.enableMonthlyWaterLimit
                    ? 0
                    : parseInt(values.latest_irpd_config_v5.monthly_water_limit),
                  has_pressure_sensor: values.latest_irpd_config_v5.has_pressure_sensor,
                  name_irpd_on_config: values.name,
                  flow: parseFloat(values.flow),
                  position: irpd.position,
                  potency: values.latest_irpd_config_v5.potency,
                  kwh_peak: irpd.latest_irpd_config_v5?.kwh_peak,
                  kwh_out_of_peak: irpd.latest_irpd_config_v5?.kwh_out_of_peak,
                  kwh_reduced: irpd.latest_irpd_config_v5?.kwh_reduced,
                };

                const irpdPatchData = {
                  name: values.name,
                  potency: values.latest_irpd_config_v5.potency,
                  position: irpd.position,
                  flow: parseFloat(values.flow),
                };

                await patchIrpdConfigReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    irpdId: params.irpdId as any,
                  },
                  newConfig,
                );

                await patchIrpdReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    irpdId: params.irpdId as any,
                  },
                  irpdPatchData,
                );

                await props.queryIrpdById({
                  farmId: params.farmId as any,
                  irpdId: params.irpdId as any,
                });

                message.success('Configs Atualizadas com Sucesso');
              } catch (err) {
                console.error(err);
                message.error('Fail');
              }

              setLoading(false);
            }}
            onInit={(pvalues, pform) => {
              pform.setFieldValue('deviceHour', false);
              pform.setFieldValue('deviceClock', moment());
              pform.setFieldValue(
                'enableMonthlyWaterLimit',
                irpd.latest_irpd_config_v5?.monthly_water_limit !== 0,
              );
              pform.setFieldValue(
                'enableSensorScale',
                irpd.latest_irpd_config_v5?.content?.imanage_sensors[0]?.max_value / 10 !== 0,
              );
              pform.setFieldValue(
                ['latest_irpd_config_v5', 'content', 'imanage_sensors', '0', 'max_value'],
                irpd.latest_irpd_config_v5?.content?.imanage_sensors[0]?.max_value / 10,
              );
              pform.setFieldValue('flow', irpd.latest_irpd_config_v5?.flow ? irpd.flow : 1);
              pform.setFieldValue('pump', irpd.pump);
            }}
            initialValues={{
              ...irpd,
            }}
          >
            <Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
              <RadioInputContainer
                name={'base'}
                operable={false}
                setFieldValue={form.setFieldValue}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.general.centralradio.label',
                })}
                status={'processing'}
                span={{
                  xs: 24,
                  md: 8,
                }}
                deviceType=""
                device=""
              />
              <RadioInputContainer
                name="pump"
                operable
                setFieldValue={setPumpRadioId}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.general.pumpradio.label',
                })}
                deviceId={irpd.latest_irpd_config_v5.device}
                status={'processing'}
                span={{ xs: 24, md: 8 }}
                deviceType="pump"
                device="pump"
                form={form}
                request={getEditIrpdDeviceTable}
                requestChange={postChangeIrpdManualRadio}
                requestSwapChange={patchChangeIrpdRadio}
                requestDeviceId={'irpdId'}
                fieldIndex={'pump'}
                requestAfterChange={props.queryIrpdById}
              />
            </Row>
            <ProFormGroup>
              <ProFormField
                rules={[yupSync]}
                name="name"
                label={intl.formatMessage({
                  id: 'component.edit.irpd.general.pumpname.label',
                })}
                colProps={{ xs: 24, md: 8, xl: 8 }}
              />
              <ProFormDigit
                rules={[yupSync]}
                name={['latest_irpd_config_v5', 'potency']}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.general.pumppower.label',
                })}
                colProps={{ xs: 24, md: 8 }}
                min={1}
                max={22000}
                fieldProps={{
                  addonAfter: 'kW',
                  controls: false,
                  type: 'number',
                }}
              />
            </ProFormGroup>
            <ProFormGroup>
              <ProFormDigit
                rules={[yupSync]}
                name={['latest_irpd_config_v5', 'content', 'pump_power_time', 'minutes']}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.general.powertime.label',
                })}
                tooltip={intl.formatMessage({
                  id: 'component.edit.irpd.general.powertime.tooltip',
                })}
                colProps={{ xs: 24, md: 8 }}
                min={0}
                max={300}
                fieldProps={{
                  addonAfter: 'min',
                  controls: false,
                  type: 'number',
                }}
              />
              <ProFormDigit
                rules={[yupSync]}
                name="flow"
                label={intl.formatMessage({
                  id: 'component.edit.irpd.general.flowrate.label',
                })}
                colProps={{ xs: 24, md: 8 }}
                min={1}
                max={1000}
                fieldProps={{
                  addonAfter: 'm³/h',
                  controls: false,
                  type: 'number',
                }}
              />
            </ProFormGroup>
            <ProFormGroup>
              <ProFormCheckbox name={'deviceHour'} colProps={{ xs: 24, md: 8 }}>
                {intl.formatMessage({
                  id: 'component.edit.irpd.general.equipmentdate.label',
                })}
              </ProFormCheckbox>

              <ProFormDependency name={['deviceHour']}>
                {({ deviceHour }) => {
                  return (
                    <ProFormDateTimePicker
                      rules={[yupSync]}
                      name={'deviceClock'}
                      colProps={{ xs: 24, md: 8 }}
                      label={intl.formatMessage({
                        id: 'component.edit.irpd.general.equipmentclock.label',
                      })}
                      disabled={!deviceHour}
                    />
                  );
                }}
              </ProFormDependency>
            </ProFormGroup>
            <ProFormGroup>
              <ProFormCheckbox name={'enableMonthlyWaterLimit'} colProps={{ xs: 3, md: 1 }} />

              <ProFormDependency name={['enableMonthlyWaterLimit']}>
                {({ enableMonthlyWaterLimit }, form) => {
                  if (enableMonthlyWaterLimit !== undefined && !enableMonthlyWaterLimit) {
                    form.setFieldValue(['latest_irpd_config_v5', 'monthly_water_limit'], 0);
                  }
                  return (
                    <ProFormDigit
                      rules={[yupSync]}
                      name={['latest_irpd_config_v5', 'monthly_water_limit']}
                      label={intl.formatMessage({
                        id: 'component.edit.irpd.general.monthlywaterconsumptionlimit.label',
                      })}
                      colProps={{ xs: 21, md: 7 }}
                      min={0}
                      max={100000}
                      fieldProps={{
                        addonAfter: 'm³',
                        controls: false,
                        type: 'number',
                      }}
                      disabled={!enableMonthlyWaterLimit}
                    />
                  );
                }}
              </ProFormDependency>
            </ProFormGroup>
            <ProFormGroup>
              <ProFormCheckbox
                name={'enableSensorScale'}
                colProps={{ xs: 3, md: 1 }}
              />
              <ProFormDependency name={['enableSensorScale']}>
                {({ enableSensorScale }, form) => {
                  if (enableSensorScale !== undefined && !enableSensorScale) {
                    // Set the value to 0 when enableSensorScale is false
                    form.setFieldValue(
                      ['latest_irpd_config_v5', 'content', 'imanage_sensors', '0', 'max_value'],
                      0,
                    );
                  }
                  return (
                    <ProFormDigit
                      rules={[yupSync]}
                      name={[
                        'latest_irpd_config_v5',
                        'content',
                        'imanage_sensors',
                        '0',
                        'max_value',
                      ]}
                      label={intl.formatMessage({
                        id: 'component.edit.irpd.general.sensorscale.label',
                      })}
                      colProps={{ xs: 21, md: 7 }}
                      min={-100}
                      max={100}
                      fieldProps={{
                        addonAfter: 'bar',
                        controls: false,
                        type: 'number',
                      }}
                      disabled={!enableSensorScale}
                    />
                  );
                }}
              </ProFormDependency>
            </ProFormGroup>
            <ProFormGroup>
              <ProFormCheckbox
                name={['latest_irpd_config_v5', 'has_pressure_sensor']}
                colProps={{ xs: 24, md: 8 }}
              >
                {intl.formatMessage({
                  id: 'component.edit.irpd.general.pressuresensor.label',
                })}
              </ProFormCheckbox>
            </ProFormGroup>
           
          </ProForm>
        </>
      ) : null}
    </ProCard>
  );
};

export default EditIrpdGeneralComponent;
