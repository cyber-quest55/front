import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { CalendarOutlined, EditFilled, PlusCircleFilled, RedoOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Col, Divider, Row, Select, Space, Spin, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect } from 'react';
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
        console.log('aqui')
        props.dispatch({
            type: 'pivot/queryPivot',
            payload: { id: parseInt(params.id as string) }
        })
    }, [params])

    const classNameScrollable = useEmotionCss(({ }) => {
        return {
            maxHeight: '70vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            [`.ant-list-item`]: {
                paddingLeft: '12px !important;',
            },
            ['.ant-pro-list-row-content']: {
                marginInline: 0
            }
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
        <Spin spinning={props.pivot.loading} className={className}>
            <Row justify="center" align="middle" gutter={[25, 10]}  >
                <Col ><Typography.Title level={5} style={{ margin: 0 }} >{props.farm.selectedFarm?.name}</Typography.Title ></Col>
                <Col >
                    <Link to="/edit/farm">
                        <Tooltip title="Editar Fazenda"><EditFilled style={{ fontSize: 18 }} /></Tooltip>
                    </Link>
                </Col>
            </Row>
            <Divider />
            <Row justify="space-between" align="middle" style={{ padding: "0px 12px", width: '100%' }}>
                <Col>
                    <Select showSearch placeholder="Ex: Pivo 1" size="large" style={{ width: '320px' }} />
                </Col>
                <Col>
                    <WithConnection />
                </Col>
            </Row>
            <Divider style={{ marginBottom: 0 }} />
            <section className={classNameScrollable}>
                <Row justify="center" align="middle" style={{ padding: "0px 12px", paddingTop: 24, width: '100%' }}>
                    <Col>
                        <Button size="large" type="primary" icon={<PlusCircleFilled />}> Cadastrar Equipamento</Button>
                    </Col>
                </Row>
                <Divider style={{ marginBottom: 0 }} />
                <ProList<{ title: string }>
                    itemLayout="vertical"
                    rowKey="id"
                    dataSource={dataSource}
                    metas={{
                        title: {},
                        description: {
                            render: () => (
                                <>
                                    <Tag color="geekblue" >V5</Tag>
                                    <Tag color="red">Sem Comunicação</Tag>
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
            </section>
        </Spin  >
    )
}

export default connect(({ pivot, farm }: { pivot: any, farm: any }) => ({
    pivot, farm
}))(PivotList);

