import { GetFarmModelProps } from '@/models/farm';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Select } from 'antd';
import { connect } from 'dva';
import React, { useEffect } from 'react';

export type FarmSelectProps = {
  name: string;
  farm: GetFarmModelProps;  
  dispatch: any;
};

const FarmSelect: React.FC<FarmSelectProps> = (props) => {
 
  const [farms, setFarms] = React.useState<Models.Farm[]>([]);
  const [value] = React.useState<string>('');

 
  /** When change the farm list*/
  useEffect(() => {
    if (props.farm.loaded) setFarms(props.farm.result.list as []);
  }, [props.farm]);

  /** To filter the farm list */
  useEffect(() => {
    const toLower = value.toLowerCase();
    const reg = new RegExp(toLower + '.*');
    const newFarms = props.farm?.result?.list?.filter((item) => item.name.toLowerCase().match(reg));
    setFarms(newFarms);
  }, [value]);

  const classNameSelect = useEmotionCss(({token}) => {
    return {
      width: '100%', 
      marginTop: 12,
      border: '1px solid rgba(255,255,255,0.75)',
      borderRadius: '6px',
      '.ant-select-selection-item': {
        fontWeight: 600,
        fontSize: 14,
        paddingInlineEnd: '35px !important',
        color: 'rgba(255,255,255,0.75)',

      },
      '.ant-select-selector': { 
      },
      '.ant-select-arrow': {
        color: token.colorTextLightSolid,
        fontSize: 16,
      },
    };
  });

  return (
    <Select
      loading={props.farm.loading}
      className={classNameSelect}
       showSearch
      bordered={false}
      value={props.farm.selectedFarm?.name?.toString()}
      size="large"
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={props.farm.result.list?.map((item) => ({
        value: item.id,
        label: item.name,
      }))}
    />
  );
};

export default connect(({ farm }: { farm: any }) => ({
  farm,
}))(FarmSelect);
