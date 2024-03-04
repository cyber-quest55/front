import { useScreenHook } from '@/hooks/screen';
import { queryPivotMonitorNotifications } from '@/models/pivot-monitor-notification';
import { postPivotMonitorNotification } from '@/services/notification';
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

interface AddPivotMonitorAlarmFormProps {
  reasons: APIModels.NotificationReason[];
  pivots: APIModels.PivotByFarm[];
  queryPivotMonitorNotifications: typeof queryPivotMonitorNotifications;
}

const AddPivotMonitorAlarmForm = (props: AddPivotMonitorAlarmFormProps) => {
  const intl = useIntl();
  const { lg } = useScreenHook();
  const form1Ref = useRef<ProFormInstance<any> | undefined>();
  const form2Ref = useRef<ProFormInstance<any> | undefined>();
  const [visible, setVisible] = useState(false);
  const postPivotMonitorNotificationReq = useRequest(postPivotMonitorNotification, { manual: true });
  const { initialState } = useModel('@@initialState');
  const params = useParams();
  const { message } = App.useApp();

  const listOptions = () => {
    return props.reasons.map((reason) => {
      return {
        title: reason.label,
        name: ['options', 'reasons', reason.id.toString()],
        critical: reason.critical
          ? { name: ['options', 'critical_reasons', reason.id.toString()] }
          : null,
      };
    });
  };

  const pivotOptions = () => {
    const pivotMonitorsFiltered = props.pivots.filter(
      (pivot) => pivot.automation_type === 1,
    );

    return pivotMonitorsFiltered.map((pivot) => {
      return {
        value: pivot.id,
        label: pivot.name,
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
      devices: yup.array().min(1, intl.formatMessage({
        id: 'validations.required',
      })),
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
          centered: true
        }}
        submitter={false}
      >
        <StepsForm
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
              await postPivotMonitorNotificationReq.runAsync(data);
              message.success('Notificação criada com sucesso');
              props.queryPivotMonitorNotifications({ farmId: params.farmId });
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
              <>
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
                            colProps={{ xs: 12, md: 5 }}
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
                            colProps={{ xs: 12, md: 5 }}
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
                        form1Ref.current?.setFieldValue(['information', 'start_at'], moment().startOf('day'));
                        form1Ref.current?.setFieldValue(['information', 'end_at'], moment().endOf('day'));
                      },
                    }}
                    colProps={{ xs: 24, md: 4 }}
                    name={['information', 'all_day']}
                    label={intl.formatMessage({
                      id: 'component.addalarmform.modal.step1.allday.label',
                    })}
                  />
                </ProFormGroup>
              </>
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
                        options={pivotOptions(
                          
                        )}
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
                            maxHeight: 350,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            paddingRight: 4,
                          }}
                        >
                          <Typography.Text>
                            {intl.formatMessage({
                              id: 'component.addalarmform.modal.step2.reasons.label',
                            })}
                          </Typography.Text>
                          {listOptions(
                          ).map((item) => (
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
                                    <Col>
                                      <Row align={'middle'}>
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
                          {form2Ref.current?.getFieldsError()[1] && form2Ref.current?.getFieldsError()[1]?.errors?.length > 0
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

export default AddPivotMonitorAlarmForm;
