import dayjs from 'dayjs';

function getTimeDifference(time1: string, time2: string): string {
  const date1 = dayjs(`1970-01-01T${time1}Z`);
  const date2 = dayjs(`1970-01-01T${time2}Z`);

  const duration = date1.diff(date2);

  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export { getTimeDifference }

