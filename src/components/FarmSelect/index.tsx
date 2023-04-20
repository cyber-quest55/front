import { GetFarmModelProps } from '@/models/farm';
import { LoadingOutlined } from '@ant-design/icons';
import { useMount } from 'ahooks';
import { Divider, Dropdown, Input, Space, theme } from 'antd';
import { connect } from 'dva';
import React, { } from 'react';
import { useEffect } from 'react';
import { GiFarmTractor } from "react-icons/gi";
import { Link, useParams } from '@umijs/max';

export type FarmSelectProps = {
  name: string;
  farm: GetFarmModelProps;
  dispatch: any;
};

const { useToken } = theme;

const FarmSelect: React.FC<FarmSelectProps> = (props) => {
  const { token } = useToken();
  const params = useParams()

  const [farms, setFarms] = React.useState<Models.Farm[]>([])
  const [value, setValue] = React.useState<string>('')

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle = {
    boxShadow: 'none',
  };

  useMount(() => {
    if (!props.farm.loaded)
      props.dispatch({
        type: 'farm/queryFarm',
        payload: { id: params.id }
      })
  })

  /** When change the farm list*/
  useEffect(() => {
    if (props.farm.loaded)
      setFarms(props.farm.result.list as [])
  }, [props.farm])


  /** To filter the farm list */
  useEffect(() => {
    const toLower = value.toLowerCase()
    const reg = new RegExp(toLower + '.*')
    const newFarms = props.farm?.result?.list?.filter(item => item.name.toLowerCase().match(reg))
    setFarms(newFarms)
  }, [value])

  useEffect(() => {
    props.dispatch({
      type: 'farm/setSelectedFarm',
      payload: props.farm.result?.list?.find(f => f.id === parseInt(params.id as string))
    })
  }, [params])

  const render = farms?.map((item) => ({
    key: item.id,
    label: <Link to={`/farms/${item.id}`}><span>{item.name}</span></Link>
  }))

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValue(value)
  }
  return props.farm.loading ? <LoadingOutlined /> :
    <Dropdown
      trigger={['click']}
      placement='topRight'
      menu={{ items: render }}
      dropdownRender={(menu) => (
        <div style={contentStyle}><Divider style={{ margin: 0 }} />
          <Space style={{ padding: 8 }}>
            Fazendas
          </Space>
          <Divider style={{ margin: 0 }} />

          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          <Divider style={{ margin: 0 }} />
          <Space style={{ padding: 8 }}>
            <Input onChange={onChangeInput} value={value} />
          </Space>
        </div>
      )}
    >
      <GiFarmTractor style={{ width: 22, height: 22 }} />
    </Dropdown>
};

export default connect(({ farm }: { farm: any }) => ({
  farm,
}))(FarmSelect);  
