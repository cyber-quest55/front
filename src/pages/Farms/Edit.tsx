// Dependencies
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import BillingContainer from '@/components/Forms/EditFarm/Billing/BillingContainer'
import ContactContainer from '@/components/Forms/EditFarm/Contact/ContactContainer'
import EditFarmGeneralContainer from '@/components/Forms/EditFarm/General/GeneralContainer'
import HolidaysContainer from '@/components/Forms/EditFarm/Holidays/HolidaysContainer'
import LocationCallerContainer from '@/components/Forms/EditFarm/LocationCaller/LocationCallerContainer'
import PivotReportsContainer from '@/components/Forms/EditFarm/PivotReports/PivotReportsContainer'
import PowerRangesContainer from '@/components/Forms/EditFarm/PowerRanges/PowerRangesContainer'
import PumpReportsContainer from '@/components/Forms/EditFarm/PumpReports/PumpReportsContainer'
import UsersContainer from '@/components/Forms/EditFarm/Users/UsersContainer'
import { GetFarmByIdModelProps, queryFarmById } from '@/models/farm-by-id';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { useScreenHook } from '@/hooks/screen';
import { history } from '@umijs/max';
import { useMount } from 'ahooks'
import { connect } from 'dva';
import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

// Component props
type Props = {
  farm: GetFarmByIdModelProps;
  selectedFarm: SelectedFarmModelProps;
  queryFarmById: typeof queryFarmById;
};

// Component
export const EditFarm: FunctionComponent<Props> = (props): ReactElement => {
	// Hooks
  const params = useParams();
  const intl = useIntl();
  const { xs } = useScreenHook();
  const [ tab, setTab ] = useState('tab1');

  // Effects
  useMount(() => {
    if (!props.farm.loaded) {
      const id = parseInt(params.id as string);
      props.queryFarmById({ id });
    }
  });

  useEffect(() => {
    if (props.selectedFarm.id !== 0) {
      history.push(`${props.selectedFarm.id}`);
      return;
    }
  }, [props.selectedFarm]);
  
  // Main TSX
  return (
		<PageContainer>
      <ProCard
        split="vertical"
        tabs={{
          tabPosition: xs ? 'top': 'left',
          activeKey: tab,
          destroyInactiveTabPane: true,
          onChange: (key) => setTab(key),
          items: [
            {
              label: (
                <div style={{ minWidth: xs? '' : 135, textAlign: 'left' }}>
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.general',
                  })}
                </div>
              ),
              key: 'tab1',
              children: <EditFarmGeneralContainer />,
            },
            {
              label: (
                <div style={{ minWidth: xs? '' : 135, textAlign: 'left' }}>
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.location',
                  })}
                </div>
              ),
              key: 'tab2',
              children: <LocationCallerContainer />,
            },
            {
              label: (
                <div style={{ minWidth: xs? '' : 135, textAlign: 'left' }}>
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.billing',
                  })}
                </div>
              ),
              key: 'tab3',
              children: <BillingContainer />,
            },
            {
              label: (
                <div style={{ minWidth: xs? '' : 135, textAlign: 'left' }}>
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.contact',
                  })}
                </div>
              ),
              key: 'tab4',
              children: <ContactContainer />,
            },
            {
              label: (
                <div style={{ minWidth: xs? '' : 135, textAlign: 'left' }}>
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.pivotreports',
                  })}
                </div>
              ),
              key: 'tab5',
              children: <PivotReportsContainer />,
            },
            {
              label: (
                <div style={{ minWidth: xs? '' : 135, textAlign: 'left' }}>
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.pumpreports',
                  })}
                </div>
              ),
              key: 'tab6',
              children: <PumpReportsContainer />,
            },
            {
              label: (
                <div style={{ minWidth: xs? '' : 135, textAlign: 'left' }}>
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.powerranges',
                  })}
                </div>
              ),
              key: 'tab7',
              children: <PowerRangesContainer />,
            },
            {
              label: (
                <div style={{ minWidth: xs? '' : 135, textAlign: 'left' }}>
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.holidays',
                  })}
                </div>
              ),
              key: 'tab8',
              children: <HolidaysContainer />,
            },
            {
              label: (
                <div 
                  style={{
                    minWidth: xs? '' : 135,
                    textAlign: 'left',
                    paddingBottom: 16
                  }}
                >
                  {intl.formatMessage({
                    id: 'pages.edit.farm.tab.options.users',
                  })}
                </div>
              ),
              key: 'tab9',
              children: <UsersContainer />,
            },
          ]
        }}
      />
		</PageContainer>
  );
};

// Redux mappings
const mapStateToProps = ({
  farm,
  selectedFarm
}: any) => ({
  farm,
  selectedFarm
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryFarmById: (props: any) => dispatch(queryFarmById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFarm);