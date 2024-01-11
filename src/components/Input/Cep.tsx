import countries from '@/utils/data/country';
import { ProFormItem, ProFormItemProps } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
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

  const className= useEmotionCss(({ token }) => {
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
          borderColor: token.colorError
        },
        
      
    };
  });

  return (
    <Col {...props.colProps}>
      <ProFormItem style={{ width: '100%' }} {...props.formItemProps}  className={className} >
        <MaskedInput  {...props.fieldProps} mask={mask} />
      </ProFormItem>
    </Col>
  );
};

export { InputCep };
