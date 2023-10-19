import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormField,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Form, Typography } from 'antd';
import * as React from 'react';

const EditPivotGeneralComponent: React.FunctionComponent = () => {
  const [form] = Form.useForm<any>();

  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Configurações
        </Typography.Title>
      }
      ghost
      gutter={[12, 12]}
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
        form={form}
        name="loging_form"
        initialValues={{ pressureController: false }}
      >
        <ProFormSelect label="Rádio da Central" colProps={{ xs: 24, md: 6 }} />
        <ProFormSelect label="Rádio do Controlador" colProps={{ xs: 24, md: 6 }} />
        <ProFormSelect label="Rádio do GPS" colProps={{ xs: 24, md: 6 }} />
        <ProFormSelect label="Rádio da Bomba" colProps={{ xs: 24, md: 6 }} />
        <ProFormField name="test" label="Nome do pivô" colProps={{ xs: 24, md: 8, xl: 8 }} />
        <ProFormSelect label="Linguagem do dispositivo" colProps={{ xs: 24, md: 8, xl: 8 }} />
        <ProFormField
          label="Raio até a última torre"
          colProps={{ xs: 24, md: 8 }}
          fieldProps={{
            suffix: 'm',
          }}
        />
        <ProFormField
          label="Vazão"
          colProps={{ xs: 24, md: 8 }}
          fieldProps={{
            suffix: 'm³/h',
          }}
        />
        <ProFormField
          label="Veloc. da última torre"
          colProps={{ xs: 24, md: 8 }}
          fieldProps={{
            suffix: 'm/h',
          }}
        />
        <ProFormField
          label="Área irrigada"
          colProps={{ xs: 24, md: 8 }}
          fieldProps={{
            suffix: 'ha',
          }}
        />
        <ProFormSelect
          name="builder"
          options={[
            {
              value: 'select',
              label: 'Bauer',
            },
            {
              value: 'others',
              label: 'Outro',
            },
          ]}
          label="Fabricante"
          colProps={{ xs: 24, md: 8 }}
        />
        <ProFormDependency name={['builder']}>
          {({ builder }) => {
            if (builder === 'others')
              return <ProFormField label="Insira o Fabricante" colProps={{ xs: 24, md: 8 }} />;
          }}
        </ProFormDependency>

        <ProFormField label="Tipo de Painel" colProps={{ xs: 24, md: 8 }} />

        <ProFormCheckbox name="pressureController" colProps={{ xs: 24, md: 24 }}>
          Controlador de tensão
        </ProFormCheckbox>

        <ProFormDependency name={['pressureController']}>
          {({ pressureController }) => {
            return (
              <>
                <ProFormField
                  label="Tensão mínima de operação"
                  disabled={!pressureController}
                  colProps={{ xs: 24, md: 8 }}
                />
                <ProFormField
                  label="Tensão máxima de operação"
                  disabled={!pressureController}
                  colProps={{ xs: 24, md: 8 }}
                />
                <ProFormField
                  label="Tempo limite"
                  disabled={!pressureController}
                  colProps={{ xs: 24, md: 8 }}
                />
              </>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotGeneralComponent;
