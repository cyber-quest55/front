// Dependencies
import {
  ProForm,
  ProFormList,
  ProFormSelect,
  ProCard
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Card, Form, Typography } from 'antd';
import { ReactElement } from 'react';

// Props
type Props = {
  onSubmit?: (values: any) => void,
  onSubmitAdmin?: () => void,
  data: API.GetUserPermissionsResponse,
  isAdmin: boolean,
  loading: boolean
};

// Edit permissions form
const EditPermissionsForm = ({
  data,
  isAdmin,
  loading,
  onSubmit = () => {},
  onSubmitAdmin = () => {},
}: Props): ReactElement => {
  const intl = useIntl();
  const [ form ] = Form.useForm();

  const formValues = data.map(d => {
    return {
      label: d.pivot ? d.pivot.name : d.irpd ? d.irpd.name : d.equipment?.name,
      equipment: d.equipment ? d.equipment.id : null,
      id: d.id,
      irpd: d.irpd ? d.irpd.id : null,
      level: d.level,
      pivot: d.pivot ? d.pivot.id : null,
      user: d.user,
    }
  });

  const handleAllSelectChange = (value: number) => {
    form.setFieldsValue({ all: value, });

    if (value !== -1) {
      const updatedFormValues = formValues.map((item) => ({
        ...item,
        level: value,
      }));
      form.setFieldsValue({ permissions: updatedFormValues  });
    }
  };

  const handleLevelChange = (changedValues: any, allValues: any) => {
    const { permissions } = allValues;
    if (permissions.some((item: any) => item.level !== allValues.all)) {
      form.setFieldsValue({ all: -1 });
    }
  };

  // If user is admin there is no settings to be done
  if (isAdmin) return (
    <Card style={{ marginBottom: 8, marginTop: 8 }}>
      <Typography.Paragraph>
        {intl.formatMessage({ id: 'component.edit.farm.users.edit.permissions.admin.description' })}
      </Typography.Paragraph>
      <Button
        disabled={loading}
        type="primary"
        onClick={async () => onSubmitAdmin()}
        block
      >
        {intl.formatMessage({ id: 'component.edit.farm.users.edit.permissions.save.admin' })}
      </Button>
    </Card>
  )
  return (
    <ProForm
      name='edit_user_permissions'
      submitter={false}
      form={form}
      initialValues={{ all: -1 }}
      onFinish={async (values) => onSubmit(values)}
      onValuesChange={handleLevelChange}
      disabled={loading}
    >
      <Card style={{ marginBottom: 8, marginTop: 8 }}>
        <Typography.Paragraph>
          {intl.formatMessage({ id: 'component.edit.farm.users.edit.permissions.description' })}
        </Typography.Paragraph>
        <ProFormSelect
          name="all"
          options={[
            {
              value: -1,
              label: intl.formatMessage({ id: 'component.edit.farm.users.permissions.custom' }),
            },
            {
              value: 0,
              label: intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.nopermission' }),
            },
            {
              value: 1,
              label: intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.viewer' }),
            },
            {
              value: 2,
              label: intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.operator' }),
            },
            {
              value: 3,
              label: intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.technician' }),
            },
          ]}
          onChange={handleAllSelectChange}
        />
        <Button
          type="primary"
          onClick={form.submit}
          block
        >
          {intl.formatMessage({ id: 'component.edit.farm.users.edit.permissions.save' })}
        </Button>
      </Card>
      <ProFormList
        name={['permissions']}
        creatorButtonProps={{ disabled: true, style: { display: 'none' }}}
        copyIconProps={false}
        itemRender={({ listDom }, { index }) => (
          <ProCard
            key={'level' + index}
            style={{ marginBlockEnd: 4 }}
            title={formValues[index].label}
            bodyStyle={{ paddingBlockEnd: 0 }}
            
          >
            {listDom}
          </ProCard>
        )}
        initialValue={formValues}
      >
        <ProForm.Group style={{ width: '100%' }}>
          <ProFormSelect
            name={['level']}
            width="xl"
            options={[
              {
                value: 0,
                label: intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.nopermission' }),
              },
              {
                value: 1,
                label: intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.viewer' }),
              },
              {
                value: 2,
                label: intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.operator' }),
              },
              {
                value: 3,
                label: intl.formatMessage({ id: 'component.edit.farm.users.guidelines.modal.title.technician' }),
              },
            ]}
          />
        </ProForm.Group>
      </ProFormList>
    </ProForm>
  );
};

export default EditPermissionsForm;
