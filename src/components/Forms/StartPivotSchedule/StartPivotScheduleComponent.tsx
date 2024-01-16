import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Form, Typography } from 'antd';
import * as React from 'react';

interface IStartPivotScheduleComponentProps {
  pivotById: GetPivotByIdModelProps;
}

const StartPivotScheduleComponent: React.FunctionComponent<IStartPivotScheduleComponentProps> = (
  props,
) => {
  const [form] = Form.useForm<any>();
  const intl = useIntl();

  const pivot = props.pivotById.unformated;

  return (
    <ModalForm<any>
      onFieldsChange={(fields) => {}}
      title={intl.formatMessage({
        id: 'component.pivot.startirr.simple.title',
      })}
      trigger={
        <Typography.Link style={{ width: '100%' }}>
          {intl.formatMessage({
            id: 'component.pivot.operationalpanel.button.start.opt.4',
          })}
        </Typography.Link>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {}}
    >
      <ProForm.Group>
        <Button style={{ marginBlock: 12 }}>
          {intl.formatMessage({
            id: 'component.pivot.startirr.simple.button.loadlast',
          })}
        </Button>
      </ProForm.Group>
      <ProForm.Group style={{ marginBottom: 12 }}>
        <Typography.Text>
          {intl.formatMessage({
            id: 'component.pivot.startirr.simple.currentangl',
          })}{' '}
          {pivot?.controllerstream_gps?.current_angle |
            pivot?.controllerstream_gps?.current_angle?.current_angle}
          °
        </Typography.Text>
      </ProForm.Group>

      <ProForm.Group>
        <ProFormRadio.Group
          name={['content', 'irrigation_status', 'irrigation_status']}
          radioType="button"
          label={intl.formatMessage({
            id: 'component.pivot.startirr.simple.form.label.1',
          })}
          options={[
            {
              label: intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.1.opt.1',
              }),
              value: 1,
            },
            {
              label: intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.1.opt.2',
              }),
              value: 2,
            },
          ]}
        />
        <ProFormRadio.Group
          name={['content', 'simple_irrigation_parameters', 'mode']}
          radioType="button"
          label={intl.formatMessage({
            id: 'component.pivot.startirr.simple.form.label.2',
          })}
          options={[
            {
              label: intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.2.opt.1',
              }),
              value: 1,
            },
            {
              label: intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.2.opt.2',
              }),
              value: 2,
            },
          ]}
        />
      </ProForm.Group>

      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.simple_irrigation_parameters?.mode === 1 ? (
            pivot.controllerconfig?.injection_pump ? (
              <ProFormCheckbox width="xs" name={['content', 'injection_pump_command', 'command']}>
                {intl.formatMessage({
                  id: 'component.pivot.startirr.simple.form.label.9',
                })}
              </ProFormCheckbox>
            ) : null
          ) : null;
        }}
      </ProFormDependency>

      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.injection_pump_command?.command ? (
            <ProForm.Group>
              <ProFormTextArea
                name={['content', 'injection_pump_command', 'note']}
                label={intl.formatMessage({
                  id: 'component.pivot.startirr.simple.form.label.10',
                })}
                width="xl"
              />
            </ProForm.Group>
          ) : null;
        }}
      </ProFormDependency>

      <ProForm.Group>
        <ProFormDigit
          label={intl.formatMessage({
            id: 'component.pivot.startirr.simple.form.label.3',
          })}
          name={['content', 'simple_irrigation_parameters', 'percent']}
          width="md"
          fieldProps={{
            addonAfter: '%',
            controls: false,
          }}
        />
        <ProFormDigit
          disabled
          label={intl.formatMessage({
            id: 'component.pivot.startirr.simple.form.label.4',
          })}
          name={['garbage', 'preciptation']}
          width="md"
          fieldProps={{
            addonAfter: 'mm',
            controls: false,
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            {
              value: 0,
              label: intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.5.opt.1',
              }),
            },
            {
              value: 1,
              label: intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.5.opt.2',
              }),
            },
            {
              value: 2,
              label: intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.5.opt.3',
              }),
            },
          ]}
          width="md"
          name={['content', 'simple_irrigation_parameters', 'start_mode']}
          label={intl.formatMessage({
            id: 'component.pivot.startirr.simple.form.label.5',
          })}
        />
        <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
          {({ content }) => {
            return (
              <ProFormDateTimePicker
                width="sm"
                disabled={content?.simple_irrigation_parameters?.start_mode !== 1}
                fieldProps={{}}
                name={['garbage', 'unformated_date']}
                label={intl.formatMessage({
                  id: 'component.pivot.startirr.simple.form.label.6',
                })}
              />
            );
          }}
        </ProFormDependency>
      </ProForm.Group>
      <ProFormRadio.Group
        name={['content', 'simple_irrigation_parameters', 'stop_mode']}
        radioType="button"
        label={intl.formatMessage({
          id: 'component.pivot.startirr.simple.form.label.7',
        })}
        options={[
          {
            label: intl.formatMessage({
              id: 'component.pivot.startirr.simple.form.label.7.opt.1',
            }),
            value: 0,
          },
          {
            label: intl.formatMessage({
              id: 'component.pivot.startirr.simple.form.label.7.opt.2',
            }),
            value: 1,
          },
          {
            label: intl.formatMessage({
              id: 'component.pivot.startirr.simple.form.label.7.opt.3',
            }),
            value: 3,
          },
          {
            label: intl.formatMessage({
              id: 'component.pivot.startirr.simple.form.label.7.opt.4',
            }),
            value: 4,
          },
        ]}
      />

      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.simple_irrigation_parameters?.stop_mode === 1 ? (
            <ProFormDigit
              name={['content', 'simple_irrigation_parameters', 'stop_angle']}
              label={intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.8',
              })}
              width="sm"
              fieldProps={{
                addonAfter: '°',
                controls: false,
              }}
            />
          ) : null;
        }}
      </ProFormDependency>
      <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
        {({ content }) => {
          return content?.simple_irrigation_parameters?.stop_mode === 4 ? (
            <ProFormDigit
              name={['content', 'simple_irrigation_parameters', 'rounds']}
              label={intl.formatMessage({
                id: 'component.pivot.startirr.simple.form.label.11',
              })}
              width="sm"
              fieldProps={{
                controls: false,
              }}
            />
          ) : null;
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default StartPivotScheduleComponent;
