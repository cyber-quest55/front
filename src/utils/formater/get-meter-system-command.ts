export function getMeterSystemCommand(status: number): string {
  switch (status) {
    case 1: {
      return 'Ligado';
    }
    case 210: {
      return 'Desligado';
    }
    default: {
      return 'Atualização da Central';
    }
  }
}
