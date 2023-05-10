import { PivotStatusColor } from "@/utils/pivot-status";
import { ProCard, ProTable, StatisticCard, TableDropdown } from "@ant-design/pro-components"
import { Button, Col, Input, Modal, Row, Select, Space, Tag, Tooltip } from "antd";
import { BsFillCloudRainFill } from "react-icons/bs";
import { GiPadlockOpen, GiSolidLeaf } from "react-icons/gi";
import { TbBrandFlightradar24 } from "react-icons/tb";
import { GrObjectGroup } from "react-icons/gr";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { Pie, G2, Line, Column } from '@ant-design/plots';
import { useState } from "react";
import DevicePanel from "../DevicePanel";
import {
    CalendarOutlined,
    CaretDownOutlined,
    ClockCircleOutlined,
    CloseCircleFilled,
    CloudFilled, DownloadOutlined, EditFilled,
    HistoryOutlined,
    RedoOutlined,
    SearchOutlined,
    ThunderboltFilled
} from "@ant-design/icons";
import { connect } from "umi";
import { GetPivotModelProps } from "@/models/pivot";
const { Statistic } = StatisticCard;
import { useWindowWidth } from '@react-hook/window-size'

type Props = {
    pivot: GetPivotModelProps
    dispatch: any;
}

const ShowPivot: React.FC<Props> = (props) => {
    const onlyWidth = useWindowWidth()

    const [tab, setTab] = useState('tab1');
    const [option, setOption] = useState<undefined | number>(undefined)

    const generalClassName = useEmotionCss(({ token }) => {
        return {
            '.ant-pro-card-title ': {
                width: '100%'
            },
            [`@media screen and (max-width: ${token.screenMD}px)`]: {
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 110px)',
            },
        }
    });

    const className = useEmotionCss(() => {
        return {
            '.ant-pro-card-title ': {
                width: '100%'
            }
        }
    });

    const classNameSelect = useEmotionCss(() => {
        return {
            ".ant-select-selection-item": {
                fontWeight: 700,
                fontSize: 24
            },
            ".ant-select-selector": {
                padding: "0 !important",
            },
            ".ant-select-arrow": {
                color: 'black',
                fontSize: 20

            }
        };
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
            createdAt: Date.now() - Math.floor(Math.random() * 100000),
            memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
        });
    }

    const onChangeDevice = (e: string) => {
        props.dispatch({
            type: 'pivot/setSelectedPivot',
            payload: props.pivot.result.list.find(item => item.id === parseInt(e))
        })
    }

    const failureTitle: any = {
        1: "Falta de pressão",
        2: "Queda de energia",
        3: "Desalinhado",
        4: "Oscilação de energia"
    }
    return (
        <>
            <Modal
                width={1020}
                title={option !== undefined ? failureTitle[option] : failureTitle[1]}
                onCancel={() => setOption(undefined)}
                open={option ? true : false}
                destroyOnClose

            >

                <Row>
                    <Col xs={24} md={12} style={{background: 'black'}}>

                    </Col>
                    <Col xs={24} md={12}>
                        <ProTable<any>
                            columns={[ 
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
                            
                            ]}
                            request={() => {
                                return Promise.resolve({
                                    data: tableListDataSource,
                                    success: true,
                                });
                            }}
                            rowKey="key"
                            pagination={{ 
                                pageSize: 6
                            }} 
                            options={false}
                            search={false}
                            dateFormatter="string"
                            toolbar={ {}}
                        />
                    </Col>
                </Row>
            </Modal>
            <ProCard className={generalClassName} ghost style={{ marginBlockStart: 8, }} gutter={[16, 16]} wrap>
                <ProCard colSpan={{ xs: 24, md: 8, xxl: 5 }} style={{ height: 275 }}>
                </ProCard>
                <ProCard colSpan={{ xs: 24, md: 16, xxl: 9 }} style={{ height: onlyWidth > 767 ? 275 : '100%' }}>
                    <DevicePanel
                        actions={
                            <Space>
                                <Button icon={<GiPadlockOpen />} href="https://www.google.com" />
                                <Button icon={<GiSolidLeaf />} href="https://www.google.com" />
                                <Button icon={<CloudFilled />} href="https://www.google.com" />
                                <Button icon={<EditFilled />} href="https://www.google.com" >Edit</Button>
                                <Button icon={<CloseCircleFilled />} href="https://www.google.com" >Close</Button>
                            </Space>
                        }
                        status={<Tag color={PivotStatusColor.off}>PIVOT PARADO</Tag>}
                        deviceSelector={
                            <Select
                                className={classNameSelect}
                                suffixIcon={<CaretDownOutlined />}
                                bordered={false}
                                showSearch
                                value={props.pivot.selectedPivot?.name?.toString()}
                                size="large"
                                style={{ width: '100%', }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={onChangeDevice}
                                options={props.pivot.result.list?.map(item => ({ value: item.id, label: item.name }))}
                            />
                        }
                        extra={<Space direction="vertical" size="middle">
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
                        </Space>}
                        lastCommunication="19 May 10:15"
                        deviceActions={<Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Button type="primary" style={{ width: onlyWidth > 767 ? '200px' : '100%' }}>Start Pivot</Button>
                            <Button type="default" danger style={{ width: onlyWidth > 767 ? '200px' : '100%' }}>Stop Pivot</Button>
                        </Space>}
                    />
                </ProCard>
                <ProCard split={onlyWidth > 767 ? "vertical" : "horizontal"} colSpan={{ xs: 24, md: 24, xxl: 10 }} wrap>
                    <ProCard split={onlyWidth > 1600 ? "horizontal" : onlyWidth > 767 ? "vertical" : "horizontal"} colSpan={{ xs: 24, md: 12, xxl: 12 }}   >
                        <StatisticCard
                            bodyStyle={{ cursor: 'pointer' }}
                            onClick={() => setOption(1)}
                            style={{ height: "calc(275px / 2)" }}
                            statistic={{
                                title: 'Falta de pressão',
                                value: 8,
                                description: <Statistic className={className} title="Último mês" value="8.04%" trend="down" />,
                            }}
                        />
                        <StatisticCard
                            bodyStyle={{ cursor: 'pointer' }}
                            onClick={() => setOption(2)}
                            style={{ height: "calc(275px / 2)" }}
                            statistic={{
                                title: 'Queda de energia',
                                value: 0,
                                description: <Statistic className={className} title="Último mês" value="8.04%" trend="down" />,
                            }}
                        />
                    </ProCard>
                    <ProCard split={onlyWidth > 1600 ? "horizontal" : onlyWidth > 767 ? "vertical" : "horizontal"} colSpan={{ xs: 24, md: 12, xxl: 12 }}   >
                        <StatisticCard
                            bodyStyle={{ cursor: 'pointer' }}
                            onClick={() => setOption(3)}
                            style={{ height: "calc(275px / 2)" }}
                            statistic={{
                                title: 'Desalinhado',
                                value: 0,
                                description: <Statistic className={className} title="Último mês" value="8.04%" trend="down" />,
                            }}
                        />
                        <StatisticCard
                            bodyStyle={{ cursor: 'pointer' }}
                            onClick={() => setOption(4)}
                            style={{ height: "calc(275px / 2)" }}
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
                    split={onlyWidth > 767 ? 'horizontal' : 'horizontal'}
                    headerBordered
                    style={{ minHeight: 450 }}
                    colSpan={{ xs: 24, lg: 12 }}
                >
                    <ProCard split="horizontal" colSpan={{ xs: 24, lg: 24 }}>
                        <ProCard split={onlyWidth > 767 ? "vertical" : "horizontal"}>
                            <ProCard split={"horizontal"} wrap>

                                <StatisticCard
                                    onClick={() => { }}
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
                            <ProCard split={"horizontal"} wrap>
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

                    <ProCard split="horizontal" colSpan={{ xs: 24, lg: 24 }}>
                        <ProCard
                            colSpan={{ xs: 24, lg: 24 }}
                            split={onlyWidth > 767 ? 'vertical' : 'horizontal'}
                            style={{ height: onlyWidth > 767 ? 350 : '100%' }}>
                            <StatisticCard
                                colSpan={{ xs: 24, lg: 16 }}
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
                            <ProCard split="vertical" colSpan={{ xs: 24, lg: 8 }}>
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
                            colSpan={{ xs: 24, lg: 24 }}
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
                <ProCard colSpan={{ xs: 24, lg: 12 }} wrap ghost>
                    <ProCard
                        title={<Row justify="space-between" style={{ width: '100%' }}>
                            <Col>
                                Histórico
                            </Col>
                            <Col style={{ display: 'flex', gap: 12 }}>
                                <Button icon={<DownloadOutlined />} >Exportar</Button>
                                <Button icon={<CalendarOutlined />}  ></Button>
                                <Button icon={<RedoOutlined />}   ></Button>
                            </Col>
                        </Row>}
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
                                        request={() => {
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
                        colSpan={{ xs: 24, md: 24 }}

                    >

                    </ProCard>

                    <StatisticCard
                        style={{ marginTop: 16 }}
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
                        colSpan={{ xs: 24, md: 24 }}

                    />
                </ProCard >

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
                            content: (originData: any): any => {
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
                    colSpan={{ xs: 24, lg: 24 }}
                />
            </ProCard>
        </>
    )
}

export default connect(({ pivot }: { pivot: any }) => ({
    pivot,
}))(ShowPivot);
