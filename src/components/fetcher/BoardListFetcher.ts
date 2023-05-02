import { ContentType } from "@src/static/types/ContentType";
import axios from "axios";
export const boardListFetcher = (url: string): Promise<ContentType[]> =>
  axios.get(url).then((res) => res.data);
export const boardListURLByBoardAndIndex = (
  board: string,
  index: number,
  searchQuery?: string
) => {
  return searchQuery
    ? `/api/board/search?board=${board}&query=${searchQuery}`
    : `/api/board/list?index=${index}&board=${board}`;
};
