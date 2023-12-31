import EditMeterGeneralContainer from '@/components/Forms/EditMeter/General/GeneralContainer';
// import EditPivotFavoriteHistoryTable from '@/components/Tables/EditPivotFavoriteTable';
// import EditPivotHistoryTable from '@/components/Tables/EditPivotHistoryTable';
import { useScreenHook } from '@/hooks/screen';
import { queryMeterSystemById } from '@/models/meter-by-id';
import { PageContainer, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { Dispatch, useIntl, useParams } from '@umijs/max';
import React, { useState } from 'react';

import LocationCallerContainer from '@/components/Forms/EditMeter/LocationCaller/LocationCallerContainer';
import { connect } from 'dva';
import EditLevelContainer from '@/components/Forms/EditMeter/Level/LevelContainer';
interface Props {
  queryMeterSystemById: typeof queryMeterSystemById;
//   loadPivotConfig: typeof loadPivotConfig;
}

const NoFoundPage: React.FunctionComponent<Props> = (props) => {
  const [tab, setTab] = useState('tab1');
  const [tabCont, setTabCont] = useState('tab1');
  const params = useParams();
  const intl = useIntl();

  const { xs } = useScreenHook();

  React.useEffect(() => {
    props.queryMeterSystemById({ farmId: params.farmId as any, meterId: params.meterSystemId as any });
  }, []);

  return (
    <PageContainer
      tabBarExtraContent={
        <ProFormSelect
          fieldProps={{ value: 'meter1' }}
          initialValue={'meter1'}
          disabled
          noStyle
          options={[
            { value: 'meter1', label: 'Meter 1' },
            { value: 'meter2', label: 'Meter 2' },
            { value: 'meter3', label: 'Meter 3' },
          ]}
        />
      }
      tabList={[
        {
          tab: intl.formatMessage({
            id: 'pages.edit.meter.tab.header.configuration',
          }),
          key: 'tab1',
          closable: false,
        },
        {
          tab: intl.formatMessage({
            id: 'pages.edit.meter.tab.header.history',
          }),
          key: 'tab2',
        },
      ]}
      tabActiveKey={tabCont}
      onTabChange={(e) => setTabCont(e)}
      token={{
        paddingBlockPageContainerContent: -8,
        paddingInlinePageContainerContent: xs ? 8 : 32,
      }}
      tabProps={{
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
    >
      {tabCont === 'tab1' ? (
        <ProCard
          split="vertical"
          tabs={{
            tabPosition: xs ? 'top' : 'left',
            activeKey: tab,
           
            destroyInactiveTabPane: true,
            items: [
              {
                label: (
                  <div style={{ minWidth: xs? ''  : 135, textAlign: 'left' }}>
                    {intl.formatMessage({
                      id: 'pages.edit.meter.tab.options.general',
                    })}
                  </div>
                ),
                key: 'tab1',
                children: <EditMeterGeneralContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.meter.tab.options.location',
                }),
                key: 'tab2',
                children: <LocationCallerContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.meter.tab.options.level',
                }),
                key: 'tab3',
                children: <EditLevelContainer />,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        ></ProCard>
      ) : null
    //   (
    //     <ProCard
    //       split="vertical"
    //       tabs={{
    //         defaultActiveKey: '1',
    //         tabPosition: xs ? 'top' : 'left',
    //         destroyInactiveTabPane: true,
    //         items: [
    //           {
    //             label: intl.formatMessage({
    //               id: 'pages.edit.meter.tab.options.favorites',
    //             }),
    //             key: '1',
    //             children: <EditPivotHistoryTable setTabCount={setTabCont} loadPivotConfig={props.loadPivotConfig}/>,
    //           },
    //           {
    //             label: intl.formatMessage({
    //               id: 'pages.edit.meter.tab.options.previoussettings',
    //             }),
    //             key: '2',
    //             children: <EditPivotFavoriteHistoryTable setTabCount={setTabCont} loadPivotConfig={props.loadPivotConfig}/>,
    //           },
    //         ],
    //         onChange: (key) => {
    //           setTab(key);
    //         },
    //       }}
    //     ></ProCard>
    //   )
      }
    </PageContainer>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryMeterSystemById: (props: any) => dispatch(queryMeterSystemById(props)),
//   loadPivotConfig: (props: any) => dispatch(loadPivotConfig(props)),

});

export default connect(mapStateToProps, mapDispatchToProps)(NoFoundPage);
