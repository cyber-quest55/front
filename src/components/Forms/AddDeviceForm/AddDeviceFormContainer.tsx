import { useScreenHook } from '@/hooks/screen';
import { queryIrpd } from '@/models/irpd';
import { queryMeterSystem } from '@/models/meter-sysem';
import { queryPivotInformation } from '@/models/pivot-information';
import { queryRepeater } from '@/models/repeaters';
import { getFarmById } from '@/services/farm';
import { useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import AddDeviceFormComponent from './AddDeviceFormComponent';
import AddDeviceFormSkeleton from './AddDeviceFormSkeleton';
import { queryPivot } from '@/models/pivot';

interface AddDeviceFormContainerProps {
  queryPivotInformation: typeof queryPivotInformation;
  queryPivot: typeof queryPivot;
  queryMeterSystem: typeof queryMeterSystem;
  queryIrpd: typeof queryIrpd;
  queryRepeater: typeof queryRepeater;
  base: string;
}

const AddDeviceFormContainer: React.FunctionComponent<AddDeviceFormContainerProps> = (props) => {
  const { xs } = useScreenHook();
  const getFarmByIdReq = useRequest(getFarmById, { manual: true });
  const params = useParams();
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    getFarmByIdReq.runAsync({ id: params.id as string }).then((data) => {
      setLocation(data.location);
    });
  }, []);

  return (
    <>
      {false ? (
        <AddDeviceFormSkeleton />
      ) : xs ? (
        <AddDeviceFormComponent
          queryPivotInformation={props.queryPivotInformation}
          queryPivot={props.queryPivot}
          queryMeterSystem={props.queryMeterSystem}
          queryIrpd={props.queryIrpd}
          queryRepeater={props.queryRepeater}
          base={props.base}
          location={location}
        />
      ) : (
        <AddDeviceFormComponent
          queryPivotInformation={props.queryPivotInformation}
          queryPivot={props.queryPivot}
          queryMeterSystem={props.queryMeterSystem}
          queryIrpd={props.queryIrpd}
          queryRepeater={props.queryRepeater}
          base={props.base}
          location={location}
        />
      )}
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryPivotInformation: (props: any) => dispatch(queryPivotInformation(props)),
  queryPivot: (props: any) => dispatch(queryPivot(props)),
  queryMeterSystem: (props: any) => dispatch(queryMeterSystem(props)),
  queryIrpd: (props: any) => dispatch(queryIrpd(props)),
  queryRepeater: (props: any) => dispatch(queryRepeater(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceFormContainer);
