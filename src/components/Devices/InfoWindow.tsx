import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { Space, Tag, Typography } from 'antd';

const CustomInfoWindow = forwardRef((_, ref) => {
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState({ name: '', status: '', deviceColor: '', statusText: '', updated: '' });
	const [position, setPosition] = useState({ lat: 0, lng: 0 });

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
		visible && <InfoWindow onCloseClick={close} position={position} >
			<Space direction="vertical" >
				<Typography.Title level={5}>{content.name}</Typography.Title>
				{
					content.deviceColor && content.statusText ? (
						<Tag color={content.deviceColor}>{content.statusText}</Tag>
					) : null
				}
				<Typography.Text>{content.updated}</Typography.Text>
			</Space>
		</InfoWindow>
	);
});

export default CustomInfoWindow;
