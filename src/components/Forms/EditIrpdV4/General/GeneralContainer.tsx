import { useScreenHook } from '@/hooks/screen';
import { GetIrpdByIdModelProps, queryIrpdById } from '@/models/irpd-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditIrpdV4GeneralComponent from './GeneralComponent';
import EditIrpdV4GeneralSkeleton from './GeneralSkeleton';

interface Props {
  irpdById: GetIrpdByIdModelProps;
  queryIrpdById: typeof queryIrpdById;
}

const EditIrpdV4GeneralContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.irpdById.loading ? (
        <EditIrpdV4GeneralSkeleton />
      ) : xs ? (
        <EditIrpdV4GeneralComponent
          irpd={props.irpdById.unformated}
          queryIrpdById={props.queryIrpdById}
        />
      ) : (
        <EditIrpdV4GeneralComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditIrpdV4GeneralContainer);
