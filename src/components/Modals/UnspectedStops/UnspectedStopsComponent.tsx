import * as React from 'react';
import { Button, Col, Flex, Modal, Popover, Row, Space, Spin, Typography } from 'antd';
import { getIntl } from "@umijs/max";
import DeviceMapsRender from '@/components/DeviceMapsRender';
import { ActionType, ProFormDateRangePicker, ProTable } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useRequest } from 'ahooks';
import { getPivotUnspectedStops } from '@/services/pivot';
import { SelectedDeviceModelProps } from '@/models/selected-device';
import { rangePresets } from '@/utils/presets/RangePicker';
import { useScreenHook } from '@/hooks/screen';
import UnspectedStopsDevice from '@/components/Devices/UnspectedStops';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import { InfoCircleOutlined } from '@ant-design/icons';

interface IUnspectedStopsModalProps {
  type: number;
  open: boolean;
  onCancel: any;
  selectedDevice: SelectedDeviceModelProps;
  pivotById: GetPivotByIdModelProps;
}

const intl = getIntl();

const failureTitle: any = {
  1: intl.formatMessage({ id: 'component.pivot.unspectedstops.type.1' }),
  2: intl.formatMessage({ id: 'component.pivot.unspectedstops.type.2' }),
  3: intl.formatMessage({ id: 'component.pivot.unspectedstops.type.3' }),
  4: intl.formatMessage({ id: 'component.pivot.unspectedstops.type.4' }),
};

const Legend: React.FunctionComponent<any> = () => {
  const legends = [
    { color: 'rgba(0, 255, 255, 1)', value: intl.formatMessage({ id: 'component.pivot.unspectedstops.legend.1' }) },
    { color: 'rgba(0, 191, 255, 1)', value: intl.formatMessage({ id: 'component.pivot.unspectedstops.legend.2' }) },
    { color: 'rgba(0, 0, 255, 1)', value: intl.formatMessage({ id: 'component.pivot.unspectedstops.legend.3' }) },
    { color: 'rgba(0, 0, 159, 1)', value: intl.formatMessage({ id: 'component.pivot.unspectedstops.legend.4' }) },
    { color: 'rgba(63, 0, 91, 1)', value: intl.formatMessage({ id: 'component.pivot.unspectedstops.legend.5' }) },
    { color: 'rgba(191, 0, 31, 1)', value: intl.formatMessage({ id: 'component.pivot.unspectedstops.legend.6' }) },
  ]

  return <Space direction='vertical'>
    {legends.map((item, index) => <Flex key={index} gap={12}>
      <div style={{ background: item.color, width: 20, height: 20 }} />
      <Typography>{item.value}</Typography>
    </Flex>)}
  </Space>
}

const UnspectedStopsModalComponent: React.FunctionComponent<IUnspectedStopsModalProps> = (props) => {
  const ref = React.useRef<ActionType>();
  const [dates, setDates] = React.useState<any>([dayjs().subtract(1, 'month'), dayjs()]);
  const [selected, setSelected] = React.useState<any>(undefined);
  const { md, } = useScreenHook();

  const { selectedDevice } = props

  const getUnspectedReq = useRequest(getPivotUnspectedStops, {
    manual: true,
  })

  const classNameTable = useEmotionCss(({ token }) => {
    return {
      '.g2-html-annotation': {
        color: `${token.colorText} !important`,
      },
    };
  });

  React.useEffect(() => {
    if (props.open) {
      getUnspectedReq.run(
        { farmId: selectedDevice.farmId, pivotId: selectedDevice.deviceId },
        { start_date: dates[0].format('YYYY-MM-DD'), end_date: dates[1].format('YYYY-MM-DD') }
      )
    }
  }, [props.open, dates])

  const item = props.pivotById?.loaded ? props.pivotById.result : undefined;

  return (
    <Modal
      title={props.type !== undefined ? failureTitle[props.type] : failureTitle[1]}
      width={md ? 1020 : "100%"}
      destroyOnClose={true}
      open={props.open}
      onCancel={props.onCancel}
      footer={false}
    >
      <Spin spinning={getUnspectedReq.loading}>
        <Row gutter={[20, 20]}>
          <Col xs={24} md={12} style={{ height: 400 }}>
            <DeviceMapsRender height={400} showDevice={false}>
              {item && getUnspectedReq && !getUnspectedReq.loading &&
                <UnspectedStopsDevice
                  id="heat-map-device"
                  option={selected}
                  centerLat={item.centerLat}
                  centerLng={item.centerLng}
                  referenceAngle={item.referenceAngle}
                  referencedLat={item.referencedLat}
                  referencedLng={item.referencedLng}
                  deviceColor={item.deviceColor}
                  data={getUnspectedReq.data?.data?.map((item) => {
                    return { lat: item?.location?.latitude, lng: item?.location?.longitude }
                  })}
                />}
              <Popover placement="bottomLeft" title={intl.formatMessage({ id: 'component.pivot.unspectedstops.legend.title' }) } content={<Legend />} >
                <Button style={{ marginTop: 12, marginLeft: 12 }} shape='circle' ><InfoCircleOutlined /></Button>
              </Popover>

            </DeviceMapsRender>
          </Col>
          <Col xs={24} md={12}  >
            <ProTable<any>
              onRow={(record,) => {
                return {
                  onClick: () => {
                    const split = record.location.split(',')
                    console.log({ lat: parseFloat(split[0]), lng: parseFloat(split[1]) })
                    setSelected({ lat: parseFloat(split[0]), lng: parseFloat(split[1]) })
                  }, // click row
                };
              }}
              toolbar={{
                title: intl.formatMessage({ id: 'component.pivot.unspectedstops.table.title' }),
                filter: (
                  <ProFormDateRangePicker
                    disabled={getUnspectedReq.loading}
                    name="startdate"

                    noStyle
                    fieldProps={{
                      presets: rangePresets,
                      onChange: (v) => {
                        if (v && v[0] && v[1]) {
                          setDates(v);
                          ref.current?.reload();
                        }
                      },

                      value: dates,
                    }}
                  />
                ),
              }}
              ghost
              dataSource={getUnspectedReq.data?.data?.map((item, index) => ({
                location: `${item.location?.latitude},${item.location.longitude}`,
                hour: dayjs(item.datetime).format("DD/HH/YYYY HH:MM"),
                angle: item.angle,
                key: `device-dot-table-${index}`
              }))}
              columns={[
                {
                  title: intl.formatMessage({
                    id: 'component.pivot.unspectedstops.table.col.1',
                  }),
                  dataIndex: 'location',

                },
                {
                  title: intl.formatMessage({
                    id: 'component.pivot.unspectedstops.table.col.2',
                  }),
                  dataIndex: 'hour',
                },
                {
                  sortDirections: ['ascend', 'descend'],
                  sorter: (a, b) => b.angle - a.angle,
                  defaultSortOrder: 'descend',

                  title: intl.formatMessage({
                    id: 'component.pivot.unspectedstops.table.col.3',
                  }),
                  render: (val) => (<>{`${val}°`}</>),
                  dataIndex: 'angle',
                },
              ]}
              rowKey="key"
              options={false}
              search={false}
              pagination={{
                pageSize: 6,
                showSizeChanger: false
              }}
              dateFormatter="string"
              className={classNameTable}
              actionRef={ref}
            />
          </Col>
        </Row>
      </Spin>
    </Modal>
  )
};


export default UnspectedStopsModalComponent  
