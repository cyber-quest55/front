export const cvHpRatio = 0.7355;

export const hpToCv = (devicePotencyHP: number, devicePerformance: number) =>
  ((devicePotencyHP * cvHpRatio * 100) / devicePerformance).toFixed(2);