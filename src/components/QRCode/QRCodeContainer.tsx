import { useScreenHook } from '@/hooks/screen';
import * as React from 'react';
import QRCodeScannerComponent from './QRCodeComponent';
import QRCodeScannerMobile from './QRCodeMobile';

interface IQRCodeScannerContainerProps {
  setFieldValue: any;
  handleVisible: any;
}

const QRCodeScannerContainer: React.FunctionComponent<IQRCodeScannerContainerProps> = (props) => {
  const { xs } = useScreenHook();

  return (
    <>
      {false ? (
        <QRCodeScannerComponent {...props} />
      ) : xs && typeof window === undefined ? (
        <QRCodeScannerMobile {...props} />
      ) : (
        <QRCodeScannerComponent {...props} />
      )}
    </>
  );
};

export default QRCodeScannerContainer;
