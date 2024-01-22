import countries from '@/utils/data/country';
import { ProFormItem, ProFormItemProps, ProFormSelect } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Col, Space } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { FormInstance } from 'antd-mobile/es/components/form';
import { ColProps } from 'antd/lib';
import * as React from 'react';

interface IDocumentProps {
  colProps?: ColProps;
  formItemProps: ProFormItemProps;
  country: string;
  selectItemProps: ProFormItemProps;
  form: FormInstance;
}

const CustomDocumentInput = (props: any) => {
  const cnt = countries.find((item) => item.iso === props.country);

  const mask1: string = cnt ? cnt.masks.documentPeson.value : '';
  const mask2 = cnt ? cnt.masks.documentEmployer.value : '';

  const onChangeDocType = (doc: number) => {
    const mask = doc === 1 ? mask1 : mask2;
    const maskFormatted = mask.replaceAll("0", "_");

    props.form.resetFields([props.name]);
    props.form.setFieldValue(props.name, maskFormatted);

    props.form.setFieldValue(props.selectItemProps.name, doc);
  };

  return (
    <Space.Compact style={{ width: '100%', margin: 0, padding: 0 }}>
      <div>
        <ProFormSelect
          onChange={onChangeDocType}
          fieldProps={{
            allowClear: false,
          }}
          request={async () => {
            return [
              {
                label: cnt?.masks.documentPeson.label,
                value: 1,
              },
              {
                label: cnt?.masks.documentEmployer.label,
                value: 2,
              },
            ];
          }}
          {...props.selectItemProps}
        />
      </div>
      <div style={{ width: '100%' }}>
        <MaskedInput
          style={{
            borderRadius: '0px 6px 6px 0px',
            height: 32,
            width: '100%',
          }}
          onChange={props.onChange}
          value={props.value}
          mask={props.form.getFieldValue(props.selectItemProps.name) === 1 ? mask1 : mask2}
        />
      </div>
    </Space.Compact>
  );
};

const InputDocument: React.FunctionComponent<IDocumentProps> = (props) => {
  const className = useEmotionCss(({}) => {
    return {
      '.ant-form-item': {
        marginBottom: '0px',
      },
    };
  });

  const classNameDark = useEmotionCss(({ token }) => {
    return {
      '.ant-input': {
        lineHeight: 1.5714285714285714,
        backgroundColor: token.colorBgContainer,
        backgroundImage: 'none',
        borderWidth: ' 1px',
        borderStyle: 'solid',
        borderColor: token.colorBorder,
        borderRadius: '6px',
        transition: 'all 0.2s',
        color: token.colorText,
        ':focus': {
          borderColor: token.colorPrimary,
        },
        ':hover': {
          borderColor: token.colorPrimary,
        },
      },

      '.ant-input-status-error': {
        borderColor: token.colorError,
      },
    };
  });

  return (
    <Col {...props.colProps} className={className}>
      <ProFormItem
        className={classNameDark}
        style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}
        {...props.formItemProps}
      >
        <CustomDocumentInput
          country={props.country}
          name={props.formItemProps?.name}
          selectItemProps={props.selectItemProps}
          form={props.form}
        />
      </ProFormItem>
    </Col>
  );
};

export { InputDocument };
