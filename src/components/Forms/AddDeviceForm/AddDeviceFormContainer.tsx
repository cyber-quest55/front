import { useScreenHook } from '@/hooks/screen';
import { queryIrpd } from '@/models/irpd';
import { queryMeterSystem } from '@/models/meter-sysem';
import { queryPivotInformation } from '@/models/pivot-information';
import { queryRepeater } from '@/models/repeaters';
import { connect } from 'dva';
import AddDeviceFormComponent from './AddDeviceFormComponent';
import AddDeviceFormSkeleton from './AddDeviceFormSkeleton';

interface AddDeviceFormContainerProps {
  queryPivotInformation: typeof queryPivotInformation;
  queryMeterSystem: typeof queryMeterSystem;
  queryIrpd: typeof queryIrpd;
  queryRepeater: typeof queryRepeater;
  base: string;
}

const AddDeviceFormContainer: React.FunctionComponent<AddDeviceFormContainerProps> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <AddDeviceFormSkeleton />
      ) : xs ? (
        <AddDeviceFormComponent
          queryPivotInformation={props.queryPivotInformation}
          queryMeterSystem={props.queryMeterSystem}
          queryIrpd={props.queryIrpd}
          queryRepeater={props.queryRepeater}
          base={props.base}
        />
      ) : (
        <AddDeviceFormComponent
          queryPivotInformation={props.queryPivotInformation}
          queryMeterSystem={props.queryMeterSystem}
          queryIrpd={props.queryIrpd}
          queryRepeater={props.queryRepeater}
          base={props.base}
        />
      )}
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryPivotInformation: (props: any) => dispatch(queryPivotInformation(props)),
  queryMeterSystem: (props: any) => dispatch(queryMeterSystem(props)),
  queryIrpd: (props: any) => dispatch(queryIrpd(props)),
  queryRepeater: (props: any) => dispatch(queryRepeater(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceFormContainer);
