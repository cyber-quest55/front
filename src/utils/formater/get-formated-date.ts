import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  const dateF = new Date(date);

  const formattedDate = dateF.toLocaleString('pt', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

  return formattedDate;
};

export const formatDateTime = (date: string) => {
  const dateF = new Date(date);

  const formattedDate = dateF.toLocaleString('pt', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return formattedDate;
};

export function formatDayJsDate(
  isoDate: string,
  format: string = 'DD/MM/YY HH:mm'
) {
  return dayjs(isoDate).format(format);
}
