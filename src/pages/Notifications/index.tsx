
import AddLevelGaugeForm from '@/components/Forms/AddAlarmForm/LevelGauge';
import AddPivotAlarmForm from '@/components/Forms/AddAlarmForm/Pivot';
import AddPivotMonitorAlarmForm from '@/components/Forms/AddAlarmForm/PivotMonitor';
import { TinyArea } from '@ant-design/charts';
import { BellOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Space, Tabs, Tag, Switch, Typography, Row, Col } from 'antd';
import React, { ReactText, useState } from 'react';




const NoFoundPage: React.FC = () => {
    const data = [
        264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
    ];
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);

    const defaultData2 = [
        {
            id: '1',
            name: 'Nome do grupo de alarmes',
            image:
                <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
            desc: <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <TinyArea
                        height={100}
                        autoFit={false}
                        data={data}
                        smooth={true}
                        tooltip={false}
                        color={"#E5EDFE"}
                        pattern={{
                            type: 'line',
                            cfg: {
                                stroke: '#5B8FF9',
                            },
                        }}
                        annotations={[
                            {
                                type: 'line',
                                start: ['min', 'mean'],
                                end: ['max', 'mean'],
                                text: {
                                    content: 'ffff',
                                    offsetY: -2,
                                    style: {
                                        textAlign: 'left',
                                        fontSize: 10,
                                        fill: 'rgba(44, 53, 66, 0.45)',
                                        textBaseline: 'bottom',
                                    },
                                },
                                style: {
                                    stroke: 'rgba(0, 0, 0, 0.25)',
                                },
                            },
                            {
                                type: 'line',
                                start: ['min', 800],
                                end: ['max', 800],
                                text: {
                                    content: 'eeee',
                                    offsetY: -2,
                                    style: {
                                        textAlign: 'left',
                                        fontSize: 10,
                                        fill: 'rgba(44, 53, 66, 0.45)',
                                        textBaseline: 'bottom',
                                    },
                                },
                                style: {
                                    stroke: 'rgba(0, 0, 0, 0.55)',
                                },
                            },
                        ]}
                    />
                </Col>
                <Col span={12} >
                    <Row align={"middle"} style={{ height: "100%" }}>
                        <Space direction="vertical" size={"large"}>
                            <Space>
                                <Typography.Text type="secondary">
                                    Limites de nível superior:
                                </Typography.Text>

                                <Typography.Text >
                                    75; 85; 95.
                                </Typography.Text>
                            </Space>
                            <Space>
                                <Typography.Text type="secondary">
                                    Limites de nível inferior:
                                </Typography.Text>

                                <Typography.Text >
                                    25; 15; 5.
                                </Typography.Text>
                            </Space>
                        </Space>
                    </Row>
                </Col>
            </Row>,
            subTitle: <Space direction='vertical' size={"middle"} style={{ marginTop: 4 }}>

                <Space size={2} style={{ margin: 0 }} >
                    <Tag>Pivô 1</Tag>
                    <Tag>Pivô 2</Tag>
                    <Tag>Pivô 3</Tag>
                    <Tag>Pivô 4</Tag>
                    <Tag>Pivô 5</Tag>
                    <Tag>Pivô 6</Tag>
                </Space>
            </Space>
        },
        {
            id: '2',
            name: 'Nome do grupo de alarmes',
            image:
                <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
            desc: <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <TinyArea
                        height={100}
                        autoFit={false}
                        data={data}
                        smooth={true}
                        tooltip={false}
                        color={"#E5EDFE"}
                        pattern={{
                            type: 'line',
                            cfg: {
                                stroke: '#5B8FF9',
                            },
                        }}
                        annotations={[
                            {
                                type: 'line',
                                start: ['min', 'mean'],
                                end: ['max', 'mean'],
                                text: {
                                    content: 'ffff',
                                    offsetY: -2,
                                    style: {
                                        textAlign: 'left',
                                        fontSize: 10,
                                        fill: 'rgba(44, 53, 66, 0.45)',
                                        textBaseline: 'bottom',
                                    },
                                },
                                style: {
                                    stroke: 'rgba(0, 0, 0, 0.25)',
                                },
                            },
                            {
                                type: 'line',
                                start: ['min', 800],
                                end: ['max', 800],
                                text: {
                                    content: 'eeee',
                                    offsetY: -2,
                                    style: {
                                        textAlign: 'left',
                                        fontSize: 10,
                                        fill: 'rgba(44, 53, 66, 0.45)',
                                        textBaseline: 'bottom',
                                    },
                                },
                                style: {
                                    stroke: 'rgba(0, 0, 0, 0.55)',
                                },
                            },
                        ]}
                    />
                </Col>
                <Col span={12} >
                    <Row align={"middle"} style={{ height: "100%" }}>
                        <Space direction="vertical" size={"large"}>
                            <Space>
                                <Typography.Text type="secondary">
                                    Limites de nível superior:
                                </Typography.Text>

                                <Typography.Text >
                                    75; 85; 95.
                                </Typography.Text>
                            </Space>
                            <Space>
                                <Typography.Text type="secondary">
                                    Limites de nível inferior:
                                </Typography.Text>

                                <Typography.Text >
                                    25; 15; 5.
                                </Typography.Text>
                            </Space>
                        </Space>
                    </Row>
                </Col>
            </Row>,
            subTitle: <Space direction='vertical' size={"middle"} style={{ marginTop: 4 }}>

                <Space size={2} style={{ margin: 0 }} >
                    <Tag>Pivô 1</Tag>
                    <Tag>Pivô 2</Tag>
                    <Tag>Pivô 3</Tag>
                    <Tag>Pivô 4</Tag>
                    <Tag>Pivô 5</Tag>
                    <Tag>Pivô 6</Tag>
                </Space>
            </Space>
        },
        {
            id: '3',
            name: 'Nome do grupo de alarmes',
            image:
                <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
            desc: <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <TinyArea
                        height={100}
                        autoFit={false}
                        data={data}
                        smooth={true}
                        tooltip={false}
                        color={"#E5EDFE"}
                        pattern={{
                            type: 'line',
                            cfg: {
                                stroke: '#5B8FF9',
                            },
                        }}
                        annotations={[
                            {
                                type: 'line',
                                start: ['min', 'mean'],
                                end: ['max', 'mean'],
                                text: {
                                    content: 'ffff',
                                    offsetY: -2,
                                    style: {
                                        textAlign: 'left',
                                        fontSize: 10,
                                        fill: 'rgba(44, 53, 66, 0.45)',
                                        textBaseline: 'bottom',
                                    },
                                },
                                style: {
                                    stroke: 'rgba(0, 0, 0, 0.25)',
                                },
                            },
                            {
                                type: 'line',
                                start: ['min', 800],
                                end: ['max', 800],
                                text: {
                                    content: 'eeee',
                                    offsetY: -2,
                                    style: {
                                        textAlign: 'left',
                                        fontSize: 10,
                                        fill: 'rgba(44, 53, 66, 0.45)',
                                        textBaseline: 'bottom',
                                    },
                                },
                                style: {
                                    stroke: 'rgba(0, 0, 0, 0.55)',
                                },
                            },
                        ]}
                    />
                </Col>
                <Col span={12} >
                    <Row align={"middle"} style={{ height: "100%" }}>
                        <Space direction="vertical" size={"large"}>
                            <Space>
                                <Typography.Text type="secondary">
                                    Limites de nível superior:
                                </Typography.Text>

                                <Typography.Text >
                                    75; 85; 95.
                                </Typography.Text>
                            </Space>
                            <Space>
                                <Typography.Text type="secondary">
                                    Limites de nível inferior:
                                </Typography.Text>

                                <Typography.Text >
                                    25; 15; 5.
                                </Typography.Text>
                            </Space>
                        </Space>
                    </Row>
                </Col>
            </Row>,
            subTitle: <Space direction='vertical' size={"middle"} style={{ marginTop: 4 }}>

                <Space size={2} style={{ margin: 0 }} >
                    <Tag>Pivô 1</Tag>
                    <Tag>Pivô 2</Tag>
                    <Tag>Pivô 3</Tag>
                    <Tag>Pivô 4</Tag>
                    <Tag>Pivô 5</Tag>
                    <Tag>Pivô 6</Tag>
                </Space>
            </Space>
        },
        {
            id: '4',
            name: 'Nome do grupo de alarmes',
            image:
                <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
            desc: <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <TinyArea
                        height={100}
                        autoFit={false}
                        data={data}
                        smooth={true}
                        tooltip={false}
                        color={"#E5EDFE"}
                        pattern={{
                            type: 'line',
                            cfg: {
                                stroke: '#5B8FF9',
                            },
                        }}
                        annotations={[
                            {
                                type: 'line',
                                start: ['min', 'mean'],
                                end: ['max', 'mean'],
                                text: {
                                    content: 'ffff',
                                    offsetY: -2,
                                    style: {
                                        textAlign: 'left',
                                        fontSize: 10,
                                        fill: 'rgba(44, 53, 66, 0.45)',
                                        textBaseline: 'bottom',
                                    },
                                },
                                style: {
                                    stroke: 'rgba(0, 0, 0, 0.25)',
                                },
                            },
                            {
                                type: 'line',
                                start: ['min', 800],
                                end: ['max', 800],
                                text: {
                                    content: 'eeee',
                                    offsetY: -2,
                                    style: {
                                        textAlign: 'left',
                                        fontSize: 10,
                                        fill: 'rgba(44, 53, 66, 0.45)',
                                        textBaseline: 'bottom',
                                    },
                                },
                                style: {
                                    stroke: 'rgba(0, 0, 0, 0.55)',
                                },
                            },
                        ]}
                    />
                </Col>
                <Col span={12} >
                    <Row align={"middle"} style={{ height: "100%" }}>
                        <Space direction="vertical" size={"large"}>
                            <Space>
                                <Typography.Text type="secondary">
                                    Limites de nível superior:
                                </Typography.Text>

                                <Typography.Text >
                                    75; 85; 95.
                                </Typography.Text>
                            </Space>
                            <Space>
                                <Typography.Text type="secondary">
                                    Limites de nível inferior:
                                </Typography.Text>

                                <Typography.Text >
                                    25; 15; 5.
                                </Typography.Text>
                            </Space>
                        </Space>
                    </Row>
                </Col>
            </Row>,
            subTitle: <Space direction='vertical' size={"middle"} style={{ marginTop: 4 }}>
                <Space size={2} style={{ margin: 0 }} >
                    <Tag>Pivô 1</Tag>
                    <Tag>Pivô 2</Tag>
                    <Tag>Pivô 3</Tag>
                    <Tag>Pivô 4</Tag>
                    <Tag>Pivô 5</Tag>
                    <Tag>Pivô 6</Tag>
                </Space>
            </Space>
        },
    ];

    const defaultData = [
        {
            id: '1',
            name: 'Nome do grupo de alarmes',
            image:
                <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
            desc: <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Panel on
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Powered on after power fault and pressurized
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Dry mode after pause time
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Moving in dry mode
                    </Typography.Text>
                </Col>
            </Row>,
            subTitle: <Space direction='vertical' size={"middle"} style={{ marginTop: 4 }}>
                <Typography.Text type="secondary" style={{ fontWeight: 'lighter' }}>
                    {"18:00h > 06:00h"}
                </Typography.Text>
                <Space size={2} style={{ margin: 0 }} >
                    <Tag>Pivô 1</Tag>
                    <Tag>Pivô 2</Tag>
                    <Tag>Pivô 3</Tag>
                    <Tag>Pivô 4</Tag>
                    <Tag>Pivô 5</Tag>
                    <Tag>Pivô 6</Tag>
                </Space>
            </Space>
        },
        {
            id: '2',
            name: 'Nome do grupo de alarmes',
            image:
                <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
            desc: <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Panel on
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Powered on after power fault and pressurized
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Dry mode after pause time
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Moving in dry mode
                    </Typography.Text>
                </Col>
            </Row>,
            subTitle: <Space direction='vertical' size={"middle"} style={{ marginTop: 4 }}>
                <Typography.Text type="secondary" style={{ fontWeight: 'lighter' }}>
                    {"18:00h > 06:00h"}
                </Typography.Text>
                <Space size={2} style={{ margin: 0 }} >
                    <Tag>Pivô 1</Tag>
                    <Tag>Pivô 2</Tag>
                    <Tag>Pivô 3</Tag>
                    <Tag>Pivô 4</Tag>
                    <Tag>Pivô 5</Tag>
                    <Tag>Pivô 6</Tag>
                </Space>
            </Space>
        },
        {
            id: '3',
            name: 'Nome do grupo de alarmes',
            image:
                <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
            desc: <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Panel on
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Powered on after power fault and pressurized
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Dry mode after pause time
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Moving in dry mode
                    </Typography.Text>
                </Col>
            </Row>,
            subTitle: <Space direction='vertical' size={"middle"} style={{ marginTop: 4 }}>
                <Typography.Text type="secondary" style={{ fontWeight: 'lighter' }}>
                    {"18:00h > 06:00h"}
                </Typography.Text>
                <Space size={2} style={{ margin: 0 }} >
                    <Tag>Pivô 1</Tag>
                    <Tag>Pivô 2</Tag>
                    <Tag>Pivô 3</Tag>
                    <Tag>Pivô 4</Tag>
                    <Tag>Pivô 5</Tag>
                    <Tag>Pivô 6</Tag>
                </Space>
            </Space>
        },
        {
            id: '4',
            name: 'Nome do grupo de alarmes',
            image:
                <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
            desc: <Row gutter={[12, 4]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Panel on
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Powered on after power fault and pressurized
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Dry mode after pause time
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Typography.Text type="secondary">
                        Moving in dry mode
                    </Typography.Text>
                </Col>
            </Row>,
            subTitle: <Space direction='vertical' size={"middle"} style={{ marginTop: 4 }}>
                <Typography.Text type="secondary" style={{ fontWeight: 'lighter' }}>
                    {"18:00h > 06:00h"}
                </Typography.Text>
                <Space size={2} style={{ margin: 0 }} >
                    <Tag>Pivô 1</Tag>
                    <Tag>Pivô 2</Tag>
                    <Tag>Pivô 3</Tag>
                    <Tag>Pivô 4</Tag>
                    <Tag>Pivô 5</Tag>
                    <Tag>Pivô 6</Tag>
                </Space>
            </Space>
        },
    ];

    const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);
    const [dataSource2, setDataSource2] = useState<DataItem[]>(defaultData2);

    type DataItem = (typeof defaultData)[number];

    const className = useEmotionCss(({ token }) => {
        return {
            '.ant-pro-page-container-warp-page-header': {
                paddingBlockStart: '12px',
                paddingBlockEnd: '12px',
                paddingInlineStart: '40px',
                paddingInlineEnd: '40px',
                marginBottom: 24,
                background: 'white',
            },
            '.ant-pro-page-container-children-content': {
                [`@media screen and (max-width: ${token.screenXS}px)`]: {
                    paddingInline: '12px',
                },
                paddingInline: '40px',

            },
            '.ant-pro-steps-form-container': {
                minWidth: '0px',
                width: '700px',
                [`@media screen and (max-width: ${token.screenXS})`]: {
                    width: '100%',
                },
            },
            '.ant-pro-list-row-header-title': {
                flexDirection: 'column',
                alignItems: 'flex-start'
            }
        };
    })

    const tabs = [
        {
            id: 0,
            key: '0',
            label: 'Pivôs',
            children: <ProList<DataItem>
                expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                rowKey="id"
                size="large"
                headerTitle="Pivôs"
                dataSource={dataSource}
                showActions="hover"
                editable={{
                    onSave: async () => {
                        return true;
                    },
                }}
                onDataSourceChange={setDataSource}
                toolBarRender={() => {
                    return [
                        <AddPivotAlarmForm key="form-add-pivot-alarm" />,
                    ];
                }}
                metas={{
                    title: {
                        dataIndex: 'name',
                    },
                    avatar: {
                        dataIndex: 'image',
                        editable: false,
                    },
                    description: {
                        dataIndex: 'desc',
                    },
                    actions: {
                        render: () => [
                            <Button key="1-btn-" icon={<EditFilled />} />,
                            <Button key="2-btn-" icon={<DeleteFilled />} />,
                            <Switch key="1-swtich" />
                        ],
                    },
                    content: {
                        dataIndex: 'content',

                    },
                    subTitle: {
                        dataIndex: 'subTitle',
                    }
                }}
            />
        },
        {
            id: 1,
            key: '1',
            label: 'Monitores de pivôs',
            children: <ProList<DataItem>
                expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                rowKey="id"
                size="large"
                headerTitle="Monitores de Pivôs"
                dataSource={dataSource}
                showActions="hover"
                editable={{
                    onSave: async () => {
                        return true;
                    },
                }}
                onDataSourceChange={setDataSource}
                toolBarRender={() => {
                    return [
                        <AddPivotMonitorAlarmForm key="form-add-pivot-alarm" />,
                    ];
                }}
                metas={{
                    title: {
                        dataIndex: 'name',
                    },
                    avatar: {
                        dataIndex: 'image',
                        editable: false,
                    },
                    description: {
                        dataIndex: 'desc',
                    },
                    actions: {
                        render: () => [
                            <Button key="1-btn-" icon={<EditFilled />} />,
                            <Button key="2-btn-" icon={<DeleteFilled />} />,
                            <Switch key="1-swtich" />
                        ],
                    },
                    content: {
                        dataIndex: 'content',

                    },
                    subTitle: {
                        dataIndex: 'subTitle',
                    }
                }}
            />
        },
        {
            id: 2,
            key: '2',
            label: 'Bombas',
            children: <ProList<DataItem>
                expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                rowKey="id"
                size="large"
                headerTitle="Bombas"
                dataSource={dataSource}
                showActions="hover"
                editable={{
                    onSave: async () => {
                        return true;
                    },
                }}
                onDataSourceChange={setDataSource}
                toolBarRender={() => {
                    return [
                        <AddPivotMonitorAlarmForm key="form-add-pivot-alarm" />,
                    ];
                }}
                metas={{
                    title: {
                        dataIndex: 'name',
                    },
                    avatar: {
                        dataIndex: 'image',
                        editable: false,
                    },
                    description: {
                        dataIndex: 'desc',
                    },
                    actions: {
                        render: () => [
                            <Button key="1-btn-" icon={<EditFilled />} />,
                            <Button key="2-btn-" icon={<DeleteFilled />} />,
                            <Switch key="1-swtich" />
                        ],
                    },
                    content: {
                        dataIndex: 'content',

                    },
                    subTitle: {
                        dataIndex: 'subTitle',
                    }
                }}
            />
        },
        {
            id: 3,
            key: '3',
            label: 'Medidores de nível',
            children: <ProList<DataItem>
                expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                rowKey="id"
                size="large"
                headerTitle="Bombas"
                dataSource={dataSource2}
                showActions="hover"
                editable={{
                    onSave: async () => {
                        return true;
                    },
                }}
                onDataSourceChange={setDataSource2}
                toolBarRender={() => {
                    return [
                        <AddLevelGaugeForm key="form-add-pivot-alarm" />,
                    ];
                }}
                metas={{
                    title: {
                        dataIndex: 'name',
                    },
                    avatar: {
                        dataIndex: 'image',
                        editable: false,
                    },
                    description: {
                        dataIndex: 'desc',
                    },
                    actions: {
                        render: () => [
                            <Button key="1-btn-" icon={<EditFilled />} />,
                            <Button key="2-btn-" icon={<DeleteFilled />} />,
                            <Switch key="1-swtich" />
                        ],
                    },
                    content: {
                        dataIndex: 'content',

                    },
                    subTitle: {
                        dataIndex: 'subTitle',
                    }
                }}
            />
        },
        {
            id: 4,
            key: '4',
            label: 'Medidores de vazão',
            children: 'Medidores de vazão'
        },
        {
            id: 5,
            key: '5',
            label: 'Grupos de água',
            children: 'Grupos de água'
        },
        {
            id: 6,
            key: '6',
            label: 'Grupos de energia',
            children: 'Grupos de energia'
        },
        {
            id: 7,
            key: '7',
            label: 'Ordens de serviço',
            children: 'Ordens de serviço'
        },
        {
            id: 8,
            key: '8',
            label: 'Pluviômetros',
            children: 'Pluviômetros'
        },
        {
            id: 9,
            key: '9',
            label: 'Estações meteorológicas',
            children: 'Estações meteorológicas'
        },
    ]

    return (
        <div className={className}>
            <PageContainer
                breadcrumb={{
                    items: [
                        {
                            path: '',
                            title: 'Notifications',
                        },
                    ],
                }}
                content="Irure ipsum quis cillum magna consequat consectetur minim nostrud ipsum id ex cillum exercitation deserunt."
            >
                <ProCard>
                    <Tabs
                        defaultActiveKey="0"
                        tabPosition={"left"}
                        style={{ maxHeight: '100vh' }}
                        items={tabs as any}
                    >

                    </Tabs>
                </ProCard>
            </PageContainer>
        </div>
    );
}

export default NoFoundPage;
