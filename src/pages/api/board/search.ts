import { BoardMenuType } from "@src/static/types/BoardMenuType";
import { ContentType } from "@src/static/types/ContentType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const searchByQuery = async (
  query: string,
  board: BoardMenuType,
  index: string
) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/search?search=${query}&board=${board}&index=${index}`
  );
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentType[] | null>
) {
  const { query, board, index } = req.query;

  searchByQuery(query as string, board as BoardMenuType, index as string)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((_err) => {
      res.status(400).send(null);
    });
}
