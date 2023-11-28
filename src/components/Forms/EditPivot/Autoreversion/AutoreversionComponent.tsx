import { postPivotConfig } from '@/services/pivot';
import { SaveOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormSegmented,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Typography } from 'antd';
import * as React from 'react';

const EditPivotAutoreversionComponent: React.FunctionComponent<any> = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { message } = App.useApp();
  const [form] = Form.useForm<any>();

  const [loading, setLoading] = React.useState(false);

  const postReq = useRequest(postPivotConfig, { manual: true });

  const { pivot } = props;

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          {intl.formatMessage({
            id: 'component.edit.pivot.autoreversion.title',
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
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.edit.pivot.autoreversion.desc',
          })}
        </Typography.Text>
      </div>
      <ProForm
        validateTrigger="onBlur"
        layout="vertical"
        rowProps={{ gutter: [8, 8] }}
        grid
        form={form}
        submitter={false}
        name="HourForm"
        initialValues={{ segmented2: 'by_angle', time: '30', ...pivot }}
        onFinish={async (values: any) => {
          setLoading(true);
          try {
            const newObj = {
              ...pivot.controllerconfig,
              ...values.controllerconfig,
              content: {
                ...pivot.controllerconfig.content,
                ...values.controllerconfig.content,
                autoreversion_command: {
                  command: values.controllerconfig.content.autoreversion_command.command ? 1 : 0,
                },
              },
              name_pivot_on_config: pivot.name,
            };

            delete newObj.uuid;
            delete newObj.device;
            delete newObj.message_packets;
            delete newObj.name;

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
      >
        <ProFormSwitch
          name={['controllerconfig', 'content', 'autoreversion_command', 'command']}
          checkedChildren={intl.formatMessage({
            id: 'component.switch.disabled',
          })}
          unCheckedChildren={intl.formatMessage({
            id: 'component.switch.enable',
          })}
        />
        <ProFormDependency name={['controllerconfig']}>
          {({ controllerconfig }) => {
            if (controllerconfig.content.autoreversion_command.command)
              return (
                <>
                  <ProFormSegmented
                    name={['controllerconfig', 'content', 'autoreversion_configurations', 'mode']}
                    label={intl.formatMessage({
                      id: 'component.edit.pivot.autoreversion.stopcdn.label',
                    })}
                    request={async () => [
                      {
                        label: intl.formatMessage({
                          id: 'component.edit.pivot.autoreversion.stopcdn.opt.2',
                        }),
                        value: 1,
                      },
                      {
                        label: intl.formatMessage({
                          id: 'component.edit.pivot.autoreversion.stopcdn.opt.3',
                        }),
                        value: 0,
                      },
                    ]}
                  />
                  <ProFormSelect
                    name={['controllerconfig', 'content', 'autoreversion_configurations', 'time']}
                    label={intl.formatMessage({
                      id: 'component.edit.pivot.autoreversion.auto.label',
                    })}
                    colProps={{ xs: 24, md: 8 }}
                    options={[
                      {
                        value: 30,
                        label: intl.formatMessage({
                          id: 'component.edit.pivot.autoreversion.autotime.opt.1',
                        }),
                      },
                      {
                        value: 60,
                        label: intl.formatMessage({
                          id: 'component.edit.pivot.autoreversion.autotime.opt.2',
                        }),
                      },
                      {
                        value: 120,
                        label: intl.formatMessage({
                          id: 'component.edit.pivot.autoreversion.autotime.opt.3',
                        }),
                      },
                    ]}
                  />
                </>
              );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotAutoreversionComponent;
