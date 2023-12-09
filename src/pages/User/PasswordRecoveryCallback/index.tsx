import { PasswordCallbackContainer } from '@/components/Forms/PasswordCallback/PasswordCallbackContainer';
import { ConfigProvider } from 'antd';

export default () => { 
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#44b86a',
        },
      }}
    >
      <div
        style={{
          height: ' 100vh ',
          backgroundImage:
            'url(https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*XpGeRoZKGycAAAAAAAAAAAAAARQnAQ)',
        }}
      >
        <PasswordCallbackContainer />
      </div>
    </ConfigProvider>
  );
};
