import { ContentData } from "@src/static/types/ContentType";
import { BoardMenu } from "@src/static/types/BoardMenuType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getContentListByBoardAndIndex = async (
  board: BoardMenu,
  index: number
) => {
  return await axios.get(
    `${process.env.BACKEND_END_POINT}/board/list?index=${index}&board=${board}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentData[] | null>
) {
  const { index, board } = req.query;

  getContentListByBoardAndIndex(board as BoardMenu, Number(index))
    .then((_res) => {
      const responseData: ContentData[] = _res.data;

      res.status(200).send(responseData);
    })
    .catch((_err) => {
      res.status(400).send(null);
    });
}
