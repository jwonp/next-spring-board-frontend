import axios from "axios";
export const CommentAmountFetcher = (url: string): Promise<number> =>
  axios.get(url).then((res) => res.data);

export const CommentAmountURLByContent = (contentId: number) =>
  `/api/board/comment/amount?id=${contentId}`;
