import { LoadingOutlined } from '@ant-design/icons';
import { ProField } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import { connect } from 'dva';
import React from 'react';

export type WithConnectionProps = {
    dispatch: any;
    farmConnection: any
}; 

const FarmSelect: React.FC<WithConnectionProps> = (props) => {
  useMount(() => {
    props.dispatch({
      type: 'farm/queryFarm',
      payload: {}
    })
  })

  return props.farmConnection.loading? <LoadingOutlined/> : <ProField
    style={{ marginRight: 12, width: 175 }}
    text="open"
    mode={'edit'}
    valueType="select"
    value={props.farmConnection.result.list[0].id}  
    request={async () => props.farmConnection.result.list.map(item => ({label: item.name, value: item.id}))}
  />;
};

export default connect(({ farm }: { farm: any }) => ({
  farm,
}))(FarmSelect);  
