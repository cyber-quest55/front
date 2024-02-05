import { useScreenHook } from '@/hooks/screen';
import { useStepHook } from '@/hooks/step';
import { PlusCircleFilled } from '@ant-design/icons';
import { CheckCard, ModalForm, ProForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Avatar, Button, Col, Form, Row, Steps } from 'antd';
import React from 'react';
import IrpdForm from './IrpdForm';
import LinearPivotMonitorForm from './LinearPivotMonitorForm';
import MeterSystemForm from './MeterSystemForm';
import PivotForm from './PivotForm';
import MonitorPivotForm from './PivotMonitor';
import RepeaterForm from './RepeaterForm';

const AddDeviceForm: React.FC<any> = (props) => {
  const [form] = Form.useForm<{
    device: number;
    version: string;
    check: boolean;
    potency: string;
  }>();

  const { step, setStep } = useStepHook(0);
  const [pivotForm] = Form.useForm<any>();
  const [pivotMonitorForm] = Form.useForm<any>();
  const [linearPivotMonitorForm] = Form.useForm<any>();
  const [irpdForm] = Form.useForm<any>();
  const [meterSystemForm] = Form.useForm<any>();
  const [repeaterForm] = Form.useForm<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const intl = useIntl();
  const { xs } = useScreenHook();

  return (
    <ModalForm<{
      device: number;
      version: string;
      check: boolean;
      potency: string;
    }>
      title={intl.formatMessage({
        id: 'component.adddevice.modal.form.title',
      })}
      submitter={{
        submitButtonProps: {
          type: 'primary',
          ghost: step === 0 ? true : false,
        },
        searchConfig: {
          resetText: intl.formatMessage({
            id: 'component.adddevice.modal.form.cancel',
          }),
          submitText:
            step === 0
              ? intl.formatMessage({
                  id: 'component.adddevice.modal.form.next',
                })
              : intl.formatMessage({
                  id: 'component.adddevice.modal.form.submit',
                }),
        },
      }}
      trigger={
        <Button size="large" type="primary" icon={<PlusCircleFilled />}>
          {intl.formatMessage({
            id: 'component.adddevice.modal.trigger',
          })}
        </Button>
      }
      loading={loading}
      form={form}
      autoFocusFirstInput
      onOpenChange={() => setStep(0)}
      submitTimeout={2000}
      onFinish={async (v: any) => {
        if (step === 0 && v.device) {
          setStep(1);
        } else if (step !== 0 && form.getFieldValue('device') === 1) {
          pivotForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === 2) {
          pivotMonitorForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === 3) {
          linearPivotMonitorForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === 4) {
          irpdForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === 5) {
          repeaterForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === 6) {
          meterSystemForm.submit();
        }
      }}
      modalProps={{
        destroyOnClose: true,
        centered: true,
      }}
    >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Steps
          direction="horizontal"
          style={{ margin: '24px 0px', width: xs ? '100%' : '80%' }}
          onChange={(s) => setStep(s)}
          current={step}
          items={[
            {
              title: intl.formatMessage({
                id: 'component.adddevice.modal.form.step1.title',
              }),
            },
            {
              title: intl.formatMessage({
                id: 'component.adddevice.modal.form.step2.title',
              }),
              disabled: true,
            },
          ]}
        />
      </div>
      {step === 0 ? (
        <Form.Item name="device">
          <CheckCard.Group style={{ width: '100%', padding: 0 }} value="group" defaultValue="a">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <CheckCard
                  defaultChecked
                  style={{ width: '100%' }}
                  title={intl.formatMessage({
                    id: 'component.adddevice.modal.form.step1.pivot.title',
                  })}
                  avatar={
                    <Avatar
                      shape="square"
                      src="/images/devices/device-1.svg"
                      style={{ width: 137 / 2.5, height: 200 / 2.5 }}
                    />
                  }
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={1}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title={intl.formatMessage({
                    id: 'component.adddevice.modal.form.step1.pivotmonitor.title',
                  })}
                  avatar={
                    <Avatar
                      shape="square"
                      src="/images/devices/device-2.svg"
                      style={{ width: 44 / 1.2, height: 96 / 1.2 }}
                    />
                  }
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={2}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title={intl.formatMessage({
                    id: 'component.adddevice.modal.form.step1.linearpivotmonitor.title',
                  })}
                  avatar={
                    <Avatar
                      shape="square"
                      src="/images/devices/device-2.svg"
                      style={{ width: 44 / 1.2, height: 96 / 1.2 }}
                    />
                  }
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={3}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title={intl.formatMessage({
                    id: 'component.adddevice.modal.form.step1.pump.title',
                  })}
                  avatar={
                    <Avatar
                      shape="square"
                      src="/images/devices/device-3.svg"
                      style={{ width: 66 / 1.2, height: 95 / 1.2 }}
                    />
                  }
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={4}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title={intl.formatMessage({
                    id: 'component.adddevice.modal.form.step1.repeater.title',
                  })}
                  avatar={
                    <Avatar
                      shape="square"
                      src="/images/devices/device-4.svg"
                      style={{ width: 44 / 1.2, height: 95 / 1.2 }}
                    />
                  }
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={5}
                />
              </Col>
              <Col xs={24} sm={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title={intl.formatMessage({
                    id: 'component.adddevice.modal.form.step1.metersystem.title',
                  })}
                  avatar={
                    <Avatar
                      shape="square"
                      src="/images/devices/device-4.svg"
                      style={{ width: 44 / 1.2, height: 95 / 1.2 }}
                    />
                  }
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={6}
                />
              </Col>
            </Row>
          </CheckCard.Group>
        </Form.Item>
      ) : (
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            return form.getFieldValue('device') === 1 ? (
              <PivotForm form={pivotForm} base={props.base} setLoading={setLoading} />
            ) : form.getFieldValue('device') === 2 ? (
              <MonitorPivotForm form={pivotMonitorForm} base={props.base} setLoading={setLoading} />
            ) : form.getFieldValue('device') === 3 ? (
              <LinearPivotMonitorForm
                form={linearPivotMonitorForm}
                base={props.base}
                setLoading={setLoading}
              />
            ) : form.getFieldValue('device') === 4 ? (
              <IrpdForm form={irpdForm} base={props.base} setLoading={setLoading} />
            ) : form.getFieldValue('device') === 5 ? (
              <RepeaterForm form={repeaterForm} base={props.base} setLoading={setLoading} />
            ) : form.getFieldValue('device') === 6 ? (
              <MeterSystemForm form={meterSystemForm} base={props.base} setLoading={setLoading} />
            ) : null;
          }}
        </ProForm.Item>
      )}
    </ModalForm>
  );
};

export default AddDeviceForm;
