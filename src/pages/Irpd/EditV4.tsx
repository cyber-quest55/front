import EditIrpdV4GeneralContainer from '@/components/Forms/EditIrpdV4/General/GeneralContainer';
import { useScreenHook } from '@/hooks/screen';
import { queryIrpdById } from '@/models/irpd-by-id';
import { PageContainer, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { Dispatch, useIntl, useParams } from '@umijs/max';
import React, { useState } from 'react';

// import EditLevelContainer from '@/components/Forms/EditMeter/Level/LevelContainer';
import EditIrpdV4LocationCallerComponent from '@/components/Forms/EditIrpdV4/LocationCaller/LocationCallerContainer';
import { connect } from 'dva';

interface Props {
  queryIrpdById: typeof queryIrpdById;
}

const EditIrpdV4: React.FunctionComponent<Props> = (props) => {
  const [tab, setTab] = useState('general');
  const params = useParams();
  const intl = useIntl();

  const { xs } = useScreenHook();

  React.useEffect(() => {
    props.queryIrpdById({
      farmId: params.farmId as any,
      irpdId: params.irpdId as any,
    });
  }, []);

  return (
    <PageContainer
      tabBarExtraContent={
        <ProFormSelect
          fieldProps={{ value: 'pump1' }}
          initialValue={'pump1'}
          disabled
          noStyle
          options={[
            { value: 'pump1', label: 'Pump 1' },
            { value: 'pump2', label: 'Pump 2' },
            { value: 'pump3', label: 'Pump 3' },
          ]}
        />
      }
      tabList={[
        {
          tab: intl.formatMessage({
            id: 'pages.edit.irpd.tab.header.configuration',
          }),
          key: 'configuration',
          closable: false,
        },
      ]}
      tabActiveKey="configuration"
      token={{
        paddingBlockPageContainerContent: -8,
        paddingInlinePageContainerContent: 32,
      }}
      tabProps={{
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
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
                label: (
                  <div style={{ minWidth: xs ? '' : 135, textAlign: 'left' }}>
                    {intl.formatMessage({
                      id: 'pages.edit.irpd.tab.options.general',
                    })}
                  </div>
                ),
                key: 'general',
                children: <EditIrpdV4GeneralContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.irpd.tab.options.location',
                }),
                key: 'location',
                children: <EditIrpdV4LocationCallerComponent />,
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryIrpdById: (props: any) => dispatch(queryIrpdById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditIrpdV4);
