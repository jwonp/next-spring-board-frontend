import axios from "axios";
export const PageSizeFetcher = (url: string): Promise<number> =>
  axios.get(url).then((res) => res.data);

export const PageSizeURIByBoard = (board: string) => {
  return `/api/board/size?board=${board}`;
};
