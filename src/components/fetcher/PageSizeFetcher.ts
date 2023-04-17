import axios from "axios";
export const PageSizeFetcher = (url: string): Promise<number> =>
  axios.get(url).then((res) => res.data);

export const PageSizeURIByBoardAndSearch = (board: string, search?: string) => {
  if (search) {
    return `/api/board/size?board=${board}&search=${search}`;
  }
  return `/api/board/size?board=${board}`;
};
