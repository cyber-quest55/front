import { useScreenHook } from '@/hooks/screen';
import { useStepHook } from '@/hooks/step';
import { queryIrpd } from '@/models/irpd';
import { queryMeterSystem } from '@/models/meter-sysem';
import { queryPivotInformation } from '@/models/pivot-information';
import { queryRepeater } from '@/models/repeaters';
import { PlusCircleFilled } from '@ant-design/icons';
import { CheckCard, ModalForm, ProForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Avatar, Button, Col, Form, Row, Steps } from 'antd';
import React from 'react';
import IrpdForm from './Forms/IrpdForm';
import LinearPivotMonitorForm from './Forms/LinearPivotMonitorForm';
import MeterSystemForm from './Forms/MeterSystemForm';
import PivotForm from './Forms/PivotForm';
import PivotMonitorForm from './Forms/PivotMonitor';
import RepeaterForm from './Forms/RepeaterForm';
import { queryPivot } from '@/models/pivot';

interface AddDeviceFormComponentProps {
  queryPivotInformation: typeof queryPivotInformation;
  queryPivot: typeof queryPivot;
  queryMeterSystem: typeof queryMeterSystem;
  queryIrpd: typeof queryIrpd;
  queryRepeater: typeof queryRepeater;
  base: string;
  location: string;
}

enum Equipment {
  Pivot = 1, // start by 1
  PivotMonitor,
  LinearPivotMonitor,
  Pump,
  Repeater,
  MeterSystem,
}

const AddDeviceFormComponent: React.FC<AddDeviceFormComponentProps> = (props) => {
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
  const [showModalForm, setShowModalForm] = React.useState<boolean>(false);
  const intl = useIntl();
  const { xs } = useScreenHook();

  const openModalForm = () => setShowModalForm(true);
  const closeModalForm = () => setShowModalForm(false);

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
        <Button size="large" type="primary" icon={<PlusCircleFilled />} onClick={openModalForm}>
          {intl.formatMessage({
            id: 'component.adddevice.modal.trigger',
          })}
        </Button>
      }
      open={showModalForm}
      loading={loading}
      form={form}
      autoFocusFirstInput
      onOpenChange={() => setStep(0)}
      submitTimeout={8000}
      onFinish={async (v: any) => {
        if (step === 0 && v.device) {
          setStep(1);
        } else if (step !== 0 && form.getFieldValue('device') === Equipment.Pivot) {
          pivotForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === Equipment.PivotMonitor) {
          pivotMonitorForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === Equipment.LinearPivotMonitor) {
          linearPivotMonitorForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === Equipment.Pump) {
          irpdForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === Equipment.Repeater) {
          repeaterForm.submit();
        } else if (step !== 0 && form.getFieldValue('device') === Equipment.MeterSystem) {
          meterSystemForm.submit();
        }
      }}
      modalProps={{
        destroyOnClose: true,
        centered: true,
        onCancel: () => {
          setShowModalForm(false);
        },
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
          <CheckCard.Group style={{ width: '100%', padding: 0 }} value="group">
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
                  value={Equipment.Pivot}
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
                  value={Equipment.PivotMonitor}
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
                  value={Equipment.LinearPivotMonitor}
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
                  value={Equipment.Pump}
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
                  value={Equipment.Repeater}
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
                  value={Equipment.MeterSystem}
                />
              </Col>
            </Row>
          </CheckCard.Group>
        </Form.Item>
      ) : (
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            return form.getFieldValue('device') === Equipment.Pivot ? (
              <PivotForm
                form={pivotForm}
                base={props.base}
                setLoading={setLoading}
                closeModalForm={closeModalForm}
                queryPivotInformation={props.queryPivotInformation}
                queryPivot={props.queryPivot}
              />
            ) : form.getFieldValue('device') === Equipment.PivotMonitor ? (
              <PivotMonitorForm
                form={pivotMonitorForm}
                base={props.base}
                setLoading={setLoading}
                closeModalForm={closeModalForm}
                queryPivotInformation={props.queryPivotInformation}
                queryPivot={props.queryPivot}
              />
            ) : form.getFieldValue('device') === Equipment.LinearPivotMonitor ? (
              <LinearPivotMonitorForm
                form={linearPivotMonitorForm}
                base={props.base}
                setLoading={setLoading}
                closeModalForm={closeModalForm}
                queryPivotInformation={props.queryPivotInformation}
                queryPivot={props.queryPivot}
              />
            ) : form.getFieldValue('device') === Equipment.Pump ? (
              <IrpdForm
                form={irpdForm}
                base={props.base}
                setLoading={setLoading}
                closeModalForm={closeModalForm}
                queryIrpd={props.queryIrpd}
                location={props.location}
              />
            ) : form.getFieldValue('device') === Equipment.Repeater ? (
              <RepeaterForm
                form={repeaterForm}
                base={props.base}
                setLoading={setLoading}
                closeModalForm={closeModalForm}
                queryRepeater={props.queryRepeater}
                location={props.location}
              />
            ) : form.getFieldValue('device') === Equipment.MeterSystem ? (
              <MeterSystemForm
                form={meterSystemForm}
                base={props.base}
                setLoading={setLoading}
                closeModalForm={closeModalForm}
                queryMeterSystem={props.queryMeterSystem}
                location={props.location}
              />
            ) : null;
          }}
        </ProForm.Item>
      )}
    </ModalForm>
  );
};

export default AddDeviceFormComponent;
