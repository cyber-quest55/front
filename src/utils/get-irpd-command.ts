export function getIrpdCommand(status: number): string {
  switch (status) {
    case 0: {
      return 'Parar Bomba';
    }
    case 1: {
      return 'Ligar Bomba';
    }
    default: {
      return 'Possivelmente parado';
    }
  }
}
