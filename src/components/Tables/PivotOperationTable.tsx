import { GetPivotHistoryModelProps } from '@/models/pivot-history';
import { DownloadOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDateRangePicker, ProTable } from '@ant-design/pro-components';
import { Button, Col, Pagination, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { connect } from 'umi';

type Props = {
  dispatch: any; 
  pivotHistory: GetPivotHistoryModelProps; 
};

const PivotOperationTable: React.FC<Props> = (props) => {
  const [range] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

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
            title: 'Início',
            dataIndex: 'date',

            render: () => {
              return <>23/06 00:33  115°</>;
            },
          },
          {
            title: 'Fim',
            dataIndex: 'date',

            render: (value, item) => {
              return <>23/06 16:03 250°</>;
            },
          },
          {
            title: 'Horas em Ponta',
            dataIndex: 'date',
            responsive: ['lg'],
            render: () => {
              return <>0.00h</>;
            },
          },
          {
            title: 'Total',
            dataIndex: 'date',
            render: () => {
              return <>1.83h</>;
            },
          },
          {
            title: 'Lâmina',
            dataIndex: 'date',
            render: () => {
              return <>10.12mm</>;
            },
          },
          {
            title: 'Lâmina',
            dataIndex: 'date',
            render: () => {
              return <>Molhado</>;
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

export default connect(({ pivotHistory }: { pivotHistory: any }) => ({
  pivotHistory,
}))(PivotOperationTable);
