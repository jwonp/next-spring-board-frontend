import { ContentBarDataType } from "./ContentDataType";
import { BoardMenuType } from "./BoardMenuType";

export interface SaveContentType {
  title: string;
  contents: string;
  author: string;
  board: BoardMenuType;
}
