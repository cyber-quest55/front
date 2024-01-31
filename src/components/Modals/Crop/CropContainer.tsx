 import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import CropSegmentsModalSkeleton from './CropSkeleton';
import CropSegmentsModalMobile from './CropMobile';
import CropSegmentsModalComponent from './CropComponent';
import { connect } from 'dva';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';

interface ICropSegmentsModalContainerProps {
  pivotById: GetPivotByIdModelProps
}

const CropSegmentsModalContainer: React.FunctionComponent<ICropSegmentsModalContainerProps> = (props) => {
  const { xs } = useScreenHook();

    return (
    <>
      {false ? (
        <CropSegmentsModalSkeleton />
      ) : xs ? (
        <CropSegmentsModalMobile />
      ) : (
        <CropSegmentsModalComponent {...props}/>
      )}
    </>
  );
};

 const mapStateToProps = ({ pivotById }: any) => ({
  pivotById,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CropSegmentsModalContainer);
