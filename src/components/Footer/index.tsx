import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  });

  const currentYear = new Date().getFullYear();

  const className = useEmotionCss(({}) => {
    return {
      '.ant-pro-global-footer': {
        marginBlockStart: 12,
        marginBlockEnd: 12,
      },
      '.ant-pro-global-footer-copyright ': {
        color: 'rgba(255,255,255,0.75)',
      },
      '.ant-pro-global-footer-list-link': {
        color: 'rgba(255,255,255,0.75)',
      },
    };
  });

  return (
    <>
      <DefaultFooter
        className={className}
        style={{
          background: 'none',
          color: 'white !important',
          marginTop: 0,
        }}
        copyright={`${currentYear} ${defaultMessage}`}
        links={[
          {
            key: 'Ant Design Pro',
            title: 'Ant Design Pro',
            href: 'https://pro.ant.design',
            blankTarget: true,
          },
          {
            key: 'github',
            title: <GithubOutlined />,
            href: 'https://github.com/ant-design/ant-design-pro',
            blankTarget: true,
          },
          {
            key: 'Ant Design',
            title: 'Ant Design',
            href: 'https://ant.design',
            blankTarget: true,
          },
        ]}
      />
    </>
  );
};

export default Footer;
