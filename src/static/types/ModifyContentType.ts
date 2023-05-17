import { ContentBarDataType } from "./ContentDataType";

export interface ModifyContentType {
  contentId?: number;
  preTitle?: string;
  preContents?: ContentBarDataType[];
}
export interface ModifyContentRequestType {
  contentId: number;
  title: string;
  contents: string;
  author: string;
}
