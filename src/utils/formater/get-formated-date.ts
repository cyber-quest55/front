import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  const dateF = new Date(date);

  const day = dateF.getDate();
  const month = dateF.toLocaleString('pt', { month: 'long' });
  const hours = dateF.getHours().toString().padStart(2, '0');
  const minutes = dateF.getMinutes().toString().padStart(2, '0');

  return `${day} de ${month} às ${hours}:${minutes}`;
};

export const formatDateTime = (date: string) => {
  const dateF = new Date(date);

  const day = dateF.getDate();
  const month = dateF.getMonth() + 1; // Month is zero-based, so add 1
  const hours = dateF.getHours().toString().padStart(2, '0');
  const minutes = dateF.getMinutes().toString().padStart(2, '0');
  const seconds = dateF.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${dateF.getFullYear()} ${hours}:${minutes}:${seconds}`;
};

export function formatDayJsDate(
  isoDate: string,
  format: string = 'DD/MM/YY HH:mm'
) {
  return dayjs(isoDate).format(format);
}
