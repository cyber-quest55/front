import { queryIrpdById } from '@/models/irpd-by-id';
import { favoriteIrpdConfig, getEditIrpdHistory, patchIrpd, postIrpdConfig } from '@/services/irpd';
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

type ColumnItem = {
  title: string;
  key: string;
  dataIndex: string;
  valueType: string;
};

interface IEditIrpdHistoryTableProps {
  setTabCount: any;
  setTab: any;
  showOnlyFavorites?: boolean;
  queryIrpdById: typeof queryIrpdById;
}

const EditIrpdHistoryTable: React.FunctionComponent<IEditIrpdHistoryTableProps> = (props) => {
  const params = useParams();
  const actionRef = React.useRef<ActionType>();
  const reqEditIrpdHistory = useRequest(getEditIrpdHistory, { manual: true });
  const reqFavorite = useRequest(favoriteIrpdConfig, { manual: true });
  const postReq = useRequest(postIrpdConfig, { manual: true });
  const patchIrpdReq = useRequest(patchIrpd, { manual: true });
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();

  const loadConfig = async (item: any) => {
    const newFull = { ...item.full };

    delete newFull.uuid;
    delete newFull.device;
    delete newFull.message_packets;
    delete newFull.name;
    delete newFull.id;
    delete newFull.created;

    newFull.pinned = false;
    newFull.created_by = item.full.created_by?.id;

    await postReq.runAsync(
      {
        farmId: params.farmId as any,
        irpdId: params.irpdId as any,
      },
      { ...newFull },
    );

    const irpdPatchData = {
      name: newFull.name,
      potency: newFull.potency,
      position: newFull.position,
      flow: parseFloat(newFull.flow),
    };

    await patchIrpdReq.runAsync(
      {
        farmId: params.farmId as any,
        irpdId: params.irpdId as any,
      },
      irpdPatchData,
    );

    props.queryIrpdById({
      farmId: params.farmId as any,
      irpdId: params.irpdId as any,
    });

    message.success('Success');
    props.setTabCount('configuration');
    props.setTab('general');
  };

  let columns: ProColumns<ColumnItem>[] = props.showOnlyFavorites
    ? [
        {
          title: intl.formatMessage({
            id: 'component.edit.irpd.history.table.col.1',
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
        id: 'component.edit.irpd.history.table.col.2',
      }),
      key: 'showTime',
      dataIndex: 'created',
      valueType: 'date',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.irpd.history.table.col.3',
      }),
      dataIndex: 'created_by',
      valueType: 'text',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.irpd.history.table.col.4',
      }),
      dataIndex: 'irpd',
      key: 'Pump',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'component.statusedge.irpd.notsent',
          }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({
            id: 'component.statusedge.irpd.waitreceivment',
          }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({
            id: 'component.statusedge.irpd.received',
          }),
          status: 'Success',
        },
      },
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          {intl.formatMessage({
            id: 'component.edit.irpd.history.table.col.5',
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
            id: 'component.edit.irpd.history.changestatus.desc',
          })} ${
            item.full.pinned
              ? intl
                  .formatMessage({
                    id: 'component.edit.irpd.history.favorite.label',
                  })
                  .toLowerCase()
              : intl
                  .formatMessage({
                    id: 'component.edit.irpd.history.unfavorite.label',
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
                      id: 'component.edit.irpd.history.unfavorite.label',
                    })
                  : intl.formatMessage({
                      id: 'component.edit.irpd.history.favorite.label',
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
                  irpdId: params.irpdId as any,
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
                id: 'component.edit.irpd.history.name.label',
              })}
            />
          )}
        </ModalForm>,
        <Tooltip
          title={intl.formatMessage({
            id: 'component.edit.irpd.history.loadconfig',
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
            id: 'component.edit.irpd.general.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.general.pumpname.label',
            })}
            valueType="text"
          >
            {full.name_irpd_on_config}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.general.monthlywaterconsumptionlimit.label',
            })}
            valueType="text"
          >
            {full.monthly_water_limit === 0
              ? intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                })
              : `${full.monthly_water_limit} m³`}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.general.pumppower.label',
            })}
            valueType="text"
          >
            {full.potency} kW
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.general.sensorscale.label',
            })}
            valueType="text"
          >
            {full.content.imanage_sensors[0].max_value === 0
              ? intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                })
              : `${full.content.imanage_sensors[0].max_value / 10} bar`}
          </ProDescriptions.Item>

          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.general.equipmentclock.label',
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
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.general.powertime.label',
            })}
            valueType="text"
          >
            {full.content.pump_power_time.minutes} min
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.general.flowrate.label',
            })}
            valueType="text"
          >
            {full.flow} m³/h
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.general.pressuresensor.label',
            })}
            valueType="text"
          >
            {full.has_pressure_sensor
              ? intl.formatMessage({
                  id: 'component.edit.irpd.activated',
                })
              : intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                })}
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={2}
          title={intl.formatMessage({
            id: 'component.edit.irpd.location.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.location.input.label',
            })}
            valueType="text"
          >
            {full.position}
          </ProDescriptions.Item>
        </ProDescriptions>

        <ProDescriptions
          column={3}
          title={intl.formatMessage({
            id: 'component.edit.irpd.pausetime.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.kwh_peak.label',
            })}
            valueType="text"
          >
            $ {full.kwh_peak}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.kwh_out_of_peak.label',
            })}
            valueType="text"
          >
            $ {full.kwh_out_of_peak}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.kwh_reduced.label',
            })}
            valueType="text"
          >
            $ {full.kwh_reduced}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.sunday_enable.label',
            })}
            valueType="text"
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.activated',
                }),
              },
            }}
          >
            {full.content.peak_time.sunday_enable}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.monday_enable.label',
            })}
            valueType="text"
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.activated',
                }),
              },
            }}
          >
            {full.content.peak_time.monday_enable}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.tuesday_enable.label',
            })}
            valueType="text"
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.activated',
                }),
              },
            }}
          >
            {full.content.peak_time.tuesday_enable}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.wednesday_enable.label',
            })}
            valueType="text"
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.activated',
                }),
              },
            }}
          >
            {full.content.peak_time.wednesday_enable}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.thursday_enable.label',
            })}
            valueType="text"
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.activated',
                }),
              },
            }}
          >
            {full.content.peak_time.thursday_enable}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.friday_enable.label',
            })}
            valueType="text"
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.activated',
                }),
              },
            }}
          >
            {full.content.peak_time.friday_enable}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.irpd.pausetime.saturday_enable.label',
            })}
            valueType="text"
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.deactivated',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.irpd.activated',
                }),
              },
            }}
          >
            {full.content.peak_time.saturday_enable}
          </ProDescriptions.Item>
          <ProDescriptions column={2}>
            <ProDescriptions.Item
              label={
                '1. ' +
                intl.formatMessage({
                  id: 'component.edit.irpd.pausetime.peak_time_start.label',
                })
              }
              span={2}
              valueType="text"
            >
              {dayjs()
                .hour(full.content?.peak_time.start_hour_1)
                .minute(full.content?.peak_time.start_minute_1)
                .format('HH:mm')}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              labelStyle={{ paddingLeft: 16 }}
              label={intl.formatMessage({
                id: 'component.edit.irpd.pausetime.peak_time_end.label',
              })}
              span={2}
              valueType="text"
            >
              {dayjs()
                .hour(full.content?.peak_time.stop_hour_1)
                .minute(full.content?.peak_time.stop_minute_1)
                .format('HH:mm')}
            </ProDescriptions.Item>
          </ProDescriptions>

          {full.content?.peak_time.start_hour_2 === 0 &&
          full.content?.peak_time.start_minute_2 === 0 &&
          full.content?.peak_time.stop_hour_2 === 0 &&
          full.content?.peak_time.stop_minute_2 === 0 ? null : (
            <ProDescriptions column={2}>
              <ProDescriptions.Item
                label={
                  '2. ' +
                  intl.formatMessage({
                    id: 'component.edit.irpd.pausetime.peak_time_start.label',
                  })
                }
                span={2}
                valueType="text"
              >
                {dayjs()
                  .hour(full.content?.peak_time.start_hour_2)
                  .minute(full.content?.peak_time.start_minute_2)
                  .format('HH:mm')}
              </ProDescriptions.Item>
              <ProDescriptions.Item
              labelStyle={{ paddingLeft: 16 }}
                label={intl.formatMessage({
                  id: 'component.edit.irpd.pausetime.peak_time_end.label',
                })}
                span={2}
                valueType="text"
              >
                {dayjs()
                  .hour(full.content?.peak_time.stop_hour_2)
                  .minute(full.content?.peak_time.stop_minute_2)
                  .format('HH:mm')}
              </ProDescriptions.Item>
            </ProDescriptions>
          )}
        </ProDescriptions>
      </Space>
    );
  };

  return (
    <>
      <ProDescriptions
        column={2}
        title={intl.formatMessage({
          id: 'component.edit.irpd.history.title',
        })}
      >
        <ProDescriptions.Item label={<HistoryOutlined style={{ fontSize: 20 }} />} valueType="text">
          {intl.formatMessage({
            id: 'component.edit.irpd.history.desc1',
          })}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={<StarFilled style={{ fontSize: 20 }} />} valueType="text">
          {intl.formatMessage({
            id: 'component.edit.irpd.history.desc2',
          })}
        </ProDescriptions.Item>
      </ProDescriptions>
      <ProTable<ColumnItem>
        columns={columns}
        actionRef={actionRef}
        ghost
        request={async () => {
          const result: any = await reqEditIrpdHistory.runAsync(
            {
              farmId: params.farmId as any,
              irpdId: params.irpdId as any,
            },
            { pinned: !!props.showOnlyFavorites, page: currentPage },
          );
          const data = result.results?.map((item: any) => ({
            created: item.created,
            created_by: item.created_by?.username,
            irpd: item.message_status,
            name: item.name,
            key: `table-history-edit-irpd-${item.id}`,
            id: `table-history-edit-irpd-${item.id}`,
            index: `table-history-edit-irpd-${item.id}`,
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
          },
        }}
        headerTitle={intl.formatMessage({
          id: 'component.edit.irpd.history.table.title',
        })}
      />
    </>
  );
};

export default EditIrpdHistoryTable;
