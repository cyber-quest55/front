import { useStepHook } from '@/hooks/step';
import { PlusCircleFilled } from '@ant-design/icons';
import { CheckCard, ModalForm, ProForm } from '@ant-design/pro-components';
import { Button, Col, Form, Row, Steps } from 'antd';
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

  return (
    <ModalForm<{
      device: number;
      version: string;
      check: boolean;
      potency: string;
    }>
      title="Cadastrar equipamento"
      submitter={{
        submitButtonProps: {
          type: 'primary',
          ghost: step === 0 ? true : false,
        },
        searchConfig: {
          submitText: step === 0 ? 'Próximo' : 'Cadastrar',
        },
      }}
      trigger={
        <Button size="large" type="primary" icon={<PlusCircleFilled />}>
          Cadastrar Equipamento
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
      }}
    >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Steps
          direction="horizontal"
          style={{ margin: '24px 0px', width: '80%' }}
          onChange={(s) => setStep(s)}
          current={step}
          items={[
            {
              title: 'Modelo',
            },
            {
              title: 'Configuração',

              disabled: true,
            },
          ]}
        />
      </div>
      {step === 0 ? (
        <Form.Item name="device">
          <CheckCard.Group style={{ width: '100%', padding: 0 }} value="group" defaultValue="a">
            <Row gutter={[16, 16]}>
              <Col xs={12}>
                <CheckCard
                  defaultChecked
                  style={{ width: '100%' }}
                  title="Automação de Pivô"
                  avatar="/images/devices/device-1.svg"
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={1}
                />
              </Col>
              <Col xs={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title="Monitor de Pivô"
                  avatar="/images/devices/device-2.svg"
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={2}
                />
              </Col>
              <Col xs={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title="Monitor de Pivô Linear"
                  avatar="/images/devices/device-2.svg"
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={3}
                />
              </Col>
              <Col xs={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title="Acionamento Remoto de Bomba"
                  avatar="/images/devices/device-3.svg"
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={4}
                />
              </Col>
              <Col xs={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title="Repetidor"
                  avatar="/images/devices/device-4.svg"
                  description="lorem impsum dorem mackial oggyir mistake dore"
                  value={5}
                />
              </Col>
              <Col xs={12}>
                <CheckCard
                  style={{ width: '100%' }}
                  title="Sistema de Medição"
                  avatar="/images/devices/device-4.svg"
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
