export const removeCharFromStringByIndex = (string: string, index: number) =>
  string.slice(0, index) + string.slice(index + 1);
