
import AddPivotAlarmForm from '@/components/Forms/AddAlarmForm/Pivot';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size'
import AlarmPivotList from '@/components/Lists/Alarm/AlarmPivotList';
import AlarmPivotMonitorList from '@/components/Lists/Alarm/AlarmPivotMonitorList';
import AddPivotMonitorAlarmForm from '@/components/Forms/AddAlarmForm/PivotMonitor';
import AlarmPumpList from '@/components/Lists/Alarm/PumpList';
import AddPumpAlarmForm from '@/components/Forms/AddAlarmForm/Pumps';
import LevelGaugeList from '@/components/Lists/Alarm/LevelGaugeList';
import AddLevelGaugeForm from '@/components/Forms/AddAlarmForm/LevelGauge';
import FlowMetterList from '@/components/Lists/Alarm/FlowMetterList';
import WaterGroupList from '@/components/Lists/Alarm/WaterGroupList';
import WaterGroupForm from '@/components/Forms/AddAlarmForm/WaterGroup';

const NoFoundPage: React.FC = () => {
    const onlyWidth = useWindowWidth()

    const defaultData = [
        {
            id: '1',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: [
                'Panel on',
                'Powered on after power fault and pressurized',
                'Dry mode after pause time',
                'Moving in dry mode'
            ],
            subTitle: {
                date: "18:00h > 06:00h",
                pivotList: [
                    'Pivô 1',
                    'Pivô 2',
                    'Pivô 3',
                    'Pivô 4',
                ]
            },
        },
        {
            id: '2',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: [
                'Panel on',
                'Powered on after power fault and pressurized',
                'Dry mode after pause time',
                'Moving in dry mode'
            ],
            subTitle: {
                date: "18:00h > 06:00h",
                pivotList: [
                    'Pivô 1',
                    'Pivô 2',
                    'Pivô 3',
                    'Pivô 4',
                ]
            },
        },
        {
            id: '3',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: [
                'Panel on',
                'Powered on after power fault and pressurized',
                'Dry mode after pause time',
                'Moving in dry mode'
            ],
            subTitle: {
                date: "18:00h > 06:00h",
                pivotList: [
                    'Pivô 1',
                    'Pivô 2',
                    'Pivô 3',
                    'Pivô 4',
                ]
            },
        },
        {
            id: '4',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: [
                'Panel on',
                'Powered on after power fault and pressurized',
                'Dry mode after pause time',
                'Moving in dry mode'
            ],
            subTitle: {
                date: "18:00h > 06:00h",
                pivotList: [
                    'Pivô 1',
                    'Pivô 2',
                    'Pivô 3',
                    'Pivô 4',
                ]
            },
        },
    ];

    const defaultData2 = [
        {
            id: '1',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                graph: {},
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Medidor 1',
                    'Medidor 2',
                    'Medidor 3',
                    'Medidor 4',
                ]
            },
        },
        {
            id: '2',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                graph: {},
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                date: "18:00h > 06:00h",
                pivotList: [
                    'Medidor 1',
                    'Medidor 2',
                    'Medidor 3',
                    'Medidor 4',
                ]
            },
        },
        {
            id: '3',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                graph: {},
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                date: "18:00h > 06:00h",
                pivotList: [
                    'Medidor 1',
                    'Medidor 2',
                    'Medidor 3',
                    'Medidor 4',
                ]
            },
        },
        {
            id: '4',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                graph: {},
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                date: "18:00h > 06:00h",
                pivotList: [
                    'Medidor 1',
                    'Medidor 2',
                    'Medidor 3',
                    'Medidor 4',
                ]
            },
        },
    ];

    const defaultData3 = [
        {
            id: '1',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Medidor 1',
                    'Medidor 2',
                    'Medidor 3',
                    'Medidor 4',
                ]
            },
        },
        {
            id: '2',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Medidor 1',
                    'Medidor 2',
                    'Medidor 3',
                    'Medidor 4',
                ]
            },
        },
        {
            id: '3',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Medidor 1',
                    'Medidor 2',
                    'Medidor 3',
                    'Medidor 4',
                ]
            },
        },
        {
            id: '4',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Medidor 1',
                    'Medidor 2',
                    'Medidor 3',
                    'Medidor 4',
                ]
            },
        },
    ];

    const defaultData4 = [
        {
            id: '1',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Grupo de Água 1',
                    'Grupo de Água 2',
                    'Grupo de Água 3',
                    'Grupo de Água 4',
                ]
            },
        },
        {
            id: '2',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Grupo de Água 1',
                    'Grupo de Água 2',
                    'Grupo de Água 3',
                    'Grupo de Água 4',
                ]
            },
        },
        {
            id: '3',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Grupo de Água 1',
                    'Grupo de Água 2',
                    'Grupo de Água 3',
                    'Grupo de Água 4',
                ]
            },
        },
        {
            id: '4',
            name: 'Nome do grupo de alarmes',
            image: '',
            description: {
                value: [{
                    key: 'Limites de nível superior:',
                    value: '75; 85; 95'
                }]
            },
            subTitle: {
                pivotList: [
                    'Grupo de Água 1',
                    'Grupo de Água 2',
                    'Grupo de Água 3',
                    'Grupo de Água 4',
                ]
            },
        },
    ];

    const [dataSource] = useState<DataItem[]>(defaultData);
    const [dataSource2] = useState(defaultData2);
    const [dataSource3] = useState(defaultData3);
    const [dataSource4] = useState(defaultData4);

    type DataItem = (typeof defaultData)[number];

    const className = useEmotionCss(({ token }) => {
        return {
            '.ant-pro-page-container-warp-page-header': {
                paddingBlockStart: '12px',
                paddingBlockEnd: '12px',
                paddingInlineStart: '40px',
                paddingInlineEnd: '40px',
                background: 'white',
                marginBottom: 24,
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
        };
    })

    const tabs = [
        {
            id: 0,
            key: '0',
            label: 'Pivôs',
            children: <AlarmPivotList
                title="Pivôs"
                dataSource={dataSource}
                form={<AddPivotAlarmForm />}
                size="large"
            />
        },
        {
            id: 1,
            key: '1',
            label: 'Monitores de Pivôs',
            children: <AlarmPivotMonitorList
                title="Monitores de Pivôs"
                dataSource={dataSource}
                form={<AddPivotMonitorAlarmForm />}
                size="large"
            />
        },
        {
            id: 2,
            key: '2',
            label: 'Bombas',
            children: <AlarmPumpList
                title="Bombas"
                dataSource={dataSource}
                form={<AddPumpAlarmForm />}
                size="large"
            />
        },
        {
            id: 3,
            key: '3',
            label: 'Medidores de Nível',
            children: <LevelGaugeList
                title="Medidores de Nível"
                dataSource={dataSource2}
                form={<AddLevelGaugeForm />}
                size="large"
            />
        },
        {
            id: 4,
            key: '4',
            label: 'Medidores de Vazão',
            children: <FlowMetterList
                title="Medidores de Vazão"
                dataSource={dataSource3}
                form={<AddLevelGaugeForm />}
                size="large"
            />
        },
        {
            id: 5,
            key: '5',
            label: 'Grupos de Água',
            children: <WaterGroupList
                title="Grupos de Água"
                dataSource={dataSource4}
                form={<WaterGroupForm />}
                size="large"
            />
        },
        {
            id: 6,
            key: '6',
            label: 'Grupos de energia',
            children: 'Grupos de energia',
            
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
                        tabPosition={onlyWidth > 1100 ? "left" : "top"}
                        style={{ maxHeight: onlyWidth > 1100 ? '100vh' : '100%' }}
                        items={tabs as any}
                    >

                    </Tabs>
                </ProCard>
            </PageContainer>
        </div>
    );
}

export default NoFoundPage;
