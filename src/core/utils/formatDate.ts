import dayjs from 'dayjs';

export const formatDate = (date?: string, format: string = 'DD.MM.YYYY') =>
  date ? dayjs(date).format(format) : '';
