import countries from '@/utils/data/country';
import { ProFormItem, ProFormItemProps } from '@ant-design/pro-components';
import { Col } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import { ColProps } from 'antd/lib';
import * as React from 'react';

interface IDocumentProps {
  colProps?: ColProps;
  formItemProps?: ProFormItemProps;
  fieldProps?: Partial<MaskedInputProps>;
  country: string;
}

const InputCep: React.FunctionComponent<IDocumentProps> = (props) => {
  const key = 'cep';
  const cnt = countries.find((item) => item.iso === props.country);
  const mask = cnt ? cnt.masks[key] : '';

  return (
    <Col {...props.colProps}>
      <ProFormItem style={{ width: '100%' }} {...props.formItemProps}>
        <MaskedInput {...props.fieldProps} mask={mask} />
      </ProFormItem>
    </Col>
  );
};

export { InputCep };
