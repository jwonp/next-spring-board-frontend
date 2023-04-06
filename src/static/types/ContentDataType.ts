export interface ContentBarDataType {
  type: ContentTypeType;
  content: string;
  image: string;
}

const contentType = {
  text: "text",
  image: "image",
} as const;

export type ContentTypeType = typeof contentType[keyof typeof contentType];
