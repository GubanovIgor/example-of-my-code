export const getWinningsInterval = () => {
  const randomInt = Math.floor(Math.random() * 100) + 1;
  if (randomInt > 15) {
    return [500, 1000];
  }
  return [1000, 1500];
};
