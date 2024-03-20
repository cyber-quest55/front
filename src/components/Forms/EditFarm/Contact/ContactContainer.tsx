// Dependencies
import { Dispatch } from '@umijs/max';
import { ReactElement, FunctionComponent } from 'react';
import { GetFarmByIdModelProps, queryFarmById } from '@/models/farm-by-id';
import { connect } from 'dva';
import ContactComponent from './ContactComponent';
import ContactSkeleton from './ContactSkeleton';

// Type props
type Props = {
  farmById: GetFarmByIdModelProps;
  queryFarmById: typeof queryFarmById
}

// Component
const EditFarmContactContainer: FunctionComponent<Props> = (props): ReactElement => {
  return (
    <>
      {props.farmById.loading ? (
        <ContactSkeleton />
      ) : (
        <ContactComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditFarmContactContainer);