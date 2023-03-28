import { contentType } from "@src/static/types/contentType";
import axios from "axios";
export const boardListFetcher = (url: string): Promise<contentType[]> =>
  axios.get(url).then((res) => res.data);
