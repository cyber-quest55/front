import RadioInputContainer from '@/components/RadioInput/RadioInputContainer';
import {
  getEditPivotDeviceControlTable,
  getEditPivotDeviceMonitorTable,
  patchChangeControlRadio,
  patchChangeMonitorRadio,
  postPivotConfig,
} from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormDigit,
  ProFormField,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Row, Typography } from 'antd';
import * as React from 'react';
import * as yup from 'yup';

const EditPivotGeneralComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const { message } = App.useApp();
  const ref = React.useRef();
  const params = useParams();
  const postReq = useRequest(postPivotConfig, { manual: true });
  const intl = useIntl();
  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    aux_brand_model: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),

    controllerconfig: yup.object().shape({
      content: yup.object().shape({
        pivot_parameters: yup.object().shape({
          radius_last: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
          flow_rate: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
          speed: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
          irrigated_area: yup.number().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),

        voltage_limit_enable: yup.object().shape({
          voltage_limit_enable: yup.boolean().required(),
        }),

        voltage_configurations: yup.object().shape({
          minimum_voltage: yup.number().required(),
          maximum_voltage: yup.number().required(),
          stable_time: yup.number().required(),
        }),

        language: yup.object().shape({
          language: yup.string().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),
      }),

      brand_model: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),

      panel_type: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    }),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);
  const { pivot } = props;

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {intl.formatMessage({
            id: 'component.edit.pivot.general.title',
          })}
        </Typography.Title>
      }
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          {intl.formatMessage({
            id: 'component.edit.pivot.button.save',
          })}
        </Button>
      }
      ghost
      gutter={[12, 12]}
    >
      {pivot ? (
        <>
          <div style={{ marginBottom: 20 }}>
            <Typography.Text>
              {intl.formatMessage({
                id: 'component.edit.pivot.lastconfig',
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
                const brands = [
                  'Valley',
                  'Reinke',
                  'Krebs',
                  'Irrigabras',
                  'Fockink',
                  'Carborundum',
                  'Bauer',
                ];

                const newObj = {
                  ...pivot.controllerconfig,
                  ...values.controllerconfig,
                  content: {
                    ...pivot.controllerconfig.content,
                    ...values.controllerconfig.content,
                  },
                  name_pivot_on_config: values.name,
                };

                if (brands.includes(values.aux_brand_model)) {
                  newObj.brand_model = values.aux_brand_model;
                }
                delete newObj.uuid;
                delete newObj.device;

                await postReq.runAsync(
                  {
                    farmId: params.farmId as any,
                    pivotId: params.pivotId as any,
                    deviceId: pivot.control as any,
                  },
                  newObj,
                );

                await props.queryPivotByIdStart({
                  farmId: params.farmId as any,
                  pivotId: params.pivotId as any,
                });

                message.success('Configs Atualizadas com Sucesso');
              } catch (err) {
                message.error('Fail');
              }

              setLoading(false);
            }}
            onInit={(pvalues, pform) => {
              const values = [
                'Valley',
                'Reinke',
                'Krebs',
                'Irrigabras',
                'Fockink',
                'Carborundum',
                'Bauer',
              ];

              if (values.includes(pvalues?.controllerconfig?.brand_model)) {
                pform.setFieldValue('aux_brand_model', pvalues?.controllerconfig?.brand_model);
              }

              if (!values.includes(pvalues?.controllerconfig?.brand_model)) {
                pform.setFieldValue('aux_brand_model', 'Outro');
              }
            }}
            initialValues={{ ...pivot }}
          >
            <Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
              <RadioInputContainer
                name={['base_radio_id']}
                operable={false}
                setFieldValue={'2'}
                label={intl.formatMessage({
                  id: 'component.edit.pivot.general.centralradio.label',
                })}
                status={'processing'}
                span={{
                  xs: 24,
                  md: 6,
                }}
                deviceType=""
                device=""
              />
              <RadioInputContainer
                name={['control_radio_id']}
                operable
                setFieldValue={'2'}
                label={intl.formatMessage({
                  id: 'component.edit.pivot.general.controllerradio.label',
                })}
                status={'processing'}
                span={{ xs: 24, md: 6 }}
                deviceType="Controlador"
                device="pivô"
                request={getEditPivotDeviceControlTable}
                requestChange={patchChangeControlRadio}
                fieldIndex={'control'}
              />
              <RadioInputContainer
                name={['monitor_radio_id']}
                operable
                setFieldValue={'2'}
                label={intl.formatMessage({
                  id: 'component.edit.pivot.general.gpsradio.label',
                })}
                status={'processing'}
                span={{ xs: 24, md: 6 }}
                deviceType="GPS"
                device="pivô"
                request={getEditPivotDeviceMonitorTable}
                requestChange={patchChangeMonitorRadio}
                fieldIndex={'monitor'}
              />
              <RadioInputContainer
                operable={false}
                setFieldValue={'2'}
                label={intl.formatMessage({
                  id: 'component.edit.pivot.general.pumpradio.label',
                })}
                status={'processing'}
                span={{ xs: 24, md: 6 }}
                deviceType=""
                device=""
              />
            </Row>
            <ProFormField
              rules={[yupSync]}
              name="name"
              label={intl.formatMessage({
                id: 'component.edit.pivot.general.pivotname.label',
              })}
              colProps={{ xs: 24, md: 8, xl: 8 }}
            />
            <ProFormSelect
              rules={[yupSync]}
              name={['controllerconfig', 'content', 'language', 'language']}
              label={intl.formatMessage({
                id: 'component.edit.pivot.general.devicelanguage.label',
              })}
              colProps={{ xs: 24, md: 8, xl: 8 }}
              options={[
                { label: 'English', value: 1 },
                { label: 'Português', value: 2 },
                { label: 'German', value: 3 },
                { label: 'Spanish', value: 4 },
                { label: 'Russian', value: 5 },
              ]}
            />
            <ProFormDigit
              rules={[yupSync]}
              name={['controllerconfig', 'content', 'pivot_parameters', 'radius_last']}
              label={intl.formatMessage({
                id: 'component.edit.pivot.general.radiuslasttower.label',
              })}
              colProps={{ xs: 24, md: 8 }}
              fieldProps={{
                addonAfter: 'm',
                controls: false,
              }}
            />
            <ProFormDigit
              rules={[yupSync]}
              name={['controllerconfig', 'content', 'pivot_parameters', 'flow_rate']}
              label={intl.formatMessage({
                id: 'component.edit.pivot.general.flowrate.label',
              })}
              colProps={{ xs: 24, md: 8 }}
              fieldProps={{
                addonAfter: 'm³/h',
                controls: false,
              }}
            />
            <ProFormDigit
              rules={[yupSync]}
              name={['controllerconfig', 'content', 'pivot_parameters', 'speed']}
              label={intl.formatMessage({
                id: 'component.edit.pivot.general.endtowerspeed.label',
              })}
              colProps={{ xs: 24, md: 8 }}
              fieldProps={{
                addonAfter: 'm/h',
                controls: false,
              }}
            />
            <ProFormDigit
              rules={[yupSync]}
              name={['controllerconfig', 'content', 'pivot_parameters', 'irrigated_area']}
              label={intl.formatMessage({
                id: 'component.edit.pivot.general.irrigationarea.label',
              })}
              colProps={{ xs: 24, md: 8 }}
              fieldProps={{
                addonAfter: 'ha',
                controls: false,
              }}
            />
            <ProFormSelect
              rules={[yupSync]}
              name="aux_brand_model"
              allowClear={false}
              options={[
                {
                  value: 'Bauer',
                  label: 'Bauer',
                },
                {
                  value: 'Carborundum',
                  label: 'Carborundum',
                },
                {
                  value: 'Fockink',
                  label: 'Fockink',
                },
                {
                  value: 'Irrigabras',
                  label: 'Irrigabras',
                },
                {
                  value: 'Krebs',
                  label: 'Krebs',
                },
                {
                  value: 'Reinke',
                  label: 'Reinke',
                },
                {
                  value: 'Valley',
                  label: 'Valley',
                },
                {
                  value: 'Outro',
                  label: 'Outro',
                },
              ]}
              label={intl.formatMessage({
                id: 'component.edit.pivot.general.brandmodel.label',
              })}
              colProps={{ xs: 24, md: 8 }}
            />
            <ProFormDependency name={['aux_brand_model']}>
              {({ aux_brand_model }) => {
                const values = [
                  'Valley',
                  'Reinke',
                  'Krebs',
                  'Irrigabras',
                  'Fockink',
                  'Carborundum',
                  'Bauer',
                ];

                if (!values.includes(aux_brand_model)) {
                  return (
                    <ProFormField
                      rules={[yupSync]}
                      name={['controllerconfig', 'brand_model']}
                      label={intl.formatMessage({
                        id: 'component.edit.pivot.general.other.label',
                      })}
                      colProps={{ xs: 24, md: 8 }}
                    />
                  );
                }
              }}
            </ProFormDependency>

            <ProFormSelect
              rules={[yupSync]}
              name={['controllerconfig', 'panel_type']}
              options={[
                {
                  value: 1,
                  label: 'Nexus',
                },
              ]}
              allowClear={false}
              label={intl.formatMessage({
                id: 'component.edit.pivot.general.paneltype.label',
              })}
              colProps={{ xs: 24, md: 8 }}
            />

            <ProFormCheckbox
              rules={[yupSync]}
              name={['controllerconfig', 'content', 'voltage_limit_enable', 'voltage_limit_enable']}
              colProps={{ xs: 24, md: 24 }}
            >
              {intl.formatMessage({
                id: 'component.edit.pivot.general.vontagecontrol.label',
              })}
            </ProFormCheckbox>

            <ProFormDependency name={['controllerconfig']}>
              {({ controllerconfig }) => {
                return (
                  <>
                    <ProFormDigit
                      rules={[yupSync]}
                      name={[
                        'controllerconfig',
                        'content',
                        'voltage_configurations',
                        'minimum_voltage',
                      ]}
                      label={intl.formatMessage({
                        id: 'component.edit.pivot.general.minopv.label',
                      })}
                      disabled={
                        !controllerconfig?.content?.voltage_limit_enable?.voltage_limit_enable
                      }
                      colProps={{ xs: 24, md: 8 }}
                      fieldProps={{
                        addonAfter: 'V',
                        controls: false,
                      }}
                    />
                    <ProFormDigit
                      rules={[yupSync]}
                      name={[
                        'controllerconfig',
                        'content',
                        'voltage_configurations',
                        'maximum_voltage',
                      ]}
                      label={intl.formatMessage({
                        id: 'component.edit.pivot.general.maxopv.label',
                      })}
                      disabled={
                        !controllerconfig?.content?.voltage_limit_enable?.voltage_limit_enable
                      }
                      colProps={{ xs: 24, md: 8 }}
                      fieldProps={{
                        addonAfter: 'V',
                        controls: false,
                      }}
                    />
                    <ProFormDigit
                      rules={[yupSync]}
                      name={[
                        'controllerconfig',
                        'content',
                        'voltage_configurations',
                        'stable_time',
                      ]}
                      label={intl.formatMessage({
                        id: 'component.edit.pivot.general.timeout.label',
                      })}
                      disabled={
                        !controllerconfig?.content?.voltage_limit_enable?.voltage_limit_enable
                      }
                      colProps={{ xs: 24, md: 8 }}
                      fieldProps={{
                        addonAfter: 'min',
                        controls: false,
                      }}
                    />
                  </>
                );
              }}
            </ProFormDependency>
          </ProForm>
        </>
      ) : null}
    </ProCard>
  );
};

export default EditPivotGeneralComponent;
