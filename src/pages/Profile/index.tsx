import EditGeneralContainer from '@/components/Forms/EditProfile/General/GeneralContainer';
import EditSecurityContainer from '@/components/Forms/EditProfile/Security/SecurityContainer';
import { useScreenHook } from '@/hooks/screen';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import {  useState } from 'react';

const Profile: React.FC = () => {
  const [tab, setTab] = useState('general');
  const intl = useIntl();
  const { xs } = useScreenHook();

  return (
    <PageContainer
      tabList={[
        {
          tab: intl.formatMessage({
            id: 'pages.edit.profile.tab.header.configuration',
          }),
          key: 'configuration',
          closable: false,
        },
      ]}
      tabProps={{
        hideAdd: true,
      }}
    >
      <ProCard
        split="vertical"
        tabs={{
          tabPosition: xs ? 'top' : 'left',
          activeKey: tab,
          defaultActiveKey: 'general',
          destroyInactiveTabPane: true,
          items: [
            {
              label: intl.formatMessage({
                id: 'pages.edit.profile.tab.options.general',
              }),
              key: 'general',
              children: <EditGeneralContainer />,
            },
            {
              label: intl.formatMessage({
                id: 'pages.edit.profile.tab.options.security',
              }),
              key: 'security',
              children: <EditSecurityContainer />,
            },
          ],
          onChange: (key) => {
            setTab(key);
          },
        }}
      ></ProCard>
    </PageContainer>
  );
};

export default Profile;
