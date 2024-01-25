import dayjs from 'dayjs';

export const computeAge = (dob: string): number => {
  if (!dob) return 0;
  const dateFromNow = dayjs(dob, 'DD.MM.YYYY');

  const diff = dayjs().diff(dateFromNow, 'years');

  return diff;
};
