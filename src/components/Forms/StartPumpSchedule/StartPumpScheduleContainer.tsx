import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import StartPumpScheduleComponent from './StartPumpScheduleComponent';
import StartPumpScheduleSkeleton from './StartPumpScheduleSkeleton';
import { connect } from 'dva';
import { GetIrpdByIdModelProps } from '@/models/irpd-by-id';

interface ILocationFormContainerProps {
  irpdById: GetIrpdByIdModelProps
}

const StartPumpScheduleFormContainer: React.FunctionComponent<ILocationFormContainerProps> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <StartPumpScheduleSkeleton />
      ) : xs ? (
        <StartPumpScheduleComponent {...props} />
      ) : (
        <StartPumpScheduleComponent {...props} />
      )}
    </>
  );
};

 
const mapStateToProps = ({ irpdById }: any) => ({
  irpdById,
});

const mapDispatchToProps = () => ({
 });

export default connect(mapStateToProps, mapDispatchToProps)(StartPumpScheduleFormContainer);


 