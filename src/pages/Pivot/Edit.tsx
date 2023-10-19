import LocationFormContainer from '@/components/Forms/Location/LocationContainer';
import FormPivotSegmentationContainer from '@/components/Forms/Segmentation/SegmentationContainer';
import { useScreenHook } from '@/hooks/screen';
import { SaveOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProForm } from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import React, { useState } from 'react';

const NoFoundPage: React.FC = () => {
  const [tab, setTab] = useState('tab1');
  const [form] = Form.useForm<any>();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { xs } = useScreenHook();

  const handleSubmit = async () => {
    setIsSubmiting(true);
    setIsSubmiting(false);
    return true;
  };

  return (
    <PageContainer
      tabBarExtraContent={
        <Button icon={<SaveOutlined />} type="primary" onClick={form.submit} loading={isSubmiting}>
          Salvar{' '}
        </Button>
      }
      tabList={[
        {
          tab: 'Configurações',
          key: 'base',
          closable: false,
        },
        {
          tab: 'Histórico',
          key: 'info',
        },
      ]}
      token={{
        paddingBlockPageContainerContent: -8,
        paddingInlinePageContainerContent: xs ? 8 : 32,
      }}
      tabProps={{
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
      }}
    >
      <ProForm
        validateTrigger="onBlur"
        form={form}
        layout="vertical"
        rowProps={{ gutter: [8, 8] }}
        grid
        size="large"
        submitter={false}
        name="loging_form"
        initialValues={{}}
        onFinish={handleSubmit}
      >
        <ProCard
          tabs={{
            tabPosition: xs ? 'top' : 'left',
            activeKey: tab,
            items: [
              {
                label: `Geral`,
                key: 'tab1',
                children: <div></div>,
              },
              {
                label: `Localização`,
                key: 'tab2',
                children: (
                  <LocationFormContainer
                    lat={-22.9013676}
                    lng={-47.0598314}
                    hasNorthReference={true}
                    secondLocationName="test"
                    onChangeSecondLocation={(value: string) => form.setFieldValue('test', value)}
                    firstLocationName="testing"
                    onChangeFirstLocation={(value: string) => form.setFieldValue('testing', value)}
                  />
                ),
              },
              {
                label: `Horário`,
                key: 'tab3',
                children: `Horário`,
              },
              {
                label: `Bomba`,
                key: 'tab4',
                children: `Bomba`,
              },
              {
                label: `Pluviometro`,
                key: 'tab5',
                children: `Pluviometro`,
              },
              {
                label: `Horário de Pico`,
                key: 'tab6',
                children: `Horário de Pico`,
              },
              {
                label: `Segmentos e Plantio`,
                key: 'tab7',
                children: <FormPivotSegmentationContainer />,
              },
              {
                label: `Canhão Final`,
                key: 'tab8',
                children: `Canhão Final`,
              },
              {
                label: `Auto Reversão`,
                key: 'tab9',
                children: `Auto Reversão`,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        ></ProCard>
      </ProForm>
    </PageContainer>
  );
};

export default NoFoundPage;
