import { GetIrpdByIdModelProps } from '@/models/irpd-by-id';
import { yupValidator } from '@/utils/adapters/yup';
import { PTPToMillimeter } from '@/utils/formater/get-ptp-to-milimiter';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormGroup,
  ProFormSegmented,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import * as yup from 'yup';

interface IStartPivotScheduleComponentProps {
  irpdById: GetIrpdByIdModelProps;
}

const StartPivotScheduleComponent: React.FunctionComponent<IStartPivotScheduleComponentProps> = (
  props,
) => {
  const params = useParams();
  const [form] = Form.useForm<any>();
  const intl = useIntl();

  const { message } = App.useApp();

  const [expected, setExpected] = React.useState({
    rawDuration: 1,
    totalDuration: 0,
  });

  const postReq = useRequest(async () => {}, { manual: true });
  const schema = yup.object().shape({});

  const yupSync = yupValidator(schema, form.getFieldsValue);
  const pivot = props.irpdById.unformated;

  return (
    <ModalForm<any>
      onFieldsChange={(fields) => {
        const name = fields[0].name.join('.');

        // Caso mude a porcentagem mudar a precipitação
        if (name === 'content.simple_irrigation_parameters.percent') {
          const result = PTPToMillimeter(pivot, fields[0].value);
          form.setFieldValue(['garbage', 'preciptation'], result.toFixed(4));
        }

        // Caso mude o start_mode ajustar campo de data-hora
        if (name === 'content.simple_irrigation_parameters.start_mode') {
          if (fields[0].value === 0) form.setFieldValue(['garbage', 'unformated_date'], dayjs());
        }
      }}
      // Caso mude qualquer valor, recalcular o estimated time

      title={intl.formatMessage({
        id: 'component.irpd.scheduleirr.title',
      })}
      trigger={
        <Typography.Link style={{ width: '100%' }}>
          {intl.formatMessage({
            id: 'component.pivot.operationalpanel.button.start.opt.4',
          })}
        </Typography.Link>
      }
      form={form}
      initialValues={{}}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        width: 450,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          message.success(
            intl.formatMessage({
              id: 'component.message.success',
            }),
          );
        } catch (err) {
          message.error(
            intl.formatMessage({
              id: 'component.message.error',
            }),
          );
          return false;
        }
        return true;
      }}
    >
      <ProFormSegmented
        request={async () => [
          {
            label: intl.formatMessage({
              id: 'component.irpd.scheduleirr.type.opt.1',
            }),
            value: 'year',
          },
          {
            label: intl.formatMessage({
              id: 'component.irpd.scheduleirr.type.opt.2',
            }),
            value: 'month',
          },
        ]}
      />
      <ProFormGroup>
        <ProFormDatePicker
          label={intl.formatMessage({
            id: 'component.irpd.scheduleirr.label.opt.1',
          })}
        />
        <ProFormDatePicker
          label={intl.formatMessage({
            id: 'component.irpd.scheduleirr.label.opt.2',
          })}
        />
      </ProFormGroup>
    </ModalForm>
  );
};

export default StartPivotScheduleComponent;
