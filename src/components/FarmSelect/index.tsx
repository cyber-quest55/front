import { GetFarmModelProps } from '@/models/farm';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Select } from 'antd';
import { connect } from 'dva';
import React from 'react';

export type FarmSelectProps = {
  name: string;
  farm: GetFarmModelProps;
  dispatch: any;
  selectedFarm: SelectedFarmModelProps;
};

const FarmSelect: React.FC<FarmSelectProps> = (props) => {
  const classNameSelect = useEmotionCss(({ token }) => {
    return {
      width: '100%',
      marginTop: 16,
      border: '1px solid rgba(255,255,255,0.75)',
      marginBottom: 12,
      borderRadius: '6px',
      '.ant-select-selection-item': {
        fontWeight: 600,
        fontSize: 14,
        paddingInlineEnd: '35px !important',
        color: 'rgba(255,255,255,0.75)',
      },
      '.ant-select-selector': {},
      '.ant-select-arrow': {
        color: token.colorTextLightSolid,
        fontSize: 16,
      },
    };
  });

  const onChange = (value: any) => {
    props.dispatch({
      type: 'selectedFarm/setSelectedFarm',
      payload: props.farm.result.list.find((item) => item.id === value),
    });
  };

  return (
    <Select
      loading={props.farm.loading}
      className={classNameSelect}
      showSearch
      bordered={false}
      onChange={onChange}
      value={props.selectedFarm?.name?.toString()}
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

export default connect(({ farm, selectedFarm }: { farm: any; selectedFarm: any }) => ({
  farm,
  selectedFarm,
}))(FarmSelect);
