import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Col, Row, Skeleton } from 'antd';

type Props = {
  type: 'mobile' | 'web';
};

const RegisterSkeleton: React.FC<Props> = (props) => {
  const { type } = props;

  const formClassName = useEmotionCss(({}) => {
    return {
      width: type === 'web' ? '465px' : '100%',
    };
  });

  return (
    <div className={formClassName}>
      <ProCard title={<Skeleton.Input />}>
        <Row gutter={[12, 16]}>
          <Col span={24}>
            <Skeleton.Input />
          </Col>
          <Col span={24}>
            <Skeleton.Input />
          </Col>
          <Col span={24}>
            <Skeleton.Input />
          </Col>
          <Col md={24} lg={12}>
            <Skeleton.Input />
          </Col>
          <Col md={24} lg={12}>
            <Skeleton.Input />
          </Col>
          <Col span={24}>
            <Skeleton.Input />
          </Col>
          <Col md={24} lg={12}>
            <Skeleton.Input />
          </Col>
          <Col md={24} lg={12}>
            <Skeleton.Input />
          </Col>
          <Col span={24}>
            <Row justify={'end'}>
              <Col>
                <Skeleton.Input />
              </Col>
            </Row>
          </Col>
        </Row>
      </ProCard>
    </div>
  );
};

export { RegisterSkeleton };
