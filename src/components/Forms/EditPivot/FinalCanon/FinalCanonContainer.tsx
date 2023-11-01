import { useScreenHook } from '@/hooks/screen';
import * as React from 'react'; 
import EditPivotFinalCanonMobile from './FinalCanonMobile';
import EditPivotFinalCanonComponent from './FinalCanonComponent';

interface IEditPivotFinalCanonContainer {
}

const EditPivotFinalCanonContainer: React.FunctionComponent<IEditPivotFinalCanonContainer> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <EditPivotFinalCanonMobile />
      ) : xs ? (
        <EditPivotFinalCanonComponent />
      ) : (
        <EditPivotFinalCanonComponent  />
      )}
    </>
  );
};

export default EditPivotFinalCanonContainer;
