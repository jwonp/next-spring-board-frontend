export interface ContentBarData {
  type: ContentType;
  content: string;
  image: string;
}
export const ContentTypes = {
  text: "text",
  image: "image",
} as const;

export type ContentType = (typeof ContentTypes)[keyof typeof ContentTypes];

export interface NewContentBar {
  target: number;
  content: string;
  type: ContentType;
}
