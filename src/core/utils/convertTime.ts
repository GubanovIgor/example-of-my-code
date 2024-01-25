import dayjs from 'dayjs';

const checkTwoNumber = (time: number): string =>
  time <= 9 ? `0${time}` : String(time);

export const convertTime = (sec: number) => {
  const msec = sec * 1000;

  const now = dayjs();
  const days = dayjs(msec).diff(now, 'day');
  let hours = dayjs(msec).diff(now, 'hour');
  const minutes = dayjs(msec).diff(now, 'minute') - hours * 60;
  hours = hours - days * 24;

  return {
    days: checkTwoNumber(days),
    hours: checkTwoNumber(hours),
    minutes: checkTwoNumber(minutes),
  };
};
