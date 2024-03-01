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
import dayjs from 'dayjs';
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
  const [ ranges, setRanges ] = useState<{
    start: string;
    end: string;
    type: number;
  }[]>([]);

  // Days of week dict
  const getDayLabel = useCallback(() => ({
    0: intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.monday' }),
    1: intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.tuesday' }),
    2: intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.wednesday' }),
    3: intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.thursday' }),
    4: intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.friday' }),
    5: intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.saturday' }),
    6: intl.formatMessage({ id: 'component.edit.farm.powerranges.daysofweek.sunday' }),
  }), [intl])


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

  // Validate end date
  const validateEnd = (rule, value, callback) => {
    const startValue = form.getFieldValue('start');
    if (value && startValue) {
      const startDayJs = dayjs(startValue, 'HH:mm:ss');
      const endDayJs = dayjs(value, 'HH:mm:ss');
      if (endDayJs.isBefore(startDayJs)) {
        callback(new Error(intl.formatMessage({
          id: 'component.edit.farm.powerranges.end.field.error',
        })));
      }
    }
    callback();
  };

  // List icon text component
	const IconAction = ({ 
    icon,
    onClick = () => {},
    disabled = false
  }: {
    icon: React.FC,
    onClick: () => void,
    disabled: boolean,
  }) => (
		<Space>
			<Button
        danger
        disabled={disabled}
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
      onCancel={() => {
        form.setFieldValue('start', '00:00:00');
        setRanges([]);
        onCancel();
      }}
      onOk={() =>  {
        const daysValue = form.getFieldValue('days');
        const daysDict = getDayLabel();
        const formattedDays = daysValue?.map((d: number) => ({
          label: daysDict[d],
          value: d
        }));
        onSubmit({
          daysOfWeek: formattedDays,
          timeRanges: ranges,
        });
        form.setFieldValue('start', '00:00:00');
        setRanges([]);
        onCancel();
      } }
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
            if (values.start !== values.end) {
              // Increment date
              const startDayJs = dayjs(values.end, 'HH:mm:ss');
              if (values.end !== '23:59:59') {
                form.setFieldValue('start', startDayJs.add(1, 'second'));
              } else {
                form.setFieldValue('start', '23:59:59');
              }
              
              // Update ranges
              setRanges(prev => [ ...prev, {
                start: values.start,
                end: values.end,
                type: values.type,
              }]);
            }
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
                fieldProps={{ style: { width: '100%' } }}
                name={["start"]}
                label={intl.formatMessage({
                  id: 'component.edit.farm.powerranges.form.start.label',
                })}
                disabled
              />
            </Col>
            <Col xs={24} md={8} xl={8}>   
              <ProFormTimePicker
                fieldProps={{ style: { width: '100%' } }}
                name={["end"]}
                rules={[
                  yupSync,
                  { validator: validateEnd },
                ]}
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
                disabled={index !== ranges.length - 1}
								key="list-vertical-delete-o"
								onClick={() => {
                  const prev = index !== 0 ? ranges[index - 1] : null
                  if (!prev) {
                    form.setFieldValue('start', '00:00:00');
                  } else {
                    const startDayJs = dayjs(prev.end, 'HH:mm:ss');
                    form.setFieldValue('start', startDayJs.add(1, 'second'));
                  }
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