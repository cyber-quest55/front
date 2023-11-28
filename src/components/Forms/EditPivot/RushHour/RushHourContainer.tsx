import { useScreenHook } from '@/hooks/screen';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditPivotRushHourComponent from './RushHourComponent';
import EditPivotRushHourSkeleton from './RushHourSkeleton';

interface IAppProps {
  pivotById: GetPivotByIdModelProps;
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const EditPivotRushHourContainer: React.FunctionComponent<IAppProps> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.pivotById.loading ? (
        <EditPivotRushHourSkeleton />
      ) : xs ? (
        <EditPivotRushHourComponent
          pivot={props.pivotById.unformated}
          queryPivotByIdStart={props.queryPivotByIdStart}
        />
      ) : (
        <EditPivotRushHourComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPivotRushHourContainer);
