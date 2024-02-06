import { postPivotConfig } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import * as yup from 'yup';

const EditPivotHourComponent: React.FunctionComponent<any> = (props) => {
  const [form] = Form.useForm<any>();
  const params = useParams();
  const { message } = App.useApp();

  const postReq = useRequest(postPivotConfig, { manual: true });
  const intl = useIntl();
  const [loading, setLoading] = React.useState(false);

  const { pivot } = props;

  const schema = yup.object().shape({
    controllerconfig: yup.object().shape({
      content: yup.object().shape({
        clock: yup.date().required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
      }),
    }),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          {intl.formatMessage({
            id: 'component.edit.pivot.clock.title',
          })}
        </Typography.Title>
      }
      ghost
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
      extra={
        <Button loading={loading} icon={<SaveOutlined />} type="primary" onClick={form.submit}>
          {intl.formatMessage({
            id: 'component.edit.pivot.button.save',
          })}
        </Button>
      }
    >
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
        onInit={(v2, form) => {
          const day = v2?.controllerconfig?.content?.clock?.day || 1;
          const hour = v2?.controllerconfig?.content?.clock?.hour || 1;
          const year = v2?.controllerconfig?.content?.clock?.year || 1;
          const month = v2?.controllerconfig?.content?.clock?.month || 1;
          const minute = v2?.controllerconfig?.content?.clock?.minute || 1;
          const second = v2?.controllerconfig?.content?.clock?.second || 1;
          const date = dayjs()
            .year(year + 2000)
            .month(month - 1)
            .date(day)
            .hour(hour)
            .minute(minute)
            .second(second);

          form.setFieldValue('controllerconfig', {
            ...v2.controllerconfig,
            content: {
              ...v2.content,
              clock: date,
            },
          });
        }}
        form={form}
        submitter={false}
        name="HourForm"
        initialValues={{ deviceHour: 'others', ...pivot }}
        onFinish={async (v2: any) => {
          setLoading(true);

          try {
            const date = dayjs(v2.controllerconfig?.content?.clock);
            const newObj = {
              ...pivot.controllerconfig,
              ...v2.controllerconfig,
              content: {
                ...pivot.controllerconfig.content,
                ...v2?.controllerconfig?.content,
                clock: {
                  day: date.get('D'),
                  hour: date.get('h'),
                  year: date.get('y') - 2000,
                  month: date.get('M') + 1,
                  minute: date.get('m'),
                  second: date.get('s'),
                },
              },
              name_pivot_on_config: pivot.name,
            };

            delete newObj.uuid;
            delete newObj.device;
            delete newObj.name;

            await postReq.runAsync(
              {
                farmId: params.farmId as any,
                pivotId: params.pivotId as any,
                deviceId: pivot.control as any,
              },
              newObj,
            );

            props.queryPivotByIdStart({
              farmId: params.farmId as any,
              pivotId: params.pivotId as any,
            });
            message.success('Configs Atualizadas com Sucesso');
          } catch (err) {
            message.success('Configs Atualizadas com Sucesso');
          }
          setLoading(false);
        }}
      >
        <ProFormSelect
          label={intl.formatMessage({
            id: 'component.edit.pivot.clock.dvclock.label',
          })}
          colProps={{ xs: 24, md: 6 }}
          options={[
            {
              value: 'select',
              label: intl.formatMessage({
                id: 'component.edit.pivot.clock.opt.1',
              }),
            },
            {
              value: 'others',
              label: intl.formatMessage({
                id: 'component.edit.pivot.clock.opt.2',
              }),
            },
          ]}
          name="deviceHour"
        />

        <ProFormDependency name={['deviceHour']}>
          {({ deviceHour }) => {
            return (
              <ProFormDateTimePicker
                rules={[yupSync]}
                name={['controllerconfig', 'content', 'clock']}
                label={intl.formatMessage({
                  id: 'component.edit.pivot.clock.dvdate.label',
                })}
                disabled={!(deviceHour === 'others')}
              />
            );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotHourComponent;
