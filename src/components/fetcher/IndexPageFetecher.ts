import { ContentData } from "@src/static/types/ContentType";
import axios from "axios";

export const MostViewFetcher = (url: string) =>
  axios.get(url).then((res) => res.data as ContentData[]);

export const MostViewURL = () => {
  return `/api/board/viewest`;
};

export const MostLikeFetcher = (url: string) =>
  axios.get(url).then((res) => res.data as ContentData[]);

export const MostLikeURL = () => {
  return `/api/board/likest`;
};

export const RecentlyFetcher = (url: string) =>
  axios.get(url).then((res) => res.data as ContentData[]);

export const RecentlyURL = () => {
  return `/api/board/recent`;
};
