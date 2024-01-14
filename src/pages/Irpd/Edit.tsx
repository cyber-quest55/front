import EditIrpdGeneralContainer from '@/components/Forms/EditIrpd/General/GeneralContainer';
import { useScreenHook } from '@/hooks/screen';
import { queryIrpdById } from '@/models/irpd-by-id';
import { PageContainer, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { Dispatch, useIntl, useParams } from '@umijs/max';
import React, { useState } from 'react';

// import EditLevelContainer from '@/components/Forms/EditMeter/Level/LevelContainer';
import LocationCallerContainer from '@/components/Forms/EditIrpd/LocationCaller/LocationCallerContainer';
import EditIrpdHistoryTable from '@/components/Tables/EditIrpdHistoryTable';
import { connect } from 'dva';

interface Props {
  queryIrpdById: typeof queryIrpdById;
}

const EditIrpd: React.FunctionComponent<Props> = (props) => {
  const [tab, setTab] = useState('general');
  const [tabCont, setTabCont] = useState('configuration');
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
        {
          tab: intl.formatMessage({
            id: 'pages.edit.irpd.tab.header.history',
          }),
          key: 'history',
        },
      ]}
      tabActiveKey={tabCont}
      onTabChange={(activeKey) => {
        setTabCont(activeKey);
        if (activeKey === 'configuration') {
          setTab('general');
        } else if (activeKey === 'history') {
          setTab('previoussettings');
        }
      }}
      token={{
        paddingBlockPageContainerContent: -8,
        paddingInlinePageContainerContent: 32,
      }}
      tabProps={{
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
    >
      {tabCont === 'configuration' ? (
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
                children: <EditIrpdGeneralContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.irpd.tab.options.location',
                }),
                key: 'location',
                children: <LocationCallerContainer />,
              },
              // {
              //   label: intl.formatMessage({
              //     id: 'pages.edit.meter.tab.options.level',
              //   }),
              //   key: 'level',
              //   children: <EditLevelContainer />,
              // },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        ></ProCard>
      ) : 
      (
        <ProCard
          split="vertical"
          tabs={{
            defaultActiveKey: 'previoussettings',
            tabPosition: xs ? 'top' : 'left',
            destroyInactiveTabPane: true,
            items: [
              {
                label: intl.formatMessage({
                  id: 'pages.edit.meter.tab.options.previoussettings',
                }),
                key: 'previoussettings',
                children: (
                  <EditIrpdHistoryTable
                    setTabCount={setTabCont}
                    setTab={setTab}
                    queryIrpdById={props.queryIrpdById}
                  />
                ),
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.meter.tab.options.favorites',
                }),
                key: 'favorites',
                children: (
                  <EditIrpdHistoryTable
                    setTabCount={setTabCont}
                    setTab={setTab}
                    showOnlyFavorites
                    queryIrpdById={props.queryIrpdById}
                  />
                ),
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        ></ProCard>
      )
      }
    </PageContainer>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryIrpdById: (props: any) => dispatch(queryIrpdById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditIrpd);
