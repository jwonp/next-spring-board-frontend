import { ContentData } from "@src/static/types/ContentType";
import axios from "axios";
export const boardListFetcher = (url: string): Promise<ContentData[]> =>
  axios.get(url).then((res) => res.data);
export const boardListURLByBoardAndIndex = (
  board: string,
  index: number,
  searchQuery?: string
) => {
  if (!board) return null;
  return searchQuery
    ? `/api/board/search?board=${board}&query=${searchQuery}&index=${index}`
    : `/api/board/list?index=${index}&board=${board}`;
};
