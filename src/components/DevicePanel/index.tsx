import { Col, Row, Space, Typography } from "antd";
import { ReactNode } from "react";

const { Text } = Typography

type Props = {
    status: ReactNode;
    deviceSelector: ReactNode
    extra: ReactNode
    deviceActions: ReactNode
    actions: ReactNode
    lastCommunication: string
    otherProps?: any
}

export const DevicePanel: React.FC<Props> = (props) => {
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Row justify="space-between" align="middle">
                    <Col>{props.status}</Col>
                    <Col>{props.actions}</Col>
                </Row>
                <Row style={{ maxWidth: 175 }}>
                    <Col style={{ width: '100%' }}>
                        {props.deviceSelector}
                    </Col>
                    <Col>
                        <Text type="secondary" style={{ fontSize: 11 }}>Last communication: {props.lastCommunication}</Text>
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Col>
                        {props.extra}
                    </Col>
                    <Col >
                        {props.deviceActions}
                    </Col>
                </Row>
            </Space>
        </>
    )
}

export default DevicePanel