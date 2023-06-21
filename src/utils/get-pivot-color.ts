import { colors } from "./status-color"

export function getPivotColor(status: number): string {

    switch(status){
        case 0: {
            return colors.first
        }
        case 1: {
            return colors.first
        }
        case 2: {
            return colors.first
        }
        case 3: {
            return colors.second
        }
        case 4: {
            return colors.second
        }
        case 5: {
            return colors.second
        }
        case 6: {
            return colors.third
        }
        case 7: {
            return colors.fourth
        }
        case 8: {
            return colors.fourth
        }
        case 9: {
            return colors.fifth
        }
        case 10: {
            return colors.fifth
        }
        case 11: {
            return colors.fifth
        }
        case 12: {
            return colors.fifth
        }
        case 13: {
            return colors.fifth
        }
        case 14: {
            return colors.fifth
        }
        case 15: {
            return colors.sixth
        }
        case 16: {
            return colors.sixth
        }
        case 17: {
            return colors.sixth
        }
        case 18: {
            return colors.sixth
        }
        case 19: {
            return colors.sixth
        }
        case 20: {
            return colors.sixth
        }
        case 21: {
            return colors.sixth 
        }
        case 22: {
            return colors.fifth
        }
        case 23: {
            return colors.sixth
        }
        case 24: {
            return colors.second
        }
        case 25: {
            return colors.second
        }
        case 26: {
            return colors.sixth
        }
        case 27: {
            return colors.third
        }
        case 28: {
            return colors.fifth
        }
        case 29: {
            return colors.fifth
        }
        case 30: {
            return colors.second
        }
        case 31: {
            return colors.second
        }
        case 32: {
            return colors.seventh
        }
        case 33: {
            return colors.seventh
        }
        case 38: {
            return colors.seventh
        }
        default: {
            return colors.seventh
        }
    }
}
