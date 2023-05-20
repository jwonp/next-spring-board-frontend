export const getPaginationIndex = (
  pageIndex: number,
  lastPointNumber: number
): number => {
  return Math.floor(pageIndex / 10) * 10 + lastPointNumber;
};
