import { useNetworkHook } from "@/hooks/network-status";
import { useScreenHook } from "@/hooks/screen";
import { OfflineNetworkMobile } from "./OfflineNetworkMobile";
import { OfflineNetworkSkeleton } from "./OfflineNetworkSkeleton";
import { OfflineNetworkComponent } from "./OfflineNetworkComponent";


const OfflineNetworkContainer: React.FC = () => {
    const { xs } = useScreenHook();
    const networkState = useNetworkHook()

    return (
        <>
            {!networkState ? (
                <OfflineNetworkSkeleton />
            ) : xs ? (
                <OfflineNetworkMobile networkState={networkState} />
            ) : (
                <OfflineNetworkComponent networkState={networkState} />
            )}
        </>
    );
};

export default OfflineNetworkContainer;