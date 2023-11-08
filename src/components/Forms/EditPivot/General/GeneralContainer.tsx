import { useScreenHook } from '@/hooks/screen';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditPivotGeneralComponent from './GeneralComponent';
import EditPivotGeneralSkeleton from './GeneralSkeleton';

interface Props {
  pivotById: GetPivotByIdModelProps;
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const EditPivotGeneralContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.pivotById.loading ? (
        <EditPivotGeneralSkeleton />
      ) : xs ? (
        <EditPivotGeneralComponent
          pivot={props.pivotById.unformated}
          queryPivotByIdStart={props.queryPivotByIdStart}
        />
      ) : (
        <EditPivotGeneralComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPivotGeneralContainer);
