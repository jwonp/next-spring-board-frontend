import { ContentBarDataType } from "./ContentDataType";
import { HeaderMiddleMenuType } from "./menuType";

export interface SaveContentType {
  title: string;
  contents: string;
  writer: string;
  board: HeaderMiddleMenuType;
}
