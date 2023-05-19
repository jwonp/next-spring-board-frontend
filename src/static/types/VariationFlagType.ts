export const VariationFlags = {
  default: 0,
  increase: 1,
  decrease: -1,
} as const;

export type VariationFlag =
  (typeof VariationFlags)[keyof typeof VariationFlags];
