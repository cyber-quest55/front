import { QrScanner } from '@diningcity/capacitor-qr-scanner';
import * as React from 'react';

interface IQRCodeScannerMobileProps {
  setFieldValue: any;
    handleVisible: any;
}

const QRCodeScannerMobile: React.FunctionComponent<IQRCodeScannerMobileProps> = (props) => {
  async function scanQR() {
    const { camera } = await QrScanner.requestPermissions();
    if (camera === 'granted') {
      const { result } = await QrScanner.scanQrCode();
      props.setFieldValue(result);
      props.handleVisible(false)
    } else {
      alert('You should allow camera permission.');
    }
  }
  return (
    <React.Fragment>
        
      <div onClick={() => scanQR()} style={{marginBottom: 25}}>
      asda
      </div>
    </React.Fragment>
  );
};

export default QRCodeScannerMobile;
