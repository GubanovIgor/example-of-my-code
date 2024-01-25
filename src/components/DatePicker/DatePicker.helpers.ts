export const getYears = (extraYears: number = 1) =>
  new Array(new Date().getFullYear() - 1900 + extraYears || 0)
    .fill(0)
    .map((_, i) => {
      const value: number = 1900 + i;
      return value.toString();
    })
    .reverse();
