import { ContentBarDataType } from "./ContentDataType";
import { BoardMenuType } from "./BoardMenuType";

export interface SaveContentType {
  title: string;
  contents: string;
  writer: string;
  board: BoardMenuType;
}
