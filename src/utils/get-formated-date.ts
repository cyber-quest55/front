export const formatDate = (date: string) => {
  const dateF = new Date(date);

  const newDate = new Intl.DateTimeFormat('pt', {
    hour12: true,
    day: 'numeric',
    month: 'long',
    minute: 'numeric',
    second: 'numeric',
  }).format(dateF);

  return newDate;
};

export const formatDateTime = (date: string) => {
  const dateF = new Date(date);

  const newDate = new Intl.DateTimeFormat('pt', {
    day: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(dateF);

  return newDate;
};
