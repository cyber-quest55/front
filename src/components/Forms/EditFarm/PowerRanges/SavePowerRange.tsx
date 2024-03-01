// Dependencies
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormSelect,
  ProFormTimePicker
} from '@ant-design/pro-components';
import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { yupValidator } from '@/utils/adapters/yup';
import { getTimeDifference } from '@/utils/formater/get-time-duration';
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  List,
  Space,
  Tag,
  Typography,
} from 'antd';
import {
  createElement,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import * as yup from 'yup';

// Component props
type Props = {
  open?: boolean,
  onCancel?: () => void,
  onSubmit?: (values: any) => void,
  energyProfiles: {
    [index: number]: string;
  },
  availableDaysOfWeek: number[],
  daysOfWeekTranslations: string[],
  power_ranges?: {
    [index: number]: APIModels.PowerRange[];
  }
}

// Component
const SavePowerRange = ({
  open = false,
  onCancel = () => {},
  onSubmit = () => {},
  energyProfiles,
  availableDaysOfWeek,
  daysOfWeekTranslations,
}: Props): ReactElement => {
  // Hooks
  const intl = useIntl();
  const [ form ] = Form.useForm();
  const [ ranges, setRanges ] = useState<any[]>([]);

  // Form validation schema
	const yupSchema = useCallback(() => yup.object().shape({
    days: yup.array().min(1, intl.formatMessage({
      id: 'validations.required',
    })),
    end: yup.string().required(intl.formatMessage({
      id: 'validations.required',
    })),
    type: yup.number().required(intl.formatMessage({
      id: 'validations.required',
    })),
	}), [intl]);
	const yupSync = yupValidator(yupSchema(), form.getFieldsValue);

  // List icon text component
	const IconAction = ({ icon, onClick = () => {} }: { icon: React.FC, onClick: () => void }) => (
		<Space>
			<Button
        danger
				type="link"
				icon={createElement(icon)}
				onClick={onClick}
			/>
		</Space>
	);

  // TSX
  return (
    <Modal
      title={intl.formatMessage({ id: 'component.edit.farm.powerranges.modal.title' })}
      open={open}
      onCancel={onCancel}
      onOk={() => onSubmit({})}
      width={1080}
    >
      <ProCard bordered>
        <ProForm
          form={form}
          submitter={false}
          initialValues={{
            start: '00:00:00'
          }}
          onFinish={async (values) => {
            console.log('[inner submit values]', values);
            setRanges(prev => [ ...prev, {
              start: values.start,
              end: values.end,
              type: values.type,
            }]);
          }}
        >
          <Row style={{ width: '100%' }} gutter={[12, 12]}>
            <Col xs={24}>
              <ProFormCheckbox.Group
                name={["days"]}
                rules={[yupSync]}
                layout="horizontal"
                label={intl.formatMessage({ id: 'component.edit.farm.powerranges.form.days.label' })}
                options={[
                  {
                    label: daysOfWeekTranslations[0],
                    value: 0,
                    disabled: !availableDaysOfWeek.includes(0),
                  },
                  {
                    label: daysOfWeekTranslations[1],
                    value: 1,
                    disabled: !availableDaysOfWeek.includes(1),
                  },
                  {
                    label: daysOfWeekTranslations[2],
                    value: 2,
                    disabled: !availableDaysOfWeek.includes(2),
                  },
                  {
                    label: daysOfWeekTranslations[3],
                    value: 3,
                    disabled: !availableDaysOfWeek.includes(3),
                  },
                  {
                    label: daysOfWeekTranslations[4],
                    value: 4,
                    disabled: !availableDaysOfWeek.includes(4),
                  },
                  {
                    label: daysOfWeekTranslations[5],
                    value: 5,
                    disabled: !availableDaysOfWeek.includes(5),
                  },
                  {
                    label: daysOfWeekTranslations[6],
                    value: 6,
                    disabled: !availableDaysOfWeek.includes(6),
                  },
                ]}
              />
            </Col>
            <Col xs={24} md={8} xl={8}>   
              <ProFormTimePicker
                name={["start"]}
                label={intl.formatMessage({
                  id: 'component.edit.farm.powerranges.form.start.label',
                })}
                disabled
              />
            </Col>
            <Col xs={24} md={8} xl={8}>   
              <ProFormTimePicker
                name={["end"]}
                rules={[yupSync]}
                label={intl.formatMessage({
                  id: 'component.edit.farm.powerranges.form.end.label',
                })}
              />
            </Col>
            <Col xs={24} md={8} xl={8}>   
              <ProFormSelect 
                name={['type']}
                rules={[yupSync]}
                label={intl.formatMessage({
                  id: 'component.edit.farm.powerranges.form.type.label',
                } )}
                options={[
                  {
                    value: 0,
                    label: intl.formatMessage({
                      id: 'component.edit.farm.powerranges.profile.peak',
                    }),
                  },
                  {
                    value: 1,
                    label: intl.formatMessage({
                      id: 'component.edit.farm.powerranges.profile.outofpeak',
                    }),
                },
                {
                    value: 2,
                    label: intl.formatMessage({
                      id: 'component.edit.farm.powerranges.profile.reduced',
                    }),
                },
              ]}
              />
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={form.submit}
                icon={<PlusOutlined/>}
              >
                Add
              </Button>
            </Col>
          </Row>
        </ProForm>
      </ProCard>
      <List 
        dataSource={ranges}
        renderItem={(item: any, index) => (
          <List.Item
            key={index}
            actions={[
							<IconAction
								icon={DeleteOutlined}
								key="list-vertical-delete-o"
								onClick={() => {
                  const filtered = ranges.filter((r, i) => i !== index);
                  setRanges(filtered);
								}}
							/>,
						]}
          >
            <List.Item.Meta
							title={(
								<>
									<Typography.Text style={{ marginRight: 8 }}>
										{`${item.start} - ${item.end}`}
									</Typography.Text>
									<Tag color="processing">
                    {energyProfiles[item.type]}
									</Tag>	
								</>
							)}
							description={intl.formatMessage(
                { id: 'component.edit.farm.powerranges.form.duration.label' }, 
                { value: getTimeDifference(item.end, item.start) },
              )}									
						/>
					</List.Item>
        )}
      />
    </Modal>
  );
}

export default SavePowerRange;