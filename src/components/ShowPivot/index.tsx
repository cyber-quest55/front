import { PivotStatusColor } from "@/utils/pivot-status";
import { Liquid, Pie } from "@ant-design/charts"
import { CaretDownOutlined, ClockCircleOutlined, CloseCircleFilled, CloudFilled, EditFilled, HistoryOutlined, ThunderboltFilled } from "@ant-design/icons";
import { ProCard, StatisticCard } from "@ant-design/pro-components"
import { Button, Col, Row, Space, Tag, Tooltip, Typography } from "antd";
import { BsFillCloudRainFill } from "react-icons/bs";
import { GiPadlockOpen, GiSolidLeaf } from "react-icons/gi";
import { TbBrandFlightradar24 } from "react-icons/tb";
import { GrObjectGroup } from "react-icons/gr";

const ShowPivot = () => {
    const { Text } = Typography;


    const data = [
        {
            sex: 'Trigo',
            sold: 0.45,
        },
        {
            sex: 'Feijão',
            sold: 0.55,
        },
    ];
    const config = {
        data,
        angleField: 'sold',
        colorField: 'sex',
        legend: false,
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                fill: '#fff',
                fontSize: 18,
                textAlign: 'center',
            },
        },
        pieStyle: ({ sex }) => {
            if (sex === 'Trigo') {
                return {
                    fill: 'p(a)https://gw.alipayobjects.com/zos/antfincdn/FioHMFgIld/pie-wenli1.png',
                };
            }

            return {
                fill: 'p(a)https://gw.alipayobjects.com/zos/antfincdn/Ye2DqRx%2627/pie-wenli2.png',
            };
        },
        tooltip: false,
    };

    const configLiquid = {
        percent: 0.25,
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
    };

    return (
        <ProCard ghost style={{ marginBlockStart: 8, }} gutter={[16, 16]} wrap>
            <ProCard colSpan={{ xs: 24, sm: 5 }} style={{ height: 275 }}>
            </ProCard>
            <ProCard colSpan={{ xs: 24, sm: 9 }} style={{ height: 275 }}>
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Row justify="space-between" align="middle">
                        <Col><Tag color={PivotStatusColor.irrigating}>PIVOT PARADO</Tag></Col>
                        <Col>
                            <Space>
                                <Button icon={<GiPadlockOpen />} href="https://www.google.com" />
                                <Button icon={<GiSolidLeaf />} href="https://www.google.com" />
                                <Button icon={<CloudFilled />} href="https://www.google.com" />

                                <Button icon={<EditFilled />} href="https://www.google.com" >Edit</Button>
                                <Button icon={<CloseCircleFilled />} href="https://www.google.com" >Close</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ maxWidth: 175 }}>
                        <Col style={{ width: '100%' }}>
                            <Row justify="space-between" align="middle"  >
                                <Col>
                                    <Typography.Title level={2} style={{ margin: 0, fontWeight: '700' }}>Pivô 1 </Typography.Title>
                                </Col>
                                <Col>
                                    <CaretDownOutlined style={{ fontSize: 24 }} />
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Text type="secondary" style={{ fontSize: 11 }}>Last communication: 19 May 10:15</Text>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col>
                            <Space direction="vertical" size="middle">
                                <Space size="middle">
                                    <Space>
                                        <Tooltip title="Voltagem">
                                            <ThunderboltFilled />
                                        </Tooltip>

                                        <div>220 V</div>
                                    </Space>
                                    <Space>
                                        <Tooltip title="Barras">
                                            <HistoryOutlined />
                                        </Tooltip>
                                        <div>1.2 bar</div>
                                    </Space>
                                </Space>
                                <Space size="middle">
                                    <Space>
                                        <Tooltip title="Chuva hoje">
                                            <BsFillCloudRainFill />
                                        </Tooltip>
                                        <div>10 mm </div>
                                    </Space>
                                    <Space>
                                        <TbBrandFlightradar24 style={{fontSize: 20}} />
                                        <div>1.2 bar</div>
                                    </Space>
                                </Space>
                                <Space size="middle">
                                    <Space>
                                        <Tooltip title="Grupo">
                                            <GrObjectGroup />
                                        </Tooltip>
                                        <div>10 mm </div>
                                    </Space>
                                    <Space>
                                        <ClockCircleOutlined />
                                        <div>262h 33min</div>
                                    </Space>
                                </Space>
                            </Space>
                        </Col>
                        <Col >
                            <Space direction="vertical" size="middle">
                                <Button type="primary" style={{ width: '200px' }}>Start Pivot</Button>
                                <Button type="default" danger style={{ width: '200px' }}>Stop Pivot</Button>
                            </Space>
                        </Col>
                    </Row>
                </Space>

            </ProCard>
            <StatisticCard
                title="SEGMENTAÇÕES"
                tooltip="大盘说明"
                colSpan={{ xs: 24, sm: 5 }} style={{ height: 275 }}
                chart={
                    <Pie height={190}  {...config} />
                }
            />
            <StatisticCard
                title="NÍVEL DA ÁGUA"
                tooltip="大盘说明"
                colSpan={{ xs: 24, sm: 5 }} style={{ height: 275 }}
                chart={
                    <Liquid height={190}  {...configLiquid} />
                }
            />
            <ProCard colSpan={{ xs: 24, sm: 5 }} style={{ height: 225 }} >
            </ProCard>
            <ProCard colSpan={{ xs: 24, sm: 12 }} style={{ height: 225 }}>
            </ProCard>
        </ProCard>
    )
}

export default ShowPivot