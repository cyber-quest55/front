import { useScreenHook } from '@/hooks/screen';
import * as React from 'react'; 
import EditPivotAutoreversionMobile from './AutoreversionMobile';
import EditPivotAutoreversionComponent from './AutoreversionComponent';

interface IEditPivotAutoreversionContainer {
}

const EditPivotAutoreversionContainer: React.FunctionComponent<IEditPivotAutoreversionContainer> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <EditPivotAutoreversionMobile />
      ) : xs ? (
        <EditPivotAutoreversionComponent />
      ) : (
        <EditPivotAutoreversionComponent  />
      )}
    </>
  );
};

export default EditPivotAutoreversionContainer;
