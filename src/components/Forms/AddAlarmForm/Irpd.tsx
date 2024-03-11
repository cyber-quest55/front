import { useScreenHook } from '@/hooks/screen';
import { queryIrpdNotifications } from '@/models/irpd-notification';
import { postIrpdNotification } from '@/services/notification';
import { yupValidator } from '@/utils/adapters/yup';
import { PlusCircleFilled } from '@ant-design/icons';
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormGroup,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTimePicker,
  StepsForm,
} from '@ant-design/pro-components';
import { useIntl, useModel, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Col, Divider, Row, Space, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { useRef, useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';
import * as yup from 'yup';

interface AddIrpdAlarmFormProps {
  reasons: APIModels.NotificationReason[];
  irpds: APIModels.IrpdById[];
  queryIrpdNotifications: typeof queryIrpdNotifications;
}

const AddIrpdAlarmForm = (props: AddIrpdAlarmFormProps) => {
  const intl = useIntl();
  const { lg } = useScreenHook();
  const form1Ref = useRef<ProFormInstance<any> | undefined>();
  const form2Ref = useRef<ProFormInstance<any> | undefined>();
  const [visible, setVisible] = useState(false);
  const postIrpdNotificationReq = useRequest(postIrpdNotification, { manual: true });
  const { initialState } = useModel('@@initialState');
  const params = useParams();
  const { message } = App.useApp();

  const listOptions = () => {
    return props.reasons
      .filter((r) => r.protocol === 5)
      .map((reason) => {
        return {
          title: reason.label,
          name: ['options', 'reasons', reason.id.toString()],
          critical: reason.critical
            ? { name: ['options', 'critical_reasons', reason.id.toString()] }
            : null,
        };
      });
  };

  const irpdOptions = () => {
    return props.irpds.filter((r) => r.protocol === 5).map((irpd) => {
      return {
        value: irpd.id,
        label: irpd.name,
      };
    });
  };

  const schema1 = yup.object().shape({
    information: yup.object().shape({
      notification_group_name: yup
        .string()
        .max(
          30,
          intl.formatMessage(
            {
              id: 'validations.max',
            },
            { value: 30 },
          ),
        )
        .required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      all_day: yup.boolean(),
      start_at: yup.string().when('all_day', {
        is: false,
        then(schema) {
          return schema.required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          );
        },
      }),
      end_at: yup.string().when('all_day', {
        is: false,
        then(schema) {
          return schema.required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          );
        },
      }),
    }),
  });

  const schema2 = yup.object().shape({
    options: yup.object().shape({
      devices: yup.array().min(
        1,
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
      reasons: yup
        .object()
        .test('is-jimmy', 'error', (value, testContext) =>
          Object.values(testContext.parent.reasons).some((v) => v === true),
        ),
    }),
  });

  const yupSync1 = yupValidator(schema1, () => form1Ref.current?.getFieldsValue() ?? {});
  const yupSync2 = yupValidator(schema2, () => form2Ref.current?.getFieldsValue() ?? {});

  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        size={lg ? 'large' : 'middle'}
        disabled={props.irpds.filter((r) => r.protocol === 5 || r.protocol === 5.1).length === 0}
        type="primary"
        icon={<PlusCircleFilled />}
      >
        {intl.formatMessage({
          id: 'component.addalarmform.button',
        })}
      </Button>
      <ModalForm
        title={intl.formatMessage({
          id: 'component.addalarmform.modal.title',
        })}
        width={800}
        open={visible}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setVisible(false),
          centered: true,
        }}
        submitter={false}
      >
        <StepsForm
          stepsProps={{
            style: {
              marginTop: 24,
            },
          }}
          containerStyle={{
            minWidth: 0,
          }}
          stepsFormRender={(dom, submitter) => {
            return (
              <>
                {dom}
                <Row justify="end" style={{ gap: 12, paddingTop: 20 }}>
                  {submitter}
                </Row>
              </>
            );
          }}
          onFinish={async (values) => {
            try {
              const data = {
                critical_reasons: values.options.critical_reasons
                  ? Object.keys(values.options.critical_reasons)
                      .filter((key) => values.options.critical_reasons[key])
                      .map((v) => Number(v))
                  : [],
                reasons: values.options.reasons
                  ? Object.keys(values.options.reasons)
                      .filter((key) => values.options.reasons[key])
                      .map((v) => Number(v))
                  : [],
                devices: values.options.devices,
                name: values.information.notification_group_name,
                start: values.information.start_at,
                end: values.information.end_at,
                enable: true,
                farm: Number(params.farmId),
                user: initialState?.currentUser.id,
              };
              await postIrpdNotificationReq.runAsync(data);
              message.success('Notificação criada com sucesso');
              props.queryIrpdNotifications({ farmId: params.farmId });
              setVisible(false);
            } catch (err) {
              console.log(err);
              message.error('Fail');
            }
          }}
        >
          <>
            <StepsForm.StepForm
              title={intl.formatMessage({
                id: 'component.addalarmform.modal.step1.title',
              })}
              name="information"
              formRef={form1Ref}
              initialValues={{
                information: {
                  notification_group_name: '',
                  all_day: true,
                  start_at: moment().startOf('day'),
                  end_at: moment().endOf('day'),
                },
              }}
              grid
              rowProps={{ gutter: [12, 12] }}
            >
                <ProFormText
                  rules={[yupSync1]}
                  colProps={{ xs: 24, md: 24 }}
                  name={['information', 'notification_group_name']}
                  label={intl.formatMessage({
                    id: 'component.addalarmform.modal.step1.name.label',
                  })}
                />
                <ProFormGroup
                  title={intl.formatMessage({
                    id: 'component.addalarmform.modal.step1.date.title',
                  })}
                >
                  <ProFormDependency name={['information']} colon style={{ width: '100%' }}>
                    {({ information }) => {
                      return (
                        <>
                          <ProFormTimePicker
                            rules={[yupSync1]}
                            allowClear={false}
                            colProps={{ xs: 8, md: 5 }}
                            name={['information', 'start_at']}
                            dataFormat="HH:mm"
                            label={intl.formatMessage({
                              id: 'component.addalarmform.modal.step1.start.label',
                            })}
                            disabled={information.all_day}
                          />

                          <ProFormTimePicker
                            rules={[yupSync1]}
                            allowClear={false}
                            colProps={{ xs: 8, md: 5 }}
                            name={['information', 'end_at']}
                            dataFormat="HH:mm"
                            label={intl.formatMessage({
                              id: 'component.addalarmform.modal.step1.end.label',
                            })}
                            disabled={information.all_day}
                          />
                        </>
                      );
                    }}
                  </ProFormDependency>

                  <ProFormCheckbox
                    rules={[yupSync1]}
                    fieldProps={{
                      onChange: () => {
                        form1Ref.current?.setFieldValue(
                          ['information', 'start_at'],
                          moment().startOf('day'),
                        );
                        form1Ref.current?.setFieldValue(
                          ['information', 'end_at'],
                          moment().endOf('day'),
                        );
                      },
                    }}
                    colProps={{ xs: 8, md: 4 }}
                    name={['information', 'all_day']}
                    label={intl.formatMessage({
                      id: 'component.addalarmform.modal.step1.allday.label',
                    })}
                  />
                </ProFormGroup>
            </StepsForm.StepForm>
            <StepsForm.StepForm
              title={intl.formatMessage({
                id: 'component.addalarmform.modal.step2.title',
              })}
              name="options"
              formRef={form2Ref}
              onInit={() => {
                const reasonsObj: any = {};
                for (let reason of props.reasons) {
                  reasonsObj[reason.id.toString()] = false;
                }
                form2Ref.current?.setFieldsValue({
                  options: { reasons: reasonsObj, critical_reasons: {}, devices: [] },
                });
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <ProForm.Item noStyle shouldUpdate>
                  {() => {
                    return (
                      <ProFormSelect
                        rules={[yupSync2]}
                        label={intl.formatMessage({
                          id: 'component.addalarmform.modal.step2.devices.label',
                        })}
                        name={['options', 'devices']}
                        options={irpdOptions()}
                        fieldProps={{
                          mode: 'multiple',
                        }}
                      />
                    );
                  }}
                </ProForm.Item>
                <ProForm.Item noStyle shouldUpdate>
                  {(form) => {
                    return (
                      <>
                        <ProCard
                          gutter={[0, 8]}
                          ghost
                          wrap
                          style={{
                            maxHeight: lg ? 350 : 250,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                          }}
                        >
                          <Typography.Text>
                            {intl.formatMessage({
                              id: 'component.addalarmform.modal.step2.reasons.label',
                            })}
                          </Typography.Text>
                          {listOptions().map((item) => (
                            <ProCard
                              collapsible={!!item.critical}
                              title={item.title}
                              bodyStyle={{ margin: 0, paddingBlock: item.critical ? 16 : '0 16px' }}
                              extra={
                                <Row justify="space-between" align={'middle'}>
                                  <Col>
                                    <ProFormSwitch
                                      fieldProps={{
                                        onChange: (checked) => {
                                          if (item.critical && !checked) {
                                            form.setFieldValue(item.critical.name, false);
                                          }
                                        },
                                      }}
                                      noStyle
                                      rules={[yupSync2]}
                                      name={item.name}
                                      style={{ margin: 0 }}
                                    />
                                  </Col>
                                </Row>
                              }
                              bordered
                              key={`list-${item.name}`}
                            >
                              {item.critical ? (
                                <>
                                  <Divider style={{ padding: 0, margin: '0 0 16px 0' }} />
                                  <Row justify="space-between" align={'middle'}>
                                    <Col style={{ flex: 4 }}>
                                      <Row align={'middle'} style={{ flexWrap: 'nowrap' }}>
                                        <Tooltip
                                          title={intl.formatMessage({
                                            id: 'component.addalarmform.modal.step2.criticalreasons.tooltip',
                                          })}
                                        >
                                          <IoAlertCircleOutline color="#DA1D29" size={20} />
                                        </Tooltip>
                                        <div style={{ paddingLeft: 8 }}>
                                          {intl.formatMessage({
                                            id: 'component.addalarmform.modal.step2.criticalreasons.enable',
                                          })}
                                        </div>
                                      </Row>
                                    </Col>
                                    <Col>
                                      <ProFormSwitch
                                        noStyle
                                        fieldProps={{
                                          onChange: () => {
                                            form.setFieldValue(item.name, true);
                                          },
                                        }}
                                        name={item.critical.name}
                                        style={{ margin: 0 }}
                                      />
                                    </Col>
                                  </Row>
                                </>
                              ) : null}
                            </ProCard>
                          ))}
                        </ProCard>
                        <Typography.Text type="danger" style={{ fontWeight: 'lighter' }}>
                          {form2Ref.current?.getFieldsError()[1] &&
                          form2Ref.current?.getFieldsError()[1]?.errors?.length > 0
                            ? intl.formatMessage({
                                id: 'validations.required',
                              })
                            : ''}
                        </Typography.Text>
                      </>
                    );
                  }}
                </ProForm.Item>
              </Space>
            </StepsForm.StepForm>
          </>
        </StepsForm>
      </ModalForm>
    </>
  );
};

export default AddIrpdAlarmForm;
