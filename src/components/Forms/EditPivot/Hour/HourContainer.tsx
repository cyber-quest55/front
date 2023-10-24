import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import EditPivotHourComponent from './HourComponent';
import EditPivotHourMobile from './HourMobile';
import EditPivotHourSkeleton from './HourSkeleton';

interface IAppProps {}

const EditPivotHourContainer: React.FunctionComponent<IAppProps> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <EditPivotHourSkeleton />
      ) : xs ? (
        <EditPivotHourMobile />
      ) : (
        <EditPivotHourComponent />
      )}
    </>
  );
};

export default EditPivotHourContainer;
