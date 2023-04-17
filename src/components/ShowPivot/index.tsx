import { PivotStatusColor } from "@/utils/pivot-status";
import { CaretDownOutlined, ClockCircleOutlined, CloseCircleFilled, CloudFilled, EditFilled, HistoryOutlined, ThunderboltFilled } from "@ant-design/icons";
import { ProCard, StatisticCard } from "@ant-design/pro-components"
import { Button, Col, Row, Space, Tag, Tooltip, Typography } from "antd";
import { BsFillCloudRainFill } from "react-icons/bs";
import { GiPadlockOpen, GiSolidLeaf } from "react-icons/gi";
import { TbBrandFlightradar24 } from "react-icons/tb";
import { GrObjectGroup } from "react-icons/gr";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Pie, G2 } from '@ant-design/plots';

const { Statistic } = StatisticCard;

const ShowPivot = () => {
    const { Text } = Typography;

    const className = useEmotionCss(() => {
        return {
            '.ant-statistic-content-value': {
                fontSize: '24px !important'
            }
        }
    });
    const G = G2.getEngine('canvas');

    const data = [
        {
            type: 'Horas de pico',
            value: 100,
        },  
        {
            type: 'Horas em fora de pico',
            value: 100,
        },
        {
            type: 'Horas em reduzido',
            value: 200,
            color: 'red', 
        },
    ]; 

    return (
        <ProCard ghost style={{ marginBlockStart: 8, }} gutter={[16, 16]} wrap>
            <ProCard colSpan={{ xs: 24, sm: 5 }} style={{ height: 275 }}>
            </ProCard>
            <ProCard colSpan={{ xs: 24, sm: 9 }} style={{ height: 275 }}>
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Row justify="space-between" align="middle">
                        <Col><Tag color={PivotStatusColor.off}>PIVOT PARADO</Tag></Col>
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
                                        <TbBrandFlightradar24 style={{ fontSize: 20 }} />
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

            <ProCard split="vertical" colSpan={{ xs: 24, sm: 10 }} style={{ height: 275 }}>
                <ProCard split="horizontal" colSpan={{ xs: 24, sm: 12 }}   >
                    <StatisticCard

                        style={{ height: "calc((275px / 2) - 1px)" }}
                        statistic={{
                            title: 'Falta de pressão',
                            value: 8,
                            description: <Statistic className={className} title="Último mês" value="8.04%" trend="down" />,
                        }}
                    />
                    <StatisticCard
                        style={{ height: "calc((275px / 2) - 1px)" }}
                        statistic={{
                            title: 'Queda de energia',
                            value: 0,
                            description: <Statistic className={className} title="Último mês" value="8.04%" trend="down" />,
                        }}
                    />
                </ProCard>
                <ProCard split="horizontal" colSpan={{ xs: 24, sm: 12 }}   >
                    <StatisticCard
                        style={{ height: "calc((275px / 2) - 1px)" }}
                        statistic={{
                            title: 'Desalinhado',
                            value: 0,
                            description: <Statistic className={className} title="Último mês" value="8.04%" trend="down" />,
                        }}
                    />
                    <StatisticCard
                        style={{ height: "calc((275px / 2) - 1px)" }}
                        statistic={{
                            title: 'Oscilação de energia',
                            value: 0,
                            description: <Statistic className={className} title="Último mês" value="8.04%" trend="down" />,
                        }}
                    />
                </ProCard>

            </ProCard>
            <ProCard
                title="Consumo de energia"
                split={'vertical'}
                headerBordered
                colSpan={{ xs: 24, sm: 12 }}
            >
                <ProCard split="horizontal">
                    <ProCard split="horizontal">
                        <ProCard split="vertical">
                            <StatisticCard
                                statistic={{
                                    title: 'Volume total',
                                    value: "100.604,31",
                                    suffix: 'm³'
                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: 'Horas trabalhadas',
                                    value: "152,03",
                                    suffix: 'h'
                                }}
                            />
                        </ProCard>
                    </ProCard>
                    <StatisticCard
                        style={{width: '100%' }}
                        title="Horas de Trabalho Molhado"
                        chart={
                            <Pie
                                appendPadding={10} 
                                data={data}
                                angleField="value"
                                colorField="type"
                                radius={0.7}
                                legend={false}
                                autoFit
                                color= { ({ type }) => {
                                    if(type === 'Horas de pico'){
                                      return '#ff4d4f';
                                    } else if (type === 'Horas em fora de pico'){
                                      return '#4169E1'
                                    }
                                    return '#9FE2BF';
                                  }}
                                label={{
                                    type: 'spider',
                                    labelHeight: 40,
                                    formatter: (data, mappingData) => {
                                        const group = new G.Group({});
                                        group.addShape({
                                            type: 'circle',
                                            attrs: {
                                                x: 0,
                                                y: 0,
                                                width: 40,
                                                height: 50,
                                                r: 5,
                                                fill: mappingData.color,
                                            },
                                        });
                                        group.addShape({
                                            type: 'text',
                                            attrs: {
                                                x: 10,
                                                y: 8,
                                                text: `${data.type}`,
                                                fill: mappingData.color,
                                            },
                                        });
                                        group.addShape({
                                            type: 'text',
                                            attrs: {
                                                x: 0,
                                                y: 25,
                                                text: `${data.value}个 ${data.percent * 100}%`,
                                                fill: 'rgba(0, 0, 0, 0.65)',
                                                fontWeight: 700,
                                            },
                                        });
                                        return group;
                                    },
                                }}
                                interactions={[
                                    {
                                        type: 'element-selected',
                                    },
                                    {
                                        type: 'element-active',
                                    },
                                ]}
                            />
                        }
                    />
                </ProCard> 
            </ProCard>
            <ProCard colSpan={{ xs: 24, sm: 12 }} style={{ height: 225 }}>
            </ProCard>
        </ProCard>
    )
}

export default ShowPivot