export function getMeterStatus(status: number): string {

    switch(status){
        case 1: {
            return "Ligado"
        }
        case 2: {
            return "Ligado após queda de energia"
        }
        case 3: {
            return "Monitorando um sensor"
        }
        case 176: {
            return "Bomba desligada"
        }
        case 177: {
            return "Bomba ligada"
        }
        case 208: {
            return "Bomba não atracou"
        }
        case 209: {
            return "Em horário de pico"
        } 
        case 210: {
            return "Desligado"
        }
        case 211: {
            return "Desligado após queda de energia"
        }
        case 212: {
            return "Nivel de batería inferior a 10V"
        }
        case 213: {
            return "Status desconhecido"
        } 
        default: {
            return "Status desconhecido"
        }
    }
}
