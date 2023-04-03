import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { FieldTimeOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Space, Tag, Tooltip } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';

type Props = {
    dispatch: any;
    pivot: GetPivotModelProps;
    farm: GetFarmModelProps;
}

const PivotList: React.FC<Props> = (props) => {

    useEffect(() => {
        props.dispatch({
            type: 'pivot/queryPivot',
            payload: {}
        })
    }, [props.farm.selectedFarm])

    const className = useEmotionCss(({ }) => {
        return {
            [`.ant-pro-card-body`]: {
                'padding-inline': '0px !important',
            },
        };
    });

    const iconPivot = useEmotionCss(({  token }) => {
        return {
            'font-size': 22,
            color: token.colorPrimary
        };
    });

    const renderColumn = (
        <Space>
            <Tooltip title="Status"><Tag>Parado</Tag></Tooltip>
            <Tooltip title="Versão"><Tag>V5</Tag></Tooltip>
            <Tooltip title="Último Functionamento"><Tag>23 Mar 14:14</Tag></Tooltip>
        </Space>
    )

    const formatedData = props.pivot.result?.list?.map((item) => ({
        title: item.name,
        avatar: <FieldTimeOutlined className={iconPivot}/>,
        subTitle: renderColumn,
    }))

    return (
        <div className={className}>
            <ProList<any>
                loading={props.pivot.loading}
                rowKey="title"
                style={{ width: '100%' }}
                dataSource={formatedData}
                metas={{
                    avatar: {},
                    title: {},
                    subTitle: {}, 
                }}
            />
        </div>
    )
}

export default connect(({ pivot, farm }: { pivot: any, farm: any }) => ({
    pivot, farm
}))(PivotList);

