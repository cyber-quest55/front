import { useScreenHook } from '@/hooks/screen';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';
import * as React from 'react';
import EditPivotLocationCallerComponent from './LocationCallerComponent'; 
import { connect } from 'dva';
import { Dispatch } from '@umijs/max';

interface IEditPivotLocationCallerContainer {
  pivotById: GetPivotByIdModelProps;
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const EditPivotLocationCallerContainer: React.FunctionComponent<IEditPivotLocationCallerContainer> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.pivotById.loading ? (
        <> </>
      ) : xs ? (
        <EditPivotLocationCallerComponent
          pivot={props.pivotById.unformated}
          queryPivotByIdStart={props.queryPivotByIdStart}
        />
      ) : (
        <EditPivotLocationCallerComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPivotLocationCallerContainer);
