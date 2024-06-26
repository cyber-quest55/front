import PumpEnergyConsumptionChart from '@/components/Charts/PumpEnergyComsumption';
import IrpdActivityEventTable from '@/components/Tables/IrpdActivityEventTable';
import IrpdActivityHistoricTable from '@/components/Tables/IrpdActivityHistoricTable';
import { useScreenHook } from '@/hooks/screen';
import { useTabsHook } from '@/hooks/tabs';
import { DeviceType } from '@/utils/enum/device-type';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import DeviceMapsRender from '../DeviceMapsRender';
import DevicePanelContainer from '../DevicePanel/DevicePanelContainer';
import { useIntl } from '@umijs/max';

const PumpReport: React.FC = () => {

  const { md } = useScreenHook();
  const intl = useIntl()

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
      style={{ marginBlockStart: 8 }}
      gutter={[8, 8]}
      wrap
      ghost
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
          <DevicePanelContainer type={DeviceType.Pump} />
        </ProCard>
        <ProCard
          title={intl.formatMessage({
            id: 'component.irpd.report.chart.consumption.title',
          })}
        >
          <PumpEnergyConsumptionChart />
        </ProCard>
      </ProCard>

      <ProCard
        className={classNameTableProCard}
        colSpan={{ xs: 24, lg: 10 }}
        gutter={[16, 16]}
        ghost
        wrap
      >
        <ProCard
          title={intl.formatMessage({ id: 'component.irpd.report.title' })}
          colSpan={{ xs: 24, md: 24 }}
          tabs={{
            tabPosition: 'top',
            activeKey: tab,
            items: [
              {
                label: intl.formatMessage({
                  id: 'component.irpd.report.tabs.opt.1',
                }),
                key: 'tab1',
                children: <IrpdActivityHistoricTable />,
              },
              {
                label: intl.formatMessage({
                  id: 'component.irpd.report.tabs.opt.2',
                }),
                key: 'tab2',
                children: <IrpdActivityEventTable />,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        ></ProCard>
      </ProCard>

    </ProCard>
  );
};

export default PumpReport;
