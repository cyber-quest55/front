import EditRepeaterGeneralContainer from '@/components/Forms/EditRepeater/General/GeneralContainer';
import { useScreenHook } from '@/hooks/screen';
import { queryRepeaterById } from '@/models/repeater-by-id';
import { PageContainer, ProCard, ProFormSelect } from '@ant-design/pro-components';
import { Dispatch, useIntl, useParams } from '@umijs/max';
import React, { useState } from 'react';
import { connect } from 'dva';

interface Props {
  queryRepeaterById: typeof queryRepeaterById;
}

const EditRepeater: React.FunctionComponent<Props> = (props) => {
  const [tab, setTab] = useState('general');
  const params = useParams();
  const intl = useIntl();

  const { xs } = useScreenHook();

  React.useEffect(() => {
    props.queryRepeaterById({
      farmId: params.farmId as any,
      repeaterId: params.repeaterId as any,
    });
  }, []);

  return (
    <PageContainer
      tabBarExtraContent={
        <ProFormSelect
          fieldProps={{ value: 'repeater1' }}
          initialValue={'repeater1'}
          disabled
          noStyle
          options={[
            { value: 'repeater1', label: 'Repeater 1' },
            { value: 'repeater2', label: 'Repeater 2' },
            { value: 'repeater3', label: 'Repeater 3' },
          ]}
        />
      }
      tabList={[
        {
          tab: intl.formatMessage({
            id: 'pages.edit.repeater.tab.header.configuration',
          }),
          key: 'configuration',
          closable: false,
        },
      ]}
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
                      id: 'pages.edit.repeater.tab.options.general',
                    })}
                  </div>
                ),
                key: 'general',
                children: <EditRepeaterGeneralContainer />,
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
  queryRepeaterById: (props: any) => dispatch(queryRepeaterById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRepeater);
