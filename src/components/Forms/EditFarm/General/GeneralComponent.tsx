// Dependencies
import {
	ProCard,
	ProForm,
	ProFormField,
	ProFormSelect
} from '@ant-design/pro-components';
import { SaveOutlined } from '@ant-design/icons';
import RadioInputContainer from '@/components/RadioInput/RadioInputContainer';
import { queryFarmById } from '@/models/farm-by-id';
import { updatedBase } from '@/services/farm'
import { getIrpds } from '@/services/irpd';
import { getMeterSystem } from '@/services/metersystem';
import { getPivots } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { useIntl } from '@umijs/max'
import { Button, Form, Typography, Row } from 'antd';
import { FunctionComponent, ReactElement, useRef, useState, useCallback } from 'react';
import * as yup from 'yup';

// Component props
type Props = {
	farm?: API.GetFarmFullResponse;
	queryFarmById: typeof queryFarmById;
};

// Component
const EditFarmGeneralComponent: FunctionComponent<Props> = ({	farm }): ReactElement => {
	// Hooks
	const intl = useIntl();
	const ref = useRef();
	const timezones = Intl.supportedValuesOf('timeZone');
	const [ form ] = Form.useForm();
	const [ loading ] = useState(false);

	// Form validation schema
	const yupSchema = useCallback(() => yup.object().shape({
		name: yup
      .string()
      .max(
        16,
        intl.formatMessage(
          { id: 'validations.max' },
          { value: 16 },
        ),
      )
      .required(
        intl.formatMessage({
          id: 'validations.required',
        }),
      ),
		billing_date: yup
			.number()
			.required(
				intl.formatMessage({
					id: 'validations.required',
				}),
			),
		water_billing_date: yup
				.number()
				.required(
					intl.formatMessage({
						id: 'validations.required',
					}),
				),
		timezone: yup.string().required(
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
				<Typography.Title style={{ margin: 0 }} level={5}>
					{intl.formatMessage({
						id: 'component.edit.farm.general.title',
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
			{
				farm ? (
					<>
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
						>
							<Row style={{ width: '100%', marginBottom: 12 }} gutter={[12, 12]}>
								<RadioInputContainer
									name={['base', 'radio_id']}
									operable
									setFieldValue={form.setFieldValue}
									form={form}				
									status={'processing'}
									deviceType=""
									device="central"
									requestPivots={getPivots}
									requestIrpds={getIrpds}
									requestMeterSystem={getMeterSystem}
									requestBase={updatedBase}
									label={intl.formatMessage({
										id: 'component.edit.farm.general.centralradio.label',
									})}
									span={{
										xs: 24,
										md: 24,
									}}
								/>
								<ProFormField
									rules={[yupSync]}
									name={['name']}
									label={intl.formatMessage({
										id: 'component.edit.farm.general.name.label',
									})}
									colProps={{ xs: 24, md: 8, xl: 6 }}
								/>
								<ProFormField
									rules={[yupSync]}
									name={['billing_date']}
									label={intl.formatMessage({
										id: 'component.edit.farm.general.billing_date.label',
									})}
									colProps={{ xs: 24, md: 8, xl: 6 }}
								/>
								<ProFormField
									rules={[yupSync]}
									name={['water_billing_date']}
									label={intl.formatMessage({
										id: 'component.edit.farm.general.water_billing_date.label',
									})}
									colProps={{ xs: 24, md: 8, xl: 6 }}
								/>
								<ProFormSelect
									rules={[yupSync]}
									name={['timezone']}
									label={intl.formatMessage({
										id: 'component.edit.farm.general.timezone.label',
									})}
									colProps={{ xs: 24, md: 8, xl: 6 }}
									options={timezones.map(t => ({
										label: t,
										value: t,
									}))}
								/>
							</Row>
						</ProForm>
					</>
				) : null
			}
    </ProCard>
  )
};

export default EditFarmGeneralComponent;