import { ContentTypeType } from "./ContentDataType";

export type AddContentType = (
  target: number,
  content?: string,
  type?: ContentTypeType
) => void;
