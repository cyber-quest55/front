import { useScreenHook } from '@/hooks/screen';
import { PresetStatusColorType } from '@/typings';
import { Breakpoint } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
import { queryIrpd } from '@/models/irpd';
import { queryMeterSystem } from '@/models/meter-sysem';
import { queryPivot } from '@/models/pivot';
import RadioInputComponent from './RadioInputComponent';
import RadioInputSkeleton from './RadioInputSkeleton';
import { Dispatch } from '@umijs/max';
import { queryPivotByIdStart } from '@/models/pivot-by-id';
type ColSpanType = number | string;

type IRadioInputContainerProps = {
  label: string;
  setFieldValue: any;
  status: PresetStatusColorType;
  operable: boolean;
  span?: Partial<Record<Breakpoint, ColSpanType>>;
  deviceType: string;
  device: string;
  request?: any;
  requestSwapChange?: any;
  requestChange?: any;
  requestPivots?: any;
  requestIrpds?: any;
  requestMeterSystem?: any;
  requestBase?: any;
  deviceId: string;
  name?: string[];
  fieldIndex?: string;
  form: any;
  requestDeviceId: string;
  requestAfterChange?: any;
  queryPivot: typeof queryPivot;
  queryIrpd: typeof queryIrpd;
  queryMeterSystem: typeof queryMeterSystem;
  pivot: any;
  pivotById: any;
  irpd: any;
  meterSystem: any;
};

const RadioInputContainer: React.FunctionComponent<IRadioInputContainerProps> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <RadioInputSkeleton />
      ) : xs ? (
        <RadioInputComponent {...props}/>
      ) : (
        <RadioInputComponent {...props} />
      )}
    </>
  );
};

const mapStateToProps = ({
  pivot,
  pivotById,
  irpd,
  meterSystem,
}: any) => ({
  pivot,
  pivotById,
  irpd,
  meterSystem
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryPivotByIdStart: (props: any) => dispatch(queryPivotByIdStart(props)),
  queryPivot: (props: any) => dispatch(queryPivot(props)),
  queryIrpd: (props: any) => dispatch(queryIrpd(props)),
  queryMeterSystem: (props: any) => dispatch(queryMeterSystem(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioInputContainer);
