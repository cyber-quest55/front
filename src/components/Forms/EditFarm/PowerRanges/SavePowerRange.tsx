// Dependencies
import { useIntl } from '@umijs/max';
import { Modal } from 'antd';
import { ReactElement } from 'react';

// Component props
type Props = {
  open?: boolean,
  onCancel?: () => void,
  availableDaysOfWeek: number[],
  power_ranges?: {
    [index: number]: APIModels.PowerRange[];
  }
}

// Component
const SavePowerRange = ({
  open = false,
  onCancel = () => {},
  availableDaysOfWeek,
  power_ranges
}: Props): ReactElement => {
  // Hooks
  const intl = useIntl();
 
  console.log('power_ranges', power_ranges, availableDaysOfWeek);

  // TSX
  return (
    <Modal
      title={intl.formatMessage({ id: 'component.edit.farm.powerranges.modal.title' })}
      open={open}
      onCancel={onCancel}
      width={1080}
    >
    
    </Modal>
  );
}

export default SavePowerRange;