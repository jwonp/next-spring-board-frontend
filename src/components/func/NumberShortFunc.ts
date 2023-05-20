export const convertNumberToUnitK = (num: number): string => {
  if (num >= 1000) {
    return `${Math.floor(num / 1000)}K`;
  }
  return `${num}`;
};
