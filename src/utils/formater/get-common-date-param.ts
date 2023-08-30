import dayjs from "dayjs";

export const getCommonDateParam = (formated: boolean) => {
   
    if(formated){
        return {
            date_start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
            date_end: dayjs().format('YYYY-MM-DD'),
          }
    } else {
        return {
            date_start: dayjs().subtract(1, 'month'),
            date_end: dayjs(),
          }
    }
  }; 
  