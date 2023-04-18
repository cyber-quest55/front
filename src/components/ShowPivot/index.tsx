import { PivotStatusColor } from "@/utils/pivot-status";
import { ProCard, ProTable, StatisticCard, TableDropdown } from "@ant-design/pro-components"
import { Button, Col, Dropdown, Input, Row, Space, Tag, Tooltip, Typography } from "antd";
import { BsFillCloudRainFill } from "react-icons/bs";
import { GiPadlockOpen, GiSolidLeaf } from "react-icons/gi";
import { TbBrandFlightradar24 } from "react-icons/tb";
import { GrObjectGroup } from "react-icons/gr";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Pie, G2, Line, Column } from '@ant-design/plots';
import { CaretDownOutlined, ClockCircleOutlined, CloseCircleFilled, CloudFilled, EditFilled, EllipsisOutlined, HistoryOutlined, SearchOutlined, ThunderboltFilled } from "@ant-design/icons";
import { useState } from "react";

const { Statistic } = StatisticCard;

const ShowPivot = () => {
    const { Text } = Typography;
    const [tab, setTab] = useState('tab2');

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
            type: 'Horas em pico',
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

    const valueEnum = {
        0: 'close',
        1: 'running',
        2: 'online',
        3: 'error',
    };

    const tableListDataSource: any[] = [];

    const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];


    for (let i = 0; i < 50; i += 1) {
        tableListDataSource.push({
            key: i,
            name: 'AppName-' + i,
            containers: Math.floor(Math.random() * 20),
            callNumber: Math.floor(Math.random() * 2000),
            progress: Math.ceil(Math.random() * 100) + 1,
            creator: creators[Math.floor(Math.random() * creators.length)],
            status: valueEnum[Math.floor(Math.random() * 10) % 4],
            createdAt: Date.now() - Math.floor(Math.random() * 100000),
            memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
        });
    }

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
                style={{ minHeight: 450 }}
            >
                <ProCard split="horizontal" colSpan={{ xs: 24, sm: 12 }}>
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
                        <ProCard split="vertical">
                            <StatisticCard
                                statistic={{
                                    title: 'Volume total mês anterior',
                                    value: "99.000,31",
                                    suffix: 'm³'
                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: 'Horas trabalhadas mês anterior',
                                    value: "150,03",
                                    suffix: 'h'
                                }}
                            />
                        </ProCard>
                    </ProCard>
                    <StatisticCard
                        style={{ width: '100%' }}
                        title="Horas de Trabalho Molhado (h)"
                        chart={
                            <Pie
                                appendPadding={10}
                                data={data}
                                angleField="value"
                                colorField="type"
                                radius={0.8}
                                legend={false}
                                autoFit
                                color={({ type }) => {
                                    if (type === 'Horas em pico') {
                                        return '#ff4d4f';
                                    } else if (type === 'Horas em fora de pico') {
                                        return '#4169E1'
                                    }
                                    return '#40E0D0';
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
                <ProCard split="horizontal" colSpan={{ xs: 24, sm: 12 }}>
                    <ProCard colSpan={{ xs: 24, sm: 24 }} split="vertical" style={{ height: 350 }}>
                        <StatisticCard
                            colSpan={{ xs: 24, sm: 16 }}
                            style={{ width: '100%', }}
                            title="Custo total de energia (R$)"
                            chart={
                                <Pie
                                    height={250}
                                    appendPadding={10}
                                    data={data}
                                    angleField="value"
                                    colorField="type"
                                    radius={1}
                                    legend={{
                                        position: 'right',
                                        layout: "vertical"
                                    }}
                                    autoFit
                                    innerRadius={0.6}
                                    statistic={{
                                        title: false,
                                        content: {
                                            style: {
                                                whiteSpace: 'pre-wrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                fontSize: '16px'
                                            },
                                            content: 'R$130,00\nTotal',
                                        },
                                    }}
                                    color={({ type }) => {
                                        if (type === 'Horas em pico') {
                                            return '#ff4d4f';
                                        } else if (type === 'Horas em fora de pico') {
                                            return '#4169E1'
                                        }
                                        return '#40E0D0';
                                    }}
                                    label={{
                                        type: 'inner',
                                        offset: '-50%',
                                        content: '{value}',
                                        style: {
                                            textAlign: 'center',
                                            fontSize: 13,
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
                        <ProCard split="vertical" colSpan={{ xs: 24, sm: 8 }}>
                            <ProCard split="horizontal" >
                                <ProCard split="horizontal">
                                    <StatisticCard
                                        statistic={{
                                            title: 'Mínimo',
                                            value: "465.67",
                                            suffix: 'V'
                                        }}
                                    />
                                </ProCard>
                                <ProCard split="horizontal">
                                    <StatisticCard
                                        statistic={{
                                            title: 'Médio',
                                            value: "465.67",
                                            suffix: 'V'
                                        }}
                                    />
                                </ProCard>
                                <ProCard split="horizontal">
                                    <StatisticCard
                                        statistic={{
                                            title: 'Máximo',
                                            value: "465.67",
                                            suffix: 'V'
                                        }}
                                    />
                                </ProCard>
                            </ProCard>

                        </ProCard>
                    </ProCard>
                    <StatisticCard
                        title={"Tensões do Pivô (V)"}
                        colSpan={{ xs: 24, sm: 24 }}
                        chart={<Line
                            height={320}
                            data={[
                                {
                                    "Date": "2010-01",
                                    "scales": 1998
                                },
                                {
                                    "Date": "2010-02",
                                    "scales": 1850
                                },
                                {
                                    "Date": "2010-03",
                                    "scales": 1720
                                },
                                {
                                    "Date": "2010-04",
                                    "scales": 1818
                                },
                                {
                                    "Date": "2010-05",
                                    "scales": 1920
                                },
                                {
                                    "Date": "2010-06",
                                    "scales": 1802
                                },
                                {
                                    "Date": "2010-07",
                                    "scales": 1945
                                },
                                {
                                    "Date": "2010-08",
                                    "scales": 1856
                                },
                                {
                                    "Date": "2010-09",
                                    "scales": 2107
                                },
                                {
                                    "Date": "2010-10",
                                    "scales": 2140
                                },
                                {
                                    "Date": "2010-11",
                                    "scales": 2311
                                },
                                {
                                    "Date": "2010-12",
                                    "scales": 1972
                                },
                                {
                                    "Date": "2011-01",
                                    "scales": 1760
                                },
                                {
                                    "Date": "2011-02",
                                    "scales": 1824
                                },
                                {
                                    "Date": "2011-03",
                                    "scales": 1801
                                },
                                {
                                    "Date": "2011-04",
                                    "scales": 2001
                                },
                                {
                                    "Date": "2011-05",
                                    "scales": 1640
                                },
                                {
                                    "Date": "2011-06",
                                    "scales": 1502
                                },
                                {
                                    "Date": "2011-07",
                                    "scales": 1621
                                },
                                {
                                    "Date": "2011-08",
                                    "scales": 1480
                                },
                                {
                                    "Date": "2011-09",
                                    "scales": 1549
                                },
                                {
                                    "Date": "2011-10",
                                    "scales": 1390
                                },
                                {
                                    "Date": "2011-11",
                                    "scales": 1325
                                },
                                {
                                    "Date": "2011-12",
                                    "scales": 1250
                                },
                                {
                                    "Date": "2012-01",
                                    "scales": 1394
                                },
                                {
                                    "Date": "2012-02",
                                    "scales": 1406
                                },
                                {
                                    "Date": "2012-03",
                                    "scales": 1578
                                },
                                {
                                    "Date": "2012-04",
                                    "scales": 1465
                                },
                                {
                                    "Date": "2012-05",
                                    "scales": 1689
                                },
                                {
                                    "Date": "2012-06",
                                    "scales": 1755
                                },
                                {
                                    "Date": "2012-07",
                                    "scales": 1495
                                },
                                {
                                    "Date": "2012-08",
                                    "scales": 1508
                                },
                                {
                                    "Date": "2012-09",
                                    "scales": 1433
                                },
                                {
                                    "Date": "2012-10",
                                    "scales": 1344
                                },
                                {
                                    "Date": "2012-11",
                                    "scales": 1201
                                },
                                {
                                    "Date": "2012-12",
                                    "scales": 1065
                                },
                                {
                                    "Date": "2013-01",
                                    "scales": 1255
                                },
                                {
                                    "Date": "2013-02",
                                    "scales": 1429
                                },
                                {
                                    "Date": "2013-03",
                                    "scales": 1398
                                },
                                {
                                    "Date": "2013-04",
                                    "scales": 1678
                                },
                                {
                                    "Date": "2013-05",
                                    "scales": 1524
                                },
                                {
                                    "Date": "2013-06",
                                    "scales": 1688
                                },
                                {
                                    "Date": "2013-07",
                                    "scales": 1500
                                },
                                {
                                    "Date": "2013-08",
                                    "scales": 1670
                                },
                                {
                                    "Date": "2013-09",
                                    "scales": 1734
                                },
                                {
                                    "Date": "2013-10",
                                    "scales": 1699
                                },
                                {
                                    "Date": "2013-11",
                                    "scales": 1508
                                },
                                {
                                    "Date": "2013-12",
                                    "scales": 1680
                                },
                                {
                                    "Date": "2014-01",
                                    "scales": 1750
                                },
                                {
                                    "Date": "2014-02",
                                    "scales": 1602
                                },
                                {
                                    "Date": "2014-03",
                                    "scales": 1834
                                },
                                {
                                    "Date": "2014-04",
                                    "scales": 1722
                                },
                                {
                                    "Date": "2014-05",
                                    "scales": 1430
                                },
                                {
                                    "Date": "2014-06",
                                    "scales": 1280
                                },
                                {
                                    "Date": "2014-07",
                                    "scales": 1367
                                },
                                {
                                    "Date": "2014-08",
                                    "scales": 1155
                                },
                                {
                                    "Date": "2014-09",
                                    "scales": 1289
                                },
                                {
                                    "Date": "2014-10",
                                    "scales": 1104
                                },
                                {
                                    "Date": "2014-11",
                                    "scales": 1246
                                },
                                {
                                    "Date": "2014-12",
                                    "scales": 1098
                                },
                                {
                                    "Date": "2015-01",
                                    "scales": 1189
                                },
                                {
                                    "Date": "2015-02",
                                    "scales": 1276
                                },
                                {
                                    "Date": "2015-03",
                                    "scales": 1033
                                },
                                {
                                    "Date": "2015-04",
                                    "scales": 956
                                },
                                {
                                    "Date": "2015-05",
                                    "scales": 845
                                },
                                {
                                    "Date": "2015-06",
                                    "scales": 1089
                                },
                                {
                                    "Date": "2015-07",
                                    "scales": 944
                                },
                                {
                                    "Date": "2015-08",
                                    "scales": 1043
                                },
                                {
                                    "Date": "2015-09",
                                    "scales": 893
                                },
                                {
                                    "Date": "2015-10",
                                    "scales": 840
                                },
                                {
                                    "Date": "2015-11",
                                    "scales": 934
                                },
                                {
                                    "Date": "2015-12",
                                    "scales": 810
                                },
                                {
                                    "Date": "2016-01",
                                    "scales": 782
                                },
                                {
                                    "Date": "2016-02",
                                    "scales": 1089
                                },
                                {
                                    "Date": "2016-03",
                                    "scales": 745
                                },
                                {
                                    "Date": "2016-04",
                                    "scales": 680
                                },
                                {
                                    "Date": "2016-05",
                                    "scales": 802
                                },
                                {
                                    "Date": "2016-06",
                                    "scales": 697
                                },
                                {
                                    "Date": "2016-07",
                                    "scales": 583
                                },
                                {
                                    "Date": "2016-08",
                                    "scales": 456
                                },
                                {
                                    "Date": "2016-09",
                                    "scales": 524
                                },
                                {
                                    "Date": "2016-10",
                                    "scales": 398
                                },
                                {
                                    "Date": "2016-11",
                                    "scales": 278
                                },
                                {
                                    "Date": "2016-12",
                                    "scales": 195
                                },
                                {
                                    "Date": "2017-01",
                                    "scales": 145
                                },
                                {
                                    "Date": "2017-02",
                                    "scales": 207
                                }
                            ]}
                            padding="auto"
                            xField="Date"
                            yField="scales"
                            xAxis={{
                                tickCount: 5
                            }}
                            slider={false}
                        />}
                    />
                </ProCard >

            </ProCard>

            <ProCard wrap ghost gutter={[0, 12, 0, 0]} colSpan={{ xs: 24, sm: 12 }} style={{ marginTop: -6 }}>
                <StatisticCard
                    title="Gráfico de Lâmina"
                    chart={<Column
                        data={[
                            {
                                type: '1-3秒',
                                value: 0.16,
                            },
                            {
                                type: '4-10秒',
                                value: 0.125,
                            },
                            {
                                type: '11-30秒',
                                value: 0.24,
                            },
                            {
                                type: '31-60秒',
                                value: 0.19,
                            },
                            {
                                type: '1-3分',
                                value: 0.22,
                            },
                            {
                                type: '3-10分',
                                value: 0.05,
                            },
                            {
                                type: '10-30分',
                                value: 0.01,
                            },
                            {
                                type: '30+分',
                                value: 0.015,
                            },
                        ]}
                        xField={'type'}
                        yField={'value'}
                        seriesField={''}
                        color={({ type }) => {
                            if (type === '10-30分' || type === '30+分') {
                                return "#F4664A";
                            }

                            return '#5B8FF9';
                        }}
                        label={{
                            content: (originData) => {
                                const val = parseFloat(originData.value);

                                if (val < 0.05) {
                                    return (val * 100).toFixed(1) + '%';
                                }
                            },
                            offset: 10,
                        }}
                        legend={false}
                        xAxis={{
                            label: {
                                autoHide: true,
                                autoRotate: false,
                            },
                        }}
                    />}
                />
                <StatisticCard
                    title="Comparativo de Pressão (bar)"
                    chart={<Line
                        height={320}
                        data={[
                            {
                                "Date": "2010-01",
                                "scales": 1998
                            },
                            {
                                "Date": "2010-02",
                                "scales": 1850
                            },
                            {
                                "Date": "2010-03",
                                "scales": 1720
                            },
                            {
                                "Date": "2010-04",
                                "scales": 1818
                            },
                            {
                                "Date": "2010-05",
                                "scales": 1920
                            },
                            {
                                "Date": "2010-06",
                                "scales": 1802
                            },
                            {
                                "Date": "2010-07",
                                "scales": 1945
                            },
                            {
                                "Date": "2010-08",
                                "scales": 1856
                            },
                            {
                                "Date": "2010-09",
                                "scales": 2107
                            },
                            {
                                "Date": "2010-10",
                                "scales": 2140
                            },
                            {
                                "Date": "2010-11",
                                "scales": 2311
                            },
                            {
                                "Date": "2010-12",
                                "scales": 1972
                            },
                            {
                                "Date": "2011-01",
                                "scales": 1760
                            },
                            {
                                "Date": "2011-02",
                                "scales": 1824
                            },
                            {
                                "Date": "2011-03",
                                "scales": 1801
                            },
                            {
                                "Date": "2011-04",
                                "scales": 2001
                            },
                            {
                                "Date": "2011-05",
                                "scales": 1640
                            },
                            {
                                "Date": "2011-06",
                                "scales": 1502
                            },
                            {
                                "Date": "2011-07",
                                "scales": 1621
                            },
                            {
                                "Date": "2011-08",
                                "scales": 1480
                            },
                            {
                                "Date": "2011-09",
                                "scales": 1549
                            },
                            {
                                "Date": "2011-10",
                                "scales": 1390
                            },
                            {
                                "Date": "2011-11",
                                "scales": 1325
                            },
                            {
                                "Date": "2011-12",
                                "scales": 1250
                            },
                            {
                                "Date": "2012-01",
                                "scales": 1394
                            },
                            {
                                "Date": "2012-02",
                                "scales": 1406
                            },
                            {
                                "Date": "2012-03",
                                "scales": 1578
                            },
                            {
                                "Date": "2012-04",
                                "scales": 1465
                            },
                            {
                                "Date": "2012-05",
                                "scales": 1689
                            },
                            {
                                "Date": "2012-06",
                                "scales": 1755
                            },
                            {
                                "Date": "2012-07",
                                "scales": 1495
                            },
                            {
                                "Date": "2012-08",
                                "scales": 1508
                            },
                            {
                                "Date": "2012-09",
                                "scales": 1433
                            },
                            {
                                "Date": "2012-10",
                                "scales": 1344
                            },
                            {
                                "Date": "2012-11",
                                "scales": 1201
                            },
                            {
                                "Date": "2012-12",
                                "scales": 1065
                            },
                            {
                                "Date": "2013-01",
                                "scales": 1255
                            },
                            {
                                "Date": "2013-02",
                                "scales": 1429
                            },
                            {
                                "Date": "2013-03",
                                "scales": 1398
                            },
                            {
                                "Date": "2013-04",
                                "scales": 1678
                            },
                            {
                                "Date": "2013-05",
                                "scales": 1524
                            },
                            {
                                "Date": "2013-06",
                                "scales": 1688
                            },
                            {
                                "Date": "2013-07",
                                "scales": 1500
                            },
                            {
                                "Date": "2013-08",
                                "scales": 1670
                            },
                            {
                                "Date": "2013-09",
                                "scales": 1734
                            },
                            {
                                "Date": "2013-10",
                                "scales": 1699
                            },
                            {
                                "Date": "2013-11",
                                "scales": 1508
                            },
                            {
                                "Date": "2013-12",
                                "scales": 1680
                            },
                            {
                                "Date": "2014-01",
                                "scales": 1750
                            },
                            {
                                "Date": "2014-02",
                                "scales": 1602
                            },
                            {
                                "Date": "2014-03",
                                "scales": 1834
                            },
                            {
                                "Date": "2014-04",
                                "scales": 1722
                            },
                            {
                                "Date": "2014-05",
                                "scales": 1430
                            },
                            {
                                "Date": "2014-06",
                                "scales": 1280
                            },
                            {
                                "Date": "2014-07",
                                "scales": 1367
                            },
                            {
                                "Date": "2014-08",
                                "scales": 1155
                            },
                            {
                                "Date": "2014-09",
                                "scales": 1289
                            },
                            {
                                "Date": "2014-10",
                                "scales": 1104
                            },
                            {
                                "Date": "2014-11",
                                "scales": 1246
                            },
                            {
                                "Date": "2014-12",
                                "scales": 1098
                            },
                            {
                                "Date": "2015-01",
                                "scales": 1189
                            },
                            {
                                "Date": "2015-02",
                                "scales": 1276
                            },
                            {
                                "Date": "2015-03",
                                "scales": 1033
                            },
                            {
                                "Date": "2015-04",
                                "scales": 956
                            },
                            {
                                "Date": "2015-05",
                                "scales": 845
                            },
                            {
                                "Date": "2015-06",
                                "scales": 1089
                            },
                            {
                                "Date": "2015-07",
                                "scales": 944
                            },
                            {
                                "Date": "2015-08",
                                "scales": 1043
                            },
                            {
                                "Date": "2015-09",
                                "scales": 893
                            },
                            {
                                "Date": "2015-10",
                                "scales": 840
                            },
                            {
                                "Date": "2015-11",
                                "scales": 934
                            },
                            {
                                "Date": "2015-12",
                                "scales": 810
                            },
                            {
                                "Date": "2016-01",
                                "scales": 782
                            },
                            {
                                "Date": "2016-02",
                                "scales": 1089
                            },
                            {
                                "Date": "2016-03",
                                "scales": 745
                            },
                            {
                                "Date": "2016-04",
                                "scales": 680
                            },
                            {
                                "Date": "2016-05",
                                "scales": 802
                            },
                            {
                                "Date": "2016-06",
                                "scales": 697
                            },
                            {
                                "Date": "2016-07",
                                "scales": 583
                            },
                            {
                                "Date": "2016-08",
                                "scales": 456
                            },
                            {
                                "Date": "2016-09",
                                "scales": 524
                            },
                            {
                                "Date": "2016-10",
                                "scales": 398
                            },
                            {
                                "Date": "2016-11",
                                "scales": 278
                            },
                            {
                                "Date": "2016-12",
                                "scales": 195
                            },
                            {
                                "Date": "2017-01",
                                "scales": 145
                            },
                            {
                                "Date": "2017-02",
                                "scales": 207
                            }
                        ]}
                        padding="auto"
                        xField="Date"
                        yField="scales"
                        xAxis={{
                            tickCount: 5
                        }}
                        slider={false}
                    />}
                />
            </ProCard>
            <ProCard colSpan={{ xs: 24, sm: 12 }}
                title="Histórico"
                tabs={{
                    tabPosition: 'top',
                    activeKey: tab,
                    items: [
                        {
                            label: `Eventos`,
                            key: 'tab1',
                            children: <ProTable<any>
                                
                                rowSelection={{
                                    // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
                                    // 注释该行则默认不显示下拉选项 
                                    defaultSelectedRowKeys: [1],
                                }}
                                columns={[
                                    {
                                        title: '排序',
                                        dataIndex: 'index',
                                        valueType: 'indexBorder',
                                        width: 48,
                                    },
                                    {
                                        title: '应用名称',
                                        dataIndex: 'name',
                                        render: (_) => <a>{_}</a>,
                                        // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
                                        filterDropdown: () => (
                                            <div style={{ padding: 8 }}>
                                                <Input style={{ width: 188, marginBlockEnd: 8, display: 'block' }} />
                                            </div>
                                        ),
                                        filterIcon: (filtered) => (
                                            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
                                        ),
                                    },
                                    {
                                        title: '创建者',
                                        dataIndex: 'creator',
                                        valueEnum: {
                                            all: { text: '全部' },
                                            付小小: { text: '付小小' },
                                            曲丽丽: { text: '曲丽丽' },
                                            林东东: { text: '林东东' },
                                            陈帅帅: { text: '陈帅帅' },
                                            兼某某: { text: '兼某某' },
                                        },
                                    },
                                    {
                                        title: '状态',
                                        dataIndex: 'status',
                                        initialValue: 'all',
                                        filters: true,
                                        onFilter: true,
                                        valueEnum: {
                                            all: { text: '全部', status: 'Default' },
                                            close: { text: '关闭', status: 'Default' },
                                            running: { text: '运行中', status: 'Processing' },
                                            online: { text: '已上线', status: 'Success' },
                                            error: { text: '异常', status: 'Error' },
                                        },
                                    },
                                    {
                                        title: '备注',
                                        dataIndex: 'memo',
                                        ellipsis: true,
                                        copyable: true,
                                    },
                                    {
                                        title: '操作',
                                        width: 180,
                                        key: 'option',
                                        valueType: 'option',
                                        render: () => [
                                            <a key="link">链路</a>,
                                            <a key="link2">报警</a>,
                                            <a key="link3">监控</a>,
                                            <TableDropdown
                                                key="actionGroup"
                                                menus={[
                                                    { key: 'copy', name: '复制' },
                                                    { key: 'delete', name: '删除' },
                                                ]}
                                            />,
                                        ],
                                    },
                                ]}
                                request={(params, sorter, filter) => {
                                    // 表单搜索项会从 params 传入，传递给后端接口。
                                    console.log(params, sorter, filter);
                                    return Promise.resolve({
                                        data: tableListDataSource,
                                        success: true,
                                    });
                                }}
                                rowKey="key"
                                pagination={{
                                    showQuickJumper: true,
                                    pageSize: 16
                                }}
                                search={false}
                                dateFormatter="string"
                                toolbar={{
                                    title: 'Lista de eventos',
                                    tooltip: '这是一个标题提示',
                                }} 
                            />,
                        },
                        {
                            label: `Lâminas`,
                            key: 'tab2',
                            children: `内容二`,
                        },
                    ],
                    onChange: (key) => {
                        setTab(key);
                    },
                }}
            >

            </ProCard>
        </ProCard>
    )
}

export default ShowPivot