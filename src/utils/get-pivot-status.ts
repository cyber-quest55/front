export function getPivotStatus(status: number): string {

    switch(status){
        case 0: {
            return "Parado via internet"
        }
        case 1: {
            return "Ligado em avanço"
        }
        case 2: {
            return "Ligado em reverso"
        }
        case 3: {
            return "Esperando pressurização"
        }
        case 4: {
            return "Irrigando"
        }
        case 5: {
            return "Esperando tempo de retardo"
        }
        case 6: {
            return "Movendo a seco"
        }
        case 7: {
            return "Programado"
        }
        case 8: {
            return "Preparando para religar"
        }
        case 9: {
            return "Parado por horário de pico"
        }
        case 10: {
            return "Irrigação finalizada"
        }
        case 11: {
            return "Parado em autorreversão"
        }
        case 12: {
            return "Parado via internet"
        }
        case 13: {
            return "Parado via painel"
        }
        case 14: {
            return "Painel energizado"
        }
        case 15: {
            return "Desalinhado"
        }
        case 16: {
            return "Falha de pressão"
        }
        case 17: {
            return "Direção de irrigação inválida"
        }
        case 18: {
            return "Queda de energia"
        }
        case 19: {
            return "Tensão fora da faixa permitida"
        }
        case 20: {
            return "Erro de parâmetro"
        }
        case 21: {
            return "Erro desconhecido"
        }
        case 22: {
            return "Painel desligado"
        }
        case 23: {
            return "Tempo de bomba excedido"
        }
        case 24: {
            return "Irrigação começou"
        }
        case 25: {
            return "Botão parar pressionado (bomba ligada)"
        }
        case 26: {
            return "Erro na bomba"
        }
        case 27: {
            return "Movendo a seco pelo pluviômetro"
        }
        case 28: {
            return "Parado pelo pluviômetro"
        }
        case 29: {
            return "Parado por erro no relógio interno"
        }
        case 30: {
            return "Fertirrigação ligada"
        }
        case 31: {
            return "Fertirrigação desligada"
        }
        case 32: {
            return "Desligado"
        }
        case 33: {
            return "Status desconhecido"
        }
        case 38: {
            return "Possivelmente parado"
        }
        default: {
            return "Possivelmente parado"
        }
    }
}
