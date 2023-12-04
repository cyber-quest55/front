import * as React from 'react';
import { QrReader } from 'react-qr-reader';

interface IQRCodeScannerComponentProps {
  setFieldValue: any;
  handleVisible: any;
}

const QRCodeScannerComponent: React.FunctionComponent<IQRCodeScannerComponentProps> = (props) => {
  return (
       <QrReader
        onResult={(result, error) => {
          if (!!result) {
            props.setFieldValue(result.getText());
            props.handleVisible(false);
          }

          if (!!error) {
          }
        }}
        style={{ width: '100vw',  }}
        constraints={{}}
        
      />
   );
};

export default QRCodeScannerComponent;
