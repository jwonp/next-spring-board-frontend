export interface ContentBarDataType {
  type: ContentTypeType;
  content: string;
  image: string;
}
export const ContentType = {
  text: "text",
  image: "image",
} as const;

export type ContentTypeType = (typeof ContentType)[keyof typeof ContentType];

export interface ContentBarAddType {
  target: number;
  content: string;
  type: ContentTypeType;
}
