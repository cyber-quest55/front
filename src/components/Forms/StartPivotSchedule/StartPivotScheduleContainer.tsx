import { useScreenHook } from '@/hooks/screen';
import { connect } from 'dva';
import * as React from 'react';
import StartPivotScheduleComponent from './StartPivotScheduleComponent';
import StartPivotScheduleSkeleton from './StartPivotScheduleSkeleton';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';

interface IStartPivotScheduleContainerProps {
    pivotById: GetPivotByIdModelProps
}

const StartPivotScheduleContainer: React.FunctionComponent<IStartPivotScheduleContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <StartPivotScheduleSkeleton />
      ) : xs ? (
        <StartPivotScheduleComponent {...props} />
      ) : (
        <StartPivotScheduleComponent {...props} />
      )}
    </>
  );
};

const mapStateToProps = ({ pivotById }: any) => ({
  pivotById,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StartPivotScheduleContainer);
