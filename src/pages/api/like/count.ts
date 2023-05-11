import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const getLikeCountByContentId = async (contentId: string) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/like/amount?content=${contentId}`
  );
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const { id } = req.query;

  getLikeCountByContentId(id as string).then((_res) => {
    res.status(200).send(Number(_res.data));
  });
}
