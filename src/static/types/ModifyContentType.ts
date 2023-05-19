import { ContentBarData } from "./ContentDataType";

export interface ModifyContent {
  contentId?: number;
  preTitle?: string;
  preContents?: ContentBarData[];
}
export interface ModifyContentRequest {
  contentId: number;
  title: string;
  contents: string;
  author: string;
}
