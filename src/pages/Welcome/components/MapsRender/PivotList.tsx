import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { ProList } from '@ant-design/pro-components';
import { Tag, Tooltip } from 'antd';
import { ReactText, useEffect, useState } from 'react';
import { connect } from 'umi';

type Props = {
    dispatch: any;
    pivot: GetPivotModelProps;
    farm: GetFarmModelProps;
}

const PivotList: React.FC<Props> = (props) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);

    useEffect(() => {
        props.dispatch({
            type: 'pivot/queryPivot',
            payload: {}
        })
    }, [props.farm.selectedFarm])

    const formatedData = props.pivot.result?.list?.map((item) => ({
        title: item.name,
        subTitle: <Tooltip title="Status"><Tag>Parado</Tag></Tooltip>,
        description: (
            <div>
              <div>version : {item.protocol}</div>
              <div>inline 标题字体是 normal</div>
              <div>new 会有一个入场动画</div>
            </div>
          ),
    }))

    return (
        <ProList<any>
            loading={props.pivot.loading}
            rowKey="title"
            style={{ width: '100%', margin: 0, padding: 0 }}
            dataSource={formatedData}
            metas={{
                title: { }, 
                subTitle: { }, 
                description: {}
            }}
            expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
        />
    )
}

export default connect(({ pivot, farm }: { pivot: any, farm: any }) => ({
    pivot, farm
}))(PivotList);

