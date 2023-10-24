import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Typography } from 'antd';
import * as React from 'react';

interface IAppProps {}

const EditPivotHourComponent: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <ProCard
      title={
        <Typography.Title style={{ margin: 0 }} level={4}>
          Horários
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
        initialValues={{ deviceHour: 'select' }}
      >
        <ProFormSelect
          label="Relógio do equipamento"
          colProps={{ xs: 24, md: 6 }}
          options={[
            {
              value: 'select',
              label: 'Configurar relógio do equipamento com horário atual',
            },
            {
              value: 'others',
              label: 'Configurar relógio do equipamento manualmente',
            },
          ]}
          name="deviceHour"
        />

        <ProFormDependency name={['deviceHour']}>
          {({ deviceHour }) => {
            return (
              <ProFormDateTimePicker
                label="Data do equipamento"
                disabled={!(deviceHour === 'others')}
              />
            );
          }}
        </ProFormDependency>
      </ProForm>
    </ProCard>
  );
};

export default EditPivotHourComponent;
