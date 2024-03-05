import { createWeatherStation } from '@/services/weatherstation';
import { yupValidator } from '@/utils/adapters/yup';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Col, Row } from 'antd';
import * as yup from 'yup';

interface WeatherStationFormProps {
  form: any;
  setLoading: (loading: boolean) => void;
  closeModalForm: () => void;
}

const WeatherStationForm: React.FC<WeatherStationFormProps> = (props) => {
  const createWeatherStationReq = useRequest(createWeatherStation, { manual: true });
  const intl = useIntl();
  const { message } = App.useApp();
  const params = useParams();

  const schema = yup.object().shape({
    name: yup
      .string()
      .max(
        40,
        intl.formatMessage(
          {
            id: 'validations.max',
          },
          { value: 40 },
        ),
      )
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    manufacturer: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    accessKey: yup.string().when('manufacturer', {
      is: 'Plugfield',
      then(schema) {
        return schema.required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        );
      },
    }),
    username: yup
      .string()
      .email()
      .when('manufacturer', {
        is: 'Plugfield',
        then(schema) {
          return schema.required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          );
        },
      }),
    password: yup.string().when('manufacturer', {
      is: 'Plugfield',
      then(schema) {
        return schema.required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        );
      },
    }),
    apiKey: yup.string().when('manufacturer', {
      is: 'Davis',
      then(schema) {
        return schema.required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        );
      },
    }),
    apiSecret: yup.string().when('manufacturer', {
      is: 'Davis',
      then(schema) {
        return schema.required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        );
      },
    }),
    identification: yup.string().when('manufacturer', {
      is: 'Davis',
      then(schema) {
        return schema.required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        );
      },
    }),
  });

  const yupSync = yupValidator(schema, props.form.getFieldsValue);

  return (
    <ProForm
      validateTrigger="onBlur"
      layout="vertical"
      submitter={false}
      preserve={false}
      form={props.form}
      name="weatherstation_form"
      initialValues={{
        manufacturer: 'Plugfield',
      }}
      onFinish={async (values: any) => {
        try {
          props.setLoading(true);

          let data = null;

          if (values.manufacturer === 'Plugfield') {
            data = {
              manufacturer: 'Plugfield',
              name: values.name,
              accessKey: values.accessKey,
              username: values.username,
              password: values.password,
            };
          } else {
            data = {
              manufacturer: 'Davis',
              name: values.name,
              apiKey: values.apiKey,
              apiSecret: values.apiSecret,
              identification: values.identification,
            };
          }

          await createWeatherStationReq.runAsync({ farmId: params.id as any }, data);
          message.success('Equipamento Criado com Sucesso');
          props.closeModalForm();
        } catch (err) {
          console.error(err);
          message.error('Fail');
        } finally {
          props.setLoading(false);
        }
      }}
    >
      <Row gutter={[12, 12]}>
        <Col xs={24}>
          <Row>
          <Col xs={24} sm={12}>
            <ProFormSelect
              rules={[yupSync]}
              allowClear={false}
              valueEnum={{
                Plugfield: 'Plugfield',
                Davis: 'Davis',
              }}
              name="manufacturer"
              label={intl.formatMessage({
                id: 'component.adddevice.modal.form.step2.weatherstation.manufacturer.label',
              })}
            />
          </Col>
            </Row>
        </Col>
        <Col xs={24} sm={12}>
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'component.adddevice.modal.form.step2.weatherstation.name.label',
            })}
            rules={[yupSync]}
          />
        </Col>
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            return form.getFieldValue('manufacturer') === 'Plugfield' ? (
              <>
                <Col xs={24} sm={12}>
                  <ProFormText
                    name="accessKey"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.weatherstation.accesskey.label',
                    })}
                    rules={[yupSync]}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <ProFormText
                    name="username"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.weatherstation.email.label',
                    })}
                    rules={[yupSync]}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <ProFormText.Password
                    name="password"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.weatherstation.password.label',
                    })}
                    rules={[yupSync]}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col xs={24} sm={12}>
                  <ProFormText
                    name="apiKey"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.weatherstation.apikey.label',
                    })}
                    rules={[yupSync]}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <ProFormText
                    name="apiSecret"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.weatherstation.apisecret.label',
                    })}
                    rules={[yupSync]}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <ProFormText
                    name="identification"
                    label={intl.formatMessage({
                      id: 'component.adddevice.modal.form.step2.weatherstation.identification.label',
                    })}
                    rules={[yupSync]}
                  />
                </Col>
              </>
            );
          }}
        </ProForm.Item>
      </Row>
    </ProForm>
  );
};

export default WeatherStationForm;
