import * as React from 'react';
import { Col, Modal, Row, Spin } from 'antd';
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

const UnspectedStopsModalComponent: React.FunctionComponent<IUnspectedStopsModalProps> = (props) => {
  const ref = React.useRef<ActionType>();
  const [dates, setDates] = React.useState<any>([dayjs().subtract(1, 'month'), dayjs()]);
  const [selected, setSelected] = React.useState<any>(-1);
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
      destroyOnClose
      open={props.open}
      onCancel={props.onCancel}
      footer={false}
    >
      <Spin spinning={getUnspectedReq.loading}>
        <Row gutter={[20, 20]}>
          <Col xs={24} md={12} style={{ height: 400 }}>
            <DeviceMapsRender height={400} showDevice={false}>
              {item && getUnspectedReq && !getUnspectedReq.loading && <UnspectedStopsDevice
                id="heat-map-device"
                centerLat={item.centerLat}
                centerLng={item.centerLng}
                referencedLat={item.referencedLat}
                referencedLng={item.referencedLng}
                deviceColor={item.deviceColor}
                data={getUnspectedReq.data?.data?.map((item) => {
                  return { lat: item?.location?.latitude, lng: item?.location?.longitude }
                })}
              />}
            </DeviceMapsRender>
          </Col>
          <Col xs={24} md={12}  >
            <ProTable<any>
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    setSelected(rowIndex)
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
                hour: dayjs(item.datetime).format("HH:MM"),
                angle: `${item.angle}°`,
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
                  title: intl.formatMessage({
                    id: 'component.pivot.unspectedstops.table.col.3',
                  }),
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
