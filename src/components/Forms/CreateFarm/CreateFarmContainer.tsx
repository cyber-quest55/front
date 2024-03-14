import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import CreateFarmFormComponent from './CreateFarmComponent';
import CreateFarmFormSkeleton from './CreateFarmSkeleton';

const CreateFarmFormContainer: React.FunctionComponent = () => {
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
