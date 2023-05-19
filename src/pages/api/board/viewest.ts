import { ContentData } from "@src/static/types/ContentType";

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getMostViewedContents = async () => {
  return await axios.get(`${process.env.BACKEND_END_POINT}/board/viewest`);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentData[] | null>
) {
  getMostViewedContents()
    .then((_res) => {
      const responseData: ContentData[] = _res.data;

      res.status(200).send(responseData);
    })
    .catch((_err) => {
      res.status(400).send(null);
    });
}
