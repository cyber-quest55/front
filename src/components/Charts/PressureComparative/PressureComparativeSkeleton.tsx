import SkeletonList from '@/components/Skeletons/List';
import * as React from 'react';

 
const PressureComparativeSkeleton: React.FunctionComponent  = () => {
  return <SkeletonList size={12} rows={17} p={3}/> ;
};

export default PressureComparativeSkeleton;
