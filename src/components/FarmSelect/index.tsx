import { GetFarmModelProps } from '@/models/farm';
import { LoadingOutlined } from '@ant-design/icons';
import { ProField } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import React from 'react';
import { SyntheticEventData } from 'react-dom/test-utils';

export type FarmSelectProps = {
  name: string;
  farm: GetFarmModelProps;
  dispatch: any;
};

const FarmSelect: React.FC<FarmSelectProps> = (props) => {
  useMount(() => {
    props.dispatch({
      type: 'farm/queryFarm',
      payload: {}
    })
  })

  const onChange = (e: SyntheticEventData) => {
    props.dispatch({
      type: 'farm/setSelectedFarm',
      payload: props.farm.result?.list?.find(f => f.id === e)
    })
  }

  return props.farm.loading ? <LoadingOutlined /> : <ProField
    style={{ width: '100%' }}
    text="open"
    mode={'edit'}
    valueType="select"
    onChange={onChange}
    value={props.farm.result.list[0].id}
    request={async () => props.farm.result.list.map(item => ({ label: item.name, value: item.id }))}
  />;
};

export default connect(({ farm }: { farm: any }) => ({
  farm,
}))(FarmSelect);  
