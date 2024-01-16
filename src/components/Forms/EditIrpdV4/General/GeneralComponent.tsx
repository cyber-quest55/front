import RadioInputContainer from '@/components/RadioInput/RadioInputContainer';
import {
  getEditIrpdDeviceTable,
  patchChangeIrpdRadio,
  patchIrpd,
  postChangeIrpdManualRadio,
  postIrpdConfigV4,
} from '@/services/irpd';

import { yupValidator } from '@/utils/adapters/yup';
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
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Row, Typography } from 'antd';
import moment from 'moment';
import * as React from 'react';
import * as yup from 'yup';

const TIME_FORMAT = 'HH:mm';

const EditIrpdV4GeneralComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();
  const ref = React.useRef();
  const params = useParams();
  const { irpd } = props;
  const postIrpdConfigV4Req = useRequest(postIrpdConfigV4, { manual: true });
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
    flow: yup
      .number()
      .min(1, intl.formatMessage({ id: 'validations.min.number' }, { value: 1 }))
      .max(1000, intl.formatMessage({ id: 'validations.max.number' }, { value: 1000 }))
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    potency: yup
      .number()
      .min(1, intl.formatMessage({ id: 'validations.min.number' }, { value: 1 }))
      .max(22000, intl.formatMessage({ id: 'validations.max.number' }, { value: 22000 }))
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    latest_irpd_config: yup.object().shape({
      hour_range_min: yup.string(),
      hour_range_max: yup.string(),
      energy_time: yup
        .number()
        .min(0, intl.formatMessage({ id: 'validations.min.number' }, { value: 0 }))
        .max(300, intl.formatMessage({ id: 'validations.max.number' }, { value: 300 }))
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
                const newConfig = {
                  monthly_water_limit: !values.enableMonthlyWaterLimit
                    ? 0
                    : parseInt(values.latest_irpd_config.monthly_water_limit),
                  hour_range_max: `${values.latest_irpd_config.hour_range_max}:00`,
                  hour_range_min: `${values.latest_irpd_config.hour_range_min}:00`,
                  rtc: moment(values.deviceClock).toISOString(),
                  energy_time: parseInt(values.latest_irpd_config.energy_time),
                };

                const irpdPatchData = {
                  name: values.name,
                  potency: values.potency,
                  position: irpd.position,
                  flow: parseFloat(values.flow),
                };

                await postIrpdConfigV4Req.runAsync(
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
                ['latest_irpd_config', 'hour_range_max'],
                irpd.latest_irpd_config.hour_range_max
                  ? moment(irpd.latest_irpd_config.hour_range_max, 'H:mm')
                  : moment(),
              );
              pform.setFieldValue(
                ['latest_irpd_config', 'hour_range_min'],
                irpd.latest_irpd_config.hour_range_min
                  ? moment(irpd.latest_irpd_config.hour_range_min, 'H:mm')
                  : moment(),
              );

              pform.setFieldValue(
                'enableMonthlyWaterLimit',
                irpd.latest_irpd_config?.monthly_water_limit !== 0,
              );
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
                deviceId={irpd.latest_irpd_config.device}
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
                name={'potency'}
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
                name={['latest_irpd_config', 'energy_time']}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.general.powertime.label',
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
              <>
                <ProFormTimePicker
                  rules={[yupSync]}
                  name={['latest_irpd_config', 'hour_range_min']}
                  dataFormat={TIME_FORMAT}
                  label={intl.formatMessage({
                    id: 'component.edit.irpd.pausetime.peak_time_start.label',
                  })}
                  fieldProps={{ format: TIME_FORMAT }}
                  colProps={{ xs: 24, md: 8 }}
                />
                <ProFormTimePicker
                  rules={[yupSync]}
                  name={['latest_irpd_config', 'hour_range_max']}
                  dataFormat={TIME_FORMAT}
                  label={intl.formatMessage({
                    id: 'component.edit.irpd.pausetime.peak_time_end.label',
                  })}
                  fieldProps={{ format: TIME_FORMAT }}
                  colProps={{ xs: 24, md: 8 }}
                />
              </>
            </ProFormGroup>

            <ProFormGroup>
              <ProFormCheckbox name={'enableMonthlyWaterLimit'} colProps={{ xs: 24, md: 8 }} />

              <ProFormDependency name={['enableMonthlyWaterLimit']}>
                {({ enableMonthlyWaterLimit }, form) => {
                  if (enableMonthlyWaterLimit !== undefined && !enableMonthlyWaterLimit) {
                    form.setFieldValue(['latest_irpd_config', 'monthly_water_limit'], 0);
                  }
                  return (
                    <ProFormDigit
                      rules={[yupSync]}
                      name={['latest_irpd_config', 'monthly_water_limit']}
                      label={intl.formatMessage({
                        id: 'component.edit.irpd.general.monthlywaterconsumptionlimit.label',
                      })}
                      colProps={{ xs: 24, md: 8 }}
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
          </ProForm>
        </>
      ) : null}
    </ProCard>
  );
};

export default EditIrpdV4GeneralComponent;
