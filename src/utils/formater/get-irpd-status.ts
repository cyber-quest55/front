export function getIrpdStatus(status: number): string {
  switch (status) {
    case 1: {
      return 'Ligada via internet';
    }
    case 2: {
      return 'Ligada manualmente';
    }
    case 3: {
      return 'Ligada após Horário de Pico';
    }
    case 4: {
      return 'Ligada após queda de energia';
    }
    case 5: {
      return 'Programada';
    }
    case 6: {
      return 'Energizada';
    }
    case 7: {
      return 'Bomba ligada via sensor';
    }
    case 8: {
      return 'Esperando tempo após queda de energia';
    }
    case 192: {
      return 'Horímetro não contabilizado';
    }
    case 193: {
      return 'Possivelmente desligado';
    }
    case 194: {
      return 'Operando';
    }
    case 247: {
      return 'Programação Expirada';
    }
    case 248: {
      return 'Agendamento incorreto';
    }
    case 249: {
      return 'Desligada após fim do agendamento';
    }
    case 0: {
      return 'Sem energia';
    }
    case 250: {
      return 'Pump is OFF by a sensor (250)';
    }
    case 251: {
      return 'Device is powered OFF (251)';
    }
    case 252: {
      return 'Desligada por queda de energia';
    }
    case 253: {
      return 'Desligada por horário de pico';
    }
    case 254: {
      return 'Desligada manualmente';
    }
    case 255: {
      return 'Bomba Desligada pela Web';
    }
    case 66: {
      return 'Status desconhecido';
    }
    default: {
      return 'Status desconhecido';
    }
  }
}
