import { queryPivotByIdStart } from '@/models/pivot-by-id';
import { PresetStatusColorType } from '@/typings';
import { EditOutlined, LoadingOutlined, QrcodeOutlined, SaveOutlined } from '@ant-design/icons';
import { ActionType, ProCard, ProColumns, ProFormText, ProTable } from '@ant-design/pro-components';
import { Request, useParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Badge, Breakpoint, Col, Modal, Space, Tooltip, Typography } from 'antd';
import { CloseOutline, RedoOutline } from 'antd-mobile-icons';
import * as React from 'react';
import QRCodeScannerContainer from '../QRCode/QRCodeContainer';

type ColSpanType = number | string;

interface IRadioInputComponentProps {
  label: string;
  operable: boolean;
  status: PresetStatusColorType;
  span?: Partial<Record<Breakpoint, ColSpanType>>;
  deviceType: string;
  device: string;
  request?: Request;
  requestSwapChange?: any;
  requestChange?: any;
  deviceId: string;
  fieldIndex?: string;
  name?: string[];
  setFieldValue: any;
  form: any;
  requestDeviceId: string;
  queryPivotByIdStart: typeof queryPivotByIdStart;
}

const RadioInputComponent: React.FunctionComponent<IRadioInputComponentProps> = (props) => {
  const { message } = App.useApp();
  const params = useParams();
  const actionRef = React.useRef<ActionType>();

  const [isEditing, setIsEditing] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [qrReaderEnable, setQrReaderEnable] = React.useState(false);

  const reqGet = useRequest(props.request as any, { manual: true });
  const reqPost = useRequest(props.requestSwapChange as any, { manual: true });
  const reqManual = useRequest(props.requestChange as any, { manual: true });

  const { label, status, operable, span, device, deviceType, fieldIndex } = props;

  const onSave = async () => {
    try {
      if(device === 'pivô') {
        await reqManual.runAsync(
          {
            farmId: params.farmId as any,
            pivotId: params.pivotId as any,
          },
          { radio_id: props.form.getFieldValue(props.name) },
        );
      }
      else if (device === 'imanage') {
        await reqManual.runAsync(
          {
            farmId: params.farmId as any,
            meterSystemId: params.meterSystemId,
            meterId: params.meterId,
          },
          { radio_id: props.form.getFieldValue(props.name) },
        );
      }
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
            console.log(item)

            if (device === 'pivô') {
              await reqPost.runAsync({
                farmId: params.farmId as any,
                pivotId: params.pivotId as any,
                deviceId: item.id as any,
              });
            }
            else if (device === 'imanage') {
              await reqPost.runAsync({
                farmId: params.farmId as any,
                meterSystemId: params.meterSystemId as any,
                meterId: params.meterId,
                newMeterId: item.id
              },
              { radio_id: item.radio },
              );
            }

            // if (device === 'pivô')
            //   props.queryPivotByIdStart({
              //     farmId: params.farmId as any,
              //     [props.requestDeviceId]: params[props.requestDeviceId] as any,
              //   });
            message.success('Rádios trocados com sucesso');
            setIsOpen(false);
          }}
        >
          TROCAR
        </a>,
      ],
    },
  ];

  console.log(props.requestDeviceId);

  return (
    <Col {...span}>
      <Modal
        title={`Trocar o rádio do ${deviceType}`}
        bodyStyle={{ padding: 0 }}
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

              if (device === 'imanage') {
                result = await reqGet.runAsync({
                  farmId: params.farmId as any,
                  meterSystemId: params.meterSystemId as any,
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
                  <Tooltip title={'Editar rádio'}>
                    <EditOutlined onClick={() => setIsEditing(true)} />
                  </Tooltip>
                  <Tooltip title={'Trocar o rádio do GPS'}>
                    <RedoOutline onClick={() => setIsOpen(true)} />
                  </Tooltip>
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
              <QrcodeOutlined onClick={() => setQrReaderEnable(!qrReaderEnable)} />
            ) : null,
            suffix: operable ? (
              <Tooltip
                title={
                  status === 'processing'
                    ? 'Processando'
                    : status === 'default'
                    ? 'Não recebido'
                    : status === 'success'
                    ? 'Recebido'
                    : 'Não Recebido'
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
