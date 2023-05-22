import { ContentData } from "@src/static/types/ContentType";
import axios from "axios";
export const MyPageContentListFetcher = (
  url: string
): Promise<ContentData[] | string> => axios.get(url).then((res) => res.data);

export const LikedURL = (userId: string) => {
  return `/api/mypage/content/liked?user=${userId}`;
};
export const WrittenURL = (userId: string) => {
  return `/api/mypage/content/written?user=${userId}`;
};
