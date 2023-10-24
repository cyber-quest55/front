import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import EditPivotRushHourSkeleton from './RushHourSkeleton';
import EditPivotRushHourMobile from './RushHourMobile';
import EditPivotRushHourComponent from './RushHourComponent';

interface IAppProps {
}

const EditPivotRushHourContainer: React.FunctionComponent<IAppProps> = (props) => {
    const { xs } = useScreenHook();

    return (
      <>
        {false ? (
          <EditPivotRushHourSkeleton  />
        ) : xs ? (
          <EditPivotRushHourMobile />
        ) : (
          <EditPivotRushHourComponent/>
        )}
      </>
    );
};

export default EditPivotRushHourContainer;
