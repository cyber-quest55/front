import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { Typography } from 'antd';
import * as React from 'react';

interface IAppProps {}

const EditPivotPluviometerComponent: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Pluviômetro
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
        initialValues={{condition: 'disabled', pluviometer: false }}
      >
        <ProFormSwitch
          name="pluviometer"
          checkedChildren="Desabilitar"
          unCheckedChildren="Habilitar"
        />

        <ProFormDependency name={['pluviometer', 'condition']}>
          {({ pluviometer, condition}) => {
            if (pluviometer)
              return (
                <>
                  <ProFormSelect
                    name="condition"
                    label="Condição de parada"
                    colProps={{ xs: 24, md: 8 }}
                    options={[
                      {
                        value: 'disabled',
                        label: 'Desabilitado',
                      },
                      {
                        value: 'by_value',
                        label: 'Por valor',
                      },
                      {
                        value: 'by_decrement',
                        label: 'Por decremento',
                      },
                    ]}
                  />
                  <ProFormDigit
                    label="Valor"
                    colProps={{ xs: 24, md: 8 }}
                    fieldProps={{
                      suffix: 'mm',
                    }}
                  disabled={condition !== 'by_value'}
                  />
                  <ProFormDigit
                    label="Escala do sensor"
                    colProps={{ xs: 24, md: 8 }}
                    fieldProps={{
                      suffix: 'mm',
                    }}
                  />
                </>
              );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotPluviometerComponent;
