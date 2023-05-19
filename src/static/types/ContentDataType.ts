export interface ContentBarData {
  type: ContentType;
  text: string;
  image: string;
}
export const ContentTypes = {
  text: "text",
  image: "image",
} as const;

export type ContentType = (typeof ContentTypes)[keyof typeof ContentTypes];

export interface NewContentBar {
  target: number;
  text: string;
  type: ContentType;
}
