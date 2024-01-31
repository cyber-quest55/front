import { useScreenHook } from '@/hooks/screen';
import { useModel } from '@umijs/max';
import * as React from 'react';
import EditSecurityComponent from './SecurityComponent';
import EditSecurityInfoSkeleton from './SecuritySkeleton';


const EditSecurityContainer: React.FunctionComponent<any> = () => {
  const { xs } = useScreenHook();
  const { initialState, loading } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <>
      {loading ? (
        <EditSecurityInfoSkeleton />
      ) : xs ? (
        <EditSecurityComponent currentUser={currentUser} />
      ) : (
        <EditSecurityComponent currentUser={currentUser} />
      )}
    </>
  );
};

export default EditSecurityContainer;
