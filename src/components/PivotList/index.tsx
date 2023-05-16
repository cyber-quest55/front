import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { CaretDownOutlined, EditFilled, RedoOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Col, Divider, Row, Select, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, } from 'react';
import { connect } from 'umi';
import { Link, useParams, history } from '@umijs/max'
import WithConnection from '../WithConnection';
import { BsCloudRainFill } from "react-icons/bs";
import { useMount } from 'ahooks';
import AddDeviceForm from '../Forms/AddDeviceForm';

type Props = {
    dispatch: any;
    pivot: GetPivotModelProps;
    farm: GetFarmModelProps;
}

const PivotList: React.FC<Props> = (props) => {
    const params = useParams()

    useMount(() => {
        if (!props.farm.loaded)
            props.dispatch({
                type: 'farm/queryFarm',
                payload: { id: params.id }
            })
    })

    useEffect(() => {
        if (props.farm.loaded)
            if (params.id === ':id') {
                history.push(`${props.farm.result.list[0].id}`)
                return
            }

        const selectedFarm = props.farm.result?.list?.find(f =>
            f.id === parseInt(params.id as string)
        )

        if (props.farm.loaded)
            if (!selectedFarm) {
                // history.push(`/404`)
            }
    }, [props.farm])

    useEffect(() => {
        const selectedFarm = props.farm.result?.list?.find(f =>
            f.id === parseInt(params.id as string)
        )

        props.dispatch({
            type: 'farm/setSelectedFarm',
            payload: selectedFarm
        })

        props.dispatch({
            type: 'pivot/queryPivot',
            payload: { id: parseInt(params.id as string) }
        })
    }, [params])

    const classNameScrollable = useEmotionCss(({ }) => {
        return {
            maxHeight: 'calc(100vh - 350px)',
            [`@media screen and (max-width: 762px)`]: {
                maxHeight: 'calc(100vh - 283px)',
                height: '100vh',
            },
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
            '.ant-pro-list-row-title': {
                width: '100%'
            },
            '.ant-list-item .ant-list-item-meta': {
                marginBlockEnd: 0
            }
        };
    });

    const dataSource = [
        {
            title: <Row justify="space-between" style={{ width: '100%', }}>
                <Col>
                    <span>Pivô 1</span>

                </Col>
                <Col>
                    <Tag color="#2db7f5" >V5</Tag>
                    <Tag color="#f50">Sem Comunicação</Tag>
                </Col>
            </Row>,
        },
        {
            title: <Row justify="space-between" style={{ width: '100%', }}>
                <Col>
                    <span>Pivô 2</span>

                </Col>
                <Col>
                    <Tag color="#2db7f5" >V5</Tag>
                    <Tag color="#f50">Sem Comunicação</Tag>
                </Col>
            </Row>,
        },
        {
            title: <Row justify="space-between" style={{ width: '100%', }}>
                <Col>
                    <span>Pivô 3</span>

                </Col>
                <Col>
                    <Tag color="#2db7f5" >V5</Tag>
                    <Tag color="#f50">Sem Comunicação</Tag>
                </Col>
            </Row>,
        },
        {
            title: <Row justify="space-between" style={{ width: '100%' }}>
                <Col>
                    <span>Pivô 4</span>

                </Col>
                <Col>
                    <Tag color="#2db7f5" >V5</Tag>
                    <Tag color="#f50">Sem Comunicação</Tag>
                </Col>
            </Row>,
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
                            onChange={(e) => {
                                history.push(e.toString())
                            }}
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
                <ProList<any>
                    itemLayout="vertical"
                    rowKey="id"
                    style={{ paddingBottom: 0, marginBottom: 0 }}
                    dataSource={dataSource}
                    metas={{
                        title: {},
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
                                        <Typography.Text type='secondary'>
                                            22 mar 13:00
                                        </Typography.Text>
                                    </Space>
                                );
                            },
                        },
                    }}
                />
            </div>
            <Row justify="center" style={{ marginTop: -45 }}>
                <Col>
                    <AddDeviceForm />
                </Col>
            </Row>
        </div  >
    )
}

export default connect(({ pivot, farm }: { pivot: any, farm: any }) => ({
    pivot, farm
}))(PivotList);

