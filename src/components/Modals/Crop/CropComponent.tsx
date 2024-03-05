import SegmentSVG from '@/components/SegmentsSvg/SegmentSvg';
import { GetPivotByIdModelProps } from '@/models/pivot-by-id';
import { getPivotWaterConsumptionBySegment } from '@/services/pivot';
import { getSegmentsInPivot } from '@/utils/formater/get-segments';
import { ProList } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Modal, Progress, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import * as React from 'react';
import { GiSolidLeaf } from 'react-icons/gi';

interface ICropSegmentsModalComponentProps {
  pivotById: GetPivotByIdModelProps;
}

function calculatePercentage(dataPlantio: string, dataColheitaEstimada: string) {
  if (!dataPlantio || !dataColheitaEstimada) {
    return 0;
  }

  const dataAtual = dayjs();

  // Convertendo as datas para objetos Day.js
  const plantio = dayjs(dataPlantio);
  const colheitaEstimada = dayjs(dataColheitaEstimada);

  // Calculando a diferença em dias
  const diasDecorridos = dataAtual.diff(plantio, 'day');
  const totalDias = colheitaEstimada.diff(plantio, 'day');

  // Calculando a porcentagem do tempo passado
  const porcentagemTempoPassado = (diasDecorridos / totalDias) * 100;

  // Arredondando para baixo e convertendo para inteiro
  const porcentagemInteira = Math.floor(porcentagemTempoPassado);

  return porcentagemInteira;
}

const List: React.FunctionComponent<ICropSegmentsModalComponentProps> = (props) => {
  const intl = useIntl();
  const positions = props.pivotById?.unformated?.controllerconfig?.content?.pivot_positions;
  const segments = getSegmentsInPivot(props.pivotById.unformated);

  const waterReq = useRequest(() =>
    getPivotWaterConsumptionBySegment({ pivotId: props?.pivotById?.unformated?.id }, {}),
  );

  const data = segments.map((item, index) => {
    const plantingDate = item.plantingDate ? dayjs(item.plantingDate).format('DD/MM/YY') : '';
    const harvestDate = item.harvestDate ? dayjs(item.harvestDate).format('DD/MM/YY') : '';
    const percentage = calculatePercentage(item.plantingDate, item.harvestDate);
    let waterConsumption = 0.0;

    if (segments.length === waterReq.data?.length) {
      waterConsumption = waterReq.data[index].water_blade;
    }

    return {
      title: item.name,
      subTitle: (
        <Tag color="#5BD8A6">
          {item.begin}° - {item.end}°
        </Tag>
      ),

      avatar: (
        <SegmentSVG
          key={item.id + '-testing'}
          center={{ lat: positions?.latitude_center, lng: positions?.longitude_center }}
          referenced={{
            lat: positions?.latitude_reference,
            lng: positions?.longitude_reference,
          }}
          beginAngle={item.begin as any}
          endAngle={item.end as any}
          color={item.color}
          width={30}
          height={30}
        />
      ),
      content: (
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            <strong>  {intl.formatMessage({
              id: 'component.pivot.crop.segment.list.daterange',
             })} </strong>
            {plantingDate} - {harvestDate}
          </Typography.Text>
          <div
            style={{
              width: 200,
            }}
          >
            <Progress percent={percentage} />
          </div>
        </div>
      ),
      actions: (
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Typography.Text strong type="secondary" style={{ fontSize: 12 }}>
            {intl.formatMessage({
              id: 'component.pivot.crop.segment.list.accblade',
             })}
          </Typography.Text>
          <div>
            <div>{waterConsumption.toFixed(2)} mm</div>
          </div>
        </div>
      ),
    };
  });

  return (
    <ProList<any>
      pagination={false}
      metas={{
        title: {},
        subTitle: {},
        type: {},
        avatar: {},
        content: {},
        actions: {},
      }}
      headerTitle={intl.formatMessage({
        id: 'component.pivot.crop.segment.list.title',
       })}
      dataSource={data}
    />
  );
};

const CropSegmentsModalComponent: React.FunctionComponent<ICropSegmentsModalComponentProps> = (
  props,
) => {
  const intl = useIntl();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button icon={<GiSolidLeaf />} onClick={showModal} />

      <Modal
        destroyOnClose
        title={intl.formatMessage({
          id: 'component.pivot.crop.modal.title',
         })} 
        open={isModalOpen}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <List {...props} />
      </Modal>
    </>
  );
};

export default CropSegmentsModalComponent;
