import { DualAxes } from '@ant-design/charts';
import moment from 'moment';

const WeatherStationDualAxesChart = ({
  title,
  data,
  unit,
  categories,
  loading,
  labelDateFormat = 'HH:mm',
  yLabels,
}: any) => {
  return (
    <>
      <div style={{ fontSize: 16, fontWeight: 'bold', margin: '15px 0' }}>{title}</div>{' '}
      <DualAxes
        loading={loading}
        tooltip={{
          customContent: (title, items) => {
            return (
              <>
                <h5 style={{ marginTop: 16 }}>
                  {moment(items[0]?.data?.labels).format('DD MMM YYYY HH:mm')}
                </h5>
                <ul style={{ paddingLeft: 0 }}>
                  {items?.map((item, index) => {
                    const { name, value, color } = item;
                    return (
                      <li
                        key={item.year}
                        className="g2-tooltip-list-item"
                        data-index={index}
                        style={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}
                      >
                        <span
                          className="g2-tooltip-marker"
                          style={{ backgroundColor: color }}
                        ></span>
                        <span
                          style={{
                            display: 'inline-flex',
                            flex: 1,
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ marginRight: 16 }}>{name}:</span>
                          <span className="g2-tooltip-list-item-value">
                            {value} {unit[index]}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          },
        }}
        data={[data, data]}
        xField="labels"
        height={320}
        yField={categories}
        xAxis={{
          label: {
            formatter: (v) => moment(Number(v)).format(labelDateFormat),
          },
        }}
        yAxis={{
          [categories[0]]: {
            title: { text: yLabels[0] },
          },
          [categories[1]]: {
            title: { text: yLabels[1] },
          },
        }}
        legend={{
          layout: 'horizontal',
          position: 'bottom-left',
        }}
      />
    </>
  );
};

export default WeatherStationDualAxesChart;
