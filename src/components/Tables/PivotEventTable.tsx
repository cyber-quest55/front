import { useTableHook } from '@/hooks/table';
import { GetPivotHistoryModelProps } from '@/models/pivot-history';
import { DownloadOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDateRangePicker, ProTable } from '@ant-design/pro-components';
import { Button, Col, Pagination, Row, Space } from 'antd';
import { connect } from 'umi';

type Props = {
  pivotHistory: GetPivotHistoryModelProps;
};

const PivotEventTable: React.FC<Props> = (props) => {
  const { range } = useTableHook(50);

  const onDateChange = () => {};

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <ProTable<any>
        toolbar={{
          title: (
            <LightFilter>
              <ProFormDateRangePicker
                disabled={props.pivotHistory.loading}
                name="startdate"
                label="Periodo"
                allowClear
                fieldProps={{
                  onChange: onDateChange,

                  value: [range.startDate, range.endDate],
                }}
              />
            </LightFilter>
          ),
          filter: (
            <Space>
              <Button icon={<DownloadOutlined />}>Exportar</Button>
            </Space>
          ),
        }}
        columns={[
          {
            title: 'Ocorrência',
            dataIndex: 'date',

            render: (value, item) => {
              return <>{new Date(item.created).toLocaleDateString()}</>;
            },
          },
          {
            title: 'Tipo',
            dataIndex: 'date',
            responsive: ['lg'],
            render: () => {
              return <>Atualização</>;
            },
          },
          {
            title: 'Status',
            dataIndex: 'date',
            render: () => {
              return <>Programado | Avanço | Molhado | 62%</>;
            },
          },
        ]}
        dataSource={props.pivotHistory.result}
        rowKey="key"
        pagination={false}
        options={false}
        search={false}
        dateFormatter="string"
      />
      <Row justify="end">
        <Col>
          <Pagination
            disabled={props.pivotHistory.loading}
            responsive
            size="small"
            className=""
            showSizeChanger
            defaultCurrent={1}
            total={545}
          />
        </Col>
      </Row>
    </Space>
  );
};

const mapStateToProps = ({ pivotHistory }: { pivotHistory: any }) => ({
  pivotHistory,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PivotEventTable);