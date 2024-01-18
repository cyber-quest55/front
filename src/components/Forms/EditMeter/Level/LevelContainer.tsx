import { useScreenHook } from '@/hooks/screen';
import { GetMeterSystemByIdModelProps, queryMeterSystemById } from '@/models/meter-by-id';
import { Dispatch } from '@umijs/max';
import { connect } from 'dva';
import * as React from 'react';
import EditMeterLevelComponent from './LevelComponent';
import EditMeterLevelSkeleton from './LevelSkeleton';

interface Props {
  meterSystemById: GetMeterSystemByIdModelProps;
  queryMeterSystemById: typeof queryMeterSystemById;
}

const EditMeterLevelContainer: React.FunctionComponent<Props> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.meterSystemById.loading ? (
        <EditMeterLevelSkeleton />
      ) : xs ? (
        <EditMeterLevelComponent
          meter={props.meterSystemById.unformated}
          queryMeterSystemById={props.queryMeterSystemById}
        />
      ) : (
        <EditMeterLevelComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditMeterLevelContainer);
