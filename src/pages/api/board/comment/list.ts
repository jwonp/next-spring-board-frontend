import { ContentType } from "@src/static/types/ContentType";
import { HeaderMiddleMenuType } from "@src/static/types/menuType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getCommentListByContentId = async (id: string) => {
  return await axios.get(`${process.env.BACKEND_URL}/board/comment?id=${id}`);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentType[] | null>
) {
  const { id } = req.query;
  getCommentListByContentId(id as string).then((_res) => {
    res.status(200).send(_res.data);
  });
}
