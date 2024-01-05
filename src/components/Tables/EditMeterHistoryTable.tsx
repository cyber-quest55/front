import { queryMeterSystemById } from '@/models/meter-by-id';
import {
  favoriteMeterConfig,
  getEditMeterHistory,
  patchIMeter,
  patchMeterSystem,
  postMeterSystemConfig,
} from '@/services/metersystem';
import { HistoryOutlined, StarFilled, UploadOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProDescriptions,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Form, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

interface IEditMeterHistoryTableProps {
  setTabCount: any;
  showOnlyFavorites?: boolean;
  queryMeterSystemById: typeof queryMeterSystemById;
  sensorOptions: any;
}

const EditMeterHistoryTable: React.FunctionComponent<IEditMeterHistoryTableProps> = (props) => {
  const params = useParams();
  const actionRef = React.useRef<ActionType>();
  const reqEditMeter = useRequest(getEditMeterHistory, { manual: true });
  const reqFavorite = useRequest(favoriteMeterConfig, { manual: true });
  const postReq = useRequest(postMeterSystemConfig, { manual: true });
  const patchIMeterReq = useRequest(patchIMeter, { manual: true });
  const patchMeterSystemReq = useRequest(patchMeterSystem, { manual: true });
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();


  const loadConfig = async (item: any) => {
    const newFull = { ...item.full };

    newFull.created_by = item.full.created_by?.id;

    await postReq.runAsync(
      {
        farmId: params.farmId as any,
        meterSystemId: params.meterSystemId as any,
        iMeterId: params.meterId as any,
      },
      { ...newFull },
    );

    const iMeterPatchData = {
      name: newFull.imeter_name,
      position: newFull.position_imeter,
      sensor_process_controller_pair: newFull.sensor_process_controller_pair,
    };

    const meterSystemPatchData = {
      name: newFull.metersystem_name,
    };

    await patchIMeterReq.runAsync(
      {
        farmId: params.farmId as any,
        meterSystemId: params.meterSystemId as any,
        iMeterId: params.meterId as any,
      },
      iMeterPatchData,
    );

    await patchMeterSystemReq.runAsync(
      {
        farmId: params.farmId as any,
        meterSystemId: params.meterSystemId as any,
      },
      meterSystemPatchData,
    );

    props.queryMeterSystemById({
      farmId: params.farmId as any,
      meterId: params.meterSystemId as any,
    });

    message.success('Success');
    props.setTabCount('configuration');
  };

  let columns: ProColumns<GithubIssueItem>[] = props.showOnlyFavorites
  ? [
      {
        title: intl.formatMessage({
          id: 'component.edit.meter.history.table.col.1',
        }),
        key: 'name',
        dataIndex: 'name',
        valueType: 'text',
      },
    ]
  : [];

  columns = [
    ...columns,
    {
      title: intl.formatMessage({
        id: 'component.edit.meter.history.table.col.2',
      }),
      key: 'showTime',
      dataIndex: 'created',
      valueType: 'date',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.meter.history.table.col.3',
      }),
      dataIndex: 'created_by',
      valueType: 'text',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.meter.history.table.col.4',
      }),
      dataIndex: 'meter',
      key: 'Medidor',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'component.statusedge.meter.notsent',
          }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({
            id: 'component.statusedge.meter.waitreceivment',
          }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({
            id: 'component.statusedge.meter.received',
          }),
          status: 'Success',
        },
      },
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          {intl.formatMessage({
            id: 'component.edit.meter.history.table.col.5',
          })}
        </div>
      ),
      valueType: 'option',
      key: 'option',

      render: (value, item: any) => [
        <ModalForm<{
          name: string;
          company: string;
        }>
          title={`${intl.formatMessage({
            id: 'component.edit.meter.history.changestatus.desc',
          })} ${
            item.full.pinned
              ? intl
                  .formatMessage({
                    id: 'component.edit.meter.history.favorite.label',
                  })
                  .toLowerCase()
              : intl
                  .formatMessage({
                    id: 'component.edit.meter.history.unfavorite.label',
                  })
                  .toLowerCase()
          }?`}
          key={'key-star'}
          trigger={
            <Tooltip
              key={'key-star'}
              title={
                item.full.pinned
                  ? intl.formatMessage({
                      id: 'component.edit.meter.history.unfavorite.label',
                    })
                  : intl.formatMessage({
                      id: 'component.edit.meter.history.favorite.label',
                    })
              }
            >
              <span style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
                <StarFilled style={{ color: item.full.pinned ? '#1677ff' : '' }} />
              </span>
            </Tooltip>
          }
          form={form}
          autoFocusFirstInput
          modalProps={{
            width: '450px',
            destroyOnClose: true,
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            try {
              await reqFavorite.runAsync(
                {
                  configId: item.full.id,
                  farmId: params.farmId as any,
                  meterSystemId: params.meterSystemId as any,
                  meterId: params.meterId as any,
                },
                { pinned: !item.full.pinned, ...values },
              );
              actionRef.current?.reload();
              message.success('Success');
              return true;
            } catch (err) {
              message.error('Error');
            }
          }}
        >
          {item.full.pinned ? null : (
            <ProFormText
              name="name"
              label={intl.formatMessage({
                id: 'component.edit.meter.history.name.label',
              })}
            />
          )}
        </ModalForm>,
        <Tooltip
          title={intl.formatMessage({
            id: 'component.edit.meter.history.loadconfig',
          })}
          key={'key-import'}
        >
          <span style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
            <UploadOutlined onClick={() => loadConfig(item)} />
          </span>
        </Tooltip>,
      ],
    },
  ];

  const expandedRowRender = (items: any) => {
    const { full } = items;
    const { content } = full;

    return (
      <Space key={content.id} direction="vertical" size="large" style={{ width: '100%' }}>
        <ProDescriptions
          column={3}
          title={intl.formatMessage({
            id: 'component.edit.meter.general.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.general.generalconfig.systemname.label',
            })}
            valueType="text"
          >
            {full.metersystem_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.general.generalconfig.metername.label',
            })}
            valueType="text"
          >
            {full.imeter_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.general.generalconfig.sensor.label',
            })}
            valueType="text"
          >
            {props.sensorOptions.find((s: any) => s.id === full.sensor_process_controller_pair)?.label}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.general.residualflow.a.label',
            })}
            valueType="text"
          >
            {full.flow_curve_equation[0]} x²
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.general.residualflow.b.label',
            })}
            valueType="text"
          >
            {full.flow_curve_equation[1]} x
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.general.residualflow.c.label',
            })}
            valueType="text"
          >
            {full.flow_curve_equation[2]}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.general.equipmentclock.input.label',
            })}
            valueType="text"
          >
            {dayjs()
              .year(full.content?.clock?.year + 2000)
              .month(full.content?.clock?.month - 1)
              .date(full.content?.clock?.day)
              .hour(full.content?.clock?.hour)
              .minute(full.content?.clock?.minute)
              .second(full.content?.clock?.second)
              .format('DD/MM/YYYY HH:MM')}
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={2}
          title={intl.formatMessage({
            id: 'component.edit.meter.location.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.location.input.label',
            })}
            valueType="text"
          >
            {full.position_imeter}
          </ProDescriptions.Item>
        </ProDescriptions>

        <ProDescriptions
          column={3}
          title={intl.formatMessage({
            id: 'component.edit.meter.level.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.level.sensorinformation.graphicscale.label',
            })}
            valueType="text"
          >
            {full.graphic_max_value} m
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.level.sensorinformation.measurementoffset.label',
            })}
            valueType="text"
          >
            {full.sensor_offset / 100} m
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.level.chartconfiguration.min.label',
            })}
            valueType="text"
          >
            {full.min_limit} %
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.meter.level.chartconfiguration.max.label',
            })}
            valueType="text"
          >
            {full.max_limit} %
          </ProDescriptions.Item>
        </ProDescriptions>
      </Space>
    );
  };

  return (
    <>
      <ProDescriptions
        column={2}
        title={intl.formatMessage({
          id: 'component.edit.meter.history.title',
        })}
      >
        <ProDescriptions.Item label={<HistoryOutlined style={{ fontSize: 20 }} />} valueType="text">
          {intl.formatMessage({
            id: 'component.edit.meter.history.desc1',
          })}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={<StarFilled style={{ fontSize: 20 }} />} valueType="text">
          {intl.formatMessage({
            id: 'component.edit.meter.history.desc2',
          })}
        </ProDescriptions.Item>
      </ProDescriptions>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        ghost
        request={async () => {
          const result: any = await reqEditMeter.runAsync(
            {
              farmId: params.farmId as any,
              meterSystemId: params.meterSystemId as any,
              meterId: params.meterId as any,
            },
            { pinned: !!props.showOnlyFavorites, page: currentPage },
          );
          const data = result.results?.map((item: any, index: number) => ({
            created: item.created,
            created_by: item.created_by?.username,
            meter: item.message_status,
            name: item.name,
            key: `table-history-edit-meter-${index}`,
            id: `table-history-edit-meter-${index}`,
            index: `table-history-edit-meter-${index}`,
            full: item,
          }));

          return {
            data: data,
            success: true,
            total: result.count,
            page: currentPage,
          };
        }}
        rowKey="id"
        search={false}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        expandable={{ expandedRowRender }}
        pagination={{
          pageSize: 10,
          pageSizeOptions: ['10'], // Disable page size options dropdown
          showSizeChanger: false, // Hide page size changer
          onChange: (page) => {
            setCurrentPage(page);
          }
        }}
        dateFormatter="string"
        headerTitle={intl.formatMessage({
          id: 'component.edit.meter.history.table.title',
        })}
      />
    </>
  );
};

export default EditMeterHistoryTable;
