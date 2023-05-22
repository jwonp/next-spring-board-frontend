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
  res: NextApiResponse<ContentData[] | undefined | string>
) {
  const { user } = req.query;

  res.status(200).send(`${user as string} called written contents`);
  //   getWrittenContents(user as string).then((_res) => {

  //   });
}
