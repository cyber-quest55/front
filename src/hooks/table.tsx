import dayjs from 'dayjs';
import { SetStateAction, useState } from 'react';

type Range = [
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
]
const useTableHook: (pSize: number) => {
  pageSize: number;
  range: Range;
  currentPage: number;
  setPageSize: SetStateAction<any | undefined>;
  setRange: SetStateAction<any | undefined>;
  setCurrentPage: SetStateAction<any | undefined>;
} = (pSize: number) => {
  /**
   * It define the page size on pagination
   */
  const [pageSize, setPageSize] = useState<number>(0);

  /**
   * It define the pagination current
   */
  const [currentPage, setCurrentPage] = useState<number>(pSize);

  /**
   * It define the date range of tables
   */
  const [range, setRange] = useState<Range>([dayjs().subtract(1, 'month'), dayjs()]);

  return {
    pageSize,
    setPageSize,
    range,
    setRange,
    currentPage,
    setCurrentPage,
  };
};

export { useTableHook };
