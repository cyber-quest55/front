import { ProCard } from '@ant-design/pro-components';
import { history, useIntl } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => {
  const intl = useIntl();

  return (
    <ProCard ghost  style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Result
        status="404"
        title="404"
        subTitle={intl.formatMessage({
          id: 'pages.404.desc',
        })}
        extra={
          <Button type="primary" onClick={() => history.back()}>
            {intl.formatMessage({
              id: 'pages.404.btn',
            })}
          </Button>
        }
      />
    </ProCard>
  );
};

export default NoFoundPage;
