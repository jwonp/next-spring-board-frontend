import { __Not_Applicated } from "@src/static/numbers/numberSet";
import { BoardMenu } from "@src/static/types/BoardMenuType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getBoardSize = async (board: BoardMenu, search?: string) => {
  return await axios.get(
    search
      ? `${process.env.BACKEND_END_POINT}/board/size?board=${board}&search=${search}`
      : `${process.env.BACKEND_END_POINT}/board/size?board=${board}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const { board, search } = req.query;

  getBoardSize(board as BoardMenu, search as string | undefined)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(400).send(__Not_Applicated);
    });
}
