import { PresetStatusColorType } from '@/typings';
import {
  EditOutlined,
  LoadingOutlined,
  QrcodeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  ActionType,
  ProCard,
  ProColumns,
  ProForm,
  ProFormText,
  ProTable,
  ProFormSelect
} from '@ant-design/pro-components';
import { Request, useParams, useIntl } from '@umijs/max';
import { GetIrpdModelProps, destroyIrpdWs, queryIrpdWs } from '@/models/irpd';
import { GetMeterSystemModelProps, destroyMeterSystemWs, queryMeterSystemWs } from '@/models/meter-sysem';
import pivot, { GetPivotModelProps, destroyPivotWs, queryPivotWs } from '@/models/pivot';
import { useRequest } from 'ahooks';
import {
  Alert,
  App,
  Button,
  Badge,
  Breakpoint,
  Col,
  Form,
  List,
  Modal,
  Space,
  Tooltip,
  Typography
} from 'antd';
import { CloseOutline, RedoOutline } from 'antd-mobile-icons';
import * as React from 'react';
import QRCodeScannerContainer from '../QRCode/QRCodeContainer';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';

type ColSpanType = number | string;

type IRadioInputComponentProps = {
  label: string;
  operable: boolean;
  status: PresetStatusColorType;
  span?: Partial<Record<Breakpoint, ColSpanType>>;
  deviceType: string;
  device: string;
  request?: Request;
  requestSwapChange?: any;
  requestChange?: any;
  requestPivots?: any;
  requestIrpds?: any;
  requestMeterSystem?: any;
  requestBase?: any;
  deviceId: string;
  fieldIndex?: string;
  name?: string[];
  setFieldValue: any;
  form: any;
  requestDeviceId: string;
  requestAfterChange?: any;
  queryPivotWs: typeof queryPivotWs;
  destroyPivotWs: typeof destroyPivotWs;
  queryIrpdWs: typeof queryIrpdWs;
  destroyIrpdWs: typeof destroyIrpdWs;
  queryMeterSystemWs: typeof queryMeterSystemWs;
  destroyMeterSystemWs: typeof destroyMeterSystemWs;
  pivot: GetPivotModelProps;
  pivotById: GetPivotByIdModelProps;
  irpd: GetIrpdModelProps;
  meterSystem: GetMeterSystemModelProps;
}

