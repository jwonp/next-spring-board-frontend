import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const searchByQuery = async (query: string, board: string) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/search?search=${query}&board=${board}`
  );
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { query, board } = req.query;

  searchByQuery(query as string, board as string).then((response) => {
    res.status(200).send(response.data);
  });
}
