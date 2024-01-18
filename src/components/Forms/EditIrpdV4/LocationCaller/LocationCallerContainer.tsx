import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import EditEditLocationCallerComponent from './LocationCallerComponent'; 
import { connect } from 'dva';
import { Dispatch } from '@umijs/max';
import { GetIrpdByIdModelProps, queryIrpdById } from '@/models/irpd-by-id';

interface IEditIrpdLocationCallerContainer {
  irpdById: GetIrpdByIdModelProps;
  queryIrpdById: typeof queryIrpdById;
}

const EditIrpdLocationCallerContainer: React.FunctionComponent<IEditIrpdLocationCallerContainer> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.irpdById.loading ? (
        <> </>
      ) : xs ? (
        <EditEditLocationCallerComponent
          irpd={props.irpdById.unformated}
          queryIrpdById={props.queryIrpdById}
        />
      ) : (
        <EditEditLocationCallerComponent
          irpd={props.irpdById.unformated}
          queryIrpdById={props.queryIrpdById}
        />
      )}
    </>
  );
};
 
const mapStateToProps = ({ irpdById }: any) => ({
  irpdById,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryIrpdById: (props: any) => dispatch(queryIrpdById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditIrpdLocationCallerContainer);
