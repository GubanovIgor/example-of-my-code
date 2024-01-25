import dayjs from 'dayjs';

export const getDateDefaultValues = (value?: string) => {
  if (!value) return;

  const formattedDate = dayjs(value, 'DD.MM.YYYY');

  const day = formattedDate.get('D')?.toString();

  const month = (formattedDate.get('M') + 1)?.toString();

  const year = formattedDate.get('years')?.toString();

  return {
    day: day,
    month: month,
    year: year,
  };
};
