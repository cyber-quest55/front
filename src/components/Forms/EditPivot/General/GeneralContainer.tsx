import { useScreenHook } from '@/hooks/screen'; 
import * as React from 'react'; 
import EditPivotGeneralComponent from './GeneralComponent';
import EditPivotGeneralMobile from './GeneralMobile';
import EditPivotGeneralSkeleton from './GeneralSkeleton';

interface Props {}

const EditPivotGeneralContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

 
  return (
    <>
      {false ? (
        <EditPivotGeneralSkeleton />
      ) : xs ? (
        <EditPivotGeneralComponent />
      ) : (
        <EditPivotGeneralComponent  />
      )}
    </>
  );
  return;
};

export default EditPivotGeneralContainer;
