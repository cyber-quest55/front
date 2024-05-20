import { useScreenHook } from '@/hooks/screen';
import { connect } from 'dva';
import * as React from 'react';
import StartPivotAngleComponent from './StartPivotAngleComponent';
import StartPivotAngleSkeleton from './StartPivotAngleSkeleton';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';

interface IStartPivotAngleContainerProps {
  queryPivotByIdStart: typeof queryPivotByIdStart
  pivotById: GetPivotByIdModelProps
  deviceId: number;
  farmId: number;
}

const StartPivotAngleContainer: React.FunctionComponent<IStartPivotAngleContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();
 

  const queryPivotById = () => { 
    props.queryPivotByIdStart({ farmId: props.farmId, pivotId: props.deviceId})
  }

  return (
    <>
      {false ? (
        <StartPivotAngleSkeleton />
      ) : xs ? (
        <StartPivotAngleComponent queryPivotById={queryPivotById} {...props} />
      ) : (
        <StartPivotAngleComponent queryPivotById={queryPivotById} {...props} />
      )}
    </>
  );
};

const mapStateToProps = ({ pivotById }: any) => ({
  pivotById,
});

const mapDispatchToProps = (dispatch ) => ({
  queryPivotByIdStart: (props) => dispatch(queryPivotByIdStart(props))
});

export default connect(mapStateToProps, mapDispatchToProps)(StartPivotAngleContainer);
