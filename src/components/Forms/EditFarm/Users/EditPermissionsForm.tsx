// Dependencies
import { ProForm } from '@ant-design/pro-components';
import {  Form } from 'antd';
import { ReactElement, useRef } from 'react';

// Props
type Props = {
  onSubmit?: (values: any) => void,
  data: API.GetUserPermissionsResponse
}

// Edit permissions form
const EditPermissionsForm = ({
  data,
  onSubmit = () => {}
}: Props): ReactElement => {
  const ref = useRef();
  const [ form ] = Form.useForm();

  console.log(data);

  return (
    <ProForm
			validateTrigger="onBlur"
			layout="vertical"
			name="edit_user_permissions"
			rowProps={{ gutter: [8, 8] }}
			submitter={false}
			form={form}
			formRef={ref}
			initialValues={{ 
		    test: ''
			}}
		  onFinish={async (values) => onSubmit(values)}
			grid
		>

    </ProForm>
  );
};

export default EditPermissionsForm;
