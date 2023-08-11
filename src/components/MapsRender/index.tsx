import PivotList from '@/components/PivotList';
import RenderPivots from '@/components/RenderPivots';
import { useScreenHook } from '@/hooks/screen';
import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
;
import { Spin, Tabs } from 'antd';
import { connect } from 'dva';
import { FunctionComponent, ReactNode } from 'react';

type Props = {
  dispatch?: any;
  children: ReactNode;
  google?: any;
  pivot: GetPivotModelProps;
  farm: GetFarmModelProps;
};

const MapsRender: FunctionComponent<Props> = (props) => {
  const { xl } = useScreenHook();

  const className = useEmotionCss(({}) => {
    return {
      position: 'absolute',
      width: 400,
      top: 65,
      left: 45,
      padding: 0,
      [`.ant-pro-card-body`]: {
        paddingInline: '0px !important',
      },
    };
  });

  const classNameFixedMobile = useEmotionCss(({}) => {
    return {
      height: 65,
      width: '100%',
      background: 'white',
      zIndex: 3,
      ['.ant-tabs-nav-wrap']: {
        justifyContent: 'center',
      },
    };
  });

  const items: any[] = [
    {
      key: '1',
      label: `Tab 1`,
      children: (
        <Spin spinning={false}>
          <div style={{ width: '100%', height: ' calc(100vh - 56px - 60px)' }}>
             <RenderPivots /> 
          </div>
        </Spin>
      ),
    },
    {
      key: '2',
      label: `Tab 2`,
      children: (
        <ProCard className={className}>
          <PivotList />
        </ProCard>
      ),
    },
    {
      key: '3',
      label: `Tab 3`,
    },
  ];

  return (
    <>
      {xl ? (
        <Spin spinning={props.pivot.loading || props.farm.loading}>
          <div style={{ width: '100%', height: ' 100vh' }}>
            <RenderPivots />
          </div>
          <ProCard className={className}>
            <PivotList />
          </ProCard>
        </Spin>
      ) : null}

      {xl ? null : (
        <div className={classNameFixedMobile}>
          <Tabs defaultActiveKey="1" items={items} tabPosition="bottom" />
        </div>
      )}
    </>
  );
};

export default connect(({ pivot, farm }: { pivot: any; farm: any }) => ({
  pivot,
  farm,
}))(MapsRender);
