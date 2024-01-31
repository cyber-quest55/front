import { useScreenHook } from '@/hooks/screen';
import { connect } from 'dva';
import * as React from 'react';
import StartPivotSegmentComponent from './StartPivotSegmentComponent';
import StartPivotSegmentSkeleton from './StartPivotSegmentSkeleton';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';

interface IStartPivotSegmentContainerProps {
    pivotById: GetPivotByIdModelProps
}

const StartPivotSegmentContainer: React.FunctionComponent<IStartPivotSegmentContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <StartPivotSegmentSkeleton />
      ) : xs ? (
        <StartPivotSegmentComponent {...props} />
      ) : (
        <StartPivotSegmentComponent {...props} />
      )}
    </>
  );
};

const mapStateToProps = ({ pivotById }: any) => ({
  pivotById,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StartPivotSegmentContainer);
