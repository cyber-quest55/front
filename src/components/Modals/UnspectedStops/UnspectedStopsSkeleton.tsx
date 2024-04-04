import * as React from 'react'; 
import { connect } from 'dva';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';

interface IUnspectedStopsModalProps {
  pivotById: GetPivotByIdModelProps
}

const UnspectedStopsModalSkeleton: React.FunctionComponent<IUnspectedStopsModalProps> = () => {
    return (
    <>
    </>
  );
};

 const mapStateToProps = ({  }: any) => ({
 });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UnspectedStopsModalSkeleton);
