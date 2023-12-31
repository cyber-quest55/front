import { useScreenHook } from '@/hooks/screen';
import { GetMeterSystemByIdModelProps, queryMeterSystemById } from '@/models/meter-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditMeterGeneralComponent from './GeneralComponent';
import EditMeterGeneralSkeleton from './GeneralSkeleton';

interface Props {
  meterSystemById: GetMeterSystemByIdModelProps;
  queryMeterSystemById: typeof queryMeterSystemById;
}

const EditMeterGeneralContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.meterSystemById.loading ? (
        <EditMeterGeneralSkeleton />
      ) : xs ? (
        <EditMeterGeneralComponent
          meter={props.meterSystemById.unformated}
          queryMeterSystemById={props.queryMeterSystemById}
        />
      ) : (
        <EditMeterGeneralComponent
          meter={props.meterSystemById.unformated}
          queryMeterSystemById={props.queryMeterSystemById}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ meterSystemById }: any) => ({
  meterSystemById,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryMeterSystemById: (props: any) => dispatch(queryMeterSystemById(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMeterGeneralContainer);
