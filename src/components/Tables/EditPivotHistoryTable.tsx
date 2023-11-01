import { favoritePivotConfig, getEditPivotHistory } from '@/services/pivot';
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
import { useRequest } from 'ahooks';
import { Form, Space, Tooltip } from 'antd';
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

interface IEditPivotHistoryTableProps {}

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

const EditPivotHistoryTable: React.FunctionComponent<IEditPivotHistoryTableProps> = (props) => {
  const actionRef = React.useRef<ActionType>();
  const reqEditPivot = useRequest(getEditPivotHistory, { manual: true });
  const reqFavorite = useRequest(favoritePivotConfig, { manual: true });

  const [form] = Form.useForm<any>();

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: 'Data',
      key: 'showTime',
      dataIndex: 'created',
      valueType: 'date',
    },
    {
      title: 'Por',
      dataIndex: 'created_by',
      valueType: 'text',
    },
    {
      title: 'Controlador',
      dataIndex: 'controller',
      key: 'Controlador',
      valueEnum: {
        0: { text: 'Não enviado', status: 'Default' },
        1: {
          text: 'Aguardando recebimento',
          status: 'Processing',
        },
        2: { text: 'Recebida', status: 'Success' },
      },
    },
    {
      title: 'Hardware',
      dataIndex: 'hardware',
      key: 'Hardware',
      valueEnum: {
        0: { text: 'Não enviado', status: 'Default' },
        1: {
          text: 'Aguardando recebimento',
          status: 'Processing',
        },
        2: { text: 'Recebida', status: 'Success' },
      },
    },
    {
      title: 'GPS',
      dataIndex: 'gps',
      key: 'GPS',
      valueEnum: {
        0: { text: 'Não enviado', status: 'Default' },
        1: {
          text: 'Aguardando recebimento',
          status: 'Processing',
        },
        2: { text: 'Recebida', status: 'Success' },
      },
    },
    {
      title: 'Bomba',
      dataIndex: 'pump',
      key: 'Bomba',
      valueEnum: {
        0: { text: 'Não enviado', status: 'Default' },
        1: {
          text: 'Aguardando recebimento',
          status: 'Processing',
        },
        2: { text: 'Recebida', status: 'Success' },
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>Ações</div>,
      valueType: 'option',
      key: 'option',

      render: (value, item: any) => [
        <ModalForm<{
          name: string;
          company: string;
        }>
          title={`Tem certeza que deseja ${item.full.pinned ? 'desfavoritar' : 'favoritar'}?`}
          key={'key-star'}
          trigger={
            <Tooltip key={'key-star'} title={item.full.pinned ? 'Desfavoritar' : 'Favoritar'}>
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
            await reqFavorite.runAsync(
              { configId: item.full.id, farmId: '133', pivotId: '275' },
              { pinned: !item.full.pinned, ...values },
            );
            actionRef.current?.reload();
            return true;
          }}
        >
          {item.full.pinned ? null : (
            <ProFormText name="name" label="Nome" placeholder="Favoritagem 2" />
          )}
        </ModalForm>,
        <Tooltip title="Carregar configuração" key={'key-import'}>
          <span style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
            <UploadOutlined />
          </span>
        </Tooltip>,
      ],
    },
  ];

  const expandedRowRender = (items: any) => {
    const { full } = items;
    const { content } = full;

    return (
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <ProDescriptions
          column={3}
          title={'Geral'}
          tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
        >
          <ProDescriptions.Item label="Nome do pivô" valueType="text">
            {full.name_pivot_on_config}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Linguagem do dispositivo" valueEnum={LanguageEnum}>
            {content.language?.language}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Raio até a última torre" valueType="text">
            {content?.pivot_parameters?.radius_last?.toFixed(1).toString()} m
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Vazão" valueType="text">
            {content?.pivot_parameters?.flow_rate?.toFixed(2).toString()} m³/h
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Veloc. da última torre" valueType="text">
            {content?.pivot_parameters?.speed} m/h
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Área irrigada" valueType="text">
            {content?.pivot_parameters?.radius_last.toFixed(1).toString()} ha
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Fabricante" valueType="text">
            Lindsay
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Tipo de Painel" valueEnum={PanelTypeEnum}>
            {full?.panel_type}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Controlador de tensão" valueEnum={VoltageLimitEnableEnum}>
            {content?.voltage_limit_enable?.voltage_limit_enable}
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={'Localização'}
          tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
        >
          <ProDescriptions.Item label="Centro" valueType="text">
            -18.911352,-50.910253
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Referência Inicial" valueType="text">
            -18.917371,-50.909439
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Utilizar Norte como Referência" valueType="text">
            Desativado
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={'Horário'}
          tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
        >
          <ProDescriptions.Item label="Data do equipamento" valueType="text">
            29 Out 23 - 19:26
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={'Bomba'}
          tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
        >
          <ProDescriptions.Item label="Potência da bomba" valueType="text">
            -18.911352,-50.910253
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Tempo de energia" valueType="text">
            -18.917371,-50.909439
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Leitura de pressão" valueType="text">
            Por pressostato
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Tempo de bomba" valueType="text">
            10 min
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Tempo de retardo" valueType="text">
            30 s
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Tempo instável de pressostato" valueType="text">
            10 min
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Ativar Fertirrigação" valueType="text">
            Desativado
          </ProDescriptions.Item>
        </ProDescriptions>

        <ProDescriptions
          column={2}
          title={'Pluviômetro'}
          tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
        >
          <ProDescriptions.Item label="Condição de parada" valueType="text">
            Por decremento
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Escala do sensor" valueType="text">
            0.2 mm
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={'Horário de Pico'}
          tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
        >
          <ProDescriptions.Item label="Ponta" valueType="text">
            R$ 1.00
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Fora de Ponta" valueType="text">
            R$ 1.00
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Reduzido" valueType="text">
            R$ 1.00
          </ProDescriptions.Item>
          <ProDescriptions.Item label="DOM" valueType="text">
            Desativado
          </ProDescriptions.Item>
          <ProDescriptions.Item label="SEG" valueType="text">
            Desativado
          </ProDescriptions.Item>
          <ProDescriptions.Item label="TER" valueType="text">
            Desativado
          </ProDescriptions.Item>
          <ProDescriptions.Item label="QUA" valueType="text">
            Desativado
          </ProDescriptions.Item>
          <ProDescriptions.Item label="QUI" valueType="text">
            Desativado
          </ProDescriptions.Item>
          <ProDescriptions.Item label="SEX" valueType="text">
            Desativado
          </ProDescriptions.Item>
          <ProDescriptions.Item label="SÁB" valueType="text">
            Desativado
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Início do horário de pico" valueType="text">
            17:55
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Final do horário de pico" valueType="text">
            21:05
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={'Canhão Final'}
          tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
        >
          <ProDescriptions.Item label="Condição de parada" valueType="text">
            Sempre desligado
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions
          column={3}
          title={'Autoversão'}
          tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
        >
          <ProDescriptions.Item label="Condição de parada" valueType="text">
            Por fim de curso
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Tempo de espera para autoreversão:" valueType="text">
            30 segundos
          </ProDescriptions.Item>
        </ProDescriptions>
      </Space>
    );
  };

  return (
    <>
      <ProDescriptions
        column={2}
        title={'Histórico de Configurações'}
        tooltip="Magna velit et ipsum do nisi ullamco irure incididunt do."
      >
        <ProDescriptions.Item
          dataIndex={'testes'}
          label={<HistoryOutlined style={{ fontSize: 20 }} />}
          valueType="text"
        >
          Todas as Configurações
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex={'testes2'}
          label={<StarFilled style={{ fontSize: 20 }} />}
          valueType="text"
        >
          Configurações Favoritas
        </ProDescriptions.Item>

        <ProDescriptions.Item
          dataIndex={'testes'}
          valueEnum={{
            0: { text: 'A configuração não foi enviada para o equipamento', status: 'Default' },
            1: {
              text: 'A configuração foi enviada para o equipamento, mas não foi recebida',
              status: 'Processing',
            },
            2: { text: 'A configuração foi recebida pelo equipamento', status: 'Success' },
          }}
        >
          0
        </ProDescriptions.Item>

        <ProDescriptions.Item
          dataIndex={'testes'}
          valueEnum={{
            0: { text: 'A configuração não foi enviada para o equipamento', status: 'Default' },
            1: {
              text: 'A configuração foi enviada para o equipamento, mas não foi recebida',
              status: 'Processing',
            },
            2: { text: 'A configuração foi recebida pelo equipamento', status: 'Success' },
          }}
        >
          1
        </ProDescriptions.Item>

        <ProDescriptions.Item
          dataIndex={'testes'}
          valueEnum={{
            0: { text: 'A configuração não foi enviada para o equipamento', status: 'Default' },
            1: {
              text: 'A configuração foi enviada para o equipamento, mas não foi recebida',
              status: 'Processing',
            },
            2: { text: 'A configuração foi recebida pelo equipamento', status: 'Success' },
          }}
        >
          2
        </ProDescriptions.Item>
      </ProDescriptions>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        ghost
        request={async () => {
          const result: any = await reqEditPivot.runAsync({ farmId: 133, pivotId: '275' }, {pinned: false});
          const data = result.results?.map((item: any, index: number) => ({
            created: item.created,
            created_by: item.created_by?.username,
            controller: 2,
            hardware: item.device_statuses?.hwsettings,
            pump: item.device_statuses?.pump,
            gps: item.device_statuses?.gps,
            key: `table-history-edit-pivot-${index}`,
            id: `table-history-edit-pivot-${index}`,
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
        headerTitle="Lista"
      />
    </>
  );
};

export default EditPivotHistoryTable;
