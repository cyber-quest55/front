import { DeviceType } from '@/utils/enum/device-type';

type Props = {
  type: DeviceType;

  options: Array<{
    value: number;
    label: string;
  }>;

  onChangeDevice: (e: string) => void;

  device: any;
};

export const DevicePanelMobile: React.FC<Props> = (props) => {
  const { options, device, type, onChangeDevice } = props;

  return <></>;
};

export default DevicePanelMobile;
