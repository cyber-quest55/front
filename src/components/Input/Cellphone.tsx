import countries from '@/utils/data/country';
import { ProFormItem, ProFormItemProps } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
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

  const className = useEmotionCss(({ token }) => {
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
        '.ant-input-group-addon':{
          color: token.colorText,
          borderColor: token.colorBorder,
          backgroundColor: token.colorBgContainer,

        }
    };
  });

  return (
    <Col {...props.colProps}>
      <ProFormItem className={className} style={{ width: '100%' }} {...props.formItemProps}>
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
