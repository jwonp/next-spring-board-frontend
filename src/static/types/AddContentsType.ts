import { ContentType } from "./ContentDataType";

export type AddContentType = (
  target: number,
  content?: string,
  type?: ContentType
) => void;
