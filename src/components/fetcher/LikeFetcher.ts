import axios from "axios";

export const LikeFetcher = (url: string): Promise<number> =>
  axios.get(url).then((res) => res.data);

export const LikeFetcherURLByContentId = (id: number) => {
  return `/api/board/like/count?id=${id}`;
};

export const LikedFetcher = (url: string): Promise<boolean> =>
  axios.get(url).then((res) => res.data);

export const isLikedURLByContentIdAndUserId = (
  contentId: number,
  userId: string
) => {
  return `/api/board/like/liked?content=${contentId}&user=${userId}`;
};
