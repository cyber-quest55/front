import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-components';
import { Col, Typography } from 'antd';
import * as React from 'react';

interface IAppProps {}

const EditPivotRushHourComponent: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Descrição
        </Typography.Title>
      }
      ghost
      gutter={[12, 12]}
      style={{ minHeight: '60vh' }}
    >
      <div style={{ marginBottom: 20 }}>
        <Typography.Text>
          Horários de Pico são faixas de tempo no qual o pivô não deve operar com água para evitar o
          uso em horários críticos, por exemplo, quando o custo da energia elétrica é alto.
        </Typography.Text>
      </div>
      <ProForm
        validateTrigger="onBlur"
        layout="vertical"
        rowProps={{ gutter: [8, 8] }}
        grid
        submitter={false}
        name="HourForm"
        initialValues={{ firstHour: false }}
      >
        <Col style={{ padding: 0 }} span={24}>
          <Typography.Title style={{ marginTop: 12 }} level={4}>
            Preços das Faixas de Energia
          </Typography.Title>
        </Col>
        <ProFormMoney
          colProps={{ xs: 24, md: 8 }}
          label="Ponta"
          name="testing"
          fieldProps={{ precision: 2 }}
          min={0}
          max={999}
          locale="pt-BR"
        />
        <ProFormMoney
          colProps={{ xs: 24, md: 8 }}
          label="Fora de Ponta"
          fieldProps={{ precision: 2 }}
          min={0}
          max={999}
          locale="pt-BR"
        />
        <ProFormMoney
          colProps={{ xs: 24, md: 8 }}
          label="Reduzido"
          fieldProps={{ precision: 2 }}
          min={0}
          max={999}
          locale="pt-BR"
        />
        <Col style={{ padding: 0 }} span={24}>
          <Typography.Title style={{ marginTop: 12 }} level={4}>
            Dias da Semana
          </Typography.Title>
        </Col>
        <ProFormCheckbox colProps={{ xs: 24, md: 1 }}>DOM</ProFormCheckbox>
        <ProFormCheckbox colProps={{ xs: 24, md: 1 }}>SEG</ProFormCheckbox>
        <ProFormCheckbox colProps={{ xs: 24, md: 1 }}>TER</ProFormCheckbox>
        <ProFormCheckbox colProps={{ xs: 24, md: 1 }}>QUA</ProFormCheckbox>
        <ProFormCheckbox colProps={{ xs: 24, md: 1 }}>QUI</ProFormCheckbox>
        <ProFormCheckbox colProps={{ xs: 24, md: 1 }}>SEX</ProFormCheckbox>
        <ProFormCheckbox colProps={{ xs: 24, md: 1 }}>SAB</ProFormCheckbox>
        <Col style={{ padding: 0 }} span={24}>
          <Typography.Title style={{ marginTop: 12 }} level={4}>
            Configurações
          </Typography.Title>
        </Col>
        <ProFormCheckbox
          name="firstHour"
          fieldProps={{ style: { paddingTop: '30px' } }}
          colProps={{ xs: 24, md: 4 }}
        >
          Ativar horário de pico 1
        </ProFormCheckbox>
        <ProFormDependency name={['firstHour']}>
          {({ firstHour }) => {
            return (
              <>
                <ProFormText
                  disabled={!firstHour}
                  label="Início do horário de pico"
                  colProps={{ xs: 24, md: 10 }}
                />
                <ProFormText
                  disabled={!firstHour}
                  label="Final do horário de pico"
                  colProps={{ xs: 24, md: 10 }}
                />
                <ProFormCheckbox
                  name="secondHour"
                  disabled={!firstHour}
                  fieldProps={{ style: { paddingTop: '30px' } }}
                  colProps={{ xs: 24, md: 4 }}
                >
                  Ativar horário de pico 2
                </ProFormCheckbox>
              </>
            );
          }}
        </ProFormDependency>

        <ProFormDependency name={['firstHour', 'secondHour']}>
          {({ secondHour, firstHour}) => {
            return (
              <>
                <ProFormText
                  disabled={!secondHour || !firstHour}
                  label="Início do horário de pico"
                  colProps={{ xs: 24, md: 10 }}
                />
                <ProFormText
                  disabled={!secondHour || !firstHour}
                  label="Final do horário de pico"
                  colProps={{ xs: 24, md: 10 }}
                />
              </>
            );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotRushHourComponent;
