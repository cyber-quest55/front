import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import EditMeterLocationCallerComponent from './LocationCallerComponent'; 
import { connect } from 'dva';
import { Dispatch } from '@umijs/max';
import { GetMeterSystemByIdModelProps, queryMeterSystemById } from '@/models/meter-by-id';

interface IEditMeterLocationCallerContainer {
  meterSystemById: GetMeterSystemByIdModelProps;
  queryMeterSystemById: typeof queryMeterSystemById;
}

const EditMeterLocationCallerContainer: React.FunctionComponent<IEditMeterLocationCallerContainer> = (
  props,
) => {
  const { xs } = useScreenHook();

  return (
    <>
      {props.meterSystemById.loading ? (
        <> </>
      ) : xs ? (
        <EditMeterLocationCallerComponent
          meter={props.meterSystemById.unformated}
          queryMeterSystemById={props.queryMeterSystemById}
        />
      ) : (
        <EditMeterLocationCallerComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(EditMeterLocationCallerContainer);