const RadioInputComponent: React.FunctionComponent<IRadioInputComponentProps> = (props) => {
  const { message } = App.useApp();
  const params = useParams();
  const intl = useIntl();
  const [ centralForm ] = Form.useForm();
  const centralFormRef = React.useRef()
  const actionRef = React.useRef<ActionType>();

  const [isEditing, setIsEditing] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isCentralOpen, setIsCentralOpen] = React.useState(false);
  const [qrReaderEnable, setQrReaderEnable] = React.useState(false);
  const [innerQrReaderEnable, setInnerQrReaderEnable] = React.useState(false);
  const [counter, setCounter] = React.useState<number>(0);
  const [dropdownDevices, setDropdownDevices] = React.useState([
    {
      label: intl.formatMessage({ id: 'component.radio.modal.base.fields.device.placeholder' }),
      value: -1,
    }
  ]);
  const [wsStatus, setWsStatus] = React.useState<{
    id: number;
    status: number;
    type: string;
  }[]>([]);

  const reqGet = useRequest(props.request as any, { manual: true });
  const reqPost = useRequest(props.requestSwapChange as any, { manual: true });
  const reqManual = useRequest(props.requestChange as any, { manual: true });
  const reqBase = useRequest(props.requestBase as any, { manual: true })

  const { label, status, operable, span, device, deviceType, fieldIndex } = props;

  const onOpenCentralModal = React.useCallback(async () => {
    // Step 1. Retrieve farm devices from irpq and pivots 
    props.queryPivotWs({ id: params.id as any, });
    props.queryIrpdWs({ id: params.id as any, });
    props.queryMeterSystemWs({ id: params.id as any, });
    setIsCentralOpen(true)
    
    // Step 2 join into a datasource for select element
    setDropdownDevices([
      {
        label: intl.formatMessage({ id: 'component.radio.modal.base.fields.device.placeholder' }),
        value: -1,
      }
    ]);
  }, [
    params, 
    props.queryPivotWs, 
    props.queryIrpdWs, 
    props.queryMeterSystemWs, 
    setIsCentralOpen,
     setDropdownDevices
  ])

  const onSave = async () => {
    try {
      switch (device) {
        
        case 'pivô':
          await reqManual.runAsync(
            {
              farmId: params.farmId as any,
              pivotId: params.pivotId as any,
            },
            { radio_id: props.form.getFieldValue(props.name) },
          );
          break;

        case 'imanage':
          await reqManual.runAsync(
            {
              farmId: params.farmId as any,
              meterSystemId: params.meterSystemId,
              meterId: params.meterId,
            },
            { radio_id: props.form.getFieldValue(props.name) },
          );
          break;

        case 'repeater':
          await reqManual.runAsync(
            {
              farmId: params.farmId as any,
              repeaterId: params.repeaterId,
            },
            { radio_id: props.form.getFieldValue(props.name) },
          );
          break;

        case 'pump':
          await reqManual.runAsync(
            {
              farmId: params.farmId as any,
              irpdId: params.irpdId,
            },
            { radio_id: props.form.getFieldValue(props.name) },
          );
          break;

        case 'central':
          break;

      };

      setIsEditing(false);
      message.success('Salvo com sucesso');
    } catch (err) {
      message.error('Fail');
    }
  };

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'name',
      valueType: 'text',
      title: 'Nome',
    },
    {
      dataIndex: 'radio',
      valueType: 'text',
      title: 'Rádio',
    },
    {
      title: 'Ações',
      valueType: 'option',
      key: 'option',
      render: (_, item) => [
        <a
          key="editable"
          onClick={async () => {
            switch (device) {

              case 'pivô':
                await reqPost.runAsync({
                  farmId: params.farmId as any,
                  pivotId: params.pivotId as any,
                  deviceId: item.id as any,
                });
                props.requestAfterChange({
                  farmId: params.farmId as any,
                  pivotId: params.pivotId as any,
                });
                break;

              case 'imanage':
                await reqPost.runAsync(
                  {
                    farmId: params.farmId as any,
                    meterSystemId: params.meterSystemId as any,
                    meterId: params.meterId,
                    newMeterId: item.id,
                  },
                  { radio_id: item.radio },
                );
                props.requestAfterChange({
                  farmId: params.farmId as any,
                  meterId: params.meterSystemId as any,
                });
                break;

              case 'repeater':
                await reqPost.runAsync(
                  {
                    farmId: params.farmId as any,
                    repeaterId: params.repeaterId as any,
                    repeaterToSwapId: item.id,
                  },
                );
                props.requestAfterChange({
                  farmId: params.farmId as any,
                  repeaterId: params.repeaterId as any,
                });
                break;

              case 'pump':
                await reqPost.runAsync(
                  {
                    farmId: params.farmId as any,
                    irpdId: params.irpdId as any,
                    irpdToSwapId: item.id,
                  },
                );
                props.requestAfterChange({
                  farmId: params.farmId as any,
                  irpdId: params.irpdId as any,
                });
                break;
            };

            message.success('Rádios trocados com sucesso');
            setIsOpen(false);
          }}
        >
          TROCAR
        </a>,
      ],
    },
  ];

  // Helpers
  const getEquipmentStatusLabel = React.useCallback((status: number) => {
    switch (status) {
      case 2:
        return intl.formatMessage({
          id: 'component.edit.farm.general.status.delivered',
        });

      case 3:
        return intl.formatMessage({
          id: 'component.edit.farm.general.status.error',
        });
      
      case 1:
        return intl.formatMessage({
          id: 'component.edit.farm.general.status.sent',
        });

      case -1:
        return intl.formatMessage({
          id: 'component.edit.farm.general.status.waiting',
        });

      default:
        return intl.formatMessage({
          id: 'component.edit.farm.general.status.waiting',
        });

    }
  }, [intl])

  const getEquipmentStatus = React.useCallback((status: number) => {
    switch (status) {
      case 2:
        return "success";

      case 3:
        return "error";
      
      case 1:
        return "warning";

      case -1:
        return "processing";

      default:
        return "default";
    }
  }, [])

  // Update central radio list
  React.useEffect(() => {
    if (
      props.pivot?.result &&
      props.meterSystem?.result && 
      props.irpd?.result
    ) {
      const pivotResults = props.pivot.result as any;
      const irpdResults = props.irpd.result as any;
      const meterResults = props.meterSystem.result as any;
      const pivotsDatasource = pivotResults.map((r: any) => ({
        label: r.name,
        value: r.id,
      }))
      const irpdDatasource = irpdResults.map((r: any) => ({
        label: r.name,
        value: r.id,
      }))
      const meterDatasource = meterResults.map((r: any) => ({
        label: r.name,
        value: r.id,
      }))
      setDropdownDevices([
        {
          label: intl.formatMessage({ id: 'component.radio.modal.base.fields.device.placeholder' }),
          value: -1,
        },
        ...pivotsDatasource,
        ...irpdDatasource,
        ...meterDatasource
      ]);
    }

  }, [props.irpd, props.pivot, props.meterSystem]);

  React.useEffect(() => {
    const pivotsMapped = props.pivot.status.map(s => ({
      id: s.id,
      status: s.status,
      type: 'pivot',
    }));
    const irpdMapped = props.pivot.status.map(s => ({
      id: s.id,
      status: s.status,
      type: 'irpd',
    }));
    const meterSystemMapped = props.pivot.status.map(s => ({
      id: s.id,
      status: s.status,
      type: 'meterSystem',
    }));
    setWsStatus([
      ...pivotsMapped,
      ...irpdMapped,
      ...meterSystemMapped,
    ]);
  }, [
    props.pivot.status,
    props.irpd.status,
    props.meterSystem.status,
  ]);

  // Update equipment counter
  React.useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(prev => prev -1), 1000);
    }
  }, [counter]);

  return (
    <Col {...span}>
      <Modal
        title={
          <Typography.Title level={3}>
            {intl.formatMessage({ id: 'component.radio.modal.base.title' })}
          </Typography.Title>
        }
        style={{ padding: 0 }}
        width={500}
        footer={false}
        open={isCentralOpen}
        destroyOnClose
        onCancel={() => {
          props.destroyPivotWs();
          props.destroyIrpdWs();
          props.destroyMeterSystemWs();
          setIsCentralOpen(false);
          setWsStatus([]);
        }}
      >
        <ProCard
          size="small"
          headerBordered
          title={label}
          bordered
          bodyStyle={{ padding: 16 }}
          style={{ marginBottom: 16 }}
        >
          {innerQrReaderEnable ? (
            <QRCodeScannerContainer
              setFieldValue={props.setFieldValue}
              handleVisible={setInnerQrReaderEnable}
            />
          ) : null}
          <ProFormText
            name={props.name}
            noStyle
            disabled={isLoading}
            fieldProps={{
              addonAfter: (
                <QrcodeOutlined
                  onClick={() => setInnerQrReaderEnable(prev => !prev)}
                />
              ),
              suffix: operable ? (
                <Tooltip
                  title={
                    status === 'processing'
                      ? intl.formatMessage({ id: 'component.radio.status.processing' })
                      : status === 'default'
                      ? intl.formatMessage({ id: 'component.radio.status.default' })
                      : status === 'success'
                      ? intl.formatMessage({ id: 'component.radio.status.success' })
                      : intl.formatMessage({ id: 'component.radio.status.default' })
                  }
                >
                  <Badge status={status} />
                </Tooltip>
              ) : null,
            }}
          />
        </ProCard>
        <ProForm
          name="central_radio"
          layout="vertical"
          rowProps={{ gutter: [8, 8] }}
          submitter={false}
          form={centralForm}
          formRef={centralFormRef}
          initialValues={{ send_updates: -1 }}
          style={{ marginBottom: 16 }}
          onFinish={async (values: any) => {
            setLoading(true);
            const payload = {
              equipment_id: values.send_updates,
              radio_id: props.form.getFieldValue(props.name)
            }
            try {
              // Update base endpoint (WS Update clock trigger)
              const selectedEquipment = values.send_updates;
              await reqBase.runAsync({ id: params.id }, payload);

              // Update all equipments
              if (selectedEquipment === -1) {
                setCounter((
                  props.pivot.result.length +
                  props.irpd.result.length +
                  props.meterSystem.result.length
                ) * 6);
              } else {
                setCounter(20);
              }

              // Message user
              message.success(intl.formatMessage({
                id: 'component.radio.messages.base.success',
              }));
            } catch (_) {
              message.error(intl.formatMessage({
                id: 'component.radio.messages.base.error'
              }));
            }
            setLoading(false);
          }}
          grid
        >
          <ProFormSelect
            label={intl.formatMessage({ id: 'component.radio.modal.base.fields.device.label' })}
            name={['send_updates']}
            options={dropdownDevices}
          />
          <Alert
            message={ intl.formatMessage({ id: 'component.radio.warning.message' })}
            type="warning"
            style={{ marginBottom: 8 }}
            showIcon
          />
          <Button
            icon={<SaveOutlined />}
            type="primary"
            onClick={centralForm.submit}
            block
          >
            {intl.formatMessage({
              id: 'component.edit.farm.button.save',
            })}
          </Button>
        </ProForm>
        {
          counter > 0 ? (
            <p>Updating counter: {counter}</p>
          ) : null
        }
        <List
          bordered
          dataSource={dropdownDevices}
          id="transparent-list-scrollbar"
          style={{
            maxHeight: '192px',
            overflowY: 'auto',
            paddingLeft: '12px',
          }}
          loading={
            props.pivot.loading
          }
          renderItem={(item, index) => index !== 0 ? (
            <List.Item
              actions={
                wsStatus.some(s => (
                  s.id === item.value &&
                  s.status !== 0
                )) ? [
                  <Tooltip
                    key="tooltip_status"
                    title={getEquipmentStatusLabel(
                      wsStatus.find(s => s.id === item.value)!.status
                    )}
                  >
                    <Badge
                      status={
                        getEquipmentStatus(
                          wsStatus.find(s => s.id === item.value)!.status
                        )
                      }
                    />
                  </Tooltip>
                ] : []
              }
            >
              <Typography.Text>{item.label}</Typography.Text>
            </List.Item>
          ) : <></>}
        />
      </Modal>
      <Modal
        title={`Trocar o rádio do ${deviceType}`}
        style={{ padding: 0 }}
        width={690}
        footer={false}
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        destroyOnClose={true}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>{`Selecione o ${device} para trocar o rádio do ${deviceType}.`}</Typography.Text>
          <ProTable<any>
            style={{ width: '100%' }}
            columns={columns}
            actionRef={actionRef}
            ghost
            request={async () => {
              let result: any = [];
              if (device === 'pivô') {
                result = await reqGet.runAsync({
                  farmId: params.farmId as any,
                  pivotId: params.pivotId as any,
                });
              }
              else if (device === 'imanage') {
                result = await reqGet.runAsync({
                  farmId: params.farmId as any,
                  meterSystemId: params.meterSystemId as any,
                });
              }
              else if (device === 'repeater') {
                result = await reqGet.runAsync({
                  farmId: params.farmId as any,
                });
              }
              else if (device === 'pump') {
                result = await reqGet.runAsync({
                  farmId: params.farmId as any,
                });
              }

              const mapped = result.map((item: any, index: number) => ({
                name: item.name,
                radio: item[fieldIndex as string].radio_id,
                id: item.id,
                key: `key-value-${fieldIndex}-${index}`,
                index: `key-value-${fieldIndex}-${index}`,
              }));

              return {
                data: mapped,
              };
            }}
            rowKey="id"
            search={false}
            options={{
              setting: {
                listsHeight: 400,
              },
            }}
            pagination={{
              pageSize: 10,
              onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="Dados"
          />
        </Space>
      </Modal>
      <ProCard
        size="small"
        headerBordered
        title={label}
        extra={
          operable ? (
            <Space size={12}>
              {!isEditing ? (
                <>
                  {
                    device !== 'central' ? (
                      <>
                        <Tooltip title={'Editar rádio'}>
                          <EditOutlined onClick={() => setIsEditing(true)} />
                        </Tooltip>
                        <Tooltip title={'Trocar o rádio do GPS'}>
                          <RedoOutline onClick={() => setIsOpen(true)} />
                        </Tooltip>
                      </>
                    ): (
                      <Tooltip title={'Editar rádio'}>
                        <EditOutlined onClick={onOpenCentralModal} />
                      </Tooltip>
                    )
                  }
                </>
              ) : null}
              {isEditing ? (
                <>
                  <Tooltip title={'Salvar'}>
                    {reqManual.loading ? (
                      <LoadingOutlined />
                    ) : (
                      <SaveOutlined onClick={() => onSave()} />
                    )}
                  </Tooltip>
                  <Tooltip title={'Cancelar'}>
                    <CloseOutline onClick={() => setIsEditing(false)} />
                  </Tooltip>
                </>
              ) : null}
            </Space>
          ) : null
        }
        bordered
        bodyStyle={{ padding: 16 }}
      >
        {qrReaderEnable ? (
          <QRCodeScannerContainer
            setFieldValue={props.setFieldValue}
            handleVisible={setQrReaderEnable}
          />
        ) : null}

        <ProFormText
          name={props.name}
          noStyle
          disabled={!isEditing}
          fieldProps={{
            addonAfter: isEditing ? (
              <QrcodeOutlined
                onClick={() => setQrReaderEnable(!qrReaderEnable)}
              />
            ) : null,
            suffix: operable ? (
              <Tooltip
                title={
                  status === 'processing'
                    ? intl.formatMessage({ id: 'component.radio.status.processing' })
                    : status === 'default'
                    ? intl.formatMessage({ id: 'component.radio.status.default' })
                    : status === 'success'
                    ? intl.formatMessage({ id: 'component.radio.status.success' })
                    : intl.formatMessage({ id: 'component.radio.status.default' })
                }
              >
                <Badge status={status} />
              </Tooltip>
            ) : null,
          }}
        />
      </ProCard>
    </Col>
  );
};

export default RadioInputComponent;
