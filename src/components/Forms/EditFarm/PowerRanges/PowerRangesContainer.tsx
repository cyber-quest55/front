// Dependencies
import { Dispatch } from '@umijs/max';
import { ReactElement, FunctionComponent } from 'react';
import { GetFarmByIdModelProps, queryFarmById } from '@/models/farm-by-id';
import { connect } from 'dva';
import PowerRangesComponent from './PowerRangesComponent';
import PowerRangesSkeleton from './PowerRangesSkeleton';

// Type props
type Props = {
  farmById: GetFarmByIdModelProps;
  queryFarmById: typeof queryFarmById
}

// Component
const EditFarmPowerRangesContainer: FunctionComponent<Props> = (props): ReactElement => {
  return (
    <>
      {props.farmById.loading ? (
        <PowerRangesSkeleton />
      ) : (
        <PowerRangesComponent
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
  queryFarBmyId: (props: any) => dispatch(queryFarmById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFarmPowerRangesContainer);