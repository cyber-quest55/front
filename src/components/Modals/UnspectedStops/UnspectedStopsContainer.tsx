import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import { connect } from 'dva';
import UnspectedStopsComponent from './UnspectedStopsComponent';
import UnspectedStopsMobile from './UnspectedStopsMobile';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';

interface UnspectedStopsModalContainerProps {
    type: number;
    open: boolean;
    onCancel: any;
    selectedDevice: SelectedDeviceModelProps;
    pivotById: GetPivotByIdModelProps;

}

const UnspectedStopsModalContainer: React.FunctionComponent<UnspectedStopsModalContainerProps> = (props) => {
    const { xs } = useScreenHook();

    return (
        <>
            {false ? (
                <UnspectedStopsMobile />
            ) : xs ? (
                <UnspectedStopsMobile />
            ) : (
                <UnspectedStopsComponent {...props} />
            )}
        </>
    );
};

const mapStateToProps = ({ selectedDevice, pivotById }: any) => ({
    selectedDevice,
    pivotById,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UnspectedStopsModalContainer);
