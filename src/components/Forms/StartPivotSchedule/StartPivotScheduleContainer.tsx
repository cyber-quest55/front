import { useScreenHook } from '@/hooks/screen';
import { connect } from 'dva';
import * as React from 'react';
import StartPivotScheduleComponent from './StartPivotScheduleComponent';
import StartPivotScheduleSkeleton from './StartPivotScheduleSkeleton';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';

interface IStartPivotScheduleContainerProps {
  queryPivotByIdStart: typeof queryPivotByIdStart
  pivotById: GetPivotByIdModelProps
  deviceId: number;
  farmId: number;
}

const StartPivotScheduleContainer: React.FunctionComponent<IStartPivotScheduleContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  const queryPivotById = () => { 
    props.queryPivotByIdStart({ farmId: props.farmId, pivotId: props.deviceId})
  }


  return (
    <>
      {false ? (
        <StartPivotScheduleSkeleton />
      ) : xs ? (
        <StartPivotScheduleComponent queryPivotById={queryPivotById} {...props} />
      ) : (
        <StartPivotScheduleComponent queryPivotById={queryPivotById} {...props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StartPivotScheduleContainer);
