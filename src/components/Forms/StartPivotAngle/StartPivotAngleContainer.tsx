import { useScreenHook } from '@/hooks/screen';
import { connect } from 'dva';
import * as React from 'react';
import StartPivotAngleComponent from './StartPivotAngleComponent';
import StartPivotAngleSkeleton from './StartPivotAngleSkeleton';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';

interface IStartPivotAngleContainerProps {
    pivotById: GetPivotByIdModelProps
}

const StartPivotAngleContainer: React.FunctionComponent<IStartPivotAngleContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <StartPivotAngleSkeleton />
      ) : xs ? (
        <StartPivotAngleComponent {...props} />
      ) : (
        <StartPivotAngleComponent {...props} />
      )}
    </>
  );
};

const mapStateToProps = ({ pivotById }: any) => ({
  pivotById,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StartPivotAngleContainer);
