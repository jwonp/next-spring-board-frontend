export interface ContentBarDataType {
  type: contentTypeType;
  content: string;
  image: string;
}

const contentType = {
  text: "text",
  image: "image",
} as const;

type contentTypeType = typeof contentType[keyof typeof contentType];
