import { useScreenHook } from '@/hooks/screen';
import { useTabsHook } from '@/hooks/tabs';
import { DeviceType } from '@/utils/enum/device-type';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import MeterWaterLevel from '../Charts/MeterWaterLevel';
import DeviceMapsRender from '../DeviceMapsRender';
import DevicePanelContainer from '../DevicePanel/DevicePanelContainer';
import MeterActivityEventTable from '../Tables/MeterActivityEventTable';
import { useIntl } from '@umijs/max';

const MeterReport: React.FC = () => {
  const intl = useIntl();
  const { md } = useScreenHook();
  const { tab, setTab } = useTabsHook('tab1');

  const generalClassName = useEmotionCss(({ token }) => {
    return {
      height: '100vh',
      '.ant-pro-card-title ': {
        width: '100%',
      },
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        overflowY: 'auto',
        height: 'calc(100vh - 110px)',
        maxWidth: '100%'

      },
    };
  });

  const classNameTableProCard = useEmotionCss(() => {
    return {
      '.ant-pro-card-body': {
        paddingInline: '4px',
      },
    };
  });

  return (
    <ProCard
      className={generalClassName}
      ghost
      style={{ marginBlockStart: 8 }}
      gutter={[8, 8]}
      wrap
    >

      <ProCard
        ghost
        colSpan={{ xs: 24, md: 14 }}
        wrap
        gutter={[16, 16]}
      >
        <ProCard
          ghost
          colSpan={{ xs: 24, md: 8, xxl: 9 }}
          style={{ height: 275 }}
        >
          <DeviceMapsRender height={275} />
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, md: 16, xxl: 15 }}
          style={{ height: md ? 275 : '100%' }}
        >
          <DevicePanelContainer type={DeviceType.Meter} />
        </ProCard>
        <StatisticCard
          ghost
          colSpan={{ xs: 24 }}
        >
          <MeterWaterLevel />
        </StatisticCard>
      </ProCard>

      <ProCard
        colSpan={{ xs: 24, lg: 10 }}
        className={classNameTableProCard}
        gutter={[16, 16]}
        wrap
        ghost
      >
        <ProCard
          title={intl.formatMessage({ id: 'component.meter.report.table.title' })}
          tabs={{
            tabPosition: 'top',
            activeKey: tab,
            items: [
              {
                label: intl.formatMessage({ id: 'component.meter.report.table.tab.1' }),
                key: 'tab1',
                children: <MeterActivityEventTable />,
              },
              {
                label: intl.formatMessage({ id: 'component.meter.report.table.tab.2' }),
                key: 'tab2',
                disabled: true,

                children: <></>,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
          colSpan={{ xs: 24, md: 24 }}
        ></ProCard>
      </ProCard>

    </ProCard>
  );
};

export default MeterReport;
