import { useScreenHook } from '@/hooks/screen';
import { useModel } from '@umijs/max';
import * as React from 'react';
import EditGeneralComponent from './GeneralComponent';
import EditGeneralSkeleton from './GeneralSkeleton';


const EditGeneralContainer: React.FunctionComponent<any> = () => {
  const { xs } = useScreenHook();
  const { initialState, loading } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <>
      {loading ? (
        <EditGeneralSkeleton />
      ) : xs ? (
        <EditGeneralComponent currentUser={currentUser} />
      ) : (
        <EditGeneralComponent currentUser={currentUser} />
      )}
    </>
  );
};

export default EditGeneralContainer;
