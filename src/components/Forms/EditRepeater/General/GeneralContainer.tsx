import { useScreenHook } from '@/hooks/screen';
import { GetRepeaterByIdModelProps, queryRepeaterById } from '@/models/repeater-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditRepeaterGeneralComponent from './GeneralComponent';
import EditRepeaterGeneralSkeleton from './GeneralSkeleton';

interface Props {
  repeaterById: GetRepeaterByIdModelProps;
  queryRepeaterById: typeof queryRepeaterById;
}

const EditRepeaterGeneralContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.repeaterById.loading ? (
        <EditRepeaterGeneralSkeleton />
      ) : xs ? (
        <EditRepeaterGeneralComponent
          repeater={props.repeaterById.unformated}
          queryRepeaterById={props.queryRepeaterById}
        />
      ) : (
        <EditRepeaterGeneralComponent
          repeater={props.repeaterById.unformated}
          queryRepeaterById={props.queryRepeaterById}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ repeaterById }: any) => ({
  repeaterById,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryRepeaterById: (props: any) => dispatch(queryRepeaterById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRepeaterGeneralContainer);
