import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import EditPivotPluviometerSkeleton from './PluviometerSkeleton';
import EditPivotGeneralContainer from '../General/GeneralContainer';
import EditPivotPluviometerMobile from './PluviometerMobile';
import EditPivotPluviometerComponent from './PluviometeComponent';

interface IAppProps {
}

const EditPivotPluviometerContainer: React.FunctionComponent<IAppProps> = (props) => {
    const { xs } = useScreenHook();

 
    return (
      <>
        {false ? (
          <EditPivotPluviometerSkeleton  />
        ) : xs ? (
          <EditPivotPluviometerMobile />
        ) : (
          <EditPivotPluviometerComponent />
        )}
      </>
    );
};

export default EditPivotPluviometerContainer;
