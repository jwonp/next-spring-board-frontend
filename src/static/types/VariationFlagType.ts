export const VariationFlag = {
  default: 0,
  increase: 1,
  decrease: -1,
} as const;

export type VariationFlagType =
  typeof VariationFlag[keyof typeof VariationFlag];
