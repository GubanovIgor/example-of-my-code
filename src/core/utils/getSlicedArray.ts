export const getSlicedArray = <T>(sliceCount: number, array?: T[] | null) =>
  array?.slice(0, sliceCount);
