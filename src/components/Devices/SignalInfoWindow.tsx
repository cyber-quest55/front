import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { Space, Tag, Typography } from 'antd';

const SignalInfoWindow = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [content, setContent] = useState({
    name: '',
    status: '',
    deviceColor: '',
    statusText: '',
    updated: ''
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
    setVisible(false)
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
          >
            {content.name}
          </Typography.Title>
          <Tag
            color={content.deviceColor}
          >
            {content.statusText}
          </Tag>
          <Typography.Text>
            {content.updated}
          </Typography.Text>
        </Space>
      </InfoWindow>
    ) : null
  );
});

export default SignalInfoWindow;
