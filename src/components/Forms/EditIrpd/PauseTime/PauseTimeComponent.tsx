import { postIrpdConfig } from '@/services/irpd';

import { yupValidator } from '@/utils/adapters/yup';
import { getDefaultIrpdContentConfig } from '@/utils/data/default-irpd-content-config';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import * as yup from 'yup';

const TIME_FORMAT = 'HH:mm';

const EditIrpdPauseTimeComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();
  const ref = React.useRef();
  const params = useParams();
  const { irpd } = props;
  const patchIrpdConfigReq = useRequest(postIrpdConfig, { manual: true });
  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    firstBeginPickTime: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    firstEndPickTime: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    secondBeginPickTime: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    secondEndPickTime: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    firstBeginPickHour: yup.string(),
    secondBeginPickHour: yup.string(),
    latest_irpd_config_v5: yup.object().shape({
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
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {intl.formatMessage({
            id: 'component.edit.irpd.pausetime.title',
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

                const valuesPeakTime = values.latest_irpd_config_v5.content.peak_time;
                const [firstBeginPickHour, firstBeginPickMinutes] =
                  values.firstBeginPickTime.split(':');
                const [firstEndPickHour, firstEndPickMinutes] = values.firstEndPickTime.split(':');
                const [seconfBeginPickHour, seconfBeginPickMinutes] =
                  values.secondBeginPickTime.split(':');
                const [secondEndPickHour, secondEndPickMinutes] =
                  values.secondEndPickTime.split(':');
                const newConfig = {
                  content: {
                    ...defaultContentConfig,
                    enable_peak_time: { enable: values.enableFirstPickTime ? 1 : 0 },
                    peak_time: {
                      start_hour_1: values.enableFirstPickTime ? parseInt(firstBeginPickHour) : 0,
                      start_minute_1: values.enableFirstPickTime
                        ? parseInt(firstBeginPickMinutes)
                        : 0,
                      stop_hour_1: values.enableFirstPickTime ? parseInt(firstEndPickHour) : 0,
                      stop_minute_1: values.enableFirstPickTime ? parseInt(firstEndPickMinutes) : 0,
                      start_hour_2:
                        values.enableFirstPickTime && values.enableSecondPickTime
                          ? parseInt(seconfBeginPickHour)
                          : 0,
                      start_minute_2:
                        values.enableFirstPickTime && values.enableSecondPickTime
                          ? parseInt(seconfBeginPickMinutes)
                          : 0,
                      stop_hour_2:
                        values.enableFirstPickTime && values.enableSecondPickTime
                          ? parseInt(secondEndPickHour)
                          : 0,
                      stop_minute_2:
                        values.enableFirstPickTime && values.enableSecondPickTime
                          ? parseInt(secondEndPickMinutes)
                          : 0,
                      friday_enable: values.enableFirstPickTime ? valuesPeakTime.friday_enable : 0,
                      monday_enable: values.enableFirstPickTime ? valuesPeakTime.monday_enable : 0,
                      sunday_enable: values.enableFirstPickTime ? valuesPeakTime.sunday_enable : 0,
                      tuesday_enable: values.enableFirstPickTime
                        ? valuesPeakTime.tuesday_enable
                        : 0,
                      saturday_enable: values.enableFirstPickTime
                        ? valuesPeakTime.saturday_enable
                        : 0,
                      thursday_enable: values.enableFirstPickTime
                        ? valuesPeakTime.thursday_enable
                        : 0,
                      wednesday_enable: values.enableFirstPickTime
                        ? valuesPeakTime.wednesday_enable
                        : 0,
                    },
                  },
                  monthly_water_limit: irpd.latest_irpd_config_v5.monthly_water_limit,
                  has_pressure_sensor: irpd.latest_irpd_config_v5.has_pressure_sensor,
                  name_irpd_on_config: irpd.name,
                  flow: irpd.flow,
                  position: irpd.position,
                  potency: irpd.latest_irpd_config_v5.potency,
                  kwh_peak: parseFloat(values.latest_irpd_config_v5?.kwh_peak),
                  kwh_out_of_peak: parseFloat(values.latest_irpd_config_v5?.kwh_out_of_peak),
                  kwh_reduced: parseFloat(values.latest_irpd_config_v5?.kwh_reduced),
                };

                await patchIrpdConfigReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    irpdId: params.irpdId as any,
                  },
                  newConfig,
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
            onInit={() => {
              const minut1 = irpd.latest_irpd_config_v5.content.peak_time.start_hour_1;
              const minut2 = irpd.latest_irpd_config_v5.content.peak_time.start_minute_1;
              const minut3 = irpd.latest_irpd_config_v5.content.peak_time.stop_hour_1;
              const minut4 = irpd.latest_irpd_config_v5.content.peak_time.stop_minute_1;
              const minut5 = irpd.latest_irpd_config_v5.content.peak_time.start_hour_2;
              const minut6 = irpd.latest_irpd_config_v5.content.peak_time.start_minute_2;
              const minut7 = irpd.latest_irpd_config_v5.content.peak_time.stop_hour_2;
              const minut8 = irpd.latest_irpd_config_v5.content.peak_time.stop_minute_2;
              const enablePeakTime = irpd.latest_irpd_config_v5.content?.enable_peak_time?.enable;
              const pauseTimeStatus1 = !(
                (minut1 === 0 && minut2 === 0 && minut3 === 0 && minut4 === 0) ||
                enablePeakTime === false
              );
              const pauseTimeStatus2 = !(
                (minut5 === 0 && minut6 === 0 && minut7 === 0 && minut8 === 0) ||
                pauseTimeStatus1 === false
              );

              const startDate1 = dayjs().hour(minut1).minute(minut2);
              const endDate1 = dayjs().hour(minut3).minute(minut4);

              const startDate2 = dayjs().hour(minut5).minute(minut6);
              const endDate2 = dayjs().hour(minut7).minute(minut8);

              form.setFieldValue('firstBeginPickTime', startDate1);
              form.setFieldValue('firstEndPickTime', endDate1);

              form.setFieldValue('secondBeginPickTime', startDate2);
              form.setFieldValue('secondEndPickTime', endDate2);

              form.setFieldValue('enableFirstPickTime', pauseTimeStatus1);
              form.setFieldValue('enableSecondPickTime', pauseTimeStatus2);
            }}
            initialValues={{
              ...irpd,
            }}
          >
            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.irpd.pausetime.description.title',
              })}
            >
              <div style={{ marginBottom: 20 }}>
                <Typography.Text>
                  {intl.formatMessage({
                    id: 'component.edit.irpd.pausetime.description.text',
                  })}
                </Typography.Text>
              </div>
            </ProFormGroup>
            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.irpd.pausetime.prices.title',
              })}
            >
              <ProFormDigit
                rules={[yupSync]}
                name={['latest_irpd_config_v5', 'kwh_peak']}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.pausetime.kwh_peak.label',
                })}
                colProps={{ xs: 24, md: 8 }}
                min={0}
                max={99.99}
                fieldProps={{
                  addonBefore: '$',
                  controls: false,
                  type: 'number',
                  precision: 2
                }}
              />
              <ProFormDigit
                rules={[yupSync]}
                name={['latest_irpd_config_v5', 'kwh_out_of_peak']}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.pausetime.kwh_out_of_peak.label',
                })}
                colProps={{ xs: 24, md: 8 }}
                min={0}
                max={99.99}
                fieldProps={{
                  addonBefore: '$',
                  controls: false,
                  type: 'number',
                  precision: 2
                }}
              />
              <ProFormDigit
                rules={[yupSync]}
                name={['latest_irpd_config_v5', 'kwh_reduced']}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.pausetime.kwh_reduced.label',
                })}
                colProps={{ xs: 24, md: 8 }}
                min={0}
                max={99.99}
                fieldProps={{
                  addonBefore: '$',
                  controls: false,
                  type: 'number',
                  precision: 2,
                }}
              />
            </ProFormGroup>
            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.irpd.pausetime.daysofweek.title',
              })}
            >
              <ProFormDependency name={['enableFirstPickTime']}>
                {({ enableFirstPickTime }) => {
                  return (
                    <>
                      <ProFormCheckbox
                        name={['latest_irpd_config_v5', 'content', 'peak_time', 'monday_enable']}
                        colProps={{ xs: 6, md: 3 }}
                        disabled={!enableFirstPickTime}
                      >
                        {intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.monday_enable.label',
                        })}
                      </ProFormCheckbox>
                      <ProFormCheckbox
                        name={['latest_irpd_config_v5', 'content', 'peak_time', 'tuesday_enable']}
                        colProps={{ xs: 6, md: 3 }}
                        disabled={!enableFirstPickTime}
                      >
                        {intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.tuesday_enable.label',
                        })}
                      </ProFormCheckbox>
                      <ProFormCheckbox
                        name={['latest_irpd_config_v5', 'content', 'peak_time', 'wednesday_enable']}
                        colProps={{ xs: 6, md: 3 }}
                        disabled={!enableFirstPickTime}
                      >
                        {intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.wednesday_enable.label',
                        })}
                      </ProFormCheckbox>
                      <ProFormCheckbox
                        name={['latest_irpd_config_v5', 'content', 'peak_time', 'thursday_enable']}
                        colProps={{ xs: 6, md: 3 }}
                        disabled={!enableFirstPickTime}
                      >
                        {intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.thursday_enable.label',
                        })}
                      </ProFormCheckbox>
                      <ProFormCheckbox
                        name={['latest_irpd_config_v5', 'content', 'peak_time', 'friday_enable']}
                        colProps={{ xs: 6, md: 3 }}
                        disabled={!enableFirstPickTime}
                      >
                        {intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.friday_enable.label',
                        })}
                      </ProFormCheckbox>
                      <ProFormCheckbox
                        name={['latest_irpd_config_v5', 'content', 'peak_time', 'saturday_enable']}
                        colProps={{ xs: 6, md: 3 }}
                        disabled={!enableFirstPickTime}
                      >
                        {intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.saturday_enable.label',
                        })}
                      </ProFormCheckbox>
                      <ProFormCheckbox
                        name={['latest_irpd_config_v5', 'content', 'peak_time', 'sunday_enable']}
                        colProps={{ xs: 6, md: 3 }}
                        disabled={!enableFirstPickTime}
                      >
                        {intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.sunday_enable.label',
                        })}
                      </ProFormCheckbox>
                    </>
                  );
                }}
              </ProFormDependency>
            </ProFormGroup>
            <ProFormGroup
              title={intl.formatMessage({
                id: 'component.edit.irpd.pausetime.configurations.title',
              })}
            >
              <ProFormCheckbox name={['enableFirstPickTime']} colProps={{ xs: 24, md: 8 }}>
                {intl.formatMessage({
                  id: 'component.edit.irpd.pausetime.peak_time_1.label',
                })}
              </ProFormCheckbox>

              <ProFormDependency name={['enableFirstPickTime']}>
                {({ enableFirstPickTime }) => {
                  return (
                    <>
                      <ProFormTimePicker
                        rules={[yupSync]}
                        name={'firstBeginPickTime'}
                        dataFormat={TIME_FORMAT}
                        label={intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.peak_time_start.label',
                        })}
                        fieldProps={{ format: TIME_FORMAT, style: { width: '100%' } }}
                        colProps={{ xs: 24, md: 8 }}
                        disabled={!enableFirstPickTime}
                      />
                      <ProFormTimePicker
                        rules={[yupSync]}
                        name={'firstEndPickTime'}
                        dataFormat={TIME_FORMAT}
                        label={intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.peak_time_end.label',
                        })}
                        fieldProps={{ format: TIME_FORMAT, style: { width: '100%' } }}
                        colProps={{ xs: 24, md: 8 }}
                        disabled={!enableFirstPickTime}
                      />
                      <ProFormCheckbox
                        name={'enableSecondPickTime'}
                        disabled={!enableFirstPickTime}
                        colProps={{ xs: 24, md: 8 }}
                      >
                        {intl.formatMessage({
                          id: 'component.edit.irpd.pausetime.peak_time_2.label',
                        })}
                      </ProFormCheckbox>

                      <ProFormDependency name={['enableSecondPickTime']}>
                        {({ enableSecondPickTime }) => {
                          return (
                            <>
                              <ProFormTimePicker
                                rules={[yupSync]}
                                name={'secondBeginPickTime'}
                                dataFormat={TIME_FORMAT}
                                label={intl.formatMessage({
                                  id: 'component.edit.irpd.pausetime.peak_time_start.label',
                                })}
                                fieldProps={{ format: TIME_FORMAT, style: { width: '100%' } }}
                                colProps={{ xs: 24, md: 8 }}
                                disabled={!enableSecondPickTime}
                              />
                              <ProFormTimePicker
                                rules={[yupSync]}
                                name={'secondEndPickTime'}
                                dataFormat={TIME_FORMAT}
                                label={intl.formatMessage({
                                  id: 'component.edit.irpd.pausetime.peak_time_end.label',
                                })}
                                fieldProps={{ format: TIME_FORMAT, style: { width: '100%' } }}
                                colProps={{ xs: 24, md: 8 }}
                                disabled={!enableSecondPickTime}
                              />
                            </>
                          );
                        }}
                      </ProFormDependency>
                    </>
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

export default EditIrpdPauseTimeComponent;
