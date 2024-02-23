import { postPivotNotification } from '@/services/notification';
import { yupValidator } from '@/utils/adapters/yup';
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTimePicker,
  StepsForm,
} from '@ant-design/pro-components';
import { useIntl, useModel, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Col, Divider, Row, Space, Tooltip } from 'antd';
import moment from 'moment';
import { useRef, useState } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';
import * as yup from 'yup';

const AddPivotAlarmForm = (props: any) => {
  const intl = useIntl();
  const form1Ref = useRef<ProFormInstance<any> | undefined>();
  const form2Ref = useRef<ProFormInstance<any> | undefined>();
  const [visible, setVisible] = useState(false);
  const postPivotNotificationReq = useRequest(postPivotNotification, { manual: true });
  const { initialState } = useModel('@@initialState');
  const params = useParams();
  const { message } = App.useApp();

  const listOptions = (version: string) => {
    const reasonsFilteredByVersion = props.reasons.filter(
      (reason) => reason.protocol === Number(version),
    );

    return reasonsFilteredByVersion.map((reason) => {
      return {
        title: reason.label,
        name: ['options', 'reasons', reason.id],
        critical: reason.critical ? { name: ['options', 'critical_reasons', reason.id] } : null,
      };
    });
  };

  const pivotOptions = (version: string) => {
    const pivotsFilteredByVersion = props.pivots.filter(
      (pivot) => pivot.automation_type === 0 && pivot.protocol === Number(version),
    );

    return pivotsFilteredByVersion.map((pivot) => {
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
      version: yup.string(),
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
      devices: yup.array().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    }),
  });

  const yupSync1 = yupValidator(schema1, form1Ref.current?.getFieldsValue as any);
  const yupSync2 = yupValidator(schema2, form2Ref.current?.getFieldsValue as any);

  return (
    <>
      <a onClick={() => setVisible(true)}> Adicionar Alarme</a>
      <ModalForm
        title="Novos Alarmes"
        width={800}
        open={visible}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setVisible(false),
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
                critical_reasons: Object.keys(values.options.critical_reasons)
                  .filter((key) => values.options.critical_reasons[key])
                  .map((v) => Number(v)),
                reasons: Object.keys(values.options.reasons)
                  .filter((key) => values.options.reasons[key])
                  .map((v) => Number(v)),
                devices: values.options.devices,
                name: values.information.notification_group_name,
                start: values.information.start_at,
                end: values.information.end_at,
                enable: true,
                farm: Number(params.farmId),
                user: initialState?.currentUser.id,
              };
              await postPivotNotificationReq.runAsync(data);
              message.success('Notificação criada com sucesso');
              return true;
            } catch (err) {
              message.error('Fail');
            }
          }}
        >
          <>
            <StepsForm.StepForm
              title="Informações"
              name="information"
              formRef={form1Ref}
              initialValues={{
                information: {
                  notification_group_name: '',
                  all_day: true,
                  start_at: moment().startOf('day'),
                  end_at: moment().endOf('day'),
                  version: 5,
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
                  label="Nome do grupo de notificações"
                />
                <ProFormRadio.Group
                  name={['information', 'version']}
                  layout="horizontal"
                  label={'Versão'}
                  rules={[yupSync1]}
                  options={[
                    {
                      label: 'G1',
                      value: 4.1,
                    },
                    {
                      label: 'G2',
                      value: 5,
                    },
                  ]}
                />
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
                          label="Horário de início"
                          disabled={information.all_day}
                        />

                        <ProFormTimePicker
                          rules={[yupSync1]}
                          allowClear={false}
                          colProps={{ xs: 12, md: 5 }}
                          name={['information', 'end_at']}
                          dataFormat="HH:mm"
                          label="Horário de fim"
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
                      form1Ref.current?.setFieldValue('start_at', moment().startOf('day'));
                      form1Ref.current?.setFieldValue('end_at', moment().endOf('day'));
                    },
                  }}
                  colProps={{ xs: 24, md: 4 }}
                  name={['information', 'all_day']}
                  label="Dia todo?"
                />
              </>
            </StepsForm.StepForm>
            <StepsForm.StepForm
              title="Opções"
              name="options"
              formRef={form2Ref}
              onInit={(values, form) => {
                const reasonsObj: any = {};
                for (let reason of props.reasons) {
                  reasonsObj[reason.id] = false;
                }
                form?.setFieldValue(['options', 'reasons'], reasonsObj);
                form?.setFieldValue(['options', 'critical_reasons'], []);
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <ProForm.Item noStyle shouldUpdate>
                  {() => {
                    return (
                      <ProFormSelect
                        rules={[yupSync2]}
                        label="Pivôs"
                        name={['options', 'devices']}
                        options={pivotOptions(
                          form1Ref.current?.getFieldValue(['information', 'version']),
                        )}
                        fieldProps={{
                          mode: 'multiple',
                        }}
                      />
                    );
                  }}
                </ProForm.Item>
                <ProForm.Item noStyle shouldUpdate>
                  {() => {
                    return (
                      <ProCard
                        gutter={[0, 8]}
                        ghost
                        wrap
                        style={{
                          maxHeight: 450,
                          overflowY: 'auto',
                          overflowX: 'hidden',
                          paddingRight: 4,
                        }}
                      >
                        {listOptions(
                          form1Ref.current?.getFieldValue(['information', 'version']),
                        ).map((item) => (
                          <ProCard
                            collapsible={item.critical}
                            title={item.title}
                            bodyStyle={{ margin: 0, paddingBlock: item.critical ? 16 : '0 16px' }}
                            extra={
                              <Row justify="space-between" align={'middle'}>
                                <Col>
                                  <ProFormSwitch noStyle name={item.name} style={{ margin: 0 }} />
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
                                      <Tooltip title="Critical alerts play different and louder sounds than conventional notifications. These notifications are disruptive and should be used when immediate action is required, for example in the event of unexpected downtime.">
                                        <IoAlertCircleOutline color="#DA1D29" size={20} />
                                      </Tooltip>
                                      <div style={{ paddingLeft: 8 }}>
                                        Do you want to enable critical alerts?
                                      </div>
                                    </Row>
                                  </Col>
                                  <Col>
                                    <ProFormSwitch
                                      noStyle
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

export default AddPivotAlarmForm;
