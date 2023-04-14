import { ContentBarDataType } from "./ContentDataType";
import { HeaderMiddleMenuType } from "./menuType";

export interface SaveContentType {
  title: string;
  contents: ContentBarDataType[];
  writer: string;
  board: HeaderMiddleMenuType;
}
