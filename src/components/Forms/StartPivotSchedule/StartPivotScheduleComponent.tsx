import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import { getLastScheduleIrrigation, postSimpleIrrigation } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { PTPToMillimeter } from '@/utils/formater/get-ptp-to-milimiter';
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Space, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import * as yup from 'yup';

interface IStartPivotScheduleComponentProps {
  pivotById: GetPivotByIdModelProps;
  queryPivotById: any;
  deviceId: number;
  farmId: number;
}

const StartPivotScheduleComponent: React.FunctionComponent<IStartPivotScheduleComponentProps> = (
  props,
) => {
  const intl = useIntl();
  const { message } = App.useApp();
  const [form] = Form.useForm<any>();

  const postReq = useRequest(postSimpleIrrigation, { manual: true });
  const getLastSchedule = useRequest(getLastScheduleIrrigation, { manual: true });

  const pivot = props.pivotById.unformated;

  const schema = yup.object().shape({
    content: yup.object().shape({
      schedule_irrigation_parameters: yup
        .array(
          yup.object().shape({
            garbage: yup.object().shape({
              unformated_date: yup.string().required(
                intl.formatMessage({
                  id: 'validations.required',
                }),
              ),
              start_mode: yup.number().required(
                intl.formatMessage({
                  id: 'validations.required',
                }),
              ),
              end_date: yup.string().required(
                intl.formatMessage({
                  id: 'validations.required',
                }),
              ),
            }),
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
          }),
        )
        .required(),
    }),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  const initialValues = {
    mode: 1,
    percent: 100,
    stop_mode: 5,
    stop_angle: 1,
    schedule_rounds: 1,
    start_mode: 1,
    direction: 1,
    garbage: {
      start_mode: 0,
      unformated_date: dayjs(),
      end_date: dayjs().add(1, 'days'),
    },
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < dayjs().subtract(1, 'days');
  };

  const handleFetchLastConfig = async () => {
    const result = await getLastSchedule.runAsync(
      {
        farmId: props.farmId as any,
        pivotId: props.deviceId as any,
      },
      {},
    );

    const shduleFormated = result?.content?.schedule_irrigation_parameters?.map((item) => ({
      ...item,
      garbage: {
        start_mode: 1,
        unformated_date: dayjs()
          .year(item.start_year + 2000)
          .month(item.start_month)
          .date(item.start_day)
          .hour(item.start_hour)
          .minute(item.start_minute),
        end_date: dayjs()
          .year(item.end_year + 2000)
          .month(item.end_month)
          .date(item.end_day)
          .hour(item.end_hour)
          .minute(item.end_minute),
      },
    }));

    const newValues = {
      ...form.getFieldsValue(),
      content: {
        ...form.getFieldsValue().content,
        schedule_irrigation_parameters: shduleFormated,
      },
    };

    form.setFieldsValue(newValues);
  };

  return (
    <ModalForm<any>
      onOpenChange={() => {
        props.queryPivotById()
      }}

      onFieldsChange={(fields) => {
        // o nome do campo está sempre na ultima posição
        const name = fields[0].name.at(-1);
        // o index caso não seja lixo
        const index = fields[0].name[fields[0].name.length - 2];
        // o index caso seja lixo
        const garbageIndex = fields[0].name[fields[0].name.length - 3];

        // Caso seja um numero o index
        if (typeof index === 'number') {
          // Caso mude a porcentagem mudar a precipitação
          if (name === 'percent') {
            const result = PTPToMillimeter(pivot, fields[0].value);
            form.setFieldValue(
              ['content', 'schedule_irrigation_parameters', index, 'milimiter'],
              result.toFixed(4),
            );
          }
        } else {
          if (name === 'start_mode') {
            // Caso mude o start_mode ajustar campo de data-hora
            if (fields[0].value === 0) {
              form.setFieldValue(
                [
                  'content',
                  'schedule_irrigation_parameters',
                  garbageIndex,
                  'garbage',
                  'unformated_date',
                ],
                dayjs(),
              );
            }
          }
        }
      }}
      title={
        <Space>
          {intl.formatMessage({
            id: 'component.pivot.startirr.title',
          })}
          <Button loading={getLastSchedule.loading} onClick={handleFetchLastConfig} style={{}}>
            {intl.formatMessage({
              id: 'component.pivot.startirr.button.loadlast',
            })}
          </Button>
        </Space>
      }
      trigger={
        <Typography.Link style={{ width: '100%' }}>
          {intl.formatMessage({
            id: 'component.pivot.operationalpanel.button.start.opt.4',
          })}
        </Typography.Link>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          await postReq.runAsync(
            {
              farmId: props.farmId as any,
              pivotId: props.deviceId as any,
              deviceId: pivot.control as any,
            },
            {
              message_subtype: 'schedule',
              equipment: props.deviceId,
              content: {
                ...values.content,
                injection_pump_command: {
                  command: 0,
                  note: '',
                },
                autoreversion_command: {
                  command: 1,
                },
                schedule_irrigation_parameters:
                  values?.content?.schedule_irrigation_parameters?.map((item: any) => {
                    const startMode = item?.start_mode;
                    const stopMode = item?.stop_mode;

                    const startTime = dayjs(item?.garbage.unformated_date.replace(' ', 'T'));
                    const endTime = dayjs(item?.garbage.end_date.replace(' ', 'T'));

                    delete item.garbage;
                    return {
                      ...item,
                      schedule_rounds: item?.schedule_rounds | 1,
                      stop_angle: item?.stop_angle | 360,
                      start_year: startMode === 0 ? 0 : startTime.get('y') - 2000,
                      start_month: startMode === 0 ? 0 : startTime.get('M') + 1,
                      start_day: startMode === 0 ? 0 : startTime.get('D'),
                      start_hour: startMode === 0 ? 0 : startTime.get('h'),
                      start_minute: startMode === 0 ? 0 : startTime.get('m'),
                      end_year: stopMode !== 5 ? 0 : endTime.get('y') - 2000,
                      end_month: stopMode !== 5 ? 0 : endTime.get('M') + 1,
                      end_day: stopMode !== 5 ? 0 : endTime.get('D'),
                      end_hour: stopMode !== 5 ? 0 : endTime.get('h'),
                      end_minute: stopMode !== 5 ? 0 : endTime.get('m'),
                      number_editing: 1,
                    };
                  }),
                irrigation_status: {
                  irrigation_status: values.content.schedule_irrigation_parameters[0].direction,
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
      <Spin spinning={props.pivotById.loading}>
        <ProFormList
          name={['content', 'schedule_irrigation_parameters']}
          creatorButtonProps={{
            creatorButtonText: intl.formatMessage({
              id: 'component.pivot.startirr.plusirr.txt',
            }),
          }}
          min={1}
          copyIconProps={false}
          itemRender={({ listDom, action }, { index }) => (
            <ProCard
              key={'my-schedule' + index}
              collapsible
              defaultCollapsed={index === 0 ? false : true}
              bordered
              style={{ marginBlockEnd: 8 }}
              title={intl.formatMessage(
                {
                  id: 'component.pivot.startirr.card.collapse.title',
                },
                { value: index + 1 },
              )}
              extra={action}
              bodyStyle={{ paddingBlockEnd: 0 }}
            >
              {listDom}
            </ProCard>
          )}
          creatorRecord={initialValues}
          initialValue={[initialValues]}
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
              name={['direction']}
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
              rules={[yupSync]}
              name={['mode']}
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

          <ProForm.Group>
            <ProFormDigit
              rules={[yupSync]}
              label={intl.formatMessage({
                id: 'component.pivot.startirr.form.label.3',
              })}
              name={['percent']}
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
              name={['milimiter']}
              width="md"
              fieldProps={{
                addonAfter: 'mm',
                controls: false,
              }}
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormSelect
              rules={[yupSync]}
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
              name={['garbage', 'start_mode']}
              label={intl.formatMessage({
                id: 'component.pivot.startirr.form.label.5',
              })}
            />
            <ProFormDependency name={['garbage']} colon style={{ width: '100%' }}>
              {({ garbage }) => {
                return (
                  <ProFormDateTimePicker
                    rules={[yupSync]}
                    width="sm"
                    disabled={garbage?.start_mode !== 1}
                    fieldProps={{
                      disabledDate: disabledDate,
                      allowClear: false,
                    }}
                    name={['garbage', 'unformated_date']}
                    label={intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.6',
                    })}
                  />
                );
              }}
            </ProFormDependency>
          </ProForm.Group>
          <ProForm.Group>
            <ProFormRadio.Group
              name={['stop_mode']}
              radioType="button"
              label={intl.formatMessage({
                id: 'component.pivot.startirr.form.label.7',
              })}
              options={[
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
                {
                  label: intl.formatMessage({
                    id: 'component.pivot.startirr.form.label.7.opt.5',
                  }),
                  value: 5,
                },
              ]}
            />
            <ProFormDependency name={['stop_mode']} colon style={{ width: '100%' }}>
              {({ stop_mode }) => {
                return stop_mode === 5 ? (
                  <ProFormDateTimePicker
                    rules={[yupSync]}
                    name={['garbage', 'end_date']}
                    fieldProps={{
                      disabledDate: disabledDate,
                      allowClear: false,
                    }}
                    label={intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.12',
                    })}
                    width="sm"
                  />
                ) : null;
              }}
            </ProFormDependency>
            <ProFormDependency name={['stop_mode']} colon style={{ width: '100%' }}>
              {({ stop_mode }) => {
                return stop_mode === 1 ? (
                  <ProFormDigit
                    rules={[yupSync]}
                    name={['stop_angle']}
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
            <ProFormDependency name={['stop_mode']} colon style={{ width: '100%' }}>
              {({ stop_mode }) => {
                return stop_mode === 4 ? (
                  <ProFormDigit
                    name={['schedule_rounds']}
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
          </ProForm.Group>
        </ProFormList>
      </Spin>

    </ModalForm>
  );
};

export default StartPivotScheduleComponent;
