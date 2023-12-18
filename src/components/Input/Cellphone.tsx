import countries from '@/utils/data/country';
import { ProFormItem, ProFormItemProps } from '@ant-design/pro-components';
import { Col } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { ColProps } from 'antd/lib';
import * as React from 'react';

interface IDocumentProps {
  colProps?: ColProps;
  formItemProps?: ProFormItemProps;
  countryCode?: string;
  country: string;
}

const InputCellphone: React.FunctionComponent<IDocumentProps> = (props) => {
  const key = 'cellphone'
  const cnt = countries.find(item => item.iso === props.country)
  const mask = cnt?  cnt.masks[key] : ''

  return (
    <Col {...props.colProps}>
      <ProFormItem style={{ width: '100%' }} {...props.formItemProps}>
        <MaskedInput
          style={{ width: '100%' }}
          addonBefore={props.countryCode ? `+${parseInt(props.countryCode)}` : '+55'}
          mask={mask}
        />
      </ProFormItem>
    </Col>
  );
};

export { InputCellphone };
