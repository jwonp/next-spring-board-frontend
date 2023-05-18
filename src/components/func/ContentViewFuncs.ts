export const getPaginationIndex = (
  pageIndex: number,
  lastPointNumber: number
) => {
  return Math.floor(pageIndex / 10) * 10 + lastPointNumber;
};
