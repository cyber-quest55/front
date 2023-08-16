import DeviceList from '@/components/DeviceList';
import RenderDotDevices from '@/components/RenderDotDevices';
import { useScreenHook } from '@/hooks/screen';
import { GetFarmModelProps } from '@/models/farm';
import { GetPivotModelProps } from '@/models/pivot';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Col, Row, Spin, Tabs } from 'antd';
import { connect } from 'dva';
import { FunctionComponent, ReactNode } from 'react';

type Props = {
  dispatch?: any;
  children: ReactNode;
  google?: any;
  pivot: GetPivotModelProps;
  farm: GetFarmModelProps;
};

const Devices: FunctionComponent<Props> = (props) => {
  const { md } = useScreenHook();

  const className = useEmotionCss(({}) => {
    return md
      ? {
          position: 'absolute',
          width: 400,
          top: 10,
          left: 45,
          padding: 0,
          [`.ant-pro-card-body`]: {
            paddingInline: '0px !important',
          },
        }
      : {
          width: '100%',
          minHeight: '150px',
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
      ['.ant-tabs-nav']: {
        background: 'white',
        zIndex: '5',
        marginTop: '0px',
      },
    };
  });

  const items = [
    {
      key: '1',
      label: `Tab 1`,
      children: (
        <Spin spinning={false}>
          <div style={{ width: '100%', height: 'calc(100vh - 102px)' }}>
            <RenderDotDevices />
          </div>
        </Spin>
      ),
    },
    {
      key: '2',
      label: `Tab 2`,
      children: (
        <ProCard className={className}>
          <DeviceList />
        </ProCard>
      ),
    },
  ];

  return (
    <Row>
      <Col
        xs={24}
        style={{
          height: md ? '100vh' : 'calc(100vh - 56px - 60px)',
          position: 'relative',
        }}
      >
        <>
          {md ? (
            <Spin spinning={props.pivot.loading || props.farm.loading}>
              <div style={{ width: '100%', height: '100vh' }}>
                <RenderDotDevices />
              </div>
              <ProCard className={className}>
                <DeviceList />
              </ProCard>
              {/***
                 <ProCard
              className={legendClassName}
              title="Dispositivos"
            >
             
              <Space direction="vertical" size="middle">
                <Space direction="vertical">
                  <Space>
                    <CodeSandboxOutlined style={{ fontSize: 20 }} />
                    <Typography.Text> Central encontrada </Typography.Text>
                  </Space>
                  <Space>
                    <CodeSandboxOutlined style={{ fontSize: 20 }} />
                    <Typography.Text> Controlador encontrado </Typography.Text>
                  </Space>
                  <Space>
                    <CodeSandboxOutlined style={{ fontSize: 20 }} />
                    <Typography.Text> Bomba encontrada </Typography.Text>
                  </Space>
                  <Space>
                    <CodeSandboxOutlined style={{ fontSize: 20 }} />
                    <Typography.Text> Repetidora encontrada </Typography.Text>
                  </Space>
                  <Space>
                    <CodeSandboxOutlined style={{ fontSize: 20 }} />
                    <Typography.Text> GPS/Monitor encontrado </Typography.Text>
                  </Space>
                </Space>
                <Space size={35} align='start' style={{ fontSize: 10 }}>
                  <Space direction="vertical" size="small" align="start">
                    <Typography.Text style={{ fontWeight: 500 }}>Dispositivo</Typography.Text>
                    <Space direction="vertical" size={6}>
                      <Space>
                        <div style={{
                          borderRadius: '50%',
                          backgroundColor: 'green',
                          height: 13,
                          width: 13
                        }}></div>
                        <Typography.Text style={{ fontSize: 12 }}> Encontrado </Typography.Text>
                      </Space>
                      <Space>
                        <div style={{
                          borderRadius: '50%',
                          backgroundColor: 'red',
                          height: 13,
                          width: 13
                        }}></div>
                        <Typography.Text style={{ fontSize: 12 }}> Não encontrado </Typography.Text>
                      </Space>
                      <Space>
                        <div style={{
                          borderRadius: '50%',
                          backgroundColor: 'yellow',
                          height: 13,
                          width: 13
                        }}></div>
                        <Typography.Text style={{ fontSize: 12 }}> Central </Typography.Text>
                      </Space>

                    </Space>
                  </Space>
                  <Space direction="vertical" size="small" align="start" >
                    <Typography.Text style={{ fontWeight: 500 }}>Linha</Typography.Text>
                    <Space direction="vertical" size={6}>
                      <Space>
                        <div style={{
                          borderRadius: '50%',
                          backgroundColor: 'green',
                          height: 13,
                          width: 13
                        }}></div>
                        <Typography.Text style={{ fontSize: 12 }}> Muito forte </Typography.Text>
                      </Space>
                      <Space>
                        <div style={{
                          borderRadius: '50%',
                          backgroundColor: 'blue',
                          height: 13,
                          width: 13
                        }}></div>
                        <Typography.Text style={{ fontSize: 12 }}> Forte </Typography.Text>
                      </Space>
                      <Space>
                        <div style={{
                          borderRadius: '50%',
                          backgroundColor: 'orange',
                          height: 13,
                          width: 13
                        }}></div>
                        <Typography.Text style={{ fontSize: 12 }}> Moderado </Typography.Text>
                      </Space>
                      <Space>
                        <div style={{
                          borderRadius: '50%',
                          backgroundColor: 'red',
                          height: 13,
                          width: 13
                        }}></div>
                        <Typography.Text style={{ fontSize: 12 }}> Fraco </Typography.Text>
                      </Space>
                      <Space>
                        <div style={{
                          borderRadius: '50%',
                          backgroundColor: 'black',
                          height: 13,
                          width: 13
                        }}></div>
                        <Typography.Text style={{ fontSize: 12 }}> Erro </Typography.Text>
                      </Space>
                    </Space>
                  </Space>
                </Space>
              </Space>
            </ProCard>
                 */}
            </Spin>
          ) : null}
          {md ? null : (
            <div className={classNameFixedMobile}>
              <Tabs defaultActiveKey="1" items={items} tabPosition="bottom" />
            </div>
          )}
        </>
      </Col>
    </Row>
  );
};

export default connect(({ pivot, farm }: { pivot: any; farm: any }) => ({
  pivot,
  farm,
}))(Devices);
