import dayjs from 'dayjs';
import { SetStateAction, useState } from 'react';

interface Range {
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}
const useTableHook: (pageSize: number) => {
  pageSize: number;
  range: Range;
  currentPage: number;
  setPageSize: SetStateAction<any | undefined>;
  setRange: SetStateAction<any | undefined>;
  setCurrentPage: SetStateAction<any | undefined>;
} = () => {
  const [pageSize, setPageSize] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(pageSize);
  const [range, setRange] = useState<Range>({ startDate: dayjs(), endDate: dayjs() });

  return {
    pageSize,
    setPageSize,
    range,
    setRange,
    currentPage, 
    setCurrentPage
  };
};

export { useTableHook };
