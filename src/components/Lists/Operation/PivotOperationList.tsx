import { UndoOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { App, Button, Dropdown, MenuProps, Popconfirm, Progress, Space, Tag, Typography } from 'antd';
import { useState } from 'react';
import StartPivotAngleContainer from '@/components/Forms/StartPivotAngle/StartPivotAngleContainer';
import StartPivotScheduleContainer from '@/components/Forms/StartPivotSchedule/StartPivotScheduleContainer';
import StartPivotSegmentContainer from '@/components/Forms/StartPivotSegment/StartPivotSegmentContainer';
import StartPivotSimpleFormContainer from '@/components/Forms/StartPivotSimple/StartPivotSimpleContainer';
import { useRequest } from 'ahooks';
import { stopPivot } from '@/services/pivot';

const defaultData = [
  {
    id: '1',
    name: 'Pivot 1',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'Fazenda Sertão Varedas',
  },
  {
    id: '2',
    name: 'Pivot 2',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'Fazenda São João',
  },
  {
    id: '3',
    name: 'Pivot 3',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'Fazenda Ipiranga',
  },
  {
    id: '4',
    name: 'Pivot 4',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'Fazenda Sertão Varedas',
  },
];

type DataItem = (typeof defaultData)[number];

export default () => {
  const intl = useIntl();
  const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);
  const stopReq = useRequest(stopPivot, { manual: true });
  const { message } = App.useApp();

  const isInMaintenance = false;


  const handleStopPivot = async (farmId: number, deviceId: number) => {
    try {
      await stopReq.runAsync(
        {
          farmId,
          pivotId: deviceId as any,
        },
        {
          maintenance: !isInMaintenance,
        },
      );

      message.success(
        intl.formatMessage({
          id: 'component.message.success',
        }),
      );
    } catch (err) {
      message.error(
        intl.formatMessage({
          id: 'component.message.error',
        }),
      );
      return false;
    }
    return true;
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <StartPivotSimpleFormContainer farmId={232} deviceId={526} />,
    },
    {
      key: '2',
      label: <StartPivotAngleContainer farmId={232} deviceId={526} />,
    },
    {
      key: '3',
      label: <StartPivotSegmentContainer farmId={232} deviceId={526} />,
    },
    {
      key: '4',
      label: <StartPivotScheduleContainer farmId={232} deviceId={526} />,
    },
  ];

  return (
    <ProList<DataItem>
      size='large'
      rowKey="id"
      headerTitle={intl.formatMessage({ id: 'pages.devices.operations.tab.1' })}
      dataSource={dataSource}
      metas={{
        title: {
          dataIndex: 'name',
          render: (value) => {
            return <Typography.Text style={{ fontSize: 14 }}>{value}</Typography.Text>
          }
        },
        avatar: {
          dataIndex: 'image',
          editable: false,
          render: () => {
            return <svg width="30" height="30"><circle cx="15" cy="15" r="15" fill="rgba(255, 255, 255, 0.85)" opacity="0.8"></circle><polygon points="15,15 29.918429237192257,16.56220008157956 29.399742346267324,19.200883283443567 28.41823588818589,21.704546640079418 27.005456288096894,23.992720351183767 25.206811444786133,25.991860630966116 23.080111283447515,27.63771346593616 20.69370969712118,28.877379791765748 18.12430759632943,29.67101571274185 15.454487678702797,29.993113117358494 12.770060153128952,29.833319530008673 10.15730472903416,29.19677084806841 7.700197515531144,28.103926269929268 5.477711960176448,26.58991071952814 3.5612805773863876,24.703385902391087 2.012499048648813,22.504986278378666 0.8811464866390448,20.065370220255872 0.20358549358006428,17.46294899545356 0.0015934372878287917,14.781366563416183 0.28166250865118414,12.106811189922809 1.0347910572749228,9.525245285308984 2.2367729119300304,7.119642501868524 3.848975386813944,4.967320892397746 5.819580967859265,3.137457844361178 8.08525277027153,1.688866661739036 10.573170238120241,0.6681062570455971 13.20336965692344,0.10798470957215933 15.891314253225463,0.02650478672407175 18.550611276053026,0.42628532026357036 21.095788731015553,1.2944770349021777 23.445042520531565,2.6031755345808865 25.522865694833563,4.310318172719313 27.262475307460875,6.361035980286045 28.607958874108107,8.689417199609657 29.516071445875646,11.220625742502635 29.957625537509372,13.873306483711078 29.918429237192257,16.562200081579558" fill="#1d39c4" opacity="0.8"></polygon><line x1="15" y1="15" x2="29.918429237192257" y2="16.56220008157956" stroke="#000"></line><line x1="15" y1="15" x2="29.918429237192257" y2="16.562200081579558" stroke="#000"></line></svg>
          }
        },
        description: {
          dataIndex: 'desc',
          render: (value) => {
            return <Typography.Text type='secondary' style={{ fontSize: 16, fontWeight: 'lighter' }}>{value} | 15 Mai - 16:08</Typography.Text>
          }
        },

        subTitle: {
          render: () => {
            return (
              <Space size={0}>
                <Tag color="blue"> IRRIGANDO 100% <UndoOutlined /> </Tag>
              </Space>
            );
          },
        },
        content: {
          render: () => (
            <div
              style={{
                minWidth: 200,
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 48
              }}
            >
              <Space direction='vertical'>
                <Typography.Text type='secondary' color='' style={{ fontSize: 14, fontWeight: 'lighter' }}>Type</Typography.Text>
                <Tag color="orange">GPS Update</Tag>

              </Space>

              <div
                style={{
                  width: '200px',
                }}
              >
                <Progress percent={40} />
              </div>
            </div>
          ),
        },
        actions: {
          render: () => {
            return [
              <Popconfirm
                key="stop_pivot"  
                placement="bottom"
                title={intl.formatMessage({
                  id: 'component.popconfirm.oktext',
                })}
                onConfirm={() => handleStopPivot(232, 256)}
              >
                <Button
                  type="default"
                  danger
                >
                  {intl.formatMessage({
                    id: 'component.pivot.operationalpanel.button.stop',
                  })}
                </Button>
              </Popconfirm>
              ,
              <Dropdown
                key="init_pivot"
                trigger={['click']}
                menu={{ items }}
                placement="top"
                arrow
              >
                <Button color='green' >
                  Iniciar
                </Button>
              </Dropdown>
            ];
          },
        },
      }}
    />
  );
};