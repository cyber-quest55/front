export const getPanelType = (language: number) => {
    switch(language){
        case 0:
            return 'Any'
        case 1:
            return 'Nexus' 
        default: 
            return 'Nexus'
    }
}