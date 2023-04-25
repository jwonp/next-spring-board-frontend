import axios from "axios";

export const LikeFetcher = (url: string): Promise<number> =>
  axios.get(url).then((res) => res.data);

export const LikeFetcherURLByContentId = (id: number) => {
  return `/api/board/like/count?id=${id}`;
};
