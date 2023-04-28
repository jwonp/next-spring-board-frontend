import { ContentBarDataType } from "./ContentDataType";

export interface ModifyContentType {
  contentId?: number;
  preTitle?: string;
  preContents?: ContentBarDataType[];
}
