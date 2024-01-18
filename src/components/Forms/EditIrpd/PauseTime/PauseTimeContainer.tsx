import { useScreenHook } from '@/hooks/screen';
import { GetIrpdByIdModelProps, queryIrpdById } from '@/models/irpd-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditIrpdPauseTimeComponent from './PauseTimeComponent';
import EditIrpdPauseTimeSkeleton from './PauseTimeSkeleton';

interface Props {
  irpdById: GetIrpdByIdModelProps;
  queryIrpdById: typeof queryIrpdById;
}

const EditIrpdPauseTimeContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.irpdById.loading ? (
        <EditIrpdPauseTimeSkeleton />
      ) : xs ? (
        <EditIrpdPauseTimeComponent
          irpd={props.irpdById.unformated}
          queryIrpdById={props.queryIrpdById}
        />
      ) : (
        <EditIrpdPauseTimeComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditIrpdPauseTimeContainer);
