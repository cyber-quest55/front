import {
  ProCard,
  ProForm,
  ProFormSegmented,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { Typography } from 'antd';
import * as React from 'react';

interface IEditPivotAutoreversionComponent {}

const EditPivotAutoreversionComponent: React.FunctionComponent<IEditPivotAutoreversionComponent> = (
  props,
) => {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          AutoReversão
        </Typography.Title>
      }
      ghost
      gutter={[12, 12]}
      extra={
        <ProFormSwitch
          fieldProps={{ onChange: (e) => setEnabled(e) }}
          checkedChildren="Desabilitar"
          unCheckedChildren="Habilitar"
        />
      }
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          A autoreversão é um recurso que possibilita que o pivô chegue ao final do seu percurso e
          retorne automaticamente, realizando uma operação. O retorno do pivô acontece quando ele
          alcança um obstáculo físico, chamado de fim de curso - disponível em painéis SmartConnect
          - ou quando chega ao ângulo final de trabalho.
        </Typography.Text>
      </div>
      <ProForm
        validateTrigger="onBlur"
        layout="vertical"
        rowProps={{ gutter: [8, 8] }}
        grid
        submitter={false}
        name="HourForm"
        initialValues={{ segmented2: 'by_angle', time: '30' }}
      >
        {enabled ? (
          <>
            <ProFormSegmented
              name="segmented2"
              label="Condição de parada"
              request={async () => [
                { label: 'Por ângulo', value: 'by_angle' },
                { label: 'Por fim de curso', value: 'by_end' },
              ]}
            />
            <ProFormSelect
              name="time"
              label="Tempo de espera para autoreversão"
              colProps={{ xs: 24, md: 8 }}
              options={[
                {
                  value: '30',
                  label: '30 Segundos',
                },
                {
                  value: '60',
                  label: 'Um minuto',
                },
                {
                  value: '120',
                  label: 'Dois minutos',
                },
              ]}
            />
          </>
        ) : null}
      </ProForm>
    </ProCard>
  );
};

export default EditPivotAutoreversionComponent;
