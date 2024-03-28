import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { Space, Typography } from 'antd';

const ConnectionInfoWindow = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [content, setContent] = useState<{
    fromName: string,
    toName: string,
    quality: string,
    strength: number,
  }>({
    fromName: '',
    toName: '',
    quality: '',
    strength: 0,
  });

  useImperativeHandle(ref, () => ({
    setContentAndOpen: (newContent, position) => {
      if (newContent) {
        setContent(newContent);
      }
      if (position) {
        setPosition(position)
      }
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    }
  }));

  const close = () => {
    setVisible(false);
  }

  return (
    visible ? (
      <InfoWindow
        onCloseClick={close}
        position={position}
      >
        <Space direction="vertical" >
          <Typography.Title
            level={5}
            style={{
              color: '#000000',
            }}
          >
            {content.fromName} - {content.toName}
          </Typography.Title>
          <Typography.Text
            style={{
              color: '#000000',
            }}
          >
            Quality {content.quality}
          </Typography.Text>
          <Typography.Text
            style={{
              color: '#000000',
            }}
          >
            Strength: {content.strength}
          </Typography.Text>
        </Space>
      </InfoWindow>
    ) : null
  );
});

export default ConnectionInfoWindow;
