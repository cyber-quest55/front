import countries from '@/utils/data/country';
import { ProFormItem, ProFormItemProps, ProFormSelect } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Col, Space } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { ColProps } from 'antd/lib';
import * as React from 'react';

interface IDocumentProps {
  onChangeDocType: any;
  colProps?: ColProps;
  formItemProps?: ProFormItemProps;
  country: string;
}

const InputDocument: React.FunctionComponent<IDocumentProps> = (props) => {
  const cnt = countries.find((item) => item.iso === props.country);
  const mask1: string = cnt ? cnt.masks.documentPeson.value : '';
  const mask2 = cnt ? cnt.masks.documentEmployer.value : '';

  const [docType, setDocType] = React.useState(1);

  const onChangeDocType = (doc: number) => {
    setDocType(doc);
    props.onChangeDocType(doc);
  };

  const className = useEmotionCss(({}) => {
    return {
      '.ant-form-item': {
        marginBottom: '0px',
      },
    };
  });

  return (
    <Col {...props.colProps} className={className}>
      <ProFormItem
        style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}
        {...props.formItemProps}
      >
        <Space.Compact style={{ width: '100%', margin: 0, padding: 0 }}>
          <ProFormSelect
            onChange={onChangeDocType}
            fieldProps={{
              value: docType,
              allowClear: false,
            }}
            width={'xs'}
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
          />
          <MaskedInput
            style={{ borderRadius: '0px 6px 6px 0px', height: 32, borderLeft: 0, width: '100%' }}
            mask={docType === 1 ? mask1 : mask2}
          />
        </Space.Compact>
      </ProFormItem>
    </Col>
  );
};

export { InputDocument };
