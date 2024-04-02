import { SearchOutlined } from '@ant-design/icons';
import { SignalLog } from '@/models/signal';
import { useIntl } from '@umijs/max';
import {
  Drawer,
  Flex,
  Input,
  List,
  Tabs,
  Typography
} from 'antd';
import React, {
  useCallback,
  useState
} from 'react';

type Props = {
  isOpen: boolean,
  toggleDrawer: () => void;
  title?: string;
  logs: SignalLog[];
}

const IntesitiesDrawer: React.FC<Props> = ({
  isOpen,
  toggleDrawer,
  title = 'Drawer',
  logs,
}: Props) => {
  // Hooks
  const intl = useIntl();
  const [search, setSearch] = useState<string>('');

  // Mapping translations
  const signalTransations = {
    "weak": intl.formatMessage({ id: 'component.signal.map.connection.1' }),
    "moderate": intl.formatMessage({ id: 'component.signal.map.connection.2' }),
    "strong": intl.formatMessage({ id: 'component.signal.map.connection.3' }),
    "very strong": intl.formatMessage({ id: 'component.signal.map.connection.4' }),
  }

  // Actions
  const handleCloseModal = () => {
    toggleDrawer();
  };

  // Computed data
  const foundLogs = useCallback(() => logs.filter(
    l => l.type === 'FOUND' && (
      l.radio.toLowerCase().includes(search.toLowerCase()) ||
      l.device.toLowerCase().includes(search.toLowerCase()) ||
      l.deviceID?.toString().includes(search.toLowerCase())
    )
  ), [
    logs,
    search,
  ]) ;
  const nodeLogs = useCallback(() => logs.filter(
    l => l.type === 'NODE' && (
      l.fromName?.toLowerCase().includes(search.toLowerCase()) ||
      l.toName?.toLowerCase().includes(search.toLowerCase()) ||
      l.fromRadioId?.toLowerCase().includes(search.toLowerCase()) ||
      l.toRadioId?.toLowerCase().includes(search.toLowerCase()) ||
      l.strength?.toString().includes(search.toLowerCase()) ||
      l.quality?.toLowerCase().includes(search.toLowerCase())
    )
  ), [
    logs,
    search,
  ]);

  /*
  02/04/2024 09:19:05
  TipoPIVOT
  Nome:Pivô 04
  ID (Rádio):903 (0013A20041ED851D)
  Sinal de Força (dbm):moderate (-80dbm)
  Decisão Morena
  */

  // TSX
  return (
    <Drawer
      title={title}
      open={isOpen}
      onClose={handleCloseModal}
      mask={false}
    >
      <Input
        prefix={<SearchOutlined />}
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={
          intl.formatMessage({
            id: 'component.signal.map.logs.search.placeholder',
          })
        }
      />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: intl.formatMessage({ id: 'component.signal.map.logs.tab.1' }),
            children: (
              <List
                bordered
                dataSource={foundLogs()}
                renderItem={(item) => (
                  <List.Item>
                    <Flex
                      gap="4px"
                      vertical
                    >
                      <Typography.Text type="secondary">
                        {item.date}
                      </Typography.Text>
                      <Typography.Text underline>
                        {item.farmName} ({item.farmID})
                      </Typography.Text>
                      <Typography.Text>
                        <Typography.Text strong>
                          {intl.formatMessage({ id: 'component.signal.map.logs.field.device' })}
                        </Typography.Text>
                        {item.device} ({item.deviceID})
                      </Typography.Text>
                      <Typography.Text>
                        <Typography.Text strong>
                          {intl.formatMessage({ id: 'component.signal.map.logs.field.radio' })}
                        </Typography.Text> 
                        <Typography.Text code>
                          {item.radio}
                        </Typography.Text>
                      </Typography.Text>
                    </Flex>
                  </List.Item>
                )}
              />
            )
          },
          {
            key: '2',
            label: intl.formatMessage({ id: 'component.signal.map.logs.tab.2' }),
            children: (
              <List
                bordered
                dataSource={nodeLogs()}
                renderItem={(item) => (
                  <List.Item>
                    <Flex
                      gap="4px"
                      vertical
                    >
                      <Typography.Text type="secondary">
                        {item.date}
                      </Typography.Text>
                      <Typography.Text underline>
                        {item.farmName} ({item.farmID})
                      </Typography.Text>
                      <Typography.Text>
                        <Typography.Text strong>
                          {intl.formatMessage({ id: 'component.signal.map.logs.field.fromdevice' })}
                        </Typography.Text>
                        {item.fromName}{' '}
                        <Typography.Text code>
                          {item.fromRadioId}
                        </Typography.Text>
                      </Typography.Text>
                      <Typography.Text>
                        <Typography.Text strong>
                          {intl.formatMessage({ id: 'component.signal.map.logs.field.todevice' })}
                        </Typography.Text>
                        {item.toName}{' '}
                        <Typography.Text code>
                          {item.toRadioId}
                        </Typography.Text>
                      </Typography.Text>
                      <Typography.Text>
                        <Typography.Text strong>
                          {intl.formatMessage({ id: 'component.signal.map.logs.field.connection' })}
                        </Typography.Text>
                        {signalTransations[item.quality || '']} ({item.strength}dBm)
                      </Typography.Text>
                    </Flex>
                  </List.Item>
                )}
              />
            ),
          },
        ]}
      />
    </Drawer>
  )
}

export default IntesitiesDrawer
