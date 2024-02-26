// Dependencies
import {
	ProCard,
	ProForm,
	ProFormField,
	ProFormSelect
} from '@ant-design/pro-components';
import { CustomInput } from '@/components/Input';
import { SaveOutlined } from '@ant-design/icons';
import { queryFarmById } from '@/models/farm-by-id';
import { useIntl } from '@umijs/max';
import countries from '@/utils/data/country';
import { yupValidator } from '@/utils/adapters/yup';
import {
	Button,
	Col,
	Form,
	Row,
	Typography
} from 'antd';
import {
	FunctionComponent,
	ReactElement,
	useCallback,
	useState,
	useRef
} from 'react';
import * as yup from 'yup';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

// Component
const EditFarmBillingComponent: FunctionComponent<Props> = ({
	farm
}): ReactElement => {
	// Hooks
	const intl = useIntl();
	const ref = useRef();
	const [ form ] = Form.useForm()
	const [ loading, setLoading ] = useState<boolean>(false);

	// Form validation schema
	const yupSchema = useCallback(() => yup.object().shape({
		billing: yup.object().shape({
			address: yup.string().required(
				intl.formatMessage({
					id: 'validations.required',
				}),
			),
			city: yup.string().required(
				intl.formatMessage({
					id: 'validations.required',
				}),
			),
			company_name: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
			country: yup.string().required(
				intl.formatMessage({
					id: 'validations.required',
				}),
			),
			document: yup.string().matches(
        /^[^_]+$/,
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
			email: yup.string().required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
			phone: yup.string().matches(
				/^[^_]+$/,
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
		}),
	}), [intl]);
	const yupSync = yupValidator(yupSchema(), form.getFieldsValue);

	// Main TSX
  return (
    <ProCard
			title={
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({
						id: 'component.edit.farm.billing.title',
					})}
				</Typography.Title>
			}
			extra={
				<Button loading={loading} icon={<SaveOutlined />} type="primary">
					{intl.formatMessage({
						id: 'component.edit.farm.button.save',
					})}
				</Button>
			}
			ghost
			gutter={[12, 12]}
		>
			<ProForm
				validateTrigger="onBlur"
				layout="vertical"
				name="general_form"
				rowProps={{ gutter: [8, 8] }}
				submitter={false}
				form={form}
       	formRef={ref}
				grid
				initialValues={{ ...farm }}
				onFinish={async (values: any) => {
					console.log('[submit values]', values);
					setLoading(true);

					// Backend does not support modular update so the entire farm obj must be sent
					const newObj = { ...farm }		

					console.log('submit formatted', newObj)
					setLoading(false);
				}}
			>
				<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
					<Col xs={24}>
						<Typography.Paragraph style={{ margin: 0 }}>
							{intl.formatMessage({ id: 'component.edit.farm.billing.billing.title' })}
						</Typography.Paragraph>
					</Col>
				</Row>
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({ id: 'component.edit.farm.billing.billingheading.label' })}
				</Typography.Title>
				<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
					<CustomInput.Document
						colProps={{ xs: 24, sm: 24, md: 12 }}
						formItemProps={{
							rules: [yupSync],
							label: intl.formatMessage({ id: 'component.edit.farm.billing.document.label' }),
							name: ['billing', 'document'],
						}}
						country={farm?.country || ''}
						formRef={ref}
						selectItemProps={{
							name: ['billing', 'docType'],
						}}
					/>
					<ProFormField
            rules={[yupSync]}
						colProps={{ xs: 24, md: 24, xl: 12 }}
            label={intl.formatMessage({ id: 'component.edit.farm.billing.companyname.label' })}
            name={['billing', 'company_name']}
          />
					<CustomInput.Cellphone
            //countryCode={farm?.phone}
            colProps={{ xs: 24, sm: 24, md: 8 }}
            formItemProps={{
            	rules: [yupSync],
              label: intl.formatMessage({ id: 'component.edit.farm.billing.phone.label' }),
              name: ['billing', 'phone'],
            }}
            country={farm?.country}
          />
					<ProFormField
            rules={[yupSync]}
						colProps={{ xs: 24, sm: 24, md: 8 }}
            name={['billing', 'email']}
            label={intl.formatMessage({ id: 'component.edit.farm.billing.email.label' })}
          />
				</Row>
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({ id: 'component.edit.farm.billing.billingaddress.label' })}
				</Typography.Title>
				<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
					<CustomInput.Cep
						country={farm?.country || ''}
						colProps={{ xs: 24, md: 8, xl: 8 }}
						formItemProps={{
							rules: [yupSync],
							name: ['billing', 'postal_code'],
							label: intl.formatMessage({
								id: 'component.edit.farm.billing.postalcode.label',
							})
						}}
					/>
					<ProFormField
            rules={[yupSync]}
            name={['billing', 'address']}
            label={intl.formatMessage({ id: 'component.edit.farm.billing.street.label' })}
						colProps={{ xs: 24, md: 16, xl: 16 }}
          />
					<ProFormField
            rules={[yupSync]}
            name={['billing', 'city']}
            label={intl.formatMessage({ id: 'component.edit.farm.billing.city.label' })}
						colProps={{ xs: 24, md: 8, xl: 8 }}
          />
					<ProFormField
            rules={[yupSync]}
            name={['billing', 'state']}
            label={intl.formatMessage({ id: 'component.edit.farm.billing.state.label' })}
						colProps={{ xs: 24, md: 8, xl: 8 }}
          />
					<ProFormSelect
            rules={[yupSync]}
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
            name={['billing', 'country']}
            label={intl.formatMessage({ id: 'component.edit.farm.billing.country.label' })}
						colProps={{ xs: 24, md: 8, xl: 8 }}
            showSearch
          />
				</Row>
			</ProForm>
    </ProCard>
  )
};

export default EditFarmBillingComponent;