import EditMeterGeneralContainer from '@/components/Forms/EditMeter/General/GeneralContainer';
import { useScreenHook } from '@/hooks/screen';
import { queryMeterSystemById } from '@/models/meter-by-id';
import { PageContainer, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { Dispatch, useIntl, useParams } from '@umijs/max';
import React, { useState } from 'react';

import EditLevelContainer from '@/components/Forms/EditMeter/Level/LevelContainer';
import LocationCallerContainer from '@/components/Forms/EditMeter/LocationCaller/LocationCallerContainer';
import EditMeterHistoryTable from '@/components/Tables/EditMeterHistoryTable';
import { getMeterSystemSensors } from '@/services/metersystem';
import { useRequest } from 'ahooks';
import { connect } from 'dva';
interface Props {
  queryMeterSystemById: typeof queryMeterSystemById;
}

const EditMeter: React.FunctionComponent<Props> = (props) => {
  const [tab, setTab] = useState('general');
  const [tabCont, setTabCont] = useState('configuration');
  const params = useParams();
  const intl = useIntl();
  const sensorsReq = useRequest(getMeterSystemSensors, { manual: true });
  const [sensorOptions, setSensorOptions] = React.useState<any[]>([]);

  const { xs } = useScreenHook();

  React.useEffect(() => {
    props.queryMeterSystemById({
      farmId: params.farmId as any,
      meterId: params.meterSystemId as any,
    });

    sensorsReq.runAsync().then((data: any) => {
      const sensors = data
        .filter((sensor: any) => sensor.available)
        .map((sensor: any) => ({
          label: sensor.sensor.name,
          value: sensor.id,
        }));
      setSensorOptions(sensors);
    });
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
          key: 'configuration',
          closable: false,
        },
        {
          tab: intl.formatMessage({
            id: 'pages.edit.meter.tab.header.history',
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
                      id: 'pages.edit.meter.tab.options.general',
                    })}
                  </div>
                ),
                key: 'general',
                children: <EditMeterGeneralContainer sensorOptions={sensorOptions} />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.meter.tab.options.location',
                }),
                key: 'location',
                children: <LocationCallerContainer />,
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.meter.tab.options.level',
                }),
                key: 'level',
                children: <EditLevelContainer />,
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
                  <EditMeterHistoryTable
                    setTabCount={setTabCont}
                    setTab={setTab}
                    queryMeterSystemById={props.queryMeterSystemById}
                    sensorOptions={sensorOptions}
                  />
                ),
              },
              {
                label: intl.formatMessage({
                  id: 'pages.edit.meter.tab.options.favorites',
                }),
                key: 'favorites',
                children: (
                  <EditMeterHistoryTable
                    setTabCount={setTabCont}
                    setTab={setTab}
                    showOnlyFavorites
                    queryMeterSystemById={props.queryMeterSystemById}
                    sensorOptions={sensorOptions}
                  />
                ),
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
  queryMeterSystemById: (props: any) => dispatch(queryMeterSystemById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMeter);
