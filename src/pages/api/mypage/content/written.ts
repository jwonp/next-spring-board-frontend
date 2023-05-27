import { ContentData } from "@src/static/types/ContentType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const getWrittenContents = async (userId: string) => {
  return await axios.get(
    `${process.env.BACKEND_END_POINT}/mypage/content/written?user=${userId}`
  );
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentData[] | undefined>
) {
  const { user } = req.query;

  getWrittenContents(user as string)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.response.status).send(undefined);
    });
}
