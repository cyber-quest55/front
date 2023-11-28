import { useScreenHook } from '@/hooks/screen';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';
import * as React from 'react';
import EditPivotFinalCanonComponent from './FinalCanonComponent';
import EditPivotFinalCanonMobile from './FinalCanonMobile';
import { connect } from 'dva';
import { Dispatch } from '@umijs/max';

interface IEditPivotFinalCanonContainer {
  pivotById: GetPivotByIdModelProps;
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const EditPivotFinalCanonContainer: React.FunctionComponent<IEditPivotFinalCanonContainer> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.pivotById.loading ? (
        <> </>
      ) : xs ? (
        <EditPivotFinalCanonComponent
          pivot={props.pivotById.unformated}
          queryPivotByIdStart={props.queryPivotByIdStart}
        />
      ) : (
        <EditPivotFinalCanonComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPivotFinalCanonContainer);
