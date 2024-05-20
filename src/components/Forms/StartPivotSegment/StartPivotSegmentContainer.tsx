import { useScreenHook } from '@/hooks/screen';
import { connect } from 'dva';
import * as React from 'react';
import StartPivotSegmentComponent from './StartPivotSegmentComponent';
import StartPivotSegmentSkeleton from './StartPivotSegmentSkeleton';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';

interface IStartPivotSegmentContainerProps {
  queryPivotByIdStart: typeof queryPivotByIdStart
  pivotById: GetPivotByIdModelProps
  deviceId: number;
  farmId: number;
}

const StartPivotSegmentContainer: React.FunctionComponent<IStartPivotSegmentContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  const queryPivotById = () => { 
    props.queryPivotByIdStart({ farmId: props.farmId, pivotId: props.deviceId})
  }


  return (
    <>
      {false ? (
        <StartPivotSegmentSkeleton />
      ) : xs ? (
        <StartPivotSegmentComponent queryPivotById={queryPivotById} {...props} />
      ) : (
        <StartPivotSegmentComponent queryPivotById={queryPivotById} {...props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(StartPivotSegmentContainer);
