import { CustomInput } from '@/components/Input';
import { getCep, patchUserInfo, postProfile } from '@/services/user';
import { yupValidator } from '@/utils/adapters/yup';
import countries, { countryToFlag } from '@/utils/data/country';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDependency,
  ProFormField,
  ProFormGroup,
  ProFormInstance,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Typography } from 'antd';
import moment from 'moment';
import * as React from 'react';
import * as yup from 'yup';

const EditGeneralComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();
  const ref = React.useRef<ProFormInstance<any> | undefined>();
  const { currentUser } = props;
  const postProfileReq = useRequest(postProfile, { manual: true });
  const patchUserInfoReq = useRequest(patchUserInfo, { manual: true });
  const [loading, setLoading] = React.useState(false);

  const schema = yup.object().shape({
    first_name: yup
      .string()
      .min(3, intl.formatMessage({ id: 'validations.min' }, { value: 3 }))
      .max(36, intl.formatMessage({ id: 'validations.max' }, { value: 36 }))
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    last_name: yup
      .string()
      .min(3, intl.formatMessage({ id: 'validations.min' }, { value: 3 }))
      .max(36, intl.formatMessage({ id: 'validations.max' }, { value: 36 }))
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
    cpf: yup.string().matches(
      /^[^_]+$/,
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    country: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    email: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    prefix_cell_phone: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    cell_phone: yup.string().matches(
      /^[^_]+$/,
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    phone: yup.string(),
    birth: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    postal_code: yup.string().matches(
      /^[^_]+$/,
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    state: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    city: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    address_1: yup.string().required(
      intl.formatMessage({
        id: 'validations.required',
      }),
    ),
    district: yup.string(),
    number: yup.string(),
    address_2: yup.string(),
  });

  const yupSync = yupValidator(schema, ref.current?.getFieldsValue as any);

  const onBlurBilling: React.FocusEventHandler<HTMLInputElement> = async (v) => {
    const { data } = await getCep(v.target.value);
    const formsValue = ref.current?.getFieldsValue();

    if (data && !data.erro) {
      ref.current?.setFieldsValue({
        ...formsValue,
        address_1: data.logradouro,
        district: data.bairro,
        state: data.uf,
        city: data.localidade,
      });
    }
  };

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={5}>
          {intl.formatMessage({
            id: 'component.edit.profile.general.title',
          })}
        </Typography.Title>
      }
      extra={
        <Button icon={<SaveOutlined />} type="primary" loading={loading} onClick={form.submit}>
          {intl.formatMessage({
            id: 'component.edit.profile.general.button.save',
          })}
        </Button>
      }
      ghost
      gutter={[12, 12]}
    >
      {currentUser ? (
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
              await postProfileReq.runAsync({
                name: `${values.first_name} ${values.last_name}`,
                email: values.email,
                birth: values.birth,
                country: values.country,
                state: values.state,
                city: values.city,
                district: values.district,
                address_1: values.address_1,
                address_2: values.address_2,
                number: values.number,
                postal_code: values.postal_code?.replaceAll(/[^\d]/g, '') ?? null,
                phone: values.phone?.replaceAll(/[^\d]/g, '') ?? null,
                prefix_cell_phone: values.prefix_cell_phone?.replaceAll(/[^\d]/g, '') ?? null,
                cell_phone: values.cell_phone?.replaceAll(/[^\d]/g, '') ?? null,
                cpf: values.cpf?.replaceAll(/[^\d]/g, '') ?? null,
                language: currentUser.language,
                role: null,
              });

              await patchUserInfoReq.runAsync({
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
              });

              message.success('Perfil Atualizado com Sucesso');
            } catch (err) {
              console.error(err);
              message.error('Fail');
            } finally {
              setLoading(false);
            }
          }}
          onInit={(values, pform: any) => {
            pform.setFieldValue('birth', currentUser.birth ? moment(currentUser.birth) : moment());
            pform.setFieldValue(
              'prefix_cell_phone',
              currentUser.prefix_cell_phone.padStart(4, '0'),
            );
          }}
          initialValues={{ ...currentUser }}
        >
          <ProFormGroup
            title={intl.formatMessage({
              id: 'component.edit.profile.general.personalinfo.title',
            })}
            style={{ width: '100%', justifyContent: 'stretch' }}
          >
            <ProFormField
              rules={[yupSync]}
              name="first_name"
              label={intl.formatMessage({
                id: 'component.edit.profile.general.personalinfo.firstname.label',
              })}
              colProps={{ xs: 24, md: 8, xl: 8 }}
            />
            <ProFormField
              rules={[yupSync]}
              name="last_name"
              label={intl.formatMessage({
                id: 'component.edit.profile.general.personalinfo.lastname.label',
              })}
              colProps={{ xs: 24, md: 8, xl: 8 }}
            />
            <ProFormField
              rules={[yupSync]}
              name="email"
              label={intl.formatMessage({
                id: 'component.edit.profile.general.personalinfo.email.label',
              })}
              colProps={{ xs: 24, md: 8, xl: 8 }}
            />
            <ProFormSelect
              rules={[yupSync]}
              colProps={{ xs: 24, sm: 8, md: 8 }}
              request={async () => {
                return countries.map((item) => {
                  const country = item.content.split('_');
                  delete country[0];
                  return {
                    label: country.join(' '),
                    value: item.iso,
                  };
                });
              }}
              name={'country'}
              showSearch
              label={intl.formatMessage({
                id: 'component.edit.profile.general.personalinfo.country.label',
              })}
            />
            <ProFormDependency
              name={['country', 'prefix_cell_phone']}
              colon
              style={{ width: '100%' }}
            >
              {({ country, prefix_cell_phone }) => {
                return (
                  <>
                    <CustomInput.Document
                      colProps={{ xs: 24, sm: 8, md: 8 }}
                      onChangeDocType={() => {}}
                      formItemProps={{
                        rules: [yupSync],
                        label: intl.formatMessage({
                          id: 'component.edit.profile.general.personalinfo.document.label',
                        }),
                        name: 'cpf',
                      }}
                      country={country}
                    />
                    <ProFormDatePicker
                      rules={[yupSync]}
                      name="birth"
                      label={intl.formatMessage({
                        id: 'component.edit.profile.general.personalinfo.birth.label',
                      })}
                      fieldProps={{
                        style: { width: '100%' },
                      }}
                      colProps={{ xs: 24, md: 8, xl: 8 }}
                    />
                    <ProFormSelect
                      name="prefix_cell_phone"
                      label={intl.formatMessage({
                        id: 'component.edit.profile.general.personalinfo.countrycode.label',
                      })}
                      colProps={{ xs: 24, md: 8 }}
                      showSearch
                      fieldProps={{
                        optionItemRender(item: any) {
                          return (
                            <span>
                              <span>{countryToFlag(item.iso)}</span>
                              <span> + {parseInt(item.value)}</span>
                            </span>
                          );
                        },
                      }}
                      options={countries
                        .filter((c, index, self) => {
                          return self.findIndex((s) => s.phone === c.phone) === index;
                        })
                        .map((c) => {
                          return {
                            value: c.phone,
                            label: c.phone,
                            iso: c.iso,
                          };
                        })}
                    />
                    <CustomInput.Cellphone
                      countryCode={prefix_cell_phone}
                      colProps={{ xs: 24, md: 8, xl: 8 }}
                      formItemProps={{
                        rules: [yupSync],
                        label: intl.formatMessage({
                          id: 'component.edit.profile.general.personalinfo.cellphone.label',
                        }),
                        name: 'cell_phone',
                      }}
                    />
                    <CustomInput.Cellphone
                      countryCode={prefix_cell_phone}
                      colProps={{ xs: 24, md: 8, xl: 8 }}
                      formItemProps={{
                        rules: [yupSync],
                        label: intl.formatMessage({
                          id: 'component.edit.profile.general.personalinfo.landline.label',
                        }),
                        name: 'phone',
                      }}
                    />
                  </>
                );
              }}
            </ProFormDependency>
          </ProFormGroup>
          <ProFormDependency name={['country']} colon style={{ width: '100%' }}>
            {({ country }) => {
              return (
                <ProFormGroup
                  title={intl.formatMessage({
                    id: 'component.edit.profile.general.contactaddress.title',
                  })}
                >
                  <CustomInput.Cep
                    country={country}
                    colProps={{ xs: 24, md: 8, xl: 8 }}
                    formItemProps={{
                      rules: [yupSync],
                      label: intl.formatMessage({
                        id: 'component.edit.profile.general.contactaddress.postalcode.label',
                      }),
                      name: 'postal_code',
                    }}
                    fieldProps={{
                      onBlur: onBlurBilling,
                    }}
                  />
                  <ProFormField
                    rules={[yupSync]}
                    name="state"
                    label={intl.formatMessage({
                      id: 'component.edit.profile.general.contactaddress.state.label',
                    })}
                    colProps={{ xs: 24, md: 8, xl: 8 }}
                  />
                  <ProFormField
                    rules={[yupSync]}
                    name="city"
                    label={intl.formatMessage({
                      id: 'component.edit.profile.general.contactaddress.city.label',
                    })}
                    colProps={{ xs: 24, md: 8, xl: 8 }}
                  />
                  <ProFormField
                    rules={[yupSync]}
                    name="address_1"
                    label={intl.formatMessage({
                      id: 'component.edit.profile.general.contactaddress.address.label',
                    })}
                    colProps={{ xs: 24, md: 8, xl: 8 }}
                  />
                  <ProFormField
                    rules={[yupSync]}
                    name="district"
                    label={intl.formatMessage({
                      id: 'component.edit.profile.general.contactaddress.district.label',
                    })}
                    colProps={{ xs: 24, md: 8, xl: 8 }}
                  />
                  <ProFormField
                    rules={[yupSync]}
                    name="number"
                    label={intl.formatMessage({
                      id: 'component.edit.profile.general.contactaddress.number.label',
                    })}
                    colProps={{ xs: 24, md: 8, xl: 8 }}
                  />
                  <ProFormField
                    rules={[yupSync]}
                    name="address_2"
                    label={intl.formatMessage({
                      id: 'component.edit.profile.general.contactaddress.addressdetails.label',
                    })}
                    colProps={{ xs: 24, md: 8, xl: 8 }}
                  />
                </ProFormGroup>
              );
            }}
          </ProFormDependency>
        </ProForm>
      ) : null}
    </ProCard>
  );
};

export default EditGeneralComponent;
