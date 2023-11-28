export const getLanguage = (language: number) => {
    switch(language){
        case 0:
            return 'Inglês'
        case 1:
            return 'Português'
        case 2: 
            return 'Russian'
        default: 
            return 'Português'
    }
}