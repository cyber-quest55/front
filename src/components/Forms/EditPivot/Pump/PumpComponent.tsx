import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Col, Divider, Typography } from 'antd';
import * as React from 'react';

interface IAppProps {}

const EditPivotPumpComponent: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Potência da bomba
        </Typography.Title>
      }
      ghost
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>Última configuração: 19 Out 2023 09:55- Internet</Typography.Text>
      </div>
      <ProForm
        validateTrigger="onBlur"
        layout="vertical"
        rowProps={{ gutter: [8, 8] }}
        grid
        submitter={false}
        name="HourForm"
        initialValues={{ pressureListener: 'off' }}
      >
        <ProFormDigit
          label="Potência da bomba"
          colProps={{ xs: 24, md: 6 }}
          fieldProps={{
            suffix: 'kW',
          }}
        />
        <ProFormDigit
          label="Tempo de energia"
          colProps={{ xs: 24, md: 6 }}
          fieldProps={{
            suffix: 'min',
          }}
        />
        <Col style={{ padding: 0 }} span={24}>
          <Divider style={{ margin: 4 }} />

          <Typography.Title style={{ marginTop: 12 }} level={4}>
            Configuração de Pressão
          </Typography.Title>
        </Col>
        <ProFormSelect
          label="Leitura de pressão"
          colProps={{ xs: 24, md: 24 }}
          options={[
            {
              value: 'off',
              label: 'Desligado',
            },
            {
              value: 'byPressor',
              label: 'Por pressostato',
            },
            {
              value: 'bySensorPressor',
              label: 'Por Sensor de pressão',
            },
          ]}
          name="pressureListener"
        />

        <ProFormDependency name={['pressureListener']}>
          {({ pressureListener }) => {
            return (
              <>
                <ProFormDigit
                  label="Tempo de bomba"
                  disabled={pressureListener === 'off'}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    suffix: 'min',
                  }}
                />
                <ProFormDigit
                  label="Tempo de retardo"
                  disabled={pressureListener === 'off'}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    suffix: 's',
                  }}
                />
                <ProFormDigit
                  label="Tempo instável de pressostato"
                  disabled={pressureListener === 'off'}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    suffix: 'min',
                  }}
                />
                <ProFormDigit
                  label="Valor mínimo do sensor"
                  disabled={pressureListener === 'off' || pressureListener === 'byPressor'}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    suffix: 'bar',
                  }}
                />
                <ProFormDigit
                  label="Valor máximo do sensor"
                  disabled={pressureListener === 'off' || pressureListener === 'byPressor'}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    suffix: 'bar',
                  }}
                />
                <ProFormDigit
                  label="Escala do sensor"
                  disabled={pressureListener === 'off' || pressureListener === 'byPressor'}
                  colProps={{ xs: 24, md: 8 }}
                  fieldProps={{
                    suffix: 'bar',
                  }}
                />
              </>
            );
          }}
        </ProFormDependency>
        <Col style={{ padding: 0 }} span={24}>
          <Divider style={{ margin: 4 }} />

          <Typography.Title style={{ marginTop: 12 }} level={4}>
            Bomba de Fertirrigação
          </Typography.Title>
        </Col>
        <ProFormCheckbox>Ativar Fertirrigação</ProFormCheckbox>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotPumpComponent;
