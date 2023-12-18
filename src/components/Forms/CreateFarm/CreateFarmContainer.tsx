import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import CreateFarmFormComponent from './CreateFarmComponent';
import CreateFarmFormMobile from './CreateFarmMobile';
import CreateFarmFormSkeleton from './CreateFarmSkeleton';

const CreateFarmFormContainer: React.FunctionComponent = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <CreateFarmFormSkeleton />
      ) : xs ? (
        <CreateFarmFormComponent />
      ) : (
        <CreateFarmFormComponent />
      )}
    </>
  );
};

export default CreateFarmFormContainer;
