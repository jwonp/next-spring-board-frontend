import { ContentData } from "@src/static/types/ContentType";

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getMostLikedContents = async () => {
  return await axios.get(`${process.env.BACKEND_END_POINT}/board/likest`);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentData[] | null>
) {
  getMostLikedContents()
    .then((_res) => {
      const responseData: ContentData[] = _res.data;
      res.status(200).send(responseData);
    })
    .catch((_err) => {
      res.status(400).send(null);
    });
}
