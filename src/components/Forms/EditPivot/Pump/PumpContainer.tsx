import { useScreenHook } from '@/hooks/screen';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';
import { connect, Dispatch } from '@umijs/max';
import * as React from 'react';
import EditPivotPumpComponent from './PumpComponent';
import EditPivotPumpSkeleton from './PumpSkeleton';

interface IAppProps {
  pivotById: GetPivotByIdModelProps;
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const EditPivotPumpContainer: React.FunctionComponent<IAppProps> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.pivotById.loading ? (
        <EditPivotPumpSkeleton />
      ) : xs ? (
        <EditPivotPumpComponent
          pivot={props.pivotById.unformated}
          queryPivotByIdStart={props.queryPivotByIdStart}
        />
      ) : (
        <EditPivotPumpComponent
          pivot={props.pivotById.unformated}
          queryPivotByIdStart={props.queryPivotByIdStart}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ pivotById }: any) => ({
  pivotById,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryPivotByIdStart: (props: any) => dispatch(queryPivotByIdStart(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPivotPumpContainer);
