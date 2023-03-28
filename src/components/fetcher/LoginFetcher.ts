import axios from "axios";
export const csrfTokenGetFetcher = (url: string) =>
  axios
    .post(url, { identifier: "12345", method: "GET" })
    .then((res) => res.data);
