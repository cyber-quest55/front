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
import { SaveOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState } from 'react';

const NoFoundPage: React.FC = () => {
  const [tab, setTab] = useState('tab2');
  const [tabCont, setTabCont] = useState('tab2');
  const [isSubmiting] = useState(false);

  const { xs } = useScreenHook();

  return (
    <PageContainer
      tabBarExtraContent={
        tabCont === '1' ? (
          <Button icon={<SaveOutlined />} type="primary" loading={isSubmiting}>
            Salvar{' '}
          </Button>
        ) : null
      }
      tabList={[
        {
          tab: 'Configurações',
          key: '1',
          closable: false,
        },
        {
          tab: 'Histórico',
          key: '2',
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
                    onChangeSecondLocation={(value: string) => null}
                    firstLocationName="testing"
                    onChangeFirstLocation={(value: string) => null}
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

export default NoFoundPage;
