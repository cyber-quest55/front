import { useNetwork } from 'ahooks';
import { NetworkState } from 'ahooks/lib/useNetwork';

const useNetworkHook: () => NetworkState = () => {
    const networkState = useNetwork();
    return networkState;
};

export { useNetworkHook };