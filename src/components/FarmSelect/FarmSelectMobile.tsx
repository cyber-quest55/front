import { GetFarmModelProps } from '@/models/farm';
import { SelectedFarmModelProps } from '@/models/selected-farm';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Picker, Space } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import { useState } from 'react';

type Props = {
  farm: GetFarmModelProps;
  selectedFarm: SelectedFarmModelProps;
  onChange: (value: APIModels.Farm) => void;
  options: { value: number; label: string }[];
};

const FarmSelectMobile: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);

  const { onChange, selectedFarm, options } = props;
  const { name } = selectedFarm;

  const selectStyle = useEmotionCss(({ token }) => {
    return {
      width: '100%',
      marginTop: 16,
      border: '1px solid rgba(255,255,255,0.75)',
      marginBottom: 12,
      background: 'transparent',
      borderRadius: '6px',
      color: token.colorTextLightSolid,
      fontSize: 16,
    };
  });

  const handleChange = (value: any[]) => {
    const farm: APIModels.Farm = {
      id: value[0],
      name: '',
      timezone: '',
      is_administrator: true,
      payment_status: 0,
    };
    onChange(farm);
  };

  return (
    <>
      <Space direction="vertical" block>
        <Button
          className={selectStyle}
          style={{
            marginTop: 16,
            border: '1px solid rgba(255,255,255,0.75)',
            marginBottom: 12,
            width: '100%',
          }}
          onClick={() => {
            setVisible(true);
          }}
        >
          {name} <DownOutline />
        </Button>
      </Space>
      <Picker
        style={{
          '--title-font-size': '13px',
          '--header-button-font-size': '13px',
          '--item-font-size': '13px',
          '--item-height': '30px',
        }}
        defaultValue={[name]}
        columns={[options]}
        visible={visible}
        cancelText="Cancelar"
        confirmText="Confirmar"
        title="Fazendas"
        onConfirm={handleChange}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export { FarmSelectMobile };
