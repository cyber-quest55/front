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
import { updateFarm } from '@/services/farm';
import countries from '@/utils/data/country';
import { yupValidator } from '@/utils/adapters/yup';
import { useRequest } from 'ahooks';
import {
	App,
	Button,
	Form,
	Row,
	Typography
} from 'antd';
import {
	FunctionComponent,
	ReactElement,
	useCallback,
	useRef,
} from 'react';
import * as yup from 'yup';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
}

// Component
const EditFarmContactComponent: FunctionComponent<Props> = ({
	farm,
	queryFarmById
}): ReactElement => {
	// Hooks
	const { message } = App.useApp();
	const intl = useIntl();
	const ref = useRef();
	const [ form ] = Form.useForm()

	const reqSaveFarm = useRequest(updateFarm, { manual: true });

	// Form validation schema
	const yupSchema = useCallback(() => yup.object().shape({
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
		country: yup.string().required(
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
	}), [intl]);
	const yupSync = yupValidator(yupSchema(), form.getFieldsValue);
	
	// Main TSX
  return (
    <ProCard
			title={
				<Typography.Title style={{ margin: 0 }} level={2}>
					{intl.formatMessage({
						id: 'component.edit.farm.contact.title',
					})}
				</Typography.Title>
			}
			extra={
				<Button
					loading={reqSaveFarm.loading}
					disabled={reqSaveFarm.loading}
					icon={<SaveOutlined />}
					type="primary"
					onClick={form.submit}
				>
					{intl.formatMessage({
						id: 'component.edit.farm.button.save',
					})}
				</Button>
			}
			ghost
			gutter={[12, 12]}
		>
			{
				farm ? (
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
						disabled={reqSaveFarm.loading}
						onFinish={async (values: any) => {
							try {
								// Backend supports updates from single fields
								// In that case this will be sending just modified fields
								const payload = {
									...values,
									phone: values.phone.replace(/\D/g, ''),
									postal_code: values.postal_code.replace(/\D/g, ''),
								};
								await reqSaveFarm.runAsync({
									id: farm.id.toString(),
									body: payload,
								});
								queryFarmById({ id: farm.id });
								message.success(intl.formatMessage({
									id: 'component.edit.farm.messages.save.success',
								}));
							} catch (err) {
								message.error(intl.formatMessage({
									id: 'component.edit.farm.messages.save.error',
								}));
							}
						}}
					>
						<Typography.Title style={{ margin: 0 }} level={5}>
							{intl.formatMessage({ id: 'component.edit.farm.contact.contact.label' })}
						</Typography.Title>
						<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
							<CustomInput.Cellphone
								//countryCode={farm?.phone}
								country={farm?.country}
								formItemProps={{
									rules: [yupSync],
									name: ['phone'],
									label: intl.formatMessage({
										id: 'component.edit.farm.contact.phone.label',
									})
								}}
								colProps={{ xs: 24, md: 8, xl: 8 }}
							/>
							
						</Row>
						<Typography.Title style={{ margin: 0 }} level={5}>
							{intl.formatMessage({ id: 'component.edit.farm.contact.address.label' })}
						</Typography.Title>
						<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
							<CustomInput.Cep
								country={farm?.country || ''}
								colProps={{ xs: 24, md: 8, xl: 8 }}
								formItemProps={{
									rules: [yupSync],
									name: ['postal_code'],
									label: intl.formatMessage({
										id: 'component.edit.farm.contact.postalcode.label',
									})
								}}
							/>
							<ProFormField
								rules={[yupSync]}
								name={['address']}
								label={intl.formatMessage({ id: 'component.edit.farm.contact.street.label' })}
								colProps={{ xs: 24, md: 16, xl: 16 }}
							/>
							<ProFormField
								rules={[yupSync]}
								name={['city']}
								label={intl.formatMessage({ id: 'component.edit.farm.contact.city.label' })}
								colProps={{ xs: 24, md: 8, xl: 8 }}
							/>
							<ProFormField
								rules={[yupSync]}
								name={['state']}
								label={intl.formatMessage({ id: 'component.edit.farm.contact.state.label' })}
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
								name={['country']}
								showSearch
								label={intl.formatMessage({
									id: 'component.create.farm.modal.country.label',
								})}
								colProps={{ xs: 24, md: 8, xl: 8 }}
							/>
						</Row>
					</ProForm>
				) : null
			}
			
    </ProCard>
  )
};

export default EditFarmContactComponent;