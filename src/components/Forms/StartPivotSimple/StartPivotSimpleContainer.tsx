import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import StartPivotSimpleComponent from './StartPivotSimpleComponent';
import StartPivotSimpleSkeleton from './StartPivotSimpleSkeleton';
import { connect } from 'dva';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';

interface ILocationFormContainerProps {
  queryPivotByIdStart: typeof queryPivotByIdStart
  pivotById: GetPivotByIdModelProps
  deviceId: number;
  farmId: number;
}

const StartPivotSimpleFormContainer: React.FunctionComponent<ILocationFormContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  const queryPivotById = () => { 
    props.queryPivotByIdStart({ farmId: props.farmId, pivotId: props.deviceId})
  }

  return (
    <>
      {false ? (
        <StartPivotSimpleSkeleton />
      ) : xs ? (
        <StartPivotSimpleComponent queryPivotById={queryPivotById} {...props} />
      ) : (
        <StartPivotSimpleComponent queryPivotById={queryPivotById} {...props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StartPivotSimpleFormContainer);


 