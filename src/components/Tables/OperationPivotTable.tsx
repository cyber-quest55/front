import { queryPivotInformation, GetPivotInformationModelProps } from "@/models/pivot-information";
import { ActionType, ProColumns, ProTable, TableDropdown } from "@ant-design/pro-components";
import { useIntl } from "@umijs/max";
import { useMount } from "ahooks";
import { Tag } from "antd";
import { useRef } from "react";
import { connect } from 'umi';

export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};


type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

interface OperationPivotTableProps {
    queryPivotInformation: typeof queryPivotInformation;
    pivotInformation: GetPivotInformationModelProps
}

const OperationPivotTable: React.FC<OperationPivotTableProps> = (props) => {
    const intl = useIntl();
    const actionRef = useRef<ActionType>();

    useMount(() => {
        queryPivotInformation({ id: 1, params: {} })
    })

    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: intl.formatMessage({ id: 'component.operations.table.col.1' }),
            dataIndex: 'name',
            ellipsis: true,
        },
        {
            disable: true,
            title: intl.formatMessage({ id: 'component.operations.table.col.2' }),
            dataIndex: 'type',
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                all: { text: '超长'.repeat(50) },
                "Simple Irrigation": {
                    text: 'Ligado',
                    status: 'Error',
                },
                closed: {
                    text: '已解决',
                    status: 'Success',
                    disabled: true,
                },
                processing: {
                    text: '解决中',
                    status: 'Processing',
                },
            },
        },
        {
            disable: true,
            title: intl.formatMessage({ id: 'component.operations.table.col.3' }),
            dataIndex: 'status',
            search: false,
            renderFormItem: (_, { defaultRender }) => {
                return defaultRender(_);
            },
            render: (value: any, record) => (

                <Tag color={value?.color} key={value.name}>
                    {value?.name}
                </Tag>

            ),
        },
        {
            disable: true,
            title: intl.formatMessage({ id: 'component.operations.table.col.4' }),
            dataIndex: 'lastComunication',
            search: false,


        },
        {
            title: intl.formatMessage({ id: 'component.operations.table.col.5' }),
            key: 'showTime',
            dataIndex: 'pressure',
            hideInSearch: true,
            render: (value) => {
                return <>
                    {value} bar
                </>
            }
        },
        {
            title: intl.formatMessage({ id: 'component.operations.table.col.6' }),
            dataIndex: 'angle',

            render: (value) => {
                return <>
                    {value}°
                </>
            }
        },
        {
            title: intl.formatMessage({ id: 'component.operations.table.col.7' }),
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [

                <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                    Parar
                </a>,
                <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                    Iniciar
                </a>,
                <TableDropdown
                    key="actionGroup"
                    onSelect={() => action?.reload()}
                    menus={[
                        { key: 'edit', name: 'Edit' },
                        { key: 'delete', name: 'Delete' },
                    ]}
                />,
            ],
        },
    ];

    return <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
            await waitTime(2000);
            const value = [
                {
                    name: 'Pivot 1',
                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: 'magenta' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 2',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: 'magenta' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 3',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: 'gold' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 4',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: 'volcano' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 5',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: 'cyan' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 6',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: 'geekblue' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 7',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: '#000' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 8',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: 'geekblue' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 9',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: '#000' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
                {
                    name: 'Pivot 10',

                    type: 'Simple Irrigation',
                    status: { name: 'Command', color: '#000' },
                    lastComunication: '2024-01-01',
                    angle: 90,
                    pressure: 12,
                },
            ]
            return {
                data: value,
                success: true,
                total: value.length,
                page: 3,
            } as any;
        }}
        editable={{
            type: 'multiple',
        }}
        columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            defaultValue: {
                option: { fixed: 'right', disable: true },
            },
            onChange(value) {
                console.log('value: ', value);
            },
        }}
        rowKey="id"
        search={{
            labelWidth: 'auto',
        }}
        options={{
            setting: {
                listsHeight: 400,
            },
        }}
        pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"

    />
}

const mapStateToProps = ({
    pivotInformation,
}: any) => ({
    pivotInformation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    queryPivotInformation: (props: any) => dispatch(queryPivotInformation(props)),

});

export default connect(mapStateToProps, mapDispatchToProps)(OperationPivotTable);


