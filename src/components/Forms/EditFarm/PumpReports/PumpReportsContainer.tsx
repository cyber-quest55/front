// Dependencies
import { Dispatch } from '@umijs/max';
import { ReactElement, FunctionComponent } from 'react';
import { GetFarmByIdModelProps, queryFarmById } from '@/models/farm-by-id';
import { connect } from 'dva';
import PumpReportsComponent from './PumpReportsComponents';
import PumpReportsSkeleton from './PumpReportsSkeleton';

// Type props
type Props = {
  farmById: GetFarmByIdModelProps;
  queryFarmById: typeof queryFarmById
}

// Component
const EditFarmPumpReportsContainer: FunctionComponent<Props> = (props): ReactElement => {
  return (
    <>
      {props.farmById.loading ? (
        <PumpReportsSkeleton />
      ) : (
        <PumpReportsComponent
          farm={props.farmById.result}
          queryFarmById={props.queryFarmById}
        />
      )}
    </>
  );
};

// Redux mapping
const mapStateToProps = ({ farmById }: any) => ({ farmById });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryFarmById: (props: any) => dispatch(queryFarmById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFarmPumpReportsContainer);