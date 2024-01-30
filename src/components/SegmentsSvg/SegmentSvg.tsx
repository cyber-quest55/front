import { theme } from 'antd';
import React from 'react';
import { computeHeading, LatLng } from 'spherical-geometry-js';

interface SegmentSVGProps {
  beginAngle: number;
  endAngle: number;
  color: string;
  /**
   * The center of the pivot
   */
  center: { lat: number; lng: number };

  /**
   * Final of pivot
   */
  referenced: { lat: number; lng: number };

  width: number;
  height: number;
}

const SegmentSVG: React.FC<SegmentSVGProps> = (props) => {
  const { beginAngle, endAngle, color, width, height } = props;
  const { token } = theme.useToken();
  const numeroPontos = 35; // Ajuste conforme necessário

  const centerLat = props.center.lat;
  const centerLng = props.center.lng;

  const referencedLat = props.referenced.lat;
  const referencedLng = props.referenced.lng;

  if (!centerLat || !centerLng || !referencedLat || !referencedLng) {
    return <></>;
  }

  // Calcula o ângulo em relação ao ponto central
  const angleDegrees = computeHeading(
    new LatLng(centerLat, centerLng),
    new LatLng(referencedLat, referencedLng),
  );

  const centro = { x: width / 2, y: height / 2 };
  const raio = width / 2;

  const calcularCoordenadasCircunferencia = (anguloEmGraus: number) => {
    const anguloEmRadianos = (anguloEmGraus - 90 + angleDegrees) * (Math.PI / 180);
    const x = centro.x + raio * Math.cos(anguloEmRadianos);
    const y = centro.y + raio * Math.sin(anguloEmRadianos);
    return { x, y };
  };

  const novoPontoInicial = calcularCoordenadasCircunferencia(beginAngle);
  const novoPontoFinal = calcularCoordenadasCircunferencia(endAngle);

  const pontos = [];

  pontos.push({ x: centro.x, y: centro.y });

  for (let i = 0; i <= numeroPontos; i++) {
    const percentagem = i / numeroPontos;
    const angulo = beginAngle + percentagem * (endAngle - beginAngle);
    const ponto = calcularCoordenadasCircunferencia(angulo);
    pontos.push(ponto);
  }

  return (
    <svg width="30" height="30">
      {/* Circunferência */}
      <circle cx={centro.x} cy={centro.y} r={raio} fill={token.colorText} opacity={0.8} />

      {/* Preenchimento entre as linhas */}
      <polygon
        points={pontos.map((coord) => `${coord.x},${coord.y}`).join(' ')}
        fill={color}
        opacity={0.8}
      />

      {/* Raio inicial */}
      <line
        x1={centro.x}
        y1={centro.y}
        x2={novoPontoInicial.x}
        y2={novoPontoInicial.y}
        stroke={token.colorBgBase}
      />

      {/* Raio final */}
      <line
        x1={centro.x}
        y1={centro.y}
        x2={novoPontoFinal.x}
        y2={novoPontoFinal.y}
        stroke={token.colorBgBase}
      />
    </svg>
  );
};

export default SegmentSVG;
