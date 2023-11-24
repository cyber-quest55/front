import EditPivotAutoreversionContainer from '@/components/Forms/EditPivot/Autoreversion/AutoreversionContainer';
import EditPivotFinalCanonContainer from '@/components/Forms/EditPivot/FinalCanon/FinalCanonContainer';
import EditPivotGeneralContainer from '@/components/Forms/EditPivot/General/GeneralContainer';
import EditPivotHourContainer from '@/components/Forms/EditPivot/Hour/HourContainer';
import EditPivotPluviometerContainer from '@/components/Forms/EditPivot/Pluviometer/PluviometerContainer';
import EditPivotPumpContainer from '@/components/Forms/EditPivot/Pump/PumpContainer';
import EditPivotRushHourContainer from '@/components/Forms/EditPivot/RushHour/RushHourContainer';
import EditPivotFavoriteHistoryTable from '@/components/Tables/EditPivotFavoriteTable';
import EditPivotHistoryTable from '@/components/Tables/EditPivotHistoryTable';
import { useScreenHook } from '@/hooks/screen';
import { queryPivotByIdStart } from '@/models/pivot-by-id';
import { PageContainer, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { Dispatch, useIntl, useParams } from '@umijs/max';
import React, { useState } from 'react';

import LocationCallerContainer from '@/components/Forms/EditPivot/LocationCaller/LocationCallerContainer';
import FormPivotSegmentationContainer from '@/components/Forms/EditPivot/Segmentation/SegmentationContainer';
import { connect } from 'dva';
interface Props {
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const NoFoundPage: React.FunctionComponent<Props> = (props) => {
  const [tab, setTab] = useState('tab1');
  const [tabCont, setTabCont] = useState('tab1');
  const params = useParams();
  const intl = useIntl();

  const { xs } = useScreenHook();

  React.useEffect(() => {
    props.queryPivotByIdStart({ farmId: params.farmId as any, pivotId: params.pivotId as any });
  }, []);

  return (
    <PageContainer
      tabBarExtraContent={
        <ProFormSelect
          fieldProps={{ value: 'pivo1' }}
          initialValue={'pivo1'}
          noStyle
          options={[
            { value: 'pivo1', label: 'asdsadasd' },
            { value: 'pivo2', label: 'Pivô 2' },
            { value: 'pivo3', label: 'Pivô 3' },
          ]}
        />
      }
      tabList={[
        {
          tab: intl.formatMessage({
            id: 'pages.edit.pivot.tab.header.configuration',
          }),
          key: 'tab1',
          closable: false,
        },
        {
          tab: intl.formatMessage({
            id: 'pages.edit.pivot.tab.header.history',
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
                  <div style={{ minWidth: 135, textAlign: 'left' }}>
                    {intl.formatMessage({
                      id: 'pages.edit.pivot.tab.options.general',
                    })}
                  </div>
                ),
                key: 'tab1',
                children: <EditPivotGeneralContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.pivot.tab.options.location',
                }),
                key: 'tab2',
                children: <LocationCallerContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.pivot.tab.options.hour',
                }),
                key: 'tab3',
                children: <EditPivotHourContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.pivot.tab.options.pump',
                }),
                key: 'tab4',
                children: <EditPivotPumpContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.pivot.tab.options.pluvi',
                }),
                key: 'tab5',
                children: <EditPivotPluviometerContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.pivot.tab.options.pickhour',
                }),
                key: 'tab6',
                children: <EditPivotRushHourContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.pivot.tab.options.segments',
                }),
                key: 'tab7',
                children: <FormPivotSegmentationContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.pivot.tab.options.final',
                }),
                key: 'tab8',
                children: <EditPivotFinalCanonContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.pivot.tab.options.autoreversion',
                }),
                key: 'tab9',
                children: <EditPivotAutoreversionContainer />,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        ></ProCard>
      ) : (
        <ProCard
          split="vertical"
          tabs={{
            defaultActiveKey: '1',
            tabPosition: xs ? 'top' : 'left',
            destroyInactiveTabPane: true,
            items: [
              {
                label: `Configurações Anteriores`,
                key: '1',
                children: <EditPivotHistoryTable />,
              },
              {
                label: `Favoritos`,
                key: '2',
                children: <EditPivotFavoriteHistoryTable />,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        ></ProCard>
      )}
    </PageContainer>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryPivotByIdStart: (props: any) => dispatch(queryPivotByIdStart(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoFoundPage);
