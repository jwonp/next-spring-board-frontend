import { ContentType } from "@src/static/types/ContentType";
import axios from "axios";
export const boardListFetcher = (url: string): Promise<ContentType[]> =>
  axios.get(url).then((res) => res.data);
