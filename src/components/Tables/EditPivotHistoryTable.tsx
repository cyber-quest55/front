import { loadPivotConfig } from '@/models/pivot-by-id';
import { favoritePivotConfig, getEditPivotHistory, postPivotConfig } from '@/services/pivot';
import { LanguageEnum } from '@/utils/enum/language';
import { PanelTypeEnum } from '@/utils/enum/panel-type';
import { VoltageLimitEnableEnum } from '@/utils/enum/voltage-limit';
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

interface IEditPivotHistoryTableProps {
  loadPivotConfig: typeof loadPivotConfig;
  setTabCount: any;
}

const EditPivotHistoryTable: React.FunctionComponent<IEditPivotHistoryTableProps> = (props) => {
  const params = useParams();
  const actionRef = React.useRef<ActionType>();
  const reqEditPivot = useRequest(getEditPivotHistory, { manual: true });
  const reqFavorite = useRequest(favoritePivotConfig, { manual: true });
  const postReq = useRequest(postPivotConfig, { manual: true });

  const [form] = Form.useForm<any>();
  const intl = useIntl();
  const { message } = App.useApp();

  const loadConfig = (item: any) => {
    const newFull = {...item.full}

    delete newFull.uuid;
    delete newFull.device;
    delete newFull.message_packets;
    delete newFull.name; 
    delete newFull.id

    postReq.runAsync({
      farmId: params.farmId as any,
      pivotId: params.pivotId as any,
      deviceId: item.full.id as any,
    }, {...newFull } )
    message.success('Success');
    props.setTabCount('tab1')

  }

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.history.table.col.2',
      }),
      key: 'showTime',
      dataIndex: 'created',
      valueType: 'date',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.history.table.col.3',
      }),
      dataIndex: 'created_by',
      valueType: 'text',
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.history.table.col.4',
      }),
      dataIndex: 'controller',
      key: 'Controlador',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.notsent',
          }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.waitreceivment',
          }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.received',
          }),
          status: 'Success',
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.history.table.col.5',
      }),
      dataIndex: 'hardware',
      key: 'Hardware',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.notsent',
          }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.waitreceivment',
          }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.received',
          }),
          status: 'Success',
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.history.table.col.6',
      }),
      dataIndex: 'gps',
      key: 'GPS',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.notsent',
          }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.waitreceivment',
          }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.received',
          }),
          status: 'Success',
        },
      },
    },
    {
      title: intl.formatMessage({
        id: 'component.edit.pivot.history.table.col.7',
      }),
      dataIndex: 'pump',
      key: 'Bomba',
      valueEnum: {
        0: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.notsent',
          }),
          status: 'Default',
        },
        1: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.waitreceivment',
          }),
          status: 'Processing',
        },
        2: {
          text: intl.formatMessage({
            id: 'component.statusedge.pivot.received',
          }),
          status: 'Success',
        },
      },
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          {intl.formatMessage({
            id: 'component.edit.pivot.history.table.col.8',
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
            id: 'component.edit.pivot.history.changestatus.desc',
          })} ${
            item.full.pinned
              ? intl
                  .formatMessage({
                    id: 'component.edit.pivot.history.favorite.label',
                  })
                  .toLowerCase()
              : intl
                  .formatMessage({
                    id: 'component.edit.pivot.history.unfavorite.label',
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
                      id: 'component.edit.pivot.history.unfavorite.label',
                    })
                  : intl.formatMessage({
                      id: 'component.edit.pivot.history.favorite.label',
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
                  pivotId: params.pivotId as any,
                },
                { pinned: !item.full.pinned, ...values },
              );
              actionRef.current?.reload();
              message.success('Success');
              return true;
            } catch (err) {
              console.log(err);
              message.error('Error');
            }
          }}
        >
          {item.full.pinned ? null : (
            <ProFormText
              name="name"
              label={intl.formatMessage({
                id: 'component.edit.pivot.history.name.label',
              })}
            />
          )}
        </ModalForm>,
        <Tooltip
          title={intl.formatMessage({
            id: 'component.edit.pivot.history.loadconfig',
          })}
          key={'key-import'}
        >
          <span style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
            <UploadOutlined onClick={() => loadConfig(item)}/>
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
            id: 'component.edit.pivot.general.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.pivotname.label',
            })}
            valueType="text"
          >
            {full.name_pivot_on_config}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.devicelanguage.label',
            })}
            valueEnum={LanguageEnum}
          >
            {content.language?.language}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.radiuslasttower.label',
            })}
            valueType="text"
          >
            {content?.pivot_parameters?.radius_last?.toFixed(1).toString()} m
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.flowrate.label',
            })}
            valueType="text"
          >
            {content?.pivot_parameters?.flow_rate?.toFixed(2).toString()} m³/h
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.endtowerspeed.label',
            })}
            valueType="text"
          >
            {content?.pivot_parameters?.speed} m/h
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.irrigationarea.label',
            })}
            valueType="text"
          >
            {content?.pivot_parameters?.radius_last.toFixed(1).toString()} ha
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.brandmodel.label',
            })}
            valueType="text"
          ></ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.paneltype.label',
            })}
            valueEnum={PanelTypeEnum}
          >
            {full?.panel_type}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.general.vontagecontrol.label',
            })}
            valueEnum={VoltageLimitEnableEnum}
          >
            {content?.voltage_limit_enable?.voltage_limit_enable}
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={2}
          title={intl.formatMessage({
            id: 'component.edit.pivot.location.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.location.center.label',
            })}
            valueType="text"
          >
            {`${full.content?.pivot_positions?.latitude_center},${full.content?.pivot_positions?.longitude_center}`}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.location.startref.label',
            })}
            valueType="text"
          >
            {`${full.content?.pivot_positions?.latitude_reference},${full.content?.pivot_positions?.longitude_reference}`}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.location.hasnorth.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.content?.pivot_positions?.north_reference}
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={intl.formatMessage({
            id: 'component.edit.pivot.clock.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.clock.dvdate.label',
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
          column={3}
          title={intl.formatMessage({
            id: 'component.edit.pivot.pressure.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pressure.pumppw.label',
            })}
            valueType="text"
          >
            {full.potency}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pressure.pumptm.label',
            })}
            valueType="text"
          >
            {full.content?.power_delay?.power_delay}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pressure.pressuredng.label',
            })}
            valueType="text"
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.pressure.pressuredng.opt.1',
                }),
              },

              1: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.pressure.pressuredng.opt.2',
                }),
              },

              2: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.pressure.pressuredng.opt.3',
                }),
              },
            }}
          >
            {full.content?.pressure_config?.read_pressure_by}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pressure.pmptimeout.label',
            })}
            valueType="text"
          >
            {full.content?.pressure_config?.pump_time_out} min
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pressure.delaytime.label',
            })}
            valueType="text"
          >
            {full.content?.pressure_config?.pump_press_delay} s
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pressure.unstpress.label',
            })}
            valueType="text"
          >
            {full.content?.pressure_config?.pump_press_switch} min
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pressure.active.label',
            })}
            valueEnum={{
              false: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              true: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.injection_pump}
          </ProDescriptions.Item>
        </ProDescriptions>

        <ProDescriptions
          column={2}
          title={intl.formatMessage({
            id: 'component.edit.pivot.pluviometer.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pluviometer.stopcdn.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.pluviometer.stopcdn.opt.1',
                }),
              },

              1: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.pluviometer.stopcdn.opt.2',
                }),
              },

              2: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.pluviometer.stopcdn.opt.3',
                }),
              },
            }}
          >
            {full.content?.pluviometer_stop_mode?.stop_mode}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pluviometer.value.label',
            })}
            valueType="text"
          >
            {full.content?.mm_to_stop?.value} mm
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={intl.formatMessage({
            id: 'component.edit.pivot.pickhour.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.peak.label',
            })}
            valueType="text"
          >
            R$ {full.kwh_peak}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.outofpeak.label',
            })}
            valueType="text"
          >
            R$ {full.kwh_out_of_peak}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.nightime.label',
            })}
            valueType="text"
          >
            R$ {full.kwh_reduced}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.sun.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.content?.pause_time?.enable_sunday}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.mon.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.content?.pause_time?.enable_monday}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.tue.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.content?.pause_time?.enable_tuesday}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.wed.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.content?.pause_time?.enable_wednesday}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.thu.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.content?.pause_time?.enable_thursday}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.fri.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.content?.pause_time?.enable_friday}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.sat.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.disabled.label',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.descriptor.opt.enabled.label',
                }),
              },
            }}
          >
            {full.content?.pause_time?.enable_saturday}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.peaktimest1.label',
            })}
            valueType="text"
          >
            {full.content?.pause_time?.start_pause_time_hour_1}:
            {full.content?.pause_time?.start_pause_time_minute_1}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.pickhour.peaktimeend1.label',
            })}
            valueType="text"
          >
            {full.content?.pause_time?.end_pause_time_hour_1}:
            {full.content?.pause_time?.end_pause_time_minute_1}
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={intl.formatMessage({
            id: 'component.edit.pivot.finalgun.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.finalgun.stopcdn.label',
            })}
            valueEnum={{
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.finalgun.stopcdn.opt.1',
                }),
              },
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.finalgun.stopcdn.opt.2',
                }),
              },
              2: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.finalgun.stopcdn.opt.3',
                }),
              },
            }}
          >
            {full.content?.endgun_mode?.endgun_mode}
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={intl.formatMessage({
            id: 'component.edit.pivot.autoreversion.title',
          })}
        >
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.autoreversion.stopcdn.label',
            })}
            valueEnum={{
              1: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.autoreversion.stopcdn.opt.2',
                }),
              },
              0: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.autoreversion.stopcdn.opt.3',
                }),
              },
            }}
          >
            {full.content?.autoreversion_configurations?.mode}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={intl.formatMessage({
              id: 'component.edit.pivot.autoreversion.auto.label',
            })}
            valueEnum={{
              30: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.autoreversion.autotime.opt.1',
                }),
              },
              60: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.autoreversion.autotime.opt.2',
                }),
              },
              120: {
                text: intl.formatMessage({
                  id: 'component.edit.pivot.autoreversion.autotime.opt.3',
                }),
              },
            }}
          >
            {full.content?.autoreversion_configurations?.time}
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
          id: 'component.edit.pivot.history.title',
        })}
      >
        <ProDescriptions.Item label={<HistoryOutlined style={{ fontSize: 20 }} />} valueType="text">
          {intl.formatMessage({
            id: 'component.edit.pivot.history.desc1',
          })}
        </ProDescriptions.Item>
        <ProDescriptions.Item label={<StarFilled style={{ fontSize: 20 }} />} valueType="text">
          {intl.formatMessage({
            id: 'component.edit.pivot.history.desc2',
          })}
        </ProDescriptions.Item>
      </ProDescriptions>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        ghost
        request={async () => {
          const result: any = await reqEditPivot.runAsync(
            { farmId: params.farmId as any, pivotId: params.pivotId as any },
            { pinned: false },
          );
          const data = result.results?.map((item: any, index: number) => ({
            created: item.created,
            created_by: item.created_by?.username,
            controller: 2,
            hardware: item.device_statuses?.hwsettings,
            pump: item.device_statuses?.pump,
            gps: item.device_statuses?.gps,
            key: `table-history-edit-pivot-${index}`,
            id: `table-history-edit-pivot-${index}`,
            index: `table-history-edit-pivot-${index}`,
            full: item,
          }));

          return {
            data: data,
            success: true,
            total: result.count,
            page: result.current_page,
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
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle={intl.formatMessage({
          id: 'component.edit.pivot.history.table.title',
        })}
      />
    </>
  );
};

export default EditPivotHistoryTable;
