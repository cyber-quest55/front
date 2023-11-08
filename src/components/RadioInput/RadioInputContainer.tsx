import { useScreenHook } from '@/hooks/screen';
import { PresetStatusColorType } from '@/typings';
import { Breakpoint } from 'antd';
import { connect } from 'dva';
import * as React from 'react';
import RadioInputComponent from './RadioInputComponent';
import RadioInputMobile from './RadioInputMobile';
import RadioInputSkeleton from './RadioInputSkeleton';
import { Dispatch } from '@umijs/max';
import { queryPivotByIdStart } from '@/models/pivot-by-id';
type ColSpanType = number | string;

interface IRadioInputContainerProps {
  label: string;
  setFieldValue: any;
  status: PresetStatusColorType;
  operable: boolean;
  span?: Partial<Record<Breakpoint, ColSpanType>>;
  deviceType: string;
  device: string;
  request?: any;
  requestChange?: any;
  name?: string[];
  fieldIndex?: string;
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

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

const mapStateToProps = ({ pivotById }: any) => ({
  pivotById,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  queryPivotByIdStart: (props: any) => dispatch(queryPivotByIdStart(props)),

});

export default connect(mapStateToProps, mapDispatchToProps)(RadioInputContainer);
