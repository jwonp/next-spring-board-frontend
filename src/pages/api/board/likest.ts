import { ContentType } from "@src/static/types/ContentType";

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getMostLikedContents = async () => {
  return await axios.get(`${process.env.BACKEND_URL}/board/likest`);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentType[] | null>
) {
  try {
    getMostLikedContents().then((_res) => {
      const responseData: ContentType[] = _res.data;

      res.status(200).send(responseData);
    });
  } catch (error) {
    res.status(201).send(null);
  }
}
