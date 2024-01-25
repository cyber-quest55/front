import { useScreenHook } from '@/hooks/screen';
import { GetRepeaterByIdModelProps, queryRepeaterById } from '@/models/repeater-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditRepeaterLocationCallerComponent from './LocationCallerComponent';

interface IEditRepeaterLocationCallerContainer {
  repeaterById: GetRepeaterByIdModelProps;
  queryRepeaterById: typeof queryRepeaterById;
}

const EditMeterLocationCallerContainer: React.FunctionComponent<
  IEditRepeaterLocationCallerContainer
> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.repeaterById.loading ? (
        <> </>
      ) : xs ? (
        <EditRepeaterLocationCallerComponent
          repeater={props.repeaterById.unformated}
          queryRepeaterById={props.queryRepeaterById}
        />
      ) : (
        <EditRepeaterLocationCallerComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditMeterLocationCallerContainer);
