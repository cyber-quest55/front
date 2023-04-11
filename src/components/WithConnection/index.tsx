import { GetFarmModelProps } from '@/models/farm';
import { GetFarmConnectionModelProps } from '@/models/farm-connection';
import { LoadingOutlined, WifiOutlined } from '@ant-design/icons';
import { Dispatch } from '@umijs/max';
import { Badge, Tooltip } from 'antd';
import { connect } from 'dva';
import React, { useEffect } from 'react';

export type WithConnectionProps = {
  dispatch: Dispatch;
  farm: GetFarmModelProps;
  farmConnection: GetFarmConnectionModelProps;
};

const WithConnection: React.FC<WithConnectionProps> = (props) => {

  useEffect(() => {
    if (props.farm.loaded && !props.farmConnection.loaded)
      props.dispatch({
        type: 'farmConnection/queryFarmConnection',
        payload: { id: props.farm.selectedFarm }
      })
  }, [props.farm.selectedFarm])

  return <span style={{ marginRight: '8px' }} >
    {
      props.farmConnection.loading ?
        <Tooltip title="Carregando conexão da fazenda"> <LoadingOutlined /> </Tooltip>
        :
        props.farmConnection?.result?.is_online ?
          <Tooltip title="Fazenda com conexão"> <WifiOutlined style={{fontSize: 18}} /> </Tooltip> :
          <Badge count={"x"} size="small" style={{ color: 'white' }}>
            <Tooltip title="Fazenda sem conexão"> <WifiOutlined style={{fontSize: 18}} /> </Tooltip>
          </Badge >
    }
  </span>
};

export default connect(({ farm, farmConnection }: { farm: any, farmConnection: any }) => ({
  farm,
  farmConnection,
}))(WithConnection);  
