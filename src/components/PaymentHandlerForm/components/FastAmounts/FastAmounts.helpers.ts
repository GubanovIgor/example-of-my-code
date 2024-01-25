export function getFiveItemsFromRange(min: number, max: number): number[] {
  const items = [];
  for (let i = 0; i < 6; i++) {
    items.push(roundToNearest(min, max, i));
  }

  return filterDuplicateValues(items);
}

export const filterDuplicateValues = <T>(array: T[]) =>
  array.filter(
    (value, index) => array.indexOf(value) === index && Boolean(value),
  );

export function roundToNearest(
  min: number,
  max: number,
  index: number,
): number {
  const amountRange = [30, 50, 100, 200, 500];

  if (amountRange[index] >= min && amountRange[index] <= max) {
    return amountRange[index];
  }

  return 0;
}
