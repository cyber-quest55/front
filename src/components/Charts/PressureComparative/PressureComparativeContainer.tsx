import { useScreenHook } from '@/hooks/screen';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { getPressureComparison } from '@/services/pivot';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import dayjs, { Dayjs } from 'dayjs';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import PressureComparativeComponent from './PressureComparativeComponent';
import PressureComparativeSkeleton from './PressureComparativeSkeleton';
 
type Props = {
  selectedDevice: SelectedDeviceModelProps;
};

const PressureComparativeContainer: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { xs } = useScreenHook();
  const comparisonReq = useRequest(getPressureComparison, { manual: true });

  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()]);
  const [compValue, setCompValue] = useState<{ angle: number; value: number; name: string }[]>([]);

  const getComparative = (pressures: any): { angle: number; value: number; name: string }[] => {
    const newList: { angle: number; value: number; name: string }[] = [];

    Object.values(pressures.comparison_pressure_by_angles).forEach((element: any, index) => {
      newList.push({
        angle: index,
        value: element.water_pressure,
        name: intl.formatMessage({
          id: 'component.pivot.pressure.chart.tooltip.label.1',
        }),
      });
    });
    Object.values(pressures.current_pressure_by_angle).forEach((element: any, index) => {
      newList.push({
        angle: index,
        value: element.water_pressure,
        name: intl.formatMessage({
          id: 'component.pivot.pressure.chart.tooltip.label.2',
        }),
      });
    });
    return newList;
  };

  useEffect(() => {
    const run = async () => {
      if (dateRange.length > 0) {
        const result = await comparisonReq.runAsync(
          { pivotId: props.selectedDevice.deviceId },
          {
            comparison_start_date: dateRange[0].toISOString(),
            comparison_end_date: dateRange[1].toISOString(),
            current_start_date: dateRange[0].toISOString(),
            current_end_date: dateRange[1].toISOString(),
          },
        );

        setCompValue(getComparative(result));
      }
    };
    run();
  }, [dateRange]);

  return (
    <>
      {comparisonReq.loading ? (
        <PressureComparativeSkeleton />
      ) : xs ? (
        <PressureComparativeComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          values={compValue}
          {...props}
        />
      ) : (
        <PressureComparativeComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          values={compValue}
          {...props}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ selectedDevice }: any) => ({
  selectedDevice,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PressureComparativeContainer);
