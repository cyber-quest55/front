import RadioInputContainer from '@/components/RadioInput/RadioInputContainer';
import {
  getEditRepeaterDeviceTable,
  patchChangeRepeaterRadio,
  patchRepeaterConfig,
  postChangeRepeaterManualRadio,
} from '@/services/repeaters';

import { yupValidator } from '@/utils/adapters/yup';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormField,
  ProFormGroup,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Row, Typography } from 'antd';
import * as React from 'react';
import * as yup from 'yup';

const EditRepeaterGeneralComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();
  const ref = React.useRef();
  const params = useParams();
  const { repeater } = props;
  const patchRepeaterConfigReq = useRequest(patchRepeaterConfig, { manual: true });
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
    energy_type: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  const setRepeaterRadioId = (value: string) => {
    form.setFieldValue(['repeater_radio_id'], value);
  };

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {intl.formatMessage({
            id: 'component.edit.repeater.general.title',
          })}
        </Typography.Title>
      }
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          {intl.formatMessage({
            id: 'component.edit.repeater.button.save',
          })}
        </Button>
      }
      ghost
      gutter={[12, 12]}
    >
      {repeater ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <Typography.Text>
              {intl.formatMessage({
                id: 'component.edit.repeater.lastconfig',
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

              const newConfigData = {
                name: values.name,
                position: repeater.position,
                energy_type: values.energy_type,
              };

              try {
                await patchRepeaterConfigReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    repeaterId: params.repeaterId as any,
                  },
                  newConfigData,
                );

                await props.queryRepeaterById({
                  farmId: params.farmId as any,
                  repeaterId: params.repeaterId as any,
                });

                message.success('Configs Atualizadas com Sucesso');
              } catch (err) {
                console.error(err);
                message.error('Fail');
              }

              setLoading(false);
            }}
            onInit={(pvalues, pform) => {
              pform.setFieldValue('repeater_radio_id', repeater.repeater_radio_id);
            }}
            initialValues={{ ...repeater }}
          >
            <Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
              <RadioInputContainer
                name="base_radio_id"
                operable={false}
                setFieldValue={form.setFieldValue}
                label={intl.formatMessage({
                  id: 'component.edit.repeater.general.centralradio.label',
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
                name="repeater_radio_id"
                operable
                setFieldValue={setRepeaterRadioId}
                label={intl.formatMessage({
                  id: 'component.edit.repeater.general.repeaterradio.label',
                })}
                deviceId={repeater.id}
                status={'processing'}
                span={{ xs: 24, md: 8 }}
                deviceType="Repeater"
                device="repeater"
                form={form}
                request={getEditRepeaterDeviceTable}
                requestChange={postChangeRepeaterManualRadio}
                requestSwapChange={patchChangeRepeaterRadio}
                requestDeviceId={'repeaterId'}
                fieldIndex={'repeater'}
                requestAfterChange={props.queryRepeaterById}
              />
            </Row>
            <ProFormGroup>
              <ProFormField
                rules={[yupSync]}
                name="name"
                label={intl.formatMessage({
                  id: 'component.edit.repeater.general.name.label',
                })}
                colProps={{ xs: 24, md: 8, xl: 8 }}
              />
              <ProFormSelect
                rules={[yupSync]}
                name={'energy_type'}
                label={intl.formatMessage({
                  id: 'component.edit.repeater.general.type.label',
                })}
                colProps={{ xs: 24, md: 8, xl: 8 }}
                options={[
                  {
                    value: 'Solar',
                    label: intl.formatMessage({
                      id: 'component.edit.repeater.general.type.solar.value',
                    }),
                  },
                  {
                    value: 'Bivolt',
                    label: intl.formatMessage({
                      id: 'component.edit.repeater.general.type.bivolt.value',
                    }),
                  },
                ]}
              />
            </ProFormGroup>
          </ProForm>
        </>
      ) : null}
    </ProCard>
  );
};

export default EditRepeaterGeneralComponent;
