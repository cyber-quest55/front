export function getMeterCentralStatus(status: number): string {
  switch (status) {
    case 0: {
      return 'Central com Internet';
    }
    case 210: {
      return 'Central sem Internet';
    }
    default: {
      return 'Atualização da Central';
    }
  }
}
