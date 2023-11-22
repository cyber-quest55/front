import { useScreenHook } from '@/hooks/screen';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';
import { connect, Dispatch } from '@umijs/max';
import * as React from 'react';
import FormPivotSegmentationComponent from './SegmentationComponent';
import FormPivotSegmentationSkeleton from './SegmentationSkeleton';

interface Props {
  pivotById: GetPivotByIdModelProps;
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const FormPivotSegmentationContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.pivotById.loading ? (
        <FormPivotSegmentationSkeleton />
      ) : xs ? (
        <FormPivotSegmentationComponent
          pivot={props.pivotById.unformated}
          queryPivotByIdStart={props.queryPivotByIdStart}
        />
      ) : (
        <FormPivotSegmentationComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(FormPivotSegmentationContainer);
