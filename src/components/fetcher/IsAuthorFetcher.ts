import axios from "axios";
export const isAuthorByContentIdFetcher = (url: string): Promise<boolean> =>
  axios.get(url).then((res) => res.data);

export const isAuthorURLByContentId = (contentId: number, author: string) => {
  return `/api/board/author?content=${contentId}&author=${author}`;
};
