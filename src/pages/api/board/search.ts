import { BoardMenu } from "@src/static/types/BoardMenuType";
import { ContentData } from "@src/static/types/ContentType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const searchByQuery = async (
  query: string,
  board: BoardMenu,
  index: string
) => {
  return await axios.get(
    `${process.env.BACKEND_END_POINT}/board/search?search=${query}&board=${board}&index=${index}`
  );
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentData[] | null>
) {
  const { query, board, index } = req.query;

  searchByQuery(query as string, board as BoardMenu, index as string)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((_err) => {
      res.status(400).send(null);
    });
}
