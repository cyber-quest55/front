import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { useIntl } from '@umijs/max';
import { Space, Typography } from 'antd';

const ConnectionInfoWindow = forwardRef((_, ref) => {
  const intl = useIntl();
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

  const signalTransations = {
    "weak": intl.formatMessage({ id: 'component.signal.map.connection.1' }),
    "moderate": intl.formatMessage({ id: 'component.signal.map.connection.2' }),
    "strong": intl.formatMessage({ id: 'component.signal.map.connection.3' }),
    "very strong": intl.formatMessage({ id: 'component.signal.map.connection.4' }),
  }

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
            {intl.formatMessage({
              id: 'component.signal.map.connection.quality',
            })}{signalTransations[content.quality]}
          </Typography.Text>
          <Typography.Text
            style={{
              color: '#000000',
            }}
          >
            {intl.formatMessage({
              id: 'component.signal.map.connection.strength',
            }, {
              connStr: content.strength
            })}
          </Typography.Text>
        </Space>
      </InfoWindow>
    ) : null
  );
});

export default ConnectionInfoWindow;
