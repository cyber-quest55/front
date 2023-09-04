import { useScreenHook } from '@/hooks/screen';
import { GetFarmModelProps } from '@/models/farm';
import { SelectedFarmModelProps, setSelectedFarm } from '@/models/selected-farm';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import { FarmSelectComponent } from './FarmSelectComponent';
import { FarmSelectMobile } from './FarmSelectMobile';
import { FarmSelectSkeleton } from './FarmSelectSkeleton';

type Props = {
  farm: GetFarmModelProps;
  selectedFarm: SelectedFarmModelProps;
  setSelectedFarm: typeof setSelectedFarm;
};

const FarmSelectContainer: React.FC<Props> = (props) => {
  const { xs } = useScreenHook();

  const options: { value: number; label: string }[] = props.farm.result?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const onChange = (value: APIModels.Farm): void => {
    const payload: APIModels.Farm | undefined = props.farm.result.find(
      (item) => item.id === value.id,
    );
    if (payload) {
      props.setSelectedFarm(payload);
    }
  };

  return (
    <>
      {props.farm.loading ? (
        <FarmSelectSkeleton />
      ) : xs ? (
        <FarmSelectMobile onChange={onChange} options={options} {...props} />
      ) : (
        <FarmSelectComponent onChange={onChange} options={options} {...props} />
      )}
    </>
  );
};

const mapStateToProps = ({ farm, selectedFarm }: any) => ({
  farm,
  selectedFarm,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedFarm: (props: any) => dispatch(setSelectedFarm(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FarmSelectContainer);
