import { ContentType } from "@src/static/types/ContentType";
import { BoardMenuType } from "@src/static/types/BoardMenuType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
type ListDtoType = {
  contentMetaId: number;
  title: string;
  author: string;
  board: string;
  created: string;
  updated: string;
  views: number;
  likes: number;
};

const getContentListByBoardAndIndex = async (
  board: BoardMenuType,
  index: number
) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/list?index=${index}&board=${board}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentType[] | null>
) {
  const { index, board } = req.query;

  try {
    getContentListByBoardAndIndex(board as BoardMenuType, Number(index)).then(
      (_res) => {
        const responseData: ListDtoType[] = _res.data;

        res.status(200).send(responseData);
      }
    );
  } catch (error) {
    res.status(201).send(null);
  }
}
