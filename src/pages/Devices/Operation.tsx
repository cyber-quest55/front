import AddDeviceFormContainer from '@/components/Forms/AddDeviceForm/AddDeviceFormContainer';
import PivotOperationList from '@/components/Lists/Operation/PivotOperationList';
import { PageContainer, ProFormSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';
import { connect } from 'umi';


const Operation: React.FC = (props: any) => {
    const intl = useIntl();

    return (
        <PageContainer

            header={{
                ghost: true,
                breadcrumb: {
                    items: [
                        {
                            path: '',
                            title: 'Admin',
                        },
                        {
                            path: '',
                            title: 'Operations',
                        },
                    ],
                },
                extra: [
                    <ProFormSelect
                        key="1"
                        name="select-multiple"
                        formItemProps={{ noStyle: true }}
                        options={props.farm.result.map(item => ({
                            value: item.id,
                            label: item.name
                        }))}
                        fieldProps={{
                            mode: 'multiple',
                            style: { width: 250 }
                        }}
                        placeholder="Please select favorite colors"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your favorite colors!',
                                type: 'array',
                            },
                        ]}
                    />,
                    <AddDeviceFormContainer
                        key="button-add-2"
                        base={(props.selectedFarm as any)?.base?.radio_id}
                        buttonProps = {{size: 'default'}}
                    />,
                ],
            }}
            tabList={[
                {
                    tab: intl.formatMessage({ id: 'pages.devices.operations.tab.1' }),
                    key: '1',
                    closable: false,
                },
                {
                    tab: intl.formatMessage({ id: 'pages.devices.operations.tab.2' }),
                    key: '2',
                    closable: false,
                },
                {
                    tab: intl.formatMessage({ id: 'pages.devices.operations.tab.3' }),
                    key: '3',
                    closable: false,
                },
                {
                    tab: intl.formatMessage({ id: 'pages.devices.operations.tab.4' }),
                    key: '4',
                    closable: false,
                },
                {
                    tab: intl.formatMessage({ id: 'pages.devices.operations.tab.5' }),
                    key: '5',
                    closable: false,
                },
            ]}
            tabProps={{
                type: 'editable-card',
                hideAdd: true,
                onEdit: (e, action) => console.log(e, action),
            }}

        >
            <PivotOperationList />
        </PageContainer>
    );
};

const mapStateToProps = ({
    pivotInformation,
    farm,
}: any) => ({
    pivotInformation,
    farm
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Operation);

