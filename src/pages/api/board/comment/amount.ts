import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const getCommentAmountByContentId = async (id: string) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/comment/amount?id=${id}`
  );
};

const handler = (req: NextApiRequest, res: NextApiResponse<number>) => {
  const { id } = req.query;
  getCommentAmountByContentId(id as string).then((_res) => {
    res.status(200).send(_res.data);
  });
};

export default handler;
