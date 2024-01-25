export const convertStringWithDotsToNumber = (string: string): number =>
  parseFloat(string.replace('.', ''));
