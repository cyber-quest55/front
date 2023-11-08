import EditPivotAutoreversionContainer from '@/components/Forms/EditPivot/Autoreversion/AutoreversionContainer';
import EditPivotFinalCanonContainer from '@/components/Forms/EditPivot/FinalCanon/FinalCanonContainer';
import EditPivotGeneralContainer from '@/components/Forms/EditPivot/General/GeneralContainer';
import EditPivotHourContainer from '@/components/Forms/EditPivot/Hour/HourContainer';
import EditPivotPluviometerContainer from '@/components/Forms/EditPivot/Pluviometer/PluviometerContainer';
import EditPivotPumpContainer from '@/components/Forms/EditPivot/Pump/PumpContainer';
import EditPivotRushHourContainer from '@/components/Forms/EditPivot/RushHour/RushHourContainer';
import LocationFormContainer from '@/components/Forms/Location/LocationContainer';
import FormPivotSegmentationContainer from '@/components/Forms/Segmentation/SegmentationContainer';
import EditPivotFavoriteHistoryTable from '@/components/Tables/EditPivotFavoriteTable';
import EditPivotHistoryTable from '@/components/Tables/EditPivotHistoryTable';
import { useScreenHook } from '@/hooks/screen';
import { queryPivotByIdStart } from '@/models/pivot-by-id';
import { SaveOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { Dispatch, useParams } from '@umijs/max';
import { Button } from 'antd';
import React, { useState } from 'react';

import { connect } from 'dva';
interface Props {
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const NoFoundPage: React.FunctionComponent<Props> = (props) => {
  const [tab, setTab] = useState('tab1');
  const [tabCont, setTabCont] = useState('tab1');
  const params = useParams();

  const { xs } = useScreenHook();

  React.useEffect(() => {
    props.queryPivotByIdStart({ farmId: params.farmId as any, pivotId: params.pivotId as any });
  }, []);

 
  return (
    <PageContainer
      tabBarExtraContent={
        <ProFormSelect fieldProps={{value: 'pivo1'}} initialValue={"pivo1"} noStyle options={[
          {value: 'pivo1', label: 'asdsadasd'},
          {value: 'pivo2', label: 'Pivô 2'},
          {value: 'pivo3', label: 'Pivô 3'},
        ]}/>
      }
      tabList={[
        {
          tab: 'Configurações',
          key: 'tab1',
          closable: false,
        },
        {
          tab: 'Histórico',
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
                label: `Geral`,
                key: 'tab1',
                children: <EditPivotGeneralContainer />,
              },
              {
                label: `Localização`,
                key: 'tab2',
                children: (
                  <LocationFormContainer
                    lat={-22.9013676}
                    lng={-47.0598314}
                    hasNorthReference={true}
                    secondLocationName="test"
                    onChangeSecondLocation={() => null}
                    firstLocationName="testing"
                    onChangeFirstLocation={() => null}
                  />
                ),
              },
              {
                label: `Horário`,
                key: 'tab3',
                children: <EditPivotHourContainer />,
              },
              {
                label: `Bomba`,
                key: 'tab4',
                children: <EditPivotPumpContainer />,
              },
              {
                label: `Pluviometro`,
                key: 'tab5',
                children: <EditPivotPluviometerContainer />,
              },
              {
                label: `Horário de Pico`,
                key: 'tab6',
                children: <EditPivotRushHourContainer />,
              },
              {
                label: `Segmentos e Plantio`,
                key: 'tab7',
                children: <FormPivotSegmentationContainer />,
              },
              {
                label: `Canhão Final`,
                key: 'tab8',
                children: <EditPivotFinalCanonContainer />,
              },
              {
                label: `Auto Reversão`,
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
