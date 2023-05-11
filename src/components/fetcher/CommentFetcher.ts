import { CommentType } from "@src/static/types/CommentType";
import axios from "axios";
export const CommentFetcher = (url: string): Promise<CommentType[]> =>
  axios.get(url).then((res) => res.data);

export const CommentURLByContent = (contentId: number) =>
  `/api/comment/list?id=${contentId}`;
