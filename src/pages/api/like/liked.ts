import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const isLikedByContentIdAndUserId = async (
  contentId: string,
  userId: string
) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/like/liked?content=${contentId}&user=${userId}`
  );
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { content, user } = req.query;

  isLikedByContentIdAndUserId(content as string, user as string).then(
    (_res) => {
      res.status(200).send(_res.data);
    }
  );
}
