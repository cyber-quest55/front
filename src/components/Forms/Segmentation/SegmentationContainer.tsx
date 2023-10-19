import { useScreenHook } from '@/hooks/screen'; 
import * as React from 'react';
import FormPivotSegmentationComponent from './SegmentationComponent';
import FormPivotSegmentationMobile from './SegmentationMobile';
import FormPivotSegmentationSkeleton from './SegmentationSkeleton';

interface Props {}

const FormPivotSegmentationContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

 
  return (
    <>
      {false ? (
        <FormPivotSegmentationSkeleton />
      ) : xs ? (
        <FormPivotSegmentationMobile />
      ) : (
        <FormPivotSegmentationComponent  />
      )}
    </>
  );
  return;
};

export default FormPivotSegmentationContainer;
