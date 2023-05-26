import { ContentData } from "@src/static/types/ContentType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const getLikedContents = async (userId: string) => {
  return await axios.get(
    `${process.env.BACKEND_END_POINT}/mypage/content/liked?user=${userId}`
  );
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentData[] | undefined | string>
) {
  const { user } = req.query;
  getLikedContents(user as string).then((_res) => {
    res.status(200).send(_res.data);
  });
}
