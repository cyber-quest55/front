// Dependencies
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import EditFarmGeneralContainer from '@/components/Forms/EditFarm/General/GeneralContainer'
import { GetFarmByIdModelProps, queryFarmById } from '@/models/farm-by-id';
import { useScreenHook } from '@/hooks/screen';
import { useMount } from 'ahooks'
import { connect } from 'dva';
import { FunctionComponent, ReactElement, useState } from 'react';

// Component props
type Props = {
  farm: GetFarmByIdModelProps;
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
          ]
        }}
      >
        <p>
          {
            intl.formatMessage({
              id: 'pages.edit.farm.tab.header.title'
            })
          } - {params.id}
        </p>
      </ProCard>
		</PageContainer>
  );
};

// Redux mappings
const mapStateToProps = ({ farm }: any) => ({ farm });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryFarmById: (props: any) => dispatch(queryFarmById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFarm);