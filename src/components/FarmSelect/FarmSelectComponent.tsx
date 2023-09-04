import { GetFarmModelProps } from '@/models/farm';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Select } from 'antd';
import React from 'react';

export type FarmSelectProps = {
  farm: GetFarmModelProps;
  selectedFarm: SelectedFarmModelProps;
  onChange: (value: APIModels.Farm) => void;
  options: { value: number; label: string }[];
};

const FarmSelectComponent: React.FC<FarmSelectProps> = (props) => {
  const { onChange, selectedFarm, options } = props;
  const { name } = selectedFarm;

  const selectStyle = useEmotionCss(({ token }) => {
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


  const handleChange = (value: number) => {
    const farm: APIModels.Farm = {
      id: value,
      name: '',
      timezone: '',
      is_administrator: true,
      payment_status: 0,
    };
    onChange(farm);
  };


  return (
    <Select
      className={selectStyle}
      showSearch
      bordered={false}
      onChange={handleChange}
      value={name as any}
      size="large"
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options}
    />
  );
};

export { FarmSelectComponent };
