
import { BellOutlined,  DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Space, Tabs, Tag, Switch, Typography } from 'antd';
import React, { useState } from 'react';

const defaultData = [
    {
        id: '1',
        name: 'Nome do grupo de alarmes',
        image:
            <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
        desc: <Space direction='vertical' size={"middle"}>
            <Typography.Text type="secondary" style={{ marginTop: 4 }}>
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
            <Tag color='blue'>Ver razões</Tag>
        </Space>,
    },
    {
        id: '2',
        name: 'Nome do grupo de alarmes',
        image:
            <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
        desc: <Space direction='vertical' size={"middle"}>

            <Typography.Text type="secondary" style={{ marginTop: 4 }}>
                {"18:00h > 06:00h"}
            </Typography.Text>
            <Space size={2} style={{ margin: 0 }} >
                <Tag color="green">Todos os Pivôs</Tag>
            </Space>
            <Tag color='blue'>Ver razões</Tag>
        </Space>,
    },
    {
        id: '3',
        name: 'Nome do grupo de alarmes',
        image:
            <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
        desc: <Space direction='vertical' size={"middle"}>

            <Typography.Text type="secondary" style={{ marginTop: 4 }}>
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
            <Tag color='blue'>Ver razões</Tag>
        </Space>,
    },
    {
        id: '4',
        name: 'Nome do grupo de alarmes',
        image:
            <BellOutlined style={{ fontSize: 22 }}></BellOutlined>,
        desc: <Space direction='vertical' size={"middle"}>

            <Typography.Text type="secondary" style={{ marginTop: 4 }}>
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
            <Tag color='blue'>Ver razões</Tag>
        </Space>,
    },
];

type DataItem = (typeof defaultData)[number];

const NoFoundPage: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);

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
            }
        };
    })

    const tabs = [
        {
            id: 0,
            key: '0',
            label: 'Pivôs',
            children: <ProList<DataItem> 
            
                rowKey="id"
                size="large"
                headerTitle="Pivôs"
                dataSource={dataSource}
                showActions="hover"
                editable={{
                    onSave: async (key, record, originRow) => {
                        console.log(key, record, originRow);
                        return true;
                    },
                }}
                onDataSourceChange={setDataSource}
                toolBarRender={() => {
                    return [
                        <Button size='large' key="add" type="primary">
                            <PlusCircleFilled></PlusCircleFilled> Adicionar Alarme
                        </Button>,
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
                        render: ( ) => [
                            <Button key="1-btn-" icon={<EditFilled />} />,
                            <Button key="2-btn-" icon={<DeleteFilled />} />,
                            <Switch key="1-swtich" />
                        ],
                    },
                }}
            />
        },
        {
            id: 1,
            key: '1',
            label: 'Monitores de pivôs',
            children: 'Monitores de pivôs'
        },
        {
            id: 2,
            key: '2',
            label: 'Bombas',
            children: 'Bombas'
        },
        {
            id: 3,
            key: '3',
            label: 'Medidores de nível',
            children: 'Medidores de nível'
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
