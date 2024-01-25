export const getRandomItemsFromArray = <T>(
  itemsAmount: number,
  array: Array<T>,
) =>
  array
    ?.slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, itemsAmount);
