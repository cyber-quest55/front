import { useScreenHook } from '@/hooks/screen';
import { PresetStatusColorType } from '@/typings';
import { Breakpoint } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
import { GetIrpdModelProps, destroyIrpdWs, queryIrpdWs } from '@/models/irpd';
import { GetMeterSystemModelProps, destroyMeterSystemWs, queryMeterSystemWs } from '@/models/meter-sysem';
import { GetPivotModelProps, destroyPivotWs, queryPivotWs } from '@/models/pivot';
import RadioInputComponent from './RadioInputComponent';
import RadioInputSkeleton from './RadioInputSkeleton';
import { Dispatch } from '@umijs/max';
import { GetPivotByIdModelProps, queryPivotByIdStart } from '@/models/pivot-by-id';
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
  queryPivotWs: typeof queryPivotWs;
  destroyPivotWs: typeof destroyPivotWs;
  queryIrpdWs: typeof queryIrpdWs;
  destroyIrpdWs: typeof destroyIrpdWs;
  queryMeterSystemWs: typeof queryMeterSystemWs;
  destroyMeterSystemWs: typeof destroyMeterSystemWs;
  setPivotWsLoadingStatus: (id: string) => void;
  setIRpdWsLoadingStatus: (id: string) => void;
  setMeterSystemWsLoadingStatus: (id: string) => void;
  pivot: GetPivotModelProps;
  pivotById: GetPivotByIdModelProps;
  irpd: GetIrpdModelProps;
  meterSystem: GetMeterSystemModelProps;
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
  queryPivotWs: (props: any) => dispatch(queryPivotWs(props)),
  queryIrpdWs: (props: any) => dispatch(queryIrpdWs(props)),
  queryMeterSystemWs: (props: any) => dispatch(queryMeterSystemWs(props)),
  destroyPivotWs: () => dispatch(destroyPivotWs()),
  destroyIrpdWs: () => dispatch(destroyIrpdWs()),
  destroyMeterSystemWs: () => dispatch(destroyMeterSystemWs()),
  setPivotWsLoadingStatus: (id: string) => dispatch({
    type: 'pivot/setWsLoadingStatus',
    payload: { id },
  }),
  setIRpdWsLoadingStatus: (id: string) => dispatch({
    type: 'irpd/setWsLoadingStatus',
    payload: { id },
  }),
  setMeterSystemWsLoadingStatus: (id: string) => dispatch({
    type: 'meterSystem/setWsLoadingStatus',
    payload: { id },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioInputContainer);
