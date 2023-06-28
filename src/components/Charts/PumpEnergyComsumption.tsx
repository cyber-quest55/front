import { GetIrpdWaterModelProps } from '@/models/irpd-water-consumption';
import { Column, G2 } from '@ant-design/charts';
import { Spin } from 'antd';
import { connect } from 'umi';

type Props = {
  irpdWaterConsumption: GetIrpdWaterModelProps;
  dispatch: any;
};

const PumpEnergyConsumptionChart: React.FC<Props> = (props) => {
  G2.registerInteraction('element-link', {
    start: [
      {
        trigger: 'interval:mouseenter',
        action: 'element-link-by-color:link',
      },
    ],
    end: [
      {
        trigger: 'interval:mouseleave',
        action: 'element-link-by-color:unlink',
      },
    ],
  });

  return (
    <Spin spinning={props.irpdWaterConsumption.loading}>
      <Column
        height={320}
        color={({ type }) => {
          if (type === 'Horas em pico') {
            return '#ff4d4f';
          } else if (type === 'Horas em fora de pico') {
            return '#4169E1';
          }
          return '#40E0D0';
        }}
        data={props.irpdWaterConsumption.result}
        padding="auto"
        xField="year"
        yField="value"
        seriesField="type"
        isPercent={true}
        isStack={true}
        tooltip={false}
        legend={{position: "bottom"}}
        interactions={[
          {
            type: 'element-highlight-by-color',
          },
          {
            type: 'element-link',
          },
        ]}
        meta={{
          value: {
            min: 0,
            max: 1,
          },
        }}
        label={{
          position: 'middle',
          content: (item) => {
            return `${(item.value * 100).toFixed(2)}`;
          },
          style: {
            fill: '#fff',
          },
        }}
      />
    </Spin>
  );
};

export default connect(({ irpdWaterConsumption }: { irpdWaterConsumption: any }) => ({
  irpdWaterConsumption,
}))(PumpEnergyConsumptionChart);
