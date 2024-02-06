import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import { getEstimatedTime, getLastSimpleIrrigation, postSimpleIrrigation } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { PTPToMillimeter } from '@/utils/formater/get-ptp-to-milimiter';
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import * as yup from 'yup';

interface IStartPivotSimpleComponentProps {
  pivotById: GetPivotByIdModelProps;
}

const StartPivotSimpleComponent: React.FunctionComponent<IStartPivotSimpleComponentProps> = (
  props,
) => {
  const params = useParams();
  const [form] = Form.useForm<any>();
  const intl = useIntl();

  const { message } = App.useApp();

  const [expected, setExpected] = React.useState({
    rawDuration: 1,
    totalDuration: 0,
  });

  const postReq = useRequest(postSimpleIrrigation, { manual: true });
  const getEstimated = useRequest(getEstimatedTime, { manual: true });
  const getLastSimple = useRequest(getLastSimpleIrrigation, { manual: true });

  const schema = yup.object().shape({
    garbage: yup.object().shape({
      unformated_date: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    }),
    content: yup.object().shape({
      injection_pump_command: yup.object().shape({
        command: yup.boolean().notRequired(),
        note: yup.string().notRequired(),
      }),
      autoreversion_command: yup.object().shape({
        command: yup.number().required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      }),
      simple_irrigation_parameters: yup.object().shape({
        mode: yup.number().required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
        percent: yup
          .number()
          .min(
            1,
            intl.formatMessage(
              {
                id: 'validations.min.number',
              },
              { value: 1 },
            ),
          )
          .max(
            100,
            intl.formatMessage(
              {
                id: 'validations.max.number',
              },
              { value: 100 },
            ),
          )
          .required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        stop_mode: yup
          .number()

          .required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        stop_angle: yup
          .number()
          .min(
            0,
            intl.formatMessage(
              {
                id: 'validations.min.number',
              },
              { value: 0 },
            ),
          )
          .max(
            360,
            intl.formatMessage(
              {
                id: 'validations.max.number',
              },
              { value: 360 },
            ),
          )
          .notRequired(),
        rounds: yup
          .number()
          .min(
            1,
            intl.formatMessage(
              {
                id: 'validations.min.number',
              },
              { value: 1 },
            ),
          )
          .max(
            99,
            intl.formatMessage(
              {
                id: 'validations.max.number',
              },
              { value: 99 },
            ),
          )
          .required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        start_mode: yup.number().required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      }),
      irrigation_status: yup.object().shape({
        irrigation_status: yup.number().required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
        note: yup.number().required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      }),
    }),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  const pivot = props.pivotById.unformated;

  const pauseTime1 = pivot.controllerconfig?.content?.pause_time_command?.pause_time_command
    ? [
        `${pivot.controllerconfig?.content?.pause_time?.start_pause_time_hour_1}:${pivot.controllerconfig?.content?.pause_time?.start_pause_time_minute_1}`,
        `${pivot.controllerconfig?.content?.pause_time?.end_pause_time_hour_1}:${pivot.controllerconfig?.content?.pause_time?.end_pause_time_minute_1}`,
      ]
    : ['00:00', '00:00'];

  const pauseTime2 = [
    `${pivot.controllerconfig?.content?.pause_time?.start_pause_time_hour_2}:${pivot.controllerconfig?.content?.pause_time?.start_pause_time_minute_2}`,
    `${pivot.controllerconfig?.content?.pause_time?.end_pause_time_hour_2}:${pivot.controllerconfig?.content?.pause_time?.end_pause_time_minute_2}`,
  ];

  const sectorAngle = pivot.controllerconfig?.content?.sector?.end_angle
    ? pivot.controllerconfig?.content?.sector?.end_angle
    : 360;

  const gpsCurrentAngle = pivot.controllerstream_gps?.content?.current_angle?.current_angle;

  const handleEndAngle = (mode: number, angle: number, rounds: number) => {
    switch (mode) {
      case 1:
        return angle | 360;
      case 3:
        return pivot.controllerconfig?.content?.sector?.end_angle;
      case 4:
        return (
          (Math.abs(
            pivot.controllerconfig?.content?.sector?.end_angle -
              pivot.controllerconfig?.content?.sector?.start_angle,
          ) *
            rounds) |
          1
        );
      default:
        return 0;
    }
  };

  const handleFetchLastConfig = async () => {
    const result = await getLastSimple.runAsync(
      {
        farmId: params.id as any,
        pivotId: pivot.id as any,
      },
      {},
    );

    const newValues = {
      ...form.getFieldsValue(),
      ...result,
      content: { ...form.getFieldsValue().content, ...result.content },
    };

    form.setFieldsValue(newValues);
  };

  return (
    <ModalForm<any>
      onFieldsChange={(fields) => {
        const name = fields[0].name.join('.');

        // Caso mude a porcentagem mudar a precipitação
        if (name === 'content.simple_irrigation_parameters.percent') {
          const result = PTPToMillimeter(pivot, fields[0].value);
          form.setFieldValue(['garbage', 'preciptation'], result.toFixed(4));
        }

        // Caso mude o start_mode ajustar campo de data-hora
        if (name === 'content.simple_irrigation_parameters.start_mode') {
          if (fields[0].value === 0) form.setFieldValue(['garbage', 'unformated_date'], dayjs());
        }
      }}
      // Caso mude qualquer valor, recalcular o estimated time
      onValuesChange={async (_, values) => {
        const simpleIrr = values?.content?.simple_irrigation_parameters;
        const result = await getEstimated.runAsync(
          {},
          {
            direction: values?.content.irrigation_status?.irrigation_status === 1 ? true : false,
            end_angle: handleEndAngle(
              simpleIrr?.stop_mode,
              simpleIrr?.stop_angle,
              simpleIrr?.rounds,
            ),
            farm_timezone: 'America/Sao_Paulo',
            irrigation_start_date: values?.garbage?.unformated_date,
            last_tower_distance: pivot?.controllerconfig?.content?.pivot_parameters?.radius_last,
            last_tower_speed: pivot?.controllerconfig?.content?.pivot_parameters?.speed,
            pause_time_1: JSON.stringify(pauseTime1),
            pause_time_2: JSON.stringify(pauseTime2),
            pause_time_weekdays: [1, 2, 3, 4].join(','),
            pivot_speed: simpleIrr?.percent,
            rounds: simpleIrr?.rounds | 1,
            sector_angle: sectorAngle,
            start_angle: gpsCurrentAngle,
            wet: simpleIrr?.mode === 1,
          },
        );

        setExpected({ rawDuration: result.raw_duration, totalDuration: result.total_duration });
      }}
      title={
        <Space>
          {intl.formatMessage({
            id: 'component.pivot.startirr.title',
          })}
          <Button loading={getLastSimple.loading} onClick={handleFetchLastConfig} style={{}}>
            {intl.formatMessage({
              id: 'component.pivot.startirr.button.loadlast',
            })}
          </Button>
        </Space>
      }
      trigger={
        <Typography.Link style={{ width: '100%' }}>
          {intl.formatMessage({
            id: 'component.pivot.operationalpanel.button.start.opt.1',
          })}
        </Typography.Link>
      }
      form={form}
      initialValues={{
        garbage: {
          unformated_date: dayjs(),
          preciptation: PTPToMillimeter(pivot, 100).toFixed(4),
        },
        message_subtype: 'simple',
        content: {
          injection_pump_command: {
            command: false,
            note: '',
          },
          autoreversion_command: {
            command: 1,
          },
          simple_irrigation_parameters: {
            mode: 1,
            percent: 100,
            stop_mode: 0,
            stop_angle: 1,
            rounds: 1,
            start_mode: 1,
          },
          irrigation_status: {
            irrigation_status: 1,
            irrigation_type: 1,
          },
        },
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          const startMode = values?.content?.simple_irrigation_parameters.start_mode;

          const startTime = dayjs(values?.garbage.unformated_date.replace(' ', 'T'));

          await postReq.runAsync(
            {
              farmId: params.id as any,
              pivotId: pivot.id as any,
              deviceId: pivot.control as any,
            },
            {
              message_subtype: 'simple',
              equipment: pivot.id,
              end_date_forecast: dayjs().add(expected.totalDuration, 'hours').toISOString(),
              operation_duration_forecast: expected.rawDuration,
              content: {
                ...values.content,
                injection_pump_command: {
                  ...values.content?.injection_pump_command,
                  command: +values.content?.injection_pump_command?.status | 0,
                  note: values.content?.injection_pump_command?.note
                    ? values.content?.injection_pump_command?.note
                    : '',
                },
                autoreversion_command: {
                  command: 1,
                },
                simple_irrigation_parameters: {
                  ...values?.content?.simple_irrigation_parameters,
                  rounds: values.content?.simple_irrigation_parameters?.rounds | 1,
                  stop_angle: values.content?.simple_irrigation_parameters?.stop_angle | 360,
                  start_year: startMode === 0 ? 0 : startTime.get('y') - 2000,
                  start_month: startMode === 0 ? 0 : startTime.get('M') + 1,
                  start_day: startMode === 0 ? 0 : startTime.get('D'),
                  start_hour: startMode === 0 ? 0 : startTime.get('h'),
                  start_minute: startMode === 0 ? 0 : startTime.get('m'),
                },
                irrigation_status: {
                  ...values.content.irrigation_status,
                  irrigation_type: 1,
                },
              },
            },
          );

          message.success(
            intl.formatMessage({
              id: 'component.message.success',
            }),
          );
        } catch (err) {
          message.error(
            intl.formatMessage({
              id: 'component.message.error',
            }),
          );
          return false;
        }
        return true;
      }}
    > 
      <ProForm.Group style={{ marginBottom: 12 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.pivot.startirr.currentangl',
          })}{' '}
          {pivot?.controllerstream_gps?.current_angle |
            pivot?.controllerstream_gps?.current_angle?.current_angle}
          °
        </Typography.Text>
      </ProForm.Group>

      <ProForm.Group>
        <ProFormRadio.Group
          name={['content', 'irrigation_status', 'irrigation_status']}
          radioType="button"
          label={intl.formatMessage({
            id: 'component.pivot.startirr.form.label.1',
          })}
          options={[
            {
              label: intl.formatMessage({
                id: 'component.pivot.startirr.form.label.1.opt.1',
              }),
              value: 1,
            },
            {
              label: intl.formatMessage({
                id: 'component.pivot.startirr.form.label.1.opt.2',
              }),
              value: 2,
            },
          ]}
        />
        <ProFormRadio.Group
          name={['content', 'simple_irrigation_parameters', 'mode']}
          radioType="button"
          label={intl.formatMessage({
            id: 'component.pivot.startirr.form.label.2',
          })}
          options={[
            {
              label: intl.formatMessage({
                id: 'component.pivot.startirr.form.label.2.opt.1',
              }),
              value: 1,
            },
            {
              label: intl.formatMessage({
                id: 'component.pivot.startirr.form.label.2.opt.2',
              }),
              value: 2,
            },
          ]}
        />
      </ProForm.Group>

      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.simple_irrigation_parameters?.mode === 1 ? (
            pivot.controllerconfig?.injection_pump ? (
              <ProFormCheckbox width="xs" name={['content', 'injection_pump_command', 'command']}>
                {intl.formatMessage({
                  id: 'component.pivot.startirr.form.label.9',
                })}
              </ProFormCheckbox>
            ) : null
          ) : null;
        }}
      </ProFormDependency>

      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.injection_pump_command?.command ? (
            <ProForm.Group>
              <ProFormTextArea
                name={['content', 'injection_pump_command', 'note']}
                label={intl.formatMessage({
                  id: 'component.pivot.startirr.form.label.10',
                })}
                width="xl"
              />
            </ProForm.Group>
          ) : null;
        }}
      </ProFormDependency>

      <ProForm.Group>
        <ProFormDigit
          rules={[yupSync]}
          label={intl.formatMessage({
            id: 'component.pivot.startirr.form.label.3',
          })}
          name={['content', 'simple_irrigation_parameters', 'percent']}
          width="md"
          fieldProps={{
            addonAfter: '%',
            controls: false,
          }}
        />
        <ProFormDigit
          disabled
          label={intl.formatMessage({
            id: 'component.pivot.startirr.form.label.4',
          })}
          name={['garbage', 'preciptation']}
          width="md"
          fieldProps={{
            addonAfter: 'mm',
            controls: false,
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: 0,
              label: intl.formatMessage({
                id: 'component.pivot.startirr.form.label.5.opt.1',
              }),
            },
            {
              value: 1,
              label: intl.formatMessage({
                id: 'component.pivot.startirr.form.label.5.opt.2',
              }),
            },
            {
              value: 2,
              label: intl.formatMessage({
                id: 'component.pivot.startirr.form.label.5.opt.3',
              }),
            },
          ]}
          width="md"
          name={['content', 'simple_irrigation_parameters', 'start_mode']}
          label={intl.formatMessage({
            id: 'component.pivot.startirr.form.label.5',
          })}
        />
        <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
          {({ content }) => {
            return (
              <ProFormDateTimePicker
                width="sm"
                rules={[yupSync]}
                disabled={content?.simple_irrigation_parameters?.start_mode !== 1}
                fieldProps={{}}
                name={['garbage', 'unformated_date']}
                label={intl.formatMessage({
                  id: 'component.pivot.startirr.form.label.6',
                })}
              />
            );
          }}
        </ProFormDependency>
      </ProForm.Group>
      <ProFormRadio.Group
        name={['content', 'simple_irrigation_parameters', 'stop_mode']}
        radioType="button"
        label={intl.formatMessage({
          id: 'component.pivot.startirr.form.label.7',
        })}
        options={[
          {
            label: intl.formatMessage({
              id: 'component.pivot.startirr.form.label.7.opt.1',
            }),
            value: 0,
          },
          {
            label: intl.formatMessage({
              id: 'component.pivot.startirr.form.label.7.opt.2',
            }),
            value: 1,
          },
          {
            label: intl.formatMessage({
              id: 'component.pivot.startirr.form.label.7.opt.3',
            }),
            value: 3,
          },
          {
            label: intl.formatMessage({
              id: 'component.pivot.startirr.form.label.7.opt.4',
            }),
            value: 4,
          },
        ]}
      />

      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.simple_irrigation_parameters?.stop_mode === 1 ? (
            <ProFormDigit
              rules={[yupSync]}
              name={['content', 'simple_irrigation_parameters', 'stop_angle']}
              label={intl.formatMessage({
                id: 'component.pivot.startirr.form.label.8',
              })}
              width="sm"
              fieldProps={{
                addonAfter: '°',
                controls: false,
              }}
            />
          ) : null;
        }}
      </ProFormDependency>
      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.simple_irrigation_parameters?.stop_mode === 4 ? (
            <ProFormDigit
              rules={[yupSync]}
              name={['content', 'simple_irrigation_parameters', 'rounds']}
              label={intl.formatMessage({
                id: 'component.pivot.startirr.form.label.11',
              })}
              width="sm"
              fieldProps={{
                controls: false,
              }}
            />
          ) : null;
        }}
      </ProFormDependency>
      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.simple_irrigation_parameters?.stop_mode !== 0 ? (
            <Typography.Text>
              {intl.formatMessage({
                id: 'component.pivot.startirr.oprtdrforecast',
              })}
              : {dayjs().add(expected.rawDuration, 'hours').toISOString()}
              <br />
              {intl.formatMessage({
                id: 'component.pivot.startirr.enddtforecast',
              })}
              : {dayjs().toISOString()}
            </Typography.Text>
          ) : null;
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default StartPivotSimpleComponent;
