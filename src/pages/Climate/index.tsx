import RenderHeatMap from '@/components/RenderHeatMap';
import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { connect } from 'dva';
import { FunctionComponent, ReactNode } from 'react';

type Props = {
  dispatch?: any;
  children: ReactNode;
  google?: any;
  pivot: GetPivotModelProps;
  farm: GetFarmModelProps;
};

const Devices: FunctionComponent<Props> = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <RenderHeatMap />
    </div>
  );
};

export default connect(({ pivot, farm }: { pivot: any; farm: any }) => ({
  pivot,
  farm,
}))(Devices);
