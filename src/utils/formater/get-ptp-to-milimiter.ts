export const isOldProtocol = (pivot: APIModels.PivotInformation | undefined) =>
  pivot && pivot?.protocol < 5;

export const isV5Protocol = (pivot: APIModels.PivotInformation | undefined) =>
  pivot && pivot?.protocol === 5;

export const PTPToMillimeter = (pivot: APIModels.PivotInformation, PTP: number): number => {
  /**
    
    PERCENT TIMER POSITION [%%] TO MILLIMETER [mm]
  
    ** Calculate CicleTime according PTP **
  
    (1) Perimeter[m] = PivotRadius[m] * 2 * PI
    (2) FastestCicleTime[h] = Perimeter[m] / Speed[m/h]
    (3) CicleTime[h] = FastestCicleTime[h] * (100 / PTP[%])
    
    ** Find HeightOfWater (in mm) according CicleTime **
  
    (4) CiclePouredWater[m³] = Flow[m³/hora] * CicleTime[hora]
    (5) HeightOfWater[10^-2 m] = CiclePouredWater[m³] / Area[ha]
    (6) HeightOfWater[mm] = HeightOfWater[10^-2 m]/10
  
     **/

  let pivotRadius = 0;
  let pivotSpeed = 0;
  let pivotFlow = 0;
  let pivotArea = 0;

  if (isOldProtocol(pivot)) {
    pivotRadius = pivot.config?.radius;
    pivotSpeed = pivot.config?.speed;
    pivotFlow = pivot.config?.flow;
    pivotArea = pivot.config?.area;
  } else if (isV5Protocol(pivot)) {
    pivotRadius = pivot.controllerconfig?.content?.pivot_parameters?.radius_last;
    pivotSpeed = pivot.controllerconfig?.content?.pivot_parameters?.speed;
    pivotFlow = pivot.controllerconfig?.content?.pivot_parameters?.flow_rate;
    pivotArea = pivot.controllerconfig?.content?.pivot_parameters?.irrigated_area;
  } else return -1;

  // (1)
  const perimeter = pivotRadius * 2 * Math.PI;

  // (2)
  const fastestCicleTime = perimeter / pivotSpeed;

  // (3)
  const cicleTime = fastestCicleTime * (100 / PTP);

  // (4)
  const ciclePouredWater = pivotFlow * cicleTime;

  // (5)
  const heightOfWater = ciclePouredWater / pivotArea;

  // (6)
  const mmHeightOfWater = heightOfWater / 10 ? heightOfWater / 10 : 0;

  return parseFloat(mmHeightOfWater.toFixed(4));
};
