import { useScreenHook } from '@/hooks/screen';
import { GetIrpdByIdModelProps, queryIrpdById } from '@/models/irpd-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditIrpdGeneralComponent from './GeneralComponent';
import EditIrpdGeneralSkeleton from './GeneralSkeleton';

interface Props {
  irpdById: GetIrpdByIdModelProps;
  queryIrpdById: typeof queryIrpdById;
}

const EditIrpdGeneralContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.irpdById.loading ? (
        <EditIrpdGeneralSkeleton />
      ) : xs ? (
        <EditIrpdGeneralComponent
          irpd={props.irpdById.unformated}
          queryIrpdById={props.queryIrpdById}
        />
      ) : (
        <EditIrpdGeneralComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditIrpdGeneralContainer);
