import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { CalendarOutlined, CaretDownOutlined, EditFilled, PlusCircleFilled, RedoOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Col, Divider, Row, Select, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, } from 'react';
import { connect } from 'umi';
import { Link, useParams } from '@umijs/max'
import WithConnection from '../WithConnection';
import { BsCloudRainFill } from "react-icons/bs";

type Props = {
    dispatch: any;
    pivot: GetPivotModelProps;
    farm: GetFarmModelProps;
}

const PivotList: React.FC<Props> = (props) => {
    const params = useParams()
    useEffect(() => {
        props.dispatch({
            type: 'pivot/queryPivot',
            payload: { id: parseInt(params.id as string) }
        })
    }, [params])

    const classNameScrollable = useEmotionCss(({ }) => {
        return {
            maxHeight: '63vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            [`.ant-list-item`]: {
                paddingLeft: '12px !important;',
            },
            ['.ant-pro-list-row-content']: {
                marginInline: 0
            },
            position: 'relative'
        };
    });

    const classNameSelect = useEmotionCss(() => {
        return {
            ".ant-select-selection-item": {
                fontWeight: 700,
                fontSize: 19,
                paddingInlineEnd: "35px !important"

            },
            ".ant-select-selector": {
                padding: "0 !important",
            },
            ".ant-select-arrow": {
                color: 'black',
                fontSize: 20
            }, 
        };
    });

    const className = useEmotionCss(({ }) => {
        return {
            [`.ant-pro-card-body`]: {
                paddingInline: '0px !important',
            },
        };
    });



    const dataSource = [
        {
            title: 'Pivô 1',
        },
        {
            title: 'Pivô 2',
        },
        {
            title: 'Pivô 3',
        },
        {
            title: 'Pivô 4',
        },
    ];

    return (
        <div className={className}>
            <Row justify="space-between" align="middle" style={{ padding: "0px 16px", }} >
                <Col >
                    <Space size="small">
                        <WithConnection />
                        <Select

                            className={classNameSelect}
                            suffixIcon={<CaretDownOutlined />}
                            bordered={false}
                            showSearch
                            value={props.farm.selectedFarm?.name?.toString()}
                            size="large"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            onChange={() => { }}
                            options={props.farm.result.list?.map(item => ({ value: item.id, label: item.name }))}
                        />
                    </Space>
                </Col>
                <Col >
                    <Link to="/edit/farm">
                        <Tooltip title="Editar Fazenda"><EditFilled style={{ fontSize: 18 }} /></Tooltip>
                    </Link>
                </Col>
            </Row>
            <Divider />
            <Row align="middle" style={{ padding: "0px 12px", width: '100%' }}>
                <Col xs={24}>
                    <Select showSearch placeholder="Ex: Pivo 1" size="large" style={{ width: '100%' }} />
                </Col>
                <Col>

                </Col>
            </Row>
            <Divider style={{ marginBottom: 0 }} />
            <div className={classNameScrollable}  >
                <ProList<{ title: string }>
                    itemLayout="vertical"
                    rowKey="id"
                    style={{ paddingBottom: 0, marginBottom: 0 }}
                    dataSource={dataSource}
                    metas={{
                        title: {},
                        description: {
                            render: () => (
                                <>
                                    <Tag color="#2db7f5" >V5</Tag>
                                    <Tag color="#f50">Sem Comunicação</Tag>
                                </>
                            ),
                        },
                        content: {
                            render: () => {
                                return (
                                    <Space direction='vertical'>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <Tooltip title="Pluviometro"><BsCloudRainFill style={{ fontSize: 20 }} /> </Tooltip> 0 mm
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <Tooltip title="Ângulo"><RedoOutlined style={{ fontSize: 20 }} /> </Tooltip> 199°
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <Tooltip title="Última Conexão"><CalendarOutlined style={{ fontSize: 20 }} /> </Tooltip> 22 mar 13:00
                                        </span>
                                    </Space>
                                );
                            },
                        },
                    }}
                />
            </div>
            <Row justify="center" style={{ marginTop: -45 }}>
                <Col>
                    <Button
                        size="large"
                        type="primary"
                        icon={<PlusCircleFilled />}>
                        Cadastrar Equipamento
                    </Button>
                </Col>
            </Row>
        </div  >
    )
}

export default connect(({ pivot, farm }: { pivot: any, farm: any }) => ({
    pivot, farm
}))(PivotList);

