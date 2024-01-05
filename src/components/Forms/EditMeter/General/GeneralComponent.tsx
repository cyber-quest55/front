import RadioInputContainer from '@/components/RadioInput/RadioInputContainer';
import {
  getEditMeterDeviceIManageTable,
  patchChangeIManageManualRadio,
  patchChangeIManageRadio,
  patchMeter,
  patchMeterSystem,
  postMeterSystemConfig,
} from '@/services/metersystem';

import { yupValidator } from '@/utils/adapters/yup';
import { getDefaultMeterContentConfig } from '@/utils/data/default-meter-content-config';
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
  ProFormSelect,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Row, Typography } from 'antd';
import moment from 'moment';
import * as React from 'react';
import * as yup from 'yup';

const EditMeterGeneralComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();
  const ref = React.useRef();
  const params = useParams();
  const postMeterSystemConfigReq = useRequest(postMeterSystemConfig, { manual: true });
  const patchIMeterReq = useRequest(patchMeter, { manual: true });
  const patchMeterSystemReq = useRequest(patchMeterSystem, { manual: true });
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
    imeter_set: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .max(
            20,
            intl.formatMessage(
              {
                id: 'validations.max',
              },
              { value: 20 },
            ),
          )
          .required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        sensor_process_controller_pair: yup.object({
          id: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),
        latest_config: yup.object().shape({
          flow_curve_equation: yup.array().of(
            yup.number().required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            ),
          ),
        }),
      }),
    ),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);
  const { meter } = props;

  const setControlRadioId = (value: string) => {
    form.setFieldValue(['imanage_radio_id'], value);
  };

  

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {intl.formatMessage({
            id: 'component.edit.meter.general.title',
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

                const deviceClock = moment(values.deviceClock);

                const newConfig = {
                  content: {
                    ...defaultContentConfig,
                    clock: {
                      second: values.deviceHour ? deviceClock.second() : moment().second(),
                      minute: values.deviceHour ? deviceClock.minute() : moment().minute(),
                      hour: values.deviceHour ? deviceClock.hour() : moment().hour(),
                      day: values.deviceHour ? deviceClock.date() : moment().date(),
                      month: values.deviceHour ? deviceClock.month() + 1 : moment().month() + 1,
                      year: values.deviceHour ? deviceClock.year() - 2000 : moment().year() - 2000,
                    },
                  },
                  graphic_max_value: latestConfig?.graphic_max_value,
                  sensor_offset: latestConfig?.sensor_offset,
                  measure_scale: latestConfig.measure_scale,
                  measure_unit: latestConfig.measure_unit,
                  min_limit: latestConfig?.min_limit,
                  max_limit: latestConfig?.max_limit,
                  position_imeter: latestConfig.position_imeter,
                  metersystem_name: values.name,
                  imeter_name: values.imeter_set[0].name,
                  flow_curve_equation: Object.values(
                    values.imeter_set[0].latest_config.flow_curve_equation,
                  ) as any,
                  sensor_process_controller_pair:
                    values.imeter_set[0].sensor_process_controller_pair.id,
                };

                const iMeterPatchData = {
                  name: values.imeter_set[0].name,
                  position: latestConfig.position_imeter,
                  sensor_process_controller_pair:
                    values.imeter_set[0].sensor_process_controller_pair.id,
                };

                const meterSystemPatchData = {
                  name: values.name,
                };

                await postMeterSystemConfigReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    meterSystemId: params.meterSystemId as any,
                    meterId: params.meterId as any,
                  },
                  newConfig,
                );

                await patchIMeterReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    meterSystemId: params.meterSystemId as any,
                    meterId: params.meterId as any,
                  },
                  iMeterPatchData,
                );

                await patchMeterSystemReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    meterSystemId: params.meterSystemId as any,
                  },
                  meterSystemPatchData,
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
              pform.setFieldValue('deviceHour', false);
              pform.setFieldValue('deviceClock', moment());
              pform.setFieldValue('imanage_radio_id', meter.imeter_set[0].imeter_device.radio_id);
            }}
            initialValues={{ ...meter }}
          >
            <Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
              <RadioInputContainer
                name={['imeter_set', '0', 'base', 'radio_id']}
                operable={false}
                setFieldValue={form.setFieldValue}
                label={intl.formatMessage({
                  id: 'component.edit.meter.general.centralradio.label',
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
                name="imanage_radio_id"
                operable
                setFieldValue={setControlRadioId}
                label={intl.formatMessage({
                  id: 'component.edit.meter.general.imanageradio.label',
                })}
                deviceId={meter.imeter_set[0].imeter_device.id}
                status={'processing'}
                span={{ xs: 24, md: 8 }}
                deviceType="Medidor"
                device="imanage"
                form={form}
                request={getEditMeterDeviceIManageTable}
                requestChange={patchChangeIManageManualRadio}
                requestSwapChange={patchChangeIManageRadio}
                requestDeviceId={'meterSystemId'}
                fieldIndex={'imeter_device'}
                requestAfterChange={props.queryMeterSystemById}
              />
            </Row>
            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.meter.general.generalconfig.title',
              })}
            >
              <ProFormField
                rules={[yupSync]}
                name="name"
                label={intl.formatMessage({
                  id: 'component.edit.meter.general.generalconfig.systemname.label',
                })}
                colProps={{ xs: 24, md: 8, xl: 8 }}
              />
              <ProFormField
                rules={[yupSync]}
                name={['imeter_set', '0', 'name']}
                label={intl.formatMessage({
                  id: 'component.edit.meter.general.generalconfig.metername.label',
                })}
                colProps={{ xs: 24, md: 8, xl: 8 }}
              />
              <ProFormSelect
                rules={[yupSync]}
                name={['imeter_set', '0', 'sensor_process_controller_pair', 'id']}
                label={intl.formatMessage({
                  id: 'component.edit.meter.general.generalconfig.sensor.label',
                })}
                colProps={{ xs: 24, md: 8, xl: 8 }}
                options={props.sensorOptions}
              />
            </ProFormGroup>

            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.meter.general.residualflow.title',
              })}
              tooltip={intl.formatMessage({
                id: 'component.edit.meter.general.residualflow.tooltip',
              })}
            >
              <ProFormDigit
                rules={[yupSync]}
                name={['imeter_set', '0', 'latest_config', 'flow_curve_equation', '0']}
                label={intl.formatMessage({
                  id: 'component.edit.meter.general.residualflow.a.label',
                })}
                colProps={{ xs: 24, md: 8 }}
                min={0}
                max={100}
                fieldProps={{
                  addonAfter: 'x²',
                  controls: false,
                  type: 'number',
                }}
              />

              <ProFormDigit
                rules={[yupSync]}
                name={['imeter_set', '0', 'latest_config', 'flow_curve_equation', '1']}
                label={intl.formatMessage({
                  id: 'component.edit.meter.general.residualflow.b.label',
                })}
                colProps={{ xs: 24, md: 8 }}
                fieldProps={{
                  addonAfter: 'x',
                  controls: false,
                  type: 'number',
                }}
              />

              <ProFormDigit
                rules={[yupSync]}
                name={['imeter_set', '0', 'latest_config', 'flow_curve_equation', '2']}
                label={intl.formatMessage({
                  id: 'component.edit.meter.general.residualflow.c.label',
                })}
                colProps={{ xs: 24, md: 8 }}
                fieldProps={{
                  controls: false,
                  type: 'number',
                }}
              />
            </ProFormGroup>

            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.meter.general.equipmentclock.title',
              })}
            >
              <ProFormCheckbox name={'deviceHour'} colProps={{ xs: 24, md: 8 }}>
                {intl.formatMessage({
                  id: 'component.edit.meter.general.equipmentclock.setclockmanually.label',
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
                        id: 'component.edit.meter.general.equipmentclock.input.label',
                      })}
                      disabled={!deviceHour}
                    />
                  );
                }}
              </ProFormDependency>
            </ProFormGroup>
          </ProForm>
        </>
      ) : null}
    </ProCard>
  );
};

export default EditMeterGeneralComponent;
