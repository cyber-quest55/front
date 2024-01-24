import SegmentedPivotDevice from '@/components/Devices/SegmentedPivot';
import { useMapHook } from '@/hooks/map';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import { getLastSegmentIrrigation, postSimpleIrrigation } from '@/services/pivot';
import { yupValidator } from '@/utils/adapters/yup';
import { PTPToMillimeter } from '@/utils/formater/get-ptp-to-milimiter';
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';
import { GoogleMap } from '@react-google-maps/api';
import { useIntl, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Button, Form, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import * as yup from 'yup';

interface IStartPivotSegmentComponentProps {
  pivotById: GetPivotByIdModelProps;
}

const colors = ['#1d39c4', '#d3adf7', '#e6fffb', '#ffa39e', '#b7eb8f'];

const containerStyle = {
  width: '100%',
  height: 230,
  borderRadius: '5px',
};

const StartPivotSegmentComponent: React.FunctionComponent<IStartPivotSegmentComponentProps> = (
  props,
) => {
  const pivot = props.pivotById.unformated;
  const positions = props.pivotById?.unformated?.controllerconfig?.content?.pivot_positions;

  const intl = useIntl();
  const params = useParams();
  const { message } = App.useApp();
  const [form] = Form.useForm<any>();
  const { zoom, setZoom, map, setMap, mapCenter } = useMapHook(15, {
    lat: positions?.latitude_center,
    lng: positions?.longitude_center,
  });

  const postReq = useRequest(postSimpleIrrigation, { manual: true });
  const getLastSchedule = useRequest(getLastSegmentIrrigation, { manual: true });

  /** For Map segments */
  const [dataSource, setDataSource] = React.useState<any[]>([]);
  const [visible, setVisible] = React.useState<boolean>(false);

  const schema = yup.object().shape({
    content: yup.object().shape({
      segment_irrigation_parameters: yup.object().shape({
        start_mode: yup.number().required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
        end_mode: yup.number().required(
          intl.formatMessage({
            id: 'validations.required',
          }),
        ),
        stop_angle: yup
          .number()
          .min(
            0,
            intl.formatMessage(
              {
                id: 'validations.min.number',
              },
              { value: 0 },
            ),
          )
          .max(
            360,
            intl.formatMessage(
              {
                id: 'validations.max.number',
              },
              { value: 360 },
            ),
          )
          .notRequired(),
        rounds: yup
          .number()
          .min(
            1,
            intl.formatMessage(
              {
                id: 'validations.min.number',
              },
              { value: 1 },
            ),
          )
          .max(
            99,
            intl.formatMessage(
              {
                id: 'validations.max.number',
              },
              { value: 99 },
            ),
          )
          .required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        garbage: yup.object().shape({
          unformated_date: yup.string().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
          end_date: yup.string().required(
            intl.formatMessage({
              id: 'validations.required',
            }),
          ),
        }),
      }),
      segment_modes: yup
        .array(
          yup.object().shape({
            mode_forward: yup.number().required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            ),
            mode_reverse: yup.number().required(
              intl.formatMessage({
                id: 'validations.required',
              }),
            ),
            percent_forward: yup
              .number()
              .min(
                1,
                intl.formatMessage(
                  {
                    id: 'validations.min.number',
                  },
                  { value: 1 },
                ),
              )
              .max(
                100,
                intl.formatMessage(
                  {
                    id: 'validations.max.number',
                  },
                  { value: 100 },
                ),
              )
              .required(
                intl.formatMessage({
                  id: 'validations.required',
                }),
              ),
            percent_reverse: yup
              .number()
              .min(
                1,
                intl.formatMessage(
                  {
                    id: 'validations.min.number',
                  },
                  { value: 1 },
                ),
              )
              .max(
                100,
                intl.formatMessage(
                  {
                    id: 'validations.max.number',
                  },
                  { value: 100 },
                ),
              )
              .required(
                intl.formatMessage({
                  id: 'validations.required',
                }),
              ),
          }),
        )
        .required(),
    }),
  });

  const yupSync = yupValidator(schema, form.getFieldsValue);

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < dayjs().subtract(1, 'days');
  };

  const handleFetchLastConfig = async () => {
    const formValues = form.getFieldsValue();

    const result = await getLastSchedule.runAsync(
      {
        farmId: params.id as any,
        pivotId: pivot.id as any,
      },
      {},
    );

    const scheduleIrr = result.content.segment_irrigation_parameters;
    const newList = [];

    for (let index = 0; index < result.content.segment_modes.length; index++) {
      const item1 = result.content.segment_modes[index]
      const item2 = formValues.content.segment_modes[index]


      newList.push({
        ...item2,
        ...item1
      })
    }

     const newValues = {
      ...formValues,
      content: {
        ...formValues.content,
        ...result.content,
        segment_irrigation_parameters: {
          ...result.content.segment_irrigation_parameters,
          garbage: {
            unformated_date: dayjs()
              .year(scheduleIrr.start_time_year + 2000)
              .month(scheduleIrr.start_time_month)
              .date(scheduleIrr.start_time_day)
              .hour(scheduleIrr.start_time_hour)
              .minute(scheduleIrr.start_time_minute),
            end_date: dayjs()
              .year(scheduleIrr.end_time_year + 2000)
              .month(scheduleIrr.end_time_month)
              .date(scheduleIrr.end_time_day)
              .hour(scheduleIrr.end_time_hour)
              .minute(scheduleIrr.end_time_minute),
          },
        },
        segment_modes: newList
      },
    };

    form.setFieldsValue(newValues);
  };

  // used to format the segments to form and map
  React.useEffect(() => {
    const newData = []; // to mapsRender, used in segments
    const formData = []; // to formList, used in segments

    if (pivot && pivot.controllerconfig) {
      for (let i = 0; i < pivot?.controllerconfig?.content?.segments?.length; i++) {
        const segment = pivot?.controllerconfig?.content?.segments[i];
        const group = pivot?.controllerconfig?.segments_crop[i];

        newData.push({
          name: group?.name,
          plantingType: group?.segment_type,
          begin: segment?.angle_start,
          end: segment?.angle_end,
          plantingDate: group?.crop_plant_date,
          harvestDate: group?.crop_harvest_date,
          color: colors[i],
          id: `key-table-segment-${i}`,
        } as any);

        const result = PTPToMillimeter(pivot, 100);

        formData.push({
          percent_forward: 100,
          percent_reverse: 100,
          milimiter: result,
          mode_forward: 1,
          mode_reverse: 1,
          name: group?.name,
          begin_angle: segment?.angle_start,
          end_angle: segment?.angle_end,
        });
      }

      setDataSource(newData);
      form.setFieldValue(['content', 'segment_modes'], formData);
    }
  }, [visible]);

  const RenderTabs: React.FunctionComponent<{ activeTab: string }> = (props) => {
    return (
      <>
        <ProForm.Group>
          <ProFormRadio.Group
            width="sm"
            rules={[yupSync]}
            name={[`mode_${props.activeTab}`]}
            radioType="button"
            label={intl.formatMessage({
              id: 'component.pivot.startirr.form.label.2',
            })}
            options={[
              {
                label: intl.formatMessage({
                  id: 'component.pivot.startirr.form.label.2.opt.1',
                }),
                value: 1,
              },
              {
                label: intl.formatMessage({
                  id: 'component.pivot.startirr.form.label.2.opt.2',
                }),
                value: 2,
              },
            ]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormDigit
            rules={[yupSync]}
            label={intl.formatMessage({
              id: 'component.pivot.startirr.form.label.3',
            })}
            name={[`percent_${props.activeTab}`]}
            width="sm"
            fieldProps={{
              addonAfter: '%',
              controls: false,
            }}
          />
          <ProFormDigit
            disabled
            label={intl.formatMessage({
              id: 'component.pivot.startirr.form.label.4',
            })}
            name={['milimiter']}
            width="sm"
            fieldProps={{
              addonAfter: 'mm',
              controls: false,
            }}
          />
        </ProForm.Group>
      </>
    );
  };

  const RenderCard: React.FunctionComponent = () => {
    /** For segment tab */
    const [tab, setTab] = React.useState('reverse');

    return (
      <ProCard
        style={{ marginTop: -16 }}
        ghost
        tabs={{
          onChange: (key) => {
            setTab(key);
          },
          tabPosition: 'top',
          activeKey: tab,
          items: [
            {
              label: `Reverse`,
              key: 'reverse',
              children: <RenderTabs activeTab={tab} />,
            },
            {
              label: `Forward`,
              key: 'forward',
              children: <RenderTabs activeTab={tab} />,
            },
          ],
        }}
      />
    );
  };

  return (
    <ModalForm<any>
      onOpenChange={(v) => setVisible(v)}
      onFieldsChange={(fields) => {
        // o nome do campo está sempre na ultima posição
        const name = fields[0].name.at(-1);
        // o index caso não seja lixo
        const index = fields[0].name[fields[0].name.length - 2];
        // o index caso seja lixo

        // Caso seja um numero o index
        if (typeof index === 'number') {
          // Caso mude a porcentagem mudar a precipitação
          if (name === 'percent_reverse' || name === 'percent_forward') {
            const result = PTPToMillimeter(pivot, fields[0].value);
            form.setFieldValue(['content', 'segment_modes', index, 'milimiter'], result.toFixed(4));
          }
        } else {
          if (name === 'start_mode') {
            // Caso mude o start_mode ajustar campo de data-hora
            if (fields[0].value === 0) {
              form.setFieldValue(
                ['content', 'segment_irrigation_parameters', 'garbage', 'unformated_date'],
                dayjs(),
              );
            }
          }
        }
      }}
      title={
        <Space>
          {intl.formatMessage({
            id: 'component.pivot.startirr.segment.title',
          })}
          <Button loading={getLastSchedule.loading} onClick={handleFetchLastConfig} style={{}}>
            {intl.formatMessage({
              id: 'component.pivot.startirr.button.loadlast',
            })}
          </Button>
        </Space>
      }
      trigger={
        <Typography.Link style={{ width: '100%' }}>
          {intl.formatMessage({
            id: 'component.pivot.operationalpanel.button.start.opt.3',
          })}
        </Typography.Link>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const startMode = values?.content?.segment_irrigation_parameters.start_mode;
        const endMode = values?.content?.segment_irrigation_parameters.end_mode;
        const startTime = dayjs(
          values?.content?.segment_irrigation_parameters?.garbage?.unformated_date.replace(
            ' ',
            'T',
          ),
        );
        const endTime = dayjs(
          values?.content?.segment_irrigation_parameters?.garbage?.end_date?.replace(' ', 'T'),
        );

        delete values?.content?.segment_irrigation_parameters?.garbage;

        const isStartMode = startMode !== 0 && startMode !== 1
 
        try {
          await postReq.runAsync(
            {
              farmId: params.id as any,
              pivotId: pivot.id as any,
              deviceId: pivot.control as any,
            },
            {
              message_subtype: 'segment',
              equipment: pivot.id,
              content: {
                ...values.content,
                injection_pump_command: {
                  command: 0,
                  note: '',
                },
                autoreversion_command: {
                  command: 1,
                },
                segment_irrigation_parameters: {
                  ...values.content.segment_irrigation_parameters,

                  rounds: values.content?.segment_irrigation_parameters?.rounds | 1,
                  stop_angle: values.content?.segment_irrigation_parameters?.stop_angle | 360,
                  start_time_year: isStartMode ? 0 : startTime.get('y') - 2000,
                  start_time_month: isStartMode ? 0 : startTime.get('M') + 1,
                  start_time_day: isStartMode? 0 : startTime.get('D'),
                  start_time_hour: isStartMode? 0 : startTime.get('h'),
                  start_time_minute: isStartMode ? 0 : startTime.get('m'),
                  end_time_year: endMode !== 5 ? 0 : endTime.get('y') - 2000,
                  end_time_month: endMode !== 5 ? 0 : endTime.get('M') + 1,
                  end_time_day: endMode !== 5 ? 0 : endTime.get('D'),
                  end_time_hour: endMode !== 5 ? 0 : endTime.get('h'),
                  end_time_minute: endMode !== 5 ? 0 : endTime.get('m'),
                },
                segment_modes: values?.content?.segment_modes?.map((item: any, index: number) => {
                  return {
                    percent_forward: item.percent_forward,
                    percent_reverse: item.percent_reverse,
                    mode_forward: item.mode_forward,
                    mode_reverse: item.mode_reverse,
                    number_editing: index,
                  };
                }),
                irrigation_status: {
                  ...values.content.irrigation_status,
                  irrigation_type: 3,
                },
              },
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
      }}
      initialValues={{
        message_subtype: 'segment',
        content: {
          injection_pump_command: {
            command: 0,
            note: '',
          },
          autoreversion_command: {
            command: 1,
          },
          segment_irrigation_parameters: {
            start_mode: 0,
            end_mode: 0,
            rounds: 1,
            stop_angle: 0,
            garbage: {
              unformated_date: dayjs(),
              end_date: dayjs().add(1, 'days'),
            },
          },
          segment_modes: [],
          irrigation_status: {
            irrigation_type: 3,
            irrigation_status: 1,
          },
        },
      }}
    >
      <>
        <ProCard ghost>
          <ProCard ghost colSpan={{ xs: 24, sm: 15, md: 15 }}>
            <ProForm.Group>
              <ProFormRadio.Group
                name={['content', 'irrigation_status', 'irrigation_status']}
                radioType="button"
                label={intl.formatMessage({
                  id: 'component.pivot.startirr.form.label.1',
                })}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.1.opt.1',
                    }),
                    value: 1,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.1.opt.2',
                    }),
                    value: 2,
                  },
                ]}
              />
            </ProForm.Group>

            <ProForm.Group>
              <ProFormRadio.Group
                name={['content', 'segment_irrigation_parameters', 'end_mode']}
                radioType="button"
                label={intl.formatMessage({
                  id: 'component.pivot.startirr.form.label.7',
                })}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.7.opt.1',
                    }),
                    value: 0,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.7.opt.2',
                    }),
                    value: 1,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.7.opt.3',
                    }),
                    value: 3,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.7.opt.4',
                    }),
                    value: 4,
                  },
                  {
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.7.opt.5',
                    }),
                    value: 5,
                  },
                ]}
              />
            </ProForm.Group>
            <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
              {({ content }) => {
                return content?.segment_irrigation_parameters?.end_mode === 5 ? (
                  <ProFormDateTimePicker
                    rules={[yupSync]}
                    name={['content', 'segment_irrigation_parameters', 'garbage', 'end_date']}
                    fieldProps={{
                      disabledDate: disabledDate,
                      allowClear: false,
                    }}
                    label={intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.12',
                    })}
                    width="sm"
                  />
                ) : null;
              }}
            </ProFormDependency>
            <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
              {({ content }) => {
                return content?.segment_irrigation_parameters?.end_mode === 1 ? (
                  <ProFormDigit
                    rules={[yupSync]}
                    name={['content', 'segment_irrigation_parameters', 'stop_angle']}
                    label={intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.8',
                    })}
                    width="sm"
                    fieldProps={{
                      addonAfter: '°',
                      controls: false,
                    }}
                  />
                ) : null;
              }}
            </ProFormDependency>

            <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
              {({ content }) => {
                return content?.segment_irrigation_parameters?.end_mode === 4 ? (
                  <ProFormDigit
                    name={['content', 'segment_irrigation_parameters', 'rounds']}
                    label={intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.11',
                    })}
                    width="sm"
                    fieldProps={{
                      controls: false,
                    }}
                  />
                ) : null;
              }}
            </ProFormDependency>
            <ProFormGroup size={'small'} align="end">
              <ProFormSelect
                rules={[yupSync]}
                request={async () => [
                  {
                    value: 0,
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.5.opt.1',
                    }),
                  },
                  {
                    value: 1,
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.5.opt.2',
                    }),
                  },
                  {
                    value: 2,
                    label: intl.formatMessage({
                      id: 'component.pivot.startirr.form.label.5.opt.3',
                    }),
                  },
                ]}
                width="sm"
                name={['content', 'segment_irrigation_parameters', 'start_mode']}
                label={intl.formatMessage({
                  id: 'component.pivot.startirr.form.label.5',
                })}
              />
              <ProFormDependency name={['content']} colon style={{ width: '100%' }}>
                {({ content }) => {
                  return (
                    <>
                      <ProFormDateTimePicker
                        rules={[yupSync]}
                        width="sm"
                        disabled={content?.segment_irrigation_parameters?.start_mode !== 1}
                        fieldProps={{
                          disabledDate: disabledDate,
                          allowClear: false,
                        }}
                        name={[
                          'content',
                          'segment_irrigation_parameters',
                          'garbage',
                          'unformated_date',
                        ]}
                        label={intl.formatMessage({
                          id: 'component.pivot.startirr.form.label.6',
                        })}
                      />
                    </>
                  );
                }}
              </ProFormDependency>
            </ProFormGroup>
          </ProCard>

          {/** Farm Map */}
          <ProCard ghost colSpan={{ xs: 24, md: 9 }}>
            <GoogleMap
              onLoad={(map) => setMap(map)}
              onZoomChanged={() => {
                if (map !== null) setZoom(map.getZoom());
              }}
              mapContainerStyle={containerStyle}
              center={mapCenter}
              options={{
                zoomControl: false,
                keyboardShortcuts: false,
                rotateControl: false,
                mapTypeControl: false,
                isFractionalZoomEnabled: false,
                scaleControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                panControl: false,
                mapTypeId: 'satellite',
              }}
              zoom={zoom}
            >
              <SegmentedPivotDevice
                center={{ lat: positions?.latitude_center, lng: positions?.longitude_center }}
                referenced={{
                  lat: positions?.latitude_reference,
                  lng: positions?.longitude_reference,
                }}
                segments={dataSource}
              />
            </GoogleMap>
          </ProCard>
        </ProCard>

        <ProFormList
          name={['content', 'segment_modes']}
          creatorButtonProps={false}
          min={1}
          copyIconProps={false}
          deleteIconProps={false}
          itemRender={({ listDom }, { index, record }) => (
            <ProCard
              key={record.name + index}
              collapsible
              defaultCollapsed={index === 0 ? false : true}
              bordered
              style={{ marginBlockEnd: 8 }}
              title={record.name}
              extra={
                <Typography.Title level={5}>
                  {record.begin_angle}° - {record.end_angle}°
                </Typography.Title>
              }
              bodyStyle={{ paddingBlockEnd: 0 }}
            >
              {listDom}
            </ProCard>
          )}
        >
          <RenderCard />
        </ProFormList>
      </>
    </ModalForm>
  );
};

export default StartPivotSegmentComponent;
