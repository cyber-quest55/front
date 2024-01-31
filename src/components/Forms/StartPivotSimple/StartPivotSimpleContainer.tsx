import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import StartPivotSimpleComponent from './StartPivotSimpleComponent';
import StartPivotSimpleSkeleton from './StartPivotSimpleSkeleton';
import { connect } from 'dva';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';

interface ILocationFormContainerProps {
  pivotById: GetPivotByIdModelProps
}

const StartPivotSimpleFormContainer: React.FunctionComponent<ILocationFormContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <StartPivotSimpleSkeleton />
      ) : xs ? (
        <StartPivotSimpleComponent {...props} />
      ) : (
        <StartPivotSimpleComponent {...props} />
      )}
    </>
  );
};

 
const mapStateToProps = ({ pivotById }: any) => ({
  pivotById,
});

const mapDispatchToProps = () => ({
 });

export default connect(mapStateToProps, mapDispatchToProps)(StartPivotSimpleFormContainer);


 