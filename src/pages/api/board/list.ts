// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { contentType } from "@src/static/types/contentType";
import { HeaderMiddleMenuType } from "@src/static/types/menuType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const getContentListByBoardAndIndex = async (
  board: HeaderMiddleMenuType,
  index: number
) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/list?index=${index}&board=${board}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<contentType[] | null>
) {
  const { index, board } = req.query;

  try {
    getContentListByBoardAndIndex(
      board as HeaderMiddleMenuType,
      Number(index)
    ).then((_res) => res.status(200).send(_res.data));
  } catch (error) {
    res.status(201).send(null);
  }
}
