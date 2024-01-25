export const getRandomNumberInRange = (interval: number[]): number =>
  Math.floor(interval[0] + Math.random() * (interval[1] - interval[0]));
