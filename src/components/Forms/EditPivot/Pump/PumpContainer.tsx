import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import EditPivotPumpSkeleton from './PumpSkeleton';
 import EditPivotPumpMobile from './PumpMobile';
import EditPivotPumpComponent from './PumpComponent';

interface IAppProps {
}

const EditPivotPumpContainer: React.FunctionComponent<IAppProps> = (props) => {
    const { xs } = useScreenHook();

 
    return (
      <>
        {false ? (
          <EditPivotPumpSkeleton  />
        ) : xs ? (
          <EditPivotPumpMobile />
        ) : (
          <EditPivotPumpComponent />
        )}
      </>
    );
};

export default EditPivotPumpContainer;
