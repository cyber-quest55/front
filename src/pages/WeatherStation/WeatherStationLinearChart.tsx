import { Line } from '@ant-design/charts';
import { Skeleton } from 'antd';
import moment from 'moment';
const WeatherStationLinearChart = ({
  title,
  data,
  unit,
  min = 0,
  loading,
  labelDateFormat = 'HH:mm',
}: any) => {
  return !loading ? (
    <>
      <div style={{ fontSize: 16, fontWeight: 'bold', margin: '15px 0' }}>{title}</div>
      <Line
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
                            {value} {unit}
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
        data={data}
        xField="labels"
        height={320}
        yField="value"
        seriesField="category"
        xAxis={{
          label: {
            formatter: (v) => moment(Number(v)).format(labelDateFormat),
          },
        }}
        yAxis={{
          min,
        }}
        legend={{
          layout: 'horizontal',
          position: 'bottom-left',
        }}
      />
    </>
  ) : (
    <Skeleton.Button active={true} block={true} style={{ height: 250, margin: '15px 0' }} />
  );
};

export default WeatherStationLinearChart;
