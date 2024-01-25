export const insertCharToStringAtIndex = (
  str: string,
  substring: string,
  index: number,
) => str.slice(0, index) + substring + str.slice(index);
